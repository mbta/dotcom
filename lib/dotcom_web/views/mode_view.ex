defmodule DotcomWeb.ModeView do
  @moduledoc false

  use DotcomWeb, :view

  alias Alerts.Match
  alias Dotcom.MapHelpers
  alias DotcomWeb.PartialView
  alias DotcomWeb.PartialView.SvgIconWithCircle
  alias Phoenix.HTML.Safe
  alias Plug.Conn
  alias Routes.Route

  def get_route_group(:commuter_rail = route_type, route_groups) do
    # Note that we do not sort the commuter rail routes by name as we
    # want to preserve the order supplied by the API, keeping Foxboro
    # last.
    route_groups[route_type]
  end

  def get_route_group(:the_ride, _) do
    [
      {"MBTA Paratransit Program", cms_static_page_path(DotcomWeb.Endpoint, "/accessibility/the-ride")}
    ]
  end

  def get_route_group(route_type, route_groups), do: route_groups[route_type]

  # Remove this once it is no longer being used in the content on any environment -- MSS 20200730
  @spec fares_note(String) :: Phoenix.HTML.safe() | String.t()
  def fares_note(_mode) do
    ""
  end

  @doc """
  Builds the header tag for a mode group. Adds a "view all" link for bus.
  """
  @spec mode_group_header(atom, String.t(), boolean) :: Safe.t()
  def mode_group_header(mode, href, is_homepage?) do
    is_homepage?
    |> mode_group_header_tag()
    |> content_tag(mode_group_header_content(mode, href), class: "m-mode__header")
  end

  @spec mode_group_header_tag(boolean) :: :h2 | :h3
  defp mode_group_header_tag(is_homepage?)
  defp mode_group_header_tag(true), do: :h3
  defp mode_group_header_tag(false), do: :h2

  @spec mode_group_header_content(atom, String.t()) :: [Safe.t()]
  defp mode_group_header_content(mode, href) do
    [
      link(
        [
          svg_icon_with_circle(%SvgIconWithCircle{icon: mode, aria_hidden?: true}),
          " ",
          Route.type_name(mode)
        ],
        to: href,
        class: "m-mode__name"
      ),
      view_all_link(mode, href)
    ]
  end

  @spec view_all_link(atom, String.t()) :: [Safe.t()]
  defp view_all_link(:bus, href) do
    [
      link("View all bus routes", to: href, class: "c-call-to-action m-mode__view-all")
    ]
  end

  defp view_all_link(_, _) do
    []
  end

  @spec grid_button_path(atom, Conn.t()) :: String.t()
  def grid_button_path(:the_ride, %Conn{} = conn) do
    cms_static_page_path(conn, "/accessibility/the-ride")
  end

  def grid_button_path(%Route{id: route_id}, %Conn{} = conn) do
    schedule_path(conn, :show, route_id)
  end

  @doc """
  Returns the value to add as a modifier for the .c-grid-button class.
  """
  @spec grid_button_class_modifier(atom | Route.t()) :: String.t()
  def grid_button_class_modifier(:the_ride) do
    "the-ride"
  end

  def grid_button_class_modifier(%Route{} = route) do
    route_to_class(route)
  end

  @doc """
  Used to determine if the mode icon should be rendered on a mode button.
  The Ride icon is never shown. Subway icons are always rendered.
  Other modes rely on the :show_icon? boolean assign.
  """
  @spec show_icon?(atom | Route.t(), boolean) :: boolean
  def show_icon?(:the_ride, _) do
    false
  end

  def show_icon?(%Route{type: type}, _) when type in [0, 1] do
    true
  end

  def show_icon?(_, bool) when bool in [true, false] do
    bool
  end

  @spec grid_button_text(atom | Route.t()) :: String.t()
  def grid_button_text(:the_ride) do
    "MBTA Paratransit Program"
  end

  def grid_button_text(%Route{name: name}) do
    break_text_at_slash(name)
  end

  # Returns true if there is a non-notice alert for the given route on `date`
  @spec has_alert?(Route.t() | :the_ride, [Alerts.Alert.t()], DateTime.t() | nil) :: boolean
  def has_alert?(:the_ride, _, _) do
    false
  end

  def has_alert?(%Route{} = route, alerts, date) do
    date = date || Util.now()
    entity = %Alerts.InformedEntity{route_type: route.type, route: route.id}

    Enum.any?(alerts, fn alert ->
      Alerts.Alert.high_severity_or_high_priority?(alert) and
        Match.match([alert], entity, date) == [alert]
    end)
  end

  def map_buttons(types) do
    content_tag(:div, Enum.map(types, &map_button/1), class: "m-mode-hub__map-btns")
  end

  def map_button(type) do
    content_tag(
      :div,
      [
        link(
          [
            type |> MapHelpers.thumbnail() |> img_tag(class: "m-mode-hub__map-btn-thumbnail"),
            content_tag(:span, map_button_text(type), class: "m-mode-hub__map-btn-text"),
            fa("angle-right", class: "m-mode-hub__map-btn-caret")
          ],
          to: MapHelpers.map_pdf_url(type),
          class: "m-mode-hub__map-btn"
        )
      ],
      class: "m-mode-hub__map-btn-wrapper"
    )
  end

  def map_image(type) do
    content_tag(:div, [
      link(
        [
          type |> MapHelpers.image() |> img_tag(class: "m-mode-hub__map-image")
        ],
        to: MapHelpers.map_pdf_url(type)
      )
    ])
  end

  def map_button_text(:commuter_rail_zones), do: "Commuter Rail Zones Map"
  def map_button_text(:commuter_rail), do: "Commuter Rail Map"
  def map_button_text(:subway), do: "Subway Map"
  def map_button_text(:bus), do: "Bus Map"
  def map_button_text(:ferry), do: "Ferry Map"

  @spec grid_button_id(map) :: String.t() | nil
  defp grid_button_id(%{id_prefix: <<prefix::binary>>, index: idx}) do
    prefix <> "--" <> Integer.to_string(idx)
  end

  defp grid_button_id(_) do
    nil
  end

  @spec bus_filter_atom(atom) :: (Route.t() -> boolean)
  def bus_filter_atom(:sl), do: &Route.silver_line?/1
  def bus_filter_atom(:ct), do: fn route -> route.name =~ "CT" end

  @spec bus_filter_range(integer, integer) :: (Route.t() -> boolean)
  def bus_filter_range(start, stop) do
    fn route ->
      case Integer.parse(route.name) do
        :error -> false
        {value, _} -> in_range?(start, stop, value)
      end
    end
  end

  @spec in_range?(integer, integer, integer) :: boolean
  defp in_range?(first, last, value) when value >= first and value <= last, do: true
  defp in_range?(_, _, _), do: false

  @spec mode_fare_card(Route.gtfs_route_type()) :: String.t()
  def mode_fare_card(:commuter_rail) do
    "paragraphs/multi-column/commuter-rail-fares"
  end

  def mode_fare_card(:ferry) do
    "paragraphs/multi-column/ferry-fares"
  end

  def mode_fare_card(:subway) do
    "paragraphs/multi-column/subway-fares"
  end

  def mode_fare_card(:bus) do
    "paragraphs/multi-column/bus-fares"
  end
end
