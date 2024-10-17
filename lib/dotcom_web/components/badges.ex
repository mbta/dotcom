defmodule DotcomWeb.Components.Badges do
  use Phoenix.Component

  attr :class, :string, default: ""
  slot :inner_block

  def circle_icon(assigns) do
    ~H"""
    <span class={[
      "select-none",
      "h-6",
      "w-6",
      "rounded-full",
      "font-bold",
      "text-white",
      "flex",
      "justify-center",
      "items-center",
      @class
    ]}>
      <%= render_slot(@inner_block) %>
    </span>
    """
  end

  attr :class, :string, default: ""
  slot :inner_block

  def rect_icon(assigns) do
    ~H"""
    <span class={["select-none h-6 text-center text-base px-2 font-bold rounded-md", @class]}>
      <%= render_slot(@inner_block) %>
    </span>
    """
  end
end
