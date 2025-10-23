defprotocol DotcomWeb.AmbiguousAlert do
  @spec alert_start_date(t) :: DateTime.t() | nil
  def alert_start_date(alert)

  @spec alert_municipality(t) :: String.t() | nil
  def alert_municipality(alert)

  @spec affected_routes(t) :: [String.t()]
  def affected_routes(alert)

  @spec related_stops(t) :: [String.t() | Stops.Stop.t()]
  def related_stops(alert)

  @spec time_range(t) :: Phoenix.HTML.Safe.t()
  def time_range(alert)

  @spec alert_item(t, Plug.Conn.t()) :: Phoenix.HTML.Safe.t()
  def alert_item(alert, conn)
end

defimpl DotcomWeb.AmbiguousAlert, for: Alerts.Alert do
  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]
  @stops_repo Application.compile_env!(:dotcom, :repo_modules)[:stops]

  def alert_start_date(%{active_period: [{start_date, _} | _]}) do
    start_date
  end

  def alert_municipality(alert), do: Alerts.Alert.municipality(alert)

  def affected_routes(alert) do
    alert
    |> Alerts.Alert.get_entity(:route)
    |> MapSet.delete(nil)
    |> Enum.map(fn id ->
      case @routes_repo.get(id) do
        %{name: name} -> name
        _ -> id
      end
    end)
  end

  def related_stops(alert) do
    alert
    |> Alerts.Alert.get_entity(:stop)
    |> MapSet.delete(nil)
    |> Enum.map(fn id ->
      case @stops_repo.get_parent(id) do
        %Stops.Stop{} = stop -> stop
        _ -> id
      end
    end)
  end

  def time_range(%Alerts.Alert{active_period: active_periods}) do
    active_periods
    |> Enum.map(fn {start_date, end_date} ->
      if start_date || end_date do
        PhoenixHTMLHelpers.Tag.content_tag(
          :div,
          [
            DotcomWeb.ViewHelpers.fa("calendar", class: "u-mr-025"),
            date_tag(start_date) || "Present",
            " — ",
            date_tag(end_date) || "Present"
          ],
          class: "u-small-caps font-bold u-mb-1"
        )
      end
    end)
    |> List.first()
  end

  @spec date_tag(DateTime.t() | nil) :: Phoenix.HTML.Safe.t() | nil
  defp date_tag(%DateTime{} = date) do
    with iso <- DateTime.to_iso8601(date),
         {:ok, readable} <- Dotcom.Utils.Time.format(date, :mshort_d_y_h24_m) do
      PhoenixHTMLHelpers.Tag.content_tag(:time, readable, datetime: iso)
    end
  end

  defp date_tag(nil), do: nil

  def alert_item(alert, conn) do
    DotcomWeb.AlertView.render("_item.html", alert: alert, date_time: conn.assigns.date_time)
  end
end

defimpl DotcomWeb.AmbiguousAlert, for: Alerts.HistoricalAlert do
  def alert_start_date(%{
        alert: %{active_period: [{start_date, _} | _]}
      }) do
    start_date
  end

  def alert_municipality(%{municipality: muni}), do: muni

  def affected_routes(%Alerts.HistoricalAlert{routes: routes}) do
    routes
  end

  def related_stops(%Alerts.HistoricalAlert{stops: stops}) do
    stops
  end

  def time_range(%Alerts.HistoricalAlert{alert: alert}) do
    DotcomWeb.AmbiguousAlert.time_range(alert)
  end

  def alert_item(%Alerts.HistoricalAlert{alert: alert}, conn) do
    DotcomWeb.AmbiguousAlert.alert_item(alert, conn)
  end
end
