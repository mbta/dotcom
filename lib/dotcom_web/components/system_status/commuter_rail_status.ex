defmodule DotcomWeb.Components.SystemStatus.CommuterRailStatus do
  @moduledoc """
  TODO
  """

  use DotcomWeb, :component

  import DotcomWeb.Components, only: [bordered_container: 1]

  def alerts_commuter_rail_status(assigns) do
    ~H"""
    <.bordered_container hide_divider>
      <:heading>
        <div class="px-2 mb-sm">
          Current Status
        </div>
      </:heading>
    </.bordered_container>
    """
  end
end
