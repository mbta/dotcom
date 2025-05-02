defmodule DotcomWeb.Components.SystemStatus.StatusRowHeading do
  @moduledoc """
  Renders a status as a readable version of that status, along with an
  optional prefix and a route pill for the given route ID's.
  """

  use DotcomWeb, :component

  import DotcomWeb.Components.RouteSymbols, only: [subway_route_pill: 1]
  import DotcomWeb.Components.SystemStatus.StatusLabel, only: [status_label: 1]

  attr :hide_route_pill, :boolean, default: false
  attr :plural, :boolean, default: false
  attr :prefix, :string, default: nil
  attr :route_ids, :list, required: true
  attr :status, :atom, required: true

  def status_row_heading(assigns) do
    ~H"""
    <div class="flex grow">
      <div
        class={[
          "px-2 py-3",
          "flex items-center",
          @hide_route_pill && "opacity-0",
          !@hide_route_pill && "border-t-[1px] border-gray-lightest"
        ]}
        data-route-pill
      >
        <.subway_route_pill
          class="group-hover/row:ring-brand-primary-lightest"
          route_ids={@route_ids}
        />
      </div>
      <div class={[
        "py-3 grow border-t-[1px] border-gray-lightest"
      ]}>
        <.status_label status={@status} prefix={@prefix} plural={@plural} />
      </div>
    </div>
    """
  end
end
