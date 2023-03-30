defprotocol AmbiguousAlert do
  @spec alert_start_date(t) :: DateTime.t() | nil
  def alert_start_date(alert)

  @spec alert_municipality(t) :: String.t() | nil
  def alert_municipality(alert)

  @spec affected_routes(t) :: [String.t()]
  def affected_routes(alert)

  @spec related_stops(t) :: [String.t() | Stops.Stop.t()]
  def related_stops(alert)
end

defimpl AmbiguousAlert, for: Alerts.Alert do
  def alert_start_date(%{active_period: [{start_date, _} | _]}) do
    start_date
  end

  def alert_municipality(alert), do: Alerts.Alert.municipality(alert)

  def affected_routes(alert) do
    alert
    |> Alerts.Alert.get_entity(:route)
    |> MapSet.delete(nil)
    |> Enum.map(fn id ->
      case Routes.Repo.get(id) do
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
      case Stops.Repo.get_parent(id) do
        %Stops.Stop{} = stop -> stop
        _ -> id
      end
    end)
  end
end

defimpl AmbiguousAlert, for: Alerts.HistoricalAlert do
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
end
