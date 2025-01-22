defmodule Alerts.Trip do
  @moduledoc false
  @doc """

  Given a trip_id (or a list of IDs), returns the list of alerts which apply
  to that trip.

  Options include:

  * stop: for a particular stop along that trip (ID string)
  * route: the route that trip is on (ID string)
  * route_type: the type of route (GTFS integer)
  * direction_id: the direction of the trip (GTFS integer)
  * time: for a particular time during that trip (DateTime)

  """
  def match(alerts, trip_ids, options \\ [])

  def match(alerts, trip_ids, options) when is_list(trip_ids) do
    trip_entities = trip_entities(trip_ids)
    delay_entities = delay_entities(trip_ids, options)
    time = options[:time]

    for alert <- alerts,
        trip_alert?(alert, trip_entities, time) or delay_alert?(alert, delay_entities, time) do
      alert
    end
  end

  def match(alerts, trip_id, options) do
    match(alerts, [trip_id], options)
  end

  defp trip_alert?(alert, entities, time) do
    Alerts.Match.match([alert], entities, time) != []
  end

  defp delay_alert?(alert, entities, time) do
    if alert_is_delay?(alert) do
      Alerts.Match.match([alert], entities, time) != []
    else
      false
    end
  end

  def trip_entities(trip_ids) do
    for trip_id <- trip_ids do
      Alerts.InformedEntity.from_keywords(trip: trip_id)
    end
  end

  defp delay_entities(trip_ids, options) do
    entity = Alerts.InformedEntity.from_keywords(options)

    for trip_id <- trip_ids do
      %{entity | trip: trip_id}
    end
  end

  defp alert_is_delay?(alert)
  defp alert_is_delay?(%{effect: :delay}), do: true
  defp alert_is_delay?(%{effect: :suspension}), do: true
  defp alert_is_delay?(_), do: false
end
