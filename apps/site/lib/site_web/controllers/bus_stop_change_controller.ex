defmodule SiteWeb.BusStopChangeController do
  @moduledoc """
  Identify the set of alerts most indicative of bus stop relocations and closures, and display this on a page.

  This is a WIP.
  """
  use SiteWeb, :controller

  alias Alerts.Alert
  alias Alerts.InformedEntity, as: IE

  # Assigns bus stop change alerts to conn.assigns.alerts
  plug(:bus_stop_alerts)

  # SiteWeb.Plugs.AlertsByTimeframe takes alerts from conn.assigns.alerts and
  # groups into current & upcoming
  plug(SiteWeb.Plugs.AlertsByTimeframe)

  def show(conn, _params) do
    if Laboratory.enabled?(conn, :bus_changes) do
      conn
      # Don't let Google crawl this page
      |> put_resp_header("x-robots-tag", "noindex")
      |> render("index.html")
    else
      redirect(conn, to: alert_path(conn, :index))
    end
  end

  defp bus_stop_alerts(
         %{query_params: %{"alerts_timeframe" => alerts_timeframe}} = conn,
         _params
       )
       when alerts_timeframe in ["current", "upcoming"] do
    alerts = Alerts.Repo.all(conn.assigns.date_time)
    assign_bus_stop_alerts(conn, alerts)
  end

  defp bus_stop_alerts(conn, _params) do
    alerts = get_old_alerts()
    assign_bus_stop_alerts(conn, alerts)
  end

  defp assign_bus_stop_alerts(conn, alerts) do
    assign(conn, :alerts, Enum.filter(alerts, &is_stop_move_or_closure?/1))
  end

  defp is_stop_move_or_closure?(%Alert{effect: effect}),
    do: effect in [:stop_closure, :stop_moved]

  defp get_old_alerts() do
    with folder <- Path.join([Path.dirname(__ENV__.file), "../../../priv/", "bus-stop-change"]),
         {:ok, files} <- File.ls(folder) do
      Enum.reduce(files, [], fn filepath, acc ->
        alert_info =
          "#{folder}/#{filepath}"
          |> File.stream!()
          |> CSV.decode!(headers: true)
          |> Enum.to_list()

        [alert_info | acc]
      end)
      |> Enum.flat_map(& &1)
      |> remove_old_versions()
      |> Enum.reject(&excluded_alerts/1)
      |> Enum.map(&parse_alert/1)
    else
      _ ->
        []
    end
  end

  defp remove_old_versions(alerts) do
    Enum.chunk_by(alerts, & &1["Alert ID"])
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
      Enum.map(stops, &%IE{stop: &1})
      |> Kernel.++(Enum.map(routes, &%IE{route: &1}))
      |> Alerts.InformedEntitySet.new()

    Alert.new(
      id: alert["Alert ID"],
      header: alert["Header"],
      informed_entity: informed_entity,
      active_period: [{active_date(alert["Effect Start"]), active_date(alert["Effect End"])}],
      effect: alert["Effect"] |> effect_atom(),
      updated_at: alert["Last Modified Date"],
      description: alert["Additional Information"],
      url: if(alert["URL"] != "", do: alert["URL"])
    )
  end

  def parse_affected_info(text) do
    texts = String.split(text, ~r/\n\r\n\n|\./) |> Enum.map(&String.trim/1)
    [_ | routes] = do_affected_info(texts, "route")
    [_ | stops] = do_affected_info(texts, "stop")
    %{routes: routes, stops: stops}
  end

  defp do_affected_info(texts, arg) when arg in ["route", "stop"] do
    with found when not is_nil(found) <-
           Enum.find(texts, &String.contains?(&1, "Affected #{arg}")) do
      String.split(found, ~r/\n\r\n/)
    else
      _ -> ["Affected #{arg}s:"]
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
