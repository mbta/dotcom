defmodule SiteWeb.ScheduleController.GreenTerminiApi do
  @moduledoc """
    API for retrieving the terminuses of each green line route
  """
  use SiteWeb, :controller

  alias SiteWeb.ScheduleController.Line.Helpers, as: LineHelpers

  @spec show(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def show(_conn, %{
  }) do
    ["Green-B", "Green-C", "Green-D", "Green-E"]
    |> Map.new(fn [k, _v] -> {k, LineHelpers.get_route(k).direction_destinations} end)
  end
end
