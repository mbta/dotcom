defmodule SiteWeb.StaticPage do
  @moduledoc """
  Logic for pages which simply render a static template with no additional logic. Separated into its
  own module in order to allow use at compile time in other modules.
  """

  @static_pages [
    %{
      key: :about,
      meta_description:
        "Information about the Massachusetts Bay Transportation Authority (MBTA), " <>
          "including leadership, business opportunities, projects and initiatives, and financials."
    },
    %{
      key: :getting_around,
      meta_description:
        "Navigate public transit in the Greater Boston region. Routes, schedules, " <>
          "trip planner, service alerts, real-time updates, and general information."
    },
    %{
      key: :menu,
      meta_description: "Browse the key areas of the MBTA website."
    }
  ]

  def static_pages, do: Enum.map(@static_pages, & &1.key)

  def meta_description(key), do: Enum.find(@static_pages, &(&1.key == key)).meta_description

  def convert_path(path) do
    path
    |> Atom.to_string()
    |> String.replace("_", "-")
  end
end
