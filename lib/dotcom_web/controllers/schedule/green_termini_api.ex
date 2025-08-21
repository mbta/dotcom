defmodule DotcomWeb.ScheduleController.GreenTerminiApi do
  @moduledoc """
    API for retrieving the terminuses of each green line route
  """
  use DotcomWeb, :controller

  alias DotcomWeb.ScheduleController.Line.Helpers, as: LineHelpers

  def show(conn, _) do
    direction_destinations =
      GreenLine.branch_ids()
      |> Map.new(fn k ->
        {k, Map.values(elem(LineHelpers.get_route(k), 1).direction_destinations)}
      end)

    json(conn, direction_destinations)
  end
end
