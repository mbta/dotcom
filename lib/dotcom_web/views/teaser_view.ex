defmodule DotcomWeb.CMS.TeaserView do
  @moduledoc """
  Handles display elements of teaser partials from the CMS.
  """
  use DotcomWeb, :view

  import DotcomWeb.CMSHelpers,
    only: [cms_route_to_class: 1, cms_route_to_svg: 1, link_category: 1]

  alias alias Routes.Route
  alias CMS.Partial.Teaser

  @all_fields [:image, :title, :date, :topic, :location, :summary]
  @image_required [:project, :project_update]

  @spec transit_tag(Teaser.t()) :: String.t()
  def transit_tag(%Teaser{routes: [route | _]}), do: cms_route_to_class(route)
  def transit_tag(%Teaser{routes: []}), do: "unknown"

  @spec transit_svg(Teaser.t()) ::
          Route.gtfs_route_type() | Route.subway_lines_type() | :t_logo
  def transit_svg(%Teaser{routes: [route | _]}), do: cms_route_to_svg(route)
  def transit_svg(%Teaser{routes: []}), do: cms_route_to_svg(nil)

  @spec teaser_topic(Teaser.t()) :: Phoenix.HTML.safe()
  def teaser_topic(teaser), do: link_category(teaser.topic)

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

  @doc """
  Teasers being rendered automatically through the ContentList paragraph
  get their field overrides values from the CMS (authors can manually
  select field override settings, which are stored in the ContentList).
  The default fields below will be used if no overrides are present.

  If teasers are being rendered directly from an Elixir module, such
  as a controller or view (ie, a module or template outside the CMS app),
  the default fields below will be used for display. Otherwise, the
  caller is responsible for setting/overriding the defaults.

  Note that the :type associated with the ContentList paragraph recipe OR
  the :type of the very first teaser in the teasers list will be used as
  the :type for all teasers in the list as far as field display goes.
  """
  @spec handle_fields(CMS.API.type(), [Teaser.display_field()]) :: [Teaser.display_field()]
  def handle_fields(type, [] = _cms_context), do: default_fields(type)
  def handle_fields(type, nil = _non_cms_context), do: default_fields(type)
  def handle_fields(type, fields) when type in @image_required, do: [:image | fields]
  def handle_fields(_, fields), do: fields

  defp default_fields(:page), do: [:image, :topic, :title]
  defp default_fields(:news_entry), do: [:date, :title]
  defp default_fields(:event), do: [:date, :title, :location]
  defp default_fields(:project), do: [:image, :title, :topic, :summary]
  defp default_fields(:project_update), do: [:image, :date, :title]
  defp default_fields(:diversion), do: [:title, :summary]
  defp default_fields(_), do: @all_fields
end
