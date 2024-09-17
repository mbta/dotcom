defmodule Dotcom.ContentRewriters.LiquidObjects do
  @moduledoc """

  This module handles so-called "liquid objects": content appearing between
  {{ and }} in text. The wrapping braces should be removed and the text inside
  should be stripped before being given to this module.

  """

  import Phoenix.HTML, only: [raw: 1, safe_to_string: 1]
  import PhoenixHTMLHelpers.Tag, only: [content_tag: 3]
  import DotcomWeb.PartialView.SvgIconWithCircle, only: [svg_icon_with_circle: 1]
  import DotcomWeb.ViewHelpers, only: [fa: 1, svg: 1]

  # "Plugins" for other Elixir apps
  import __MODULE__.Fare, only: [fare_request: 1]
  import __MODULE__.Route, only: [route_request: 1]

  alias DotcomWeb.PartialView.SvgIconWithCircle

  @spec replace(String.t(), Keyword.t()) :: String.t()
  def replace(content, opts \\ [])

  def replace("fa " <> icon, _opts) do
    font_awesome_replace(icon)
  end

  def replace("mbta-circle-icon " <> icon, opts) do
    mbta_svg_icon_replace(icon, opts)
  end

  def replace("icon:" <> icon, opts) do
    mbta_svg_icon_replace(icon, opts)
  end

  def replace("app-badge " <> badge, _opts) do
    app_svg_badge_replace(badge)
  end

  def replace("fare:" <> tokens, _opts) do
    tokens |> fare_request() |> do_replacement(:fare, tokens)
  end

  def replace("route:" <> route, _opts) do
    route |> route_request() |> do_replacement(:route, route)
  end

  def replace(unmatched, _opts) do
    "{{ #{unmatched} }}"
  end

  defp font_awesome_replace(icon) do
    icon
    |> get_arg
    |> fa()
    |> safe_to_string
  end

  defp mbta_svg_icon_replace(icon, opts) do
    icon
    |> get_arg
    |> mbta_svg_icon(opts)
    |> safe_to_string
  end

  defp app_svg_badge_replace(badge) do
    badge
    |> get_arg
    |> app_svg_badge
    |> safe_to_string
  end

  defp get_arg(str) do
    str
    |> String.replace("\"", "")
    |> String.trim()
  end

  @spec mbta_svg_icon(String.t(), Keyword.t()) :: Phoenix.HTML.Safe.t()
  defp mbta_svg_icon("commuter-rail", opts),
    do: mbta_svg_icon_sized(:commuter_rail, icon_size(opts))

  defp mbta_svg_icon("subway", opts), do: mbta_svg_icon_sized(:subway, icon_size(opts))
  defp mbta_svg_icon("subway-red", opts), do: mbta_svg_icon_sized(:red_line, icon_size(opts))

  defp mbta_svg_icon("subway-mattapan", opts),
    do: mbta_svg_icon_sized(:mattapan_line, icon_size(opts))

  defp mbta_svg_icon("subway-orange", opts),
    do: mbta_svg_icon_sized(:orange_line, icon_size(opts))

  defp mbta_svg_icon("subway-blue", opts), do: mbta_svg_icon_sized(:blue_line, icon_size(opts))
  defp mbta_svg_icon("subway-green", opts), do: mbta_svg_icon_sized(:green_line, icon_size(opts))

  defp mbta_svg_icon("subway-green-b", opts),
    do: mbta_svg_icon_sized(:green_line_b, icon_size(opts))

  defp mbta_svg_icon("subway-green-c", opts),
    do: mbta_svg_icon_sized(:green_line_c, icon_size(opts))

  defp mbta_svg_icon("subway-green-d", opts),
    do: mbta_svg_icon_sized(:green_line_d, icon_size(opts))

  defp mbta_svg_icon("subway-green-e", opts),
    do: mbta_svg_icon_sized(:green_line_e, icon_size(opts))

  defp mbta_svg_icon("silver-line", opts), do: mbta_svg_icon_sized(:silver_line, icon_size(opts))
  defp mbta_svg_icon("bus", opts), do: mbta_svg_icon_sized(:bus, icon_size(opts))
  defp mbta_svg_icon("the-ride", opts), do: mbta_svg_icon_sized(:the_ride, icon_size(opts))
  defp mbta_svg_icon("ferry", opts), do: mbta_svg_icon_sized(:ferry, icon_size(opts))
  defp mbta_svg_icon("accessible", opts), do: mbta_svg_icon_sized(:access, icon_size(opts))
  defp mbta_svg_icon("parking", opts), do: mbta_svg_icon_sized(:parking_lot, icon_size(opts))
  defp mbta_svg_icon("t-logo", opts), do: mbta_svg_icon_sized(:t_logo, icon_size(opts))

  defp mbta_svg_icon("service-regular", opts),
    do: mbta_svg_icon_sized(:service_regular, icon_size(opts))

  defp mbta_svg_icon("service-storm", opts),
    do: mbta_svg_icon_sized(:service_storm, icon_size(opts))

  defp mbta_svg_icon("service-none", opts),
    do: mbta_svg_icon_sized(:service_none, icon_size(opts))

  defp mbta_svg_icon(unknown, _opts), do: raw(~s({{ unknown icon "#{unknown}" }}))

  @spec mbta_svg_icon_sized(atom, atom) :: Phoenix.HTML.Safe.t()
  defp mbta_svg_icon_sized(icon, size),
    do: svg_icon_with_circle(%SvgIconWithCircle{icon: icon, size: size})

  @spec icon_size(Keyword.t()) :: atom
  defp icon_size(opts),
    do: if(Keyword.get(opts, :use_small_icon?, false), do: :small, else: :default)

  defp app_svg_badge("apple"), do: svg("badge-apple-store.svg")
  defp app_svg_badge("google"), do: svg("badge-google-play.svg")
  defp app_svg_badge(unknown), do: raw(~s({{ unknown app badge "#{unknown}" }}))

  defp do_replacement({:ok, replacement}, _, _) do
    replacement
  end

  defp do_replacement({:error, {:invalid, token}}, type, input) do
    "{{ #{type}:" <> replacement_error(input, token) <> " }}"
  end

  defp do_replacement({:error, {_, details}}, type, input) do
    "{{ " <> replacement_error(details) <> " #{type}:#{input} }}"
  end

  defp replacement_error(text) do
    safe_to_string(content_tag(:span, text, class: "text-danger"))
  end

  defp replacement_error(text, target) do
    highlight = content_tag(:span, target, class: "text-danger")
    String.replace(text, target, safe_to_string(highlight))
  end
end
