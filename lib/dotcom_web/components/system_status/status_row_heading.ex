defmodule DotcomWeb.Components.SystemStatus.StatusRowHeading do
  @moduledoc """
  Renders a status as a readable version of that status, along with an
  optional prefix and a route pill for the given route ID's.
  """

  use DotcomWeb, :component

  import DotcomWeb.Components.RouteSymbols, only: [subway_route_pill: 1]
  import DotcomWeb.Components.SystemStatus.StatusLabel, only: [status_label: 1]
  import DotcomWeb.Components.SystemStatus.StatusIcon, only: [status_icon: 1]

  attr :hide_route_pill, :boolean, default: false
  attr :plural, :boolean, default: false
  attr :prefix, :string, default: nil
  attr :route_ids, :list, required: true
  attr :status, :atom, required: true

  def status_row_heading(assigns) do
    ~H"""
    <div class="grid items-center grid-cols-[min-content_min-content_auto] items-stretch grow">
      <div
        class={[
          "flex items-center py-3 pl-1 pr-2",
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
        "pr-2",
        "flex items-center",
        "border-t-[1px] border-gray-lightest"
      ]}>
        <.status_icon status={@status} />
      </div>
      <div class={[
        "grow border-t-[1px] border-gray-lightest flex items-center"
      ]}>
        <.status_label status={@status} prefix={@prefix} plural={@plural} />
      </div>
    </div>
    """
  end
end
