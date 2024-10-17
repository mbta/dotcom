defmodule DotcomWeb.Components.ModeIcons do
  import DotcomWeb.Components.Badges
  import DotcomWeb.Components.Svg
  use Phoenix.Component

  attr :route_name, :string, required: true

  attr :type, :atom,
    values: [
      :subway,
      :commuter_rail,
      :bus,
      :ferry,
      :logan_express,
      :massport_shuttle,
      :orange_line,
      :red_line,
      :green_line,
      :blue_line,
      :mattapan_line
    ],
    required: true

  attr :class, :string, default: ""

  def mode_icon(%{type: :bus} = assigns) do
    ~H"""
    <.rect_icon class={"bg-yellow-500 #{@class}"}><%= @route_name %></.rect_icon>
    """
  end

  def mode_icon(%{type: :silver_line} = assigns) do
    ~H"""
    <.rect_icon class={"bg-silver-500 text-white #{@class}"}><%= @route_name %></.rect_icon>
    """
  end

  def mode_icon(%{type: :massport_shuttle} = assigns) do
    ~H"""
    <.circle_icon class={"bg-navy-500 text-md #{@class}"}><%= @route_name %></.circle_icon>
    """
  end

  # def mode_icon(%{route_name: route_name, type: :subway} = assigns) do
  #   %{color: color, text: text} =
  #     case route_name do
  #       "Blue" ->
  #         %{color: "bg-blue-500", text: "BL"}

  #       "Orange" ->
  #         %{color: "bg-orange-500", text: "OL"}

  #       "Red" ->
  #         %{color: "bg-red-500", text: "RL"}

  #       "B" ->
  #         %{color: "bg-green-500", text: "B"}

  #       "C" ->
  #         %{color: "bg-green-500", text: "C"}

  #       "D" ->
  #         %{color: "bg-green-500", text: "D"}

  #       "E" ->
  #         %{color: "bg-green-500", text: "E"}

  #       "Mattapan" ->
  #         %{color: "bg-red-500", text: "M"}

  #       _ ->
  #         %{color: "bg-silver-500", text: "?"}
  #     end

  #   assigns =
  #     assigns
  #     |> assign(:color, color)
  #     |> assign(:text, text)

  #   ~H"""
  #   <.circle_icon class={[@color, @class]}>
  #     <%= @text %>
  #   </.circle_icon>
  #   """
  # end

  def mode_icon(%{type: :blue_line} = assigns) do
    ~H"""
    <.subway_icon class={"bg-blue-500 #{@class}"}>BL</.subway_icon>
    """
  end

  def mode_icon(%{type: :green_line_b} = assigns) do
    ~H"""
    <.subway_icon class={"bg-green-500 #{@class}"}>B</.subway_icon>
    """
  end

  def mode_icon(%{type: :green_line_c} = assigns) do
    ~H"""
    <.subway_icon class={"bg-green-500 #{@class}"}>C</.subway_icon>
    """
  end

  def mode_icon(%{type: :green_line_d} = assigns) do
    ~H"""
    <.subway_icon class={"bg-green-500 #{@class}"}>D</.subway_icon>
    """
  end

  def mode_icon(%{type: :green_line_e} = assigns) do
    ~H"""
    <.subway_icon class={"bg-green-500 #{@class}"}>E</.subway_icon>
    """
  end

  def mode_icon(%{type: :orange_line} = assigns) do
    ~H"""
    <.subway_icon class={"bg-orange-500 #{@class}"}>OL</.subway_icon>
    """
  end

  def mode_icon(%{type: :red_line} = assigns) do
    ~H"""
    <.subway_icon class={"bg-red-500 #{@class}"}>RL</.subway_icon>
    """
  end

  def mode_icon(%{route_name: "BB", type: :logan_express} = assigns) do
    ~H"""
    <.logan_express_bb_icon class={"h-6 w-6 #{@class}"} />
    """
  end

  def mode_icon(assigns) do
    ~H"""
    <.subway_icon class={"bg-silver-500 #{@class}"}>?</.subway_icon>
    <pre><%= @type %></pre>
    """
  end

  attr :class, :string, default: ""
  slot :inner_block

  defp subway_icon(assigns) do
    ~H"""
    <.circle_icon class={"text-sm #{@class}"}><%= render_slot(@inner_block) %></.circle_icon>
    """
  end
end
