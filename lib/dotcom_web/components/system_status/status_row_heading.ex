defmodule DotcomWeb.Components.SystemStatus.StatusRowHeading do
  @moduledoc """
  Renders a status as a readable version of that status, along with an
  optional prefix and a route pill for the given route ID's.
  """

  use DotcomWeb, :component

  import DotcomWeb.Components.RouteSymbols, only: [subway_route_pill: 1]
  import DotcomWeb.Components.SystemStatus.StatusLabel, only: [status_label: 1]
  import DotcomWeb.Components.SystemStatus.StatusIcon, only: [status_icon: 1]

  @affected_stops Application.compile_env!(:dotcom, :affected_stops_module)

  attr :alerts, :list, default: []
  attr :hide_route_pill, :boolean, default: false
  attr :plural, :boolean, default: false
  attr :prefix, :string, default: nil
  attr :route_ids, :list, required: true
  attr :status, :atom, required: true

  def status_row_heading(assigns) do
    %{subheading_text: subheading_text, plural: plural} =
      subheading_text(%{
        status: assigns.status,
        alerts: assigns.alerts,
        plural: assigns.plural,
        route_ids: assigns.route_ids
      })

    assigns =
      assigns
      |> assign(:subheading_text, subheading_text)
      |> assign(:plural, plural)

    ~H"""
    <div class="grid grid-cols-[min-content_min-content_auto] items-start grow">
      <.top_padding hide_route_pill={@hide_route_pill} />

      <.heading
        hide_route_pill={@hide_route_pill}
        plural={@plural}
        prefix={@prefix}
        route_ids={@route_ids}
        status={@status}
        subheading_text={@subheading_text}
      />

      <.bottom_padding hide_route_pill={@hide_route_pill} />
    </div>
    """
  end

  defp bottom_padding(assigns) do
    ~H"""
    <div class="h-3"></div>
    <div class="h-3"></div>
    <div class="h-3"></div>
    """
  end

  defp heading(assigns) do
    ~H"""
    <div class={["flex items-center pl-1 pr-2", @hide_route_pill && "opacity-0"]} data-route-pill>
      <.subway_route_pill class="group-hover/row:ring-brand-primary-lightest" route_ids={@route_ids} />
    </div>

    <div class="h-6 pr-2 flex items-center">
      <.status_icon status={@status} />
    </div>

    <div class="grow flex flex-wrap items-baseline gap-x-2">
      <.status_label status={@status} prefix={@prefix} plural={@plural} />
      <.subheading text={@subheading_text} />
    </div>
    """
  end

  defp subheading_text(%{status: :station_closure, alerts: alerts, route_ids: route_ids}) do
    affected_stops = @affected_stops.affected_stops(alerts, route_ids)

    %{
      plural: affected_stops |> Enum.count() > 1,
      subheading_text:
        affected_stops
        |> Enum.map(& &1.name)
        |> humanize_stop_names()
    }
  end

  defp subheading_text(%{plural: plural}), do: %{plural: plural, subheading_text: nil}

  defp humanize_stop_names([stop_name]), do: stop_name
  defp humanize_stop_names([stop_name1, stop_name2]), do: "#{stop_name1} & #{stop_name2}"

  defp humanize_stop_names([stop_name1, stop_name2, stop_name3]),
    do: "#{stop_name1}, #{stop_name2} & #{stop_name3}"

  defp humanize_stop_names(_stop_names), do: nil

  defp subheading(%{text: nil} = assigns), do: ~H""

  defp subheading(assigns) do
    ~H"""
    <div class="text-sm leading-[1.5rem]" data-test="status_subheading">
      {@text}
    </div>
    """
  end

  defp top_padding(assigns) do
    ~H"""
    <div class={["h-3", !@hide_route_pill && "border-t-xs border-gray-lightest"]}></div>
    <div class={["h-3", "border-t-xs border-gray-lightest"]}></div>
    <div class={["h-3", "border-t-xs border-gray-lightest"]}></div>
    """
  end
end
