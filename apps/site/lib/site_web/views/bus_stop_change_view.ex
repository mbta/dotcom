defmodule SiteWeb.BusStopChangeView do
  use SiteWeb, :view
  alias Alerts.{Alert, HistoricalAlert}
  alias Routes.Route
  alias Stops.Stop

  @type alerts_by_stop :: [{Stop.t(), [%Alert{} | %HistoricalAlert{}]}]

  @spec sorted_by_start_date([%Alert{}] | [%HistoricalAlert{}]) :: [%Alert{}]
  def sorted_by_start_date(alerts) do
    Enum.sort_by(
      alerts,
      fn
        %Alert{active_period: [{start_date, _} | _]} ->
          start_date

        %HistoricalAlert{alert: %Alert{active_period: [{start_date, _} | _]}} ->
          start_date
      end
    )
  end

  @spec grouped_by_municipality([%Alert{}] | [%HistoricalAlert{}]) :: %{
          String.t() => alerts_by_stop
        }
  def grouped_by_municipality([%Alert{} | _] = alerts) do
    grouped_by_stop(alerts)
    |> Enum.group_by(fn
      {%Stop{municipality: municipality}, _alerts} -> municipality
      {_stopname, _alerts} -> nil
    end)
  end

  def grouped_by_municipality([%HistoricalAlert{} | _] = alerts) do
    alerts
    |> Enum.flat_map(fn %HistoricalAlert{stops: stops} = alert ->
      Enum.map(stops, &{&1, alert})
    end)
    |> Enum.group_by(&elem(&1, 0), &elem(&1, 1))
    |> Enum.map(fn {stop, alerts} ->
      {stop, sorted_by_start_date(alerts)}
    end)
    |> Enum.group_by(fn {_, [%HistoricalAlert{municipality: muni} | _]} ->
      muni
    end)
  end

  def grouped_by_municipality([]), do: %{}

  @spec grouped_by_stop([%Alert{} | %HistoricalAlert{}]) :: alerts_by_stop
  def grouped_by_stop(alerts) when is_list(alerts) do
    alerts
    |> Enum.flat_map(fn alert ->
      related_stops(alert)
      |> Enum.map(&{&1, alert})
    end)
    |> Enum.group_by(&elem(&1, 0), &elem(&1, 1))
    |> Enum.sort_by(fn
      {%Stop{name: name}, _alerts} -> name
      {stopname, _alerts} -> stopname
    end)
    |> Enum.map(fn {stop, alerts} ->
      {stop, sorted_by_start_date(alerts)}
    end)
  end

  @spec affected_routes(%Alert{} | %HistoricalAlert{}) :: [Phoenix.HTML.Safe.t()]
  def affected_routes(alert) do
    case alert do
      %Alert{} ->
        Alert.get_entity(alert, :route)
        |> MapSet.delete(nil)
        |> MapSet.to_list()
        |> Enum.uniq()

      %HistoricalAlert{routes: routes} ->
        routes
    end
    |> Enum.map(fn routeIdOrName ->
      name =
        case Routes.Repo.get(routeIdOrName) do
          %Route{name: name} -> name
          _ -> routeIdOrName
        end

      content_tag(:span, name,
        class: "c-icon__bus-pill--small u-bg--bus",
        style: "margin-right: .25rem;"
      )
    end)
  end

  @spec related_stops(%Alert{} | %HistoricalAlert{}) :: [%Stop{}]
  def related_stops(alert) do
    case alert do
      %Alert{} ->
        Alert.get_entity(alert, :stop)
        |> MapSet.delete(nil)
        |> MapSet.to_list()

      %HistoricalAlert{stops: stops} ->
        stops
    end
    |> Enum.map(fn stopIdOrName ->
      case Stops.Repo.get_parent(stopIdOrName) do
        %Stop{} = stop -> stop
        _ -> stopIdOrName
      end
    end)
    |> Enum.uniq()
  end

  @spec time_filter_buttons(%Plug.Conn{}) :: Phoenix.HTML.Safe.t()
  def time_filter_buttons(conn) do
    selected_timeframe = conn.assigns.alerts_timeframe

    content_tag(
      :div,
      Enum.map([nil, :current, :upcoming], fn timeframe ->
        link(filter_text(timeframe),
          to: bus_stop_change_path(conn, :show, alerts_timeframe: timeframe),
          class:
            if(timeframe == selected_timeframe,
              do: "m-alerts__time-filter m-alerts__time-filter--selected",
              else: "m-alerts__time-filter"
            )
        )
      end),
      class: "m-alerts__time-filters small"
    )
  end

  defp filter_text(nil), do: "Past Changes"
  defp filter_text(:current), do: "Current Changes"
  defp filter_text(:upcoming), do: "Upcoming Changes"

  @spec affected_stop_link(%Plug.Conn{}, %Stop{} | String.t()) :: Phoenix.HTML.Safe.t() | nil
  def affected_stop_link(_conn, stopname) when is_binary(stopname) do
    content_tag(:div, stopname)
  end

  def affected_stop_link(conn, stop) do
    if(stop, do: link(stop.name, to: stop_path(conn, :show, stop.id), class: "text-primary"))
  end

  @spec time_range(%Alert{} | %HistoricalAlert{}) :: Phoenix.HTML.Safe.t()
  def time_range(%Alerts.Alert{active_period: active_periods}) do
    active_periods
    |> Enum.map(fn {start_date, end_date} ->
      content_tag(
        :div,
        [
          fa("calendar", class: "mr-025"),
          date_tag(start_date) || "N/A",
          " — ",
          date_tag(end_date) || "N/A"
        ],
        class: "u-small-caps u-bold mb-1"
      )
    end)
    |> List.first()
  end

  def time_range(%HistoricalAlert{alert: alert}), do: time_range(alert)

  @spec date_tag(DateTime.t() | nil) :: Phoenix.HTML.Safe.t() | nil
  defp date_tag(%DateTime{} = date) do
    with iso <- DateTime.to_iso8601(date),
         {:ok, readable} <- Timex.format(date, "{Mshort} {D} {YYYY} {h24}:{m}") do
      content_tag(:time, readable, datetime: iso)
    end
  end

  defp date_tag(nil), do: nil

  def alert_item(%HistoricalAlert{alert: alert}, conn), do: alert_item(alert, conn)

  def alert_item(alert, conn) do
    SiteWeb.AlertView.render("_item.html", alert: alert, date_time: conn.assigns.date_time)
  end
end
