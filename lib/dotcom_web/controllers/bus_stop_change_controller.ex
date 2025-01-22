defmodule DotcomWeb.BusStopChangeController do
  @moduledoc """
  Identify the set of alerts most indicative of bus stop relocations and closures, and display this on a page.

  This is a WIP.
  """
  use DotcomWeb, :controller

  alias Alerts.Alert
  alias Alerts.Cache.BusStopChangeS3
  alias Alerts.HistoricalAlert
  alias Alerts.InformedEntity, as: IE

  # Assigns bus stop change alerts to conn.assigns.alerts
  plug(:bus_stop_alerts)

  # DotcomWeb.Plugs.AlertsByTimeframe takes alerts from conn.assigns.alerts and
  # groups into current & upcoming
  plug(DotcomWeb.Plugs.AlertsByTimeframe)

  def show(%{query_params: %{"alerts_timeframe" => _alerts_timeframe}} = conn, _params) do
    conn
    # Don't let Google crawl this page
    |> put_resp_header("x-robots-tag", "noindex")
    |> render("index.html")
  end

  def show(conn, _params) do
    redirect(conn, to: bus_stop_change_path(conn, :show, alerts_timeframe: "current"))
  end

  defp bus_stop_alerts(%{query_params: %{"alerts_timeframe" => alerts_timeframe}} = conn, _params)
       when alerts_timeframe in ["current", "upcoming"] do
    alerts = Alerts.Repo.all(conn.assigns.date_time)
    assign_bus_stop_alerts(conn, alerts)
  end

  defp bus_stop_alerts(conn, _params) do
    alerts = get_old_alerts()

    conn
    |> assign_bus_stop_alerts(alerts)
    |> assign(:past_alerts, past_stored_alerts())
  end

  defp assign_bus_stop_alerts(conn, alerts) do
    assign(conn, :alerts, Enum.filter(alerts, &stop_move_or_closure?/1))
  end

  # These are %HistoricalAlert{} structs that we store in AWS S3.
  # In the future all of our past alerts will come from here.
  defp past_stored_alerts do
    yesterday = Timex.shift(Util.service_date(), days: -1)

    # Best guess at which alerts to designate as "past"
    Enum.filter(BusStopChangeS3.get_stored_alerts(), fn %HistoricalAlert{
                                                          alert: %Alert{active_period: [{_starting, ending} | _]}
                                                        } ->
      has_ended? = ending && Timex.before?(ending, yesterday)
      is_nil(ending) || has_ended?
    end)
  end

  defp stop_move_or_closure?(%Alert{effect: effect}), do: effect in [:stop_closure, :stop_moved]

  # These are alerts exported from the Alerts UI application into
  # a series of CSV files. These will eventually be phased out in favor
  # of the alerts we store in S3.
  defp get_old_alerts do
    folder = :dotcom |> Application.app_dir() |> Path.join("priv/bus-stop-change")

    case File.ls(folder) do
      {:ok, files} ->
        files
        |> Enum.reduce([], fn filepath, acc ->
          alert_info =
            folder
            |> Path.join(filepath)
            |> File.stream!()
            |> CSV.decode!(headers: true, escape_max_lines: 1000)
            |> Enum.to_list()

          [alert_info | acc]
        end)
        |> Enum.flat_map(& &1)
        |> remove_old_versions()
        |> Enum.reject(&excluded_alerts/1)
        |> Enum.map(&parse_alert/1)

      _ ->
        []
    end
  end

  defp remove_old_versions(alerts) do
    alerts
    |> Enum.chunk_by(& &1["Alert ID"])
    |> Enum.reduce([], fn alert_versions, acc ->
      latest_alert = Enum.max_by(alert_versions, &String.to_integer(&1["Version No."]))
      [latest_alert | acc]
    end)
  end

  @phrases [
    "All buses are picking up and dropping off",
    "temporar",
    "detour"
  ]
  defp excluded_alerts(%{"Header" => header, "Additional Information" => description}) do
    text = header <> description
    Enum.any?(@phrases, &String.contains?(text, &1))
  end

  defp parse_alert(alert) do
    %{routes: routes, stops: stops} = parse_affected_info(alert["Additional Information"])

    informed_entity =
      stops
      |> Enum.map(&%IE{stop: &1})
      |> Kernel.++(Enum.map(routes, &%IE{route: &1}))
      |> Alerts.InformedEntitySet.new()

    Alert.new(
      id: alert["Alert ID"],
      header: alert["Header"],
      informed_entity: informed_entity,
      active_period: [{active_date(alert["Effect Start"]), active_date(alert["Effect End"])}],
      effect: effect_atom(alert["Effect"]),
      updated_at: alert["Last Modified Date"],
      description: alert["Additional Information"],
      url: if(alert["URL"] != "", do: alert["URL"])
    )
  end

  def parse_affected_info(text) do
    texts = text |> String.split(~r/\n\r\n\n|\./) |> Enum.map(&String.trim/1)
    [_ | routes] = do_affected_info(texts, "route")
    [_ | stops] = do_affected_info(texts, "stop")
    %{routes: routes, stops: stops}
  end

  defp do_affected_info(texts, arg) when arg in ["route", "stop"] do
    case Enum.find(texts, &String.contains?(&1, "Affected #{arg}")) do
      nil -> ["Affected #{arg}s:"]
      found -> String.split(found, ~r/\n\r\n/)
    end
  end

  defp effect_atom("Stop Closure"), do: :stop_closure
  defp effect_atom("Stop Move"), do: :stop_moved

  defp active_date(date) do
    with {:ok, %NaiveDateTime{} = ndt} <- Timex.parse(date, "{ISOdate}T{h24}:{m}"),
         {:ok, dt} <- DateTime.from_naive(ndt, "Etc/UTC") do
      dt
    else
      _ ->
        nil
    end
  end
end
