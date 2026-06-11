defmodule DotcomWeb.Components.SystemStatus.CommuterRailInfoWidget do
  @moduledoc """
  A template for a card containing rows of information
  """

  use DotcomWeb, :component

  import DotcomWeb.Components, only: [bordered_container: 1]

  attr :heading_text, :string, required: true
  slot :inner_block, required: true
  slot :postscript, required: false

  def commuter_rail_info_widget(assigns) do
    ~H"""
    <.bordered_container hide_divider>
      <h2 class="font-heading font-bold text-[1.75rem] leading-normal" style="margin-top: inherit">
        {@heading_text}
      </h2>
      <div class="border-b-xs border-gray-lightest mt-4">
        {render_slot(@inner_block)}
      </div>
      {render_slot(@postscript)}
    </.bordered_container>
    """
  end

  slot :inner_block

  def row(assigns) do
    ~H"""
    <div class="border-t-xs border-gray-lightest py-3 px-1">
      {render_slot(@inner_block)}
    </div>
    """
  end
end
