defmodule DotcomWeb.Mode.SubwayController do
  use DotcomWeb.Mode.HubBehavior,
    meta_description:
      "Schedule information for MBTA subway lines in Greater Boston, " <>
        "including real-time updates and arrival predictions."

  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]

  def route_type, do: 1

  def routes do
    @routes_repo.all()
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
