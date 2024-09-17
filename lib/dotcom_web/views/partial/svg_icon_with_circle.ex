defmodule DotcomWeb.PartialView.SvgIconWithCircle do
  alias Dotcom.Components.Icons.SvgIcon
  alias DotcomWeb.ViewHelpers
  alias PhoenixHTMLHelpers.Tag
  alias Routes.Route

  defstruct icon: nil,
            size: :default,
            show_tooltip?: true,
            aria_hidden?: false

  @type t :: %__MODULE__{
          icon: SvgIcon.icon_arg(),
          size: :small | :default,
          show_tooltip?: boolean,
          aria_hidden?: boolean
        }

  @spec svg_icon_with_circle(t()) :: Phoenix.HTML.Safe.t()
  def svg_icon_with_circle(%__MODULE__{icon: %Route{}} = args) do
    args.icon
    |> ViewHelpers.line_icon(args.size)
    |> do_svg_icon_with_circle(args)
  end

  def svg_icon_with_circle(%__MODULE__{icon: :mattapan_trolley} = args) do
    svg_icon_with_circle(%{args | icon: %Route{id: "Mattapan", type: 0}})
  end

  def svg_icon_with_circle(%__MODULE__{icon: line} = args)
      when line in [:red_line, :orange_line, :blue_line, :green_line, :mattapan_line] do
    route_id =
      line
      |> Atom.to_string()
      |> String.replace("_line", "")
      |> String.capitalize()

    [type] = Route.types_for_mode(line)

    svg_icon_with_circle(%{args | icon: %Route{id: route_id, type: type}})
  end

  def svg_icon_with_circle(%__MODULE__{icon: branch} = args)
      when branch in [:green_line_b, :green_line_c, :green_line_d, :green_line_e] do
    "green_line_" <> letter = Atom.to_string(branch)
    svg_icon_with_circle(%{args | icon: %Route{id: "Green-" <> String.upcase(letter), type: 0}})
  end

  def svg_icon_with_circle(%__MODULE__{icon: mode} = args)
      when mode in [:subway, :bus, :logan_express, :massport_shuttle, :commuter_rail, :ferry] do
    mode
    |> ViewHelpers.mode_icon(args.size)
    |> do_svg_icon_with_circle(args)
  end

  def svg_icon_with_circle(%__MODULE__{icon: :parking_lot} = args) do
    ViewHelpers.fa("square-parking")
    |> do_svg_icon_with_circle(args)
  end

  def svg_icon_with_circle(%__MODULE__{icon: icon, size: size} = args)
      when icon in [
             :calendar,
             :stop,
             :station,
             :access,
             :no_access,
             :silver_line,
             :the_ride,
             :reversal,
             :variant,
             :t_logo,
             :service_regular,
             :service_storm,
             :service_none
           ] do
    "icon-#{icon_name(icon)}-#{size}.svg"
    |> ViewHelpers.svg()
    |> do_svg_icon_with_circle(args)
  end

  @spec do_svg_icon_with_circle(Phoenix.HTML.Safe.t(), __MODULE__.t()) :: Phoenix.HTML.Safe.t()
  defp do_svg_icon_with_circle({:safe, _} = icon, %__MODULE__{
         aria_hidden?: false,
         show_tooltip?: false
       }) do
    icon
  end

  defp do_svg_icon_with_circle({:safe, _} = icon, %__MODULE__{} = args) do
    attrs = [
      aria: aria_attrs(args),
      data: data_attrs(args),
      title: title_attr(args)
    ]

    Tag.content_tag(:span, [icon], attrs)
  end

  defp icon_name(:access), do: "accessible"
  defp icon_name(:no_access), do: "not-accessible"
  defp icon_name(:the_ride), do: "the-ride"
  defp icon_name(:station), do: "circle-t"
  defp icon_name(:t_logo), do: "circle-t"
  defp icon_name(:silver_line), do: "silver-line"
  defp icon_name(:service_regular), do: "service-regular"
  defp icon_name(:service_storm), do: "service-storm"
  defp icon_name(:service_none), do: "service-none"
  defp icon_name(icon), do: Atom.to_string(icon)

  @spec aria_attrs(__MODULE__.t()) :: Keyword.t()
  defp aria_attrs(%__MODULE__{aria_hidden?: true}), do: [hidden: true]
  defp aria_attrs(%__MODULE__{}), do: []

  @spec data_attrs(__MODULE__.t()) :: Keyword.t()
  defp data_attrs(%__MODULE__{show_tooltip?: true}), do: [toggle: "tooltip"]
  defp data_attrs(%__MODULE__{}), do: []

  @spec title_attr(__MODULE__.t()) :: String.t() | nil
  defp title_attr(%__MODULE__{show_tooltip?: true, icon: icon}), do: title(icon)
  defp title_attr(%__MODULE__{}), do: nil

  def circle_viewbox(:twitter), do: "0 0 400 400"
  def circle_viewbox(:facebook), do: "0 0 75 75"
  def circle_viewbox(_icon), do: "0 0 42 42"

  def translate(:globe), do: "6,6"
  def translate(:suitcase), do: "9,11"
  def translate(:map), do: "8,9"
  def translate(:fare_ticket), do: "3,13"
  def translate(:access), do: "9,7"
  def translate(:twitter), do: "5,10"
  def translate(:facebook), do: "8,8"
  def translate(:nineoneone), do: "9,9"
  def translate(:phone), do: "12,9"
  def translate(:calendar), do: "6,5"
  def translate(:direction), do: "6,5"
  def translate(:variation), do: "12,11"
  def translate(:station), do: "4,4"
  def translate(:stop), do: "4,4"
  def translate(icon) when icon in [:tools, :alert], do: "9,9"

  def translate(icon) do
    cond do
      icon in SvgIcon.mode_icons() -> "10,10"
      icon in SvgIcon.transit_type_icons() -> "4,4"
      true -> "5,5"
    end
  end

  def scale(:nineoneone), do: ".25"
  def scale(:fare_ticket), do: "1.6"
  def scale(:direction), do: "1.25"
  def scale(:variation), do: "1.25"
  def scale(:calendar), do: "1.25"
  def scale(:station), do: "0.7"
  def scale(:stop), do: "0.7"

  def scale(icon) do
    cond do
      icon in SvgIcon.mode_icons() -> "1.4"
      icon in SvgIcon.transit_type_icons() -> "0.7"
      true -> "1"
    end
  end

  def rotate(:fare_ticket), do: "rotate(-15)"
  def rotate(_), do: ""

  def circle_args(:twitter), do: "r=200 cx=200 cy=200"
  def circle_args(:facebook), do: "r=37 cx=37 cy=37"
  def circle_args(_icon), do: "r=20 cx=20 cy=20"

  def title(:access) do
    "Accessible"
  end

  def title(:parking_lot) do
    "Parking"
  end

  def title(:service_regular) do
    "Service: Regular"
  end

  def title(:service_storm) do
    "Service: Storm"
  end

  def title(:service_none) do
    "Service: None"
  end

  def title(icon)
      when icon in [
             :bus,
             :subway,
             :ferry,
             :commuter_rail,
             :the_ride,
             :orange_line,
             :green_line,
             :red_line,
             :blue_line,
             :mattapan_trolley,
             :mattapan_line,
             :silver_line
           ] do
    DotcomWeb.ViewHelpers.mode_name(icon)
  end

  def title(%Routes.Route{id: "Orange"}), do: DotcomWeb.ViewHelpers.mode_name(:orange_line)
  def title(%Routes.Route{id: "Red"}), do: DotcomWeb.ViewHelpers.mode_name(:red_line)
  def title(%Routes.Route{id: "Blue"}), do: DotcomWeb.ViewHelpers.mode_name(:blue_line)
  def title(%Routes.Route{id: "Mattapan"}), do: DotcomWeb.ViewHelpers.mode_name(:mattapan_line)
  def title(%Routes.Route{id: "Green"}), do: DotcomWeb.ViewHelpers.mode_name(:green_line)

  def title(%Routes.Route{id: "Green-" <> branch}),
    do: DotcomWeb.ViewHelpers.mode_name(:green_line) <> " #{branch}"

  def title(%Routes.Route{external_agency_name: "Massport", long_name: name}), do: name
  def title(%Routes.Route{external_agency_name: "Logan Express", long_name: name}), do: name
  def title(%Routes.Route{type: type}), do: DotcomWeb.ViewHelpers.mode_name(type)
  def title(_icon), do: ""
end
