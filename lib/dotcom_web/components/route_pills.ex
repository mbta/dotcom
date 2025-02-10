defmodule DotcomWeb.Components.RoutePills do
  @moduledoc """
  Reusable components for displaying subway routes.
  """

  use DotcomWeb, :component

  attr :route_id, :string, required: true
  attr :modifier_ids, :list, default: []
  attr :modifier_class, :string, default: ""

  def route_pill(%{modifier_ids: []} = assigns) do
    ~H"""
    <div class={
      [
        bg_color_class(@route_id),
        "w-[3.125rem]"
      ] ++ shared_icon_classes()
    }>
      {pill_text(@route_id)}
    </div>
    """
  end

  def route_pill(assigns) do
    ~H"""
    <span class="flex">
      <.route_pill route_id={@route_id} />
      <span :if={Enum.any?(@modifier_ids)} class="h-6 -ml-1 flex gap-0.5">
        <.route_modifier
          :for={modifier_id <- @modifier_ids}
          modifier_id={modifier_id}
          class={@modifier_class}
        />
      </span>
    </span>
    """
  end

  defp route_modifier(assigns) do
    ~H"""
    <div class={
      [bg_color_class(@modifier_id), "ring-2 ring-white w-6"] ++
        shared_icon_classes() ++
        [@class]
    }>
      {modifier_text(@modifier_id)}
    </div>
    """
  end

  defp pill_text(route_id) do
    (route_id |> String.at(0)) <> "L"
  end

  defp modifier_text("Green-" <> branch_id), do: branch_id
  defp modifier_text("Mattapan"), do: "M"

  defp bg_color_class("Green-" <> _), do: bg_color_class("Green")
  defp bg_color_class("Mattapan"), do: bg_color_class("Red")

  defp bg_color_class(route_id) do
    "bg-#{route_id |> String.downcase()}-line"
  end

  defp shared_icon_classes() do
    [
      "rounded-full h-6",
      "flex items-center justify-center",
      "text-white font-bold font-heading select-none leading-none"
    ]
  end
end
