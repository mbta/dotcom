defmodule Alerts.Stop do
  @moduledoc """

  Given a stop_id, returns the list of alerts which apply to that stop.

  Options include:

  * route: the route we're interested in (ID string)
  * route_type: the route_type of the interested route (GTFS integer)
  * direction_id: the direction we're travelling (GTFS integer)
  * time: for a particular datetime (DateTime)
  """
  alias Alerts.InformedEntity, as: IE
  alias Alerts.Match

  def match(alerts, stop_id, options \\ []) do
    # First, we filter the alerts to those that match any of the options
    # including the stop.  Then, we filter again to get only those that
    # explicitly use the stop.
    stop_entity = entity_for(stop_id, [])
    stop_with_options_entity = entity_for(stop_id, options)
    time = options[:time]

    for alert <- alerts,
        Match.match([alert], stop_entity, time) != [],
        Match.match([alert], stop_with_options_entity) != [] do
      alert
    end
  end

  defp entity_for(stop_id, options) do
    options
    |> Keyword.put(:stop, stop_id)
    |> IE.from_keywords()
  end
end
