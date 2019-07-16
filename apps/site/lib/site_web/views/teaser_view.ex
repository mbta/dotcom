defmodule SiteWeb.Content.TeaserView do
  @moduledoc """
  Handles rendering of teaser partials from the CMS.
  """
  use SiteWeb, :view

  import SiteWeb.ContentHelpers, only: [cms_route_to_class: 1]

  alias Content.Paragraph.ContentList
  alias Content.Teaser

  @spec teaser_color(Teaser.t()) :: String.t()
  def teaser_color(%Teaser{routes: [route | _]}), do: cms_route_to_class(route)
  def teaser_color(%Teaser{routes: []}), do: "unknown"

  @spec display_date(Teaser.t()) :: String.t()
  def display_date(%Teaser{type: :event, date: date}) do
    Timex.format!(date, "{Mfull} {D}, {YYYY}, {h12}:{m} {AM}")
  end

  def display_date(%Teaser{date: date}) do
    format_full_date(date)
  end

  @spec display_location(Teaser.location(), [atom]) :: String.t()
  def display_location(location, opts \\ [:place, :city, :state]) do
    location
    |> Keyword.take(opts)
    |> Keyword.values()
    |> Enum.reject(&is_nil/1)
    |> Enum.join(", ")
  end

  @spec list_more_link?(ContentList.t(), [Teaser.t()]) :: boolean()
  def list_more_link?(_, []), do: false
  def list_more_link?(%ContentList{more_link: nil}, _), do: false
  def list_more_link?(_, _), do: true
end
