defmodule DotcomWeb.CMSHelpers do
  @moduledoc """
  Various helper functions that aid in rendering CMS content.
  """

  import DotcomWeb.ViewHelpers, only: [route_to_class: 1]
  import CSSHelpers, only: [string_to_class: 1]
  import PhoenixHTMLHelpers.Link

  alias CMS.API
  alias Routes.{Repo, Route}

  @doc """
  Converts CMS-flavored routes to classes, where the route may
  not strictly be an ID that matches an elixir route ID.

  Example: authors can tag something with an umbrella term like
  "commuter_rail" or "silver_line" to indicate the content item
  is related to all routes on that mode or line.
  """
  @spec cms_route_to_class(API.route_term()) :: String.t()
  def cms_route_to_class(%{id: "Green"}), do: "green-line"
  def cms_route_to_class(%{id: "silver_line"}), do: "silver-line"
  def cms_route_to_class(%{id: "mattapan"}), do: "red-line"
  def cms_route_to_class(%{group: "custom", mode: nil}), do: "unknown"
  def cms_route_to_class(%{group: "custom", mode: mode}), do: string_to_class(mode)
  def cms_route_to_class(%{group: "mode", id: mode}), do: string_to_class(mode)

  def cms_route_to_class(%{id: id}) do
    case Repo.get(id) do
      %Route{} = route -> route_to_class(route)
      _ -> "unknown"
    end
  end

  @doc """
  Converts CMS-flavored routes to svg, where the route may
  not strictly be an ID that matches an elixir route ID.

  Example: authors can tag something with an umbrella term like
  "commuter_rail" or "silver_line" to indicate the content item
  is related to all routes on that mode or line.
  """
  @spec cms_route_to_svg(API.route_term() | nil) ::
          Route.gtfs_route_type() | Route.subway_lines_type() | :t_logo
  def cms_route_to_svg(nil), do: :t_logo
  def cms_route_to_svg(%{mode: nil}), do: :t_logo
  def cms_route_to_svg(%{id: "Green"}), do: :green_line
  def cms_route_to_svg(%{id: "mattapan"}), do: :mattapan_line
  def cms_route_to_svg(%{id: "silver_line"}), do: :silver_line
  def cms_route_to_svg(%{group: "mode", id: mode}), do: Route.type_atom(mode)
  def cms_route_to_svg(%{group: "custom", mode: mode}), do: Route.type_atom(mode)

  def cms_route_to_svg(%{id: id}),
    do: id |> Repo.get() |> Route.icon_atom()

  @doc """
  Map certain CMS content categories to index pages of that content.
  If no match is found, simply output the original string category.
  """
  @spec link_category(String.t()) :: String.t() | Phoenix.HTML.safe()
  def link_category("Projects" = text), do: link(text, to: "/projects", title: "View all #{text}")
  def link_category(text), do: text
end
