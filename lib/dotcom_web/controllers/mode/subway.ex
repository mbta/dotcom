defmodule DotcomWeb.Mode.SubwayController do
  use DotcomWeb.Mode.HubBehavior,
    meta_description:
      "Schedule information for MBTA subway lines in Greater Boston, " <>
        "including real-time updates and arrival predictions."

  def route_type, do: 1

  def routes do
    Routes.Repo.all()
    |> Routes.Group.group()
    |> Keyword.get(:subway, [])
  end

  def fares do
    DotcomWeb.ViewHelpers.mode_summaries(:subway)
  end

  def mode_name, do: "Subway"

  def mode_icon, do: :subway

  def fare_description,
    do: "Travel anywhere on the Blue, Orange, Red, and Green lines for the same price."
end
