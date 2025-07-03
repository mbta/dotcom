defmodule DotcomWeb.Components.SystemStatus.StatusRowHeading do
  @moduledoc """
  Renders a status as a readable version of that status, along with an
  optional prefix and a route pill for the given route ID's.
  """

  use DotcomWeb, :component

  import DotcomWeb.Components.RouteSymbols, only: [subway_route_pill: 1]
  import DotcomWeb.Components.SystemStatus.StatusLabel, only: [status_label: 1]

  alias Alerts.Alert

  @affected_stops Application.compile_env!(:dotcom, :affected_stops_module)
  @endpoint_stops Application.compile_env!(:dotcom, :endpoint_stops_module)

  attr :alerts, :list, default: []
  attr :hide_route_pill, :boolean, default: false
  attr :plural, :boolean, default: false
  attr :prefix, :string, default: nil
  attr :route_ids, :list, required: true
  attr :status, :atom, required: true

  def status_row_heading(assigns) do
    %{
      plural: plural,
      subheading_aria_label: subheading_aria_label,
      subheading_text: subheading_text
    } =
      decorations(assigns)
      |> Enum.into(%{
        plural: assigns.plural,
        subheading_aria_label: nil,
        subheading_text: nil
      })

    assigns =
      assigns
      |> assign(:plural, plural)
      |> assign(:subheading_aria_label, subheading_aria_label)
      |> assign(:subheading_text, subheading_text)

    ~H"""
    <div class="grid grid-cols-[min-content_auto] items-start grow">
      <.top_padding hide_route_pill={@hide_route_pill} />

      <.heading
        hide_route_pill={@hide_route_pill}
        plural={@plural}
        prefix={@prefix}
        route_ids={@route_ids}
        status={@status}
        subheading_text={@subheading_text}
        subheading_aria_label={@subheading_aria_label}
      />

      <.bottom_padding hide_route_pill={@hide_route_pill} />
    </div>
    """
  end

  defp bottom_padding(assigns) do
    ~H"""
    <div class="h-3"></div>
    <div class="h-3"></div>
    """
  end

  defp heading(assigns) do
    rendered_prefix =
      case assigns.prefix do
        nil -> ""
        prefix -> "#{prefix}: "
      end

    assigns = assigns |> assign(:rendered_prefix, rendered_prefix)

    ~H"""
    <div class={["flex items-center pl-1 pr-2", @hide_route_pill && "opacity-0"]} data-route-pill>
      <.subway_route_pill class="group-hover/row:ring-brand-primary-lightest" route_ids={@route_ids} />
    </div>

    <.status_label
      description={"#{@rendered_prefix}#{description(@status, @prefix, @plural)}"}
      status={@status}
      subheading_aria_label={@subheading_aria_label}
      subheading_text={@subheading_text}
    />
    """
  end

  defp decorations(%{status: :station_closure, alerts: alerts, route_ids: route_ids}) do
    affected_stops = @affected_stops.affected_stops(alerts, route_ids)

    %{
      plural: affected_stops |> Enum.count() > 1,
      subheading_text:
        affected_stops
        |> Enum.map(& &1.name)
        |> humanize_stop_names()
    }
  end

  defp decorations(%{status: :delay, alerts: [%Alert{cause: :single_tracking}]}) do
    %{
      subheading_text: "Due to Single Tracking"
    }
  end

  defp decorations(%{status: status, alerts: alerts, route_ids: route_ids})
       when status in [:service_change, :shuttle, :single_tracking, :suspension] do
    endpoints = @endpoint_stops.endpoint_stops(alerts, route_ids)

    %{
      subheading_text: endpoints |> humanize_endpoint_list(),
      subheading_aria_label: endpoints |> humanize_endpoint_list_a11y()
    }
  end

  defp decorations(%{plural: plural}), do: %{plural: plural, subheading_text: nil}

  defp description(status, prefix, true), do: description(status, prefix) |> Inflex.pluralize()
  defp description(status, prefix, false), do: description(status, prefix)

  defp description(:normal, _), do: "Normal Service"
  defp description(:see_alerts, _), do: "See Alerts"

  # Special case for delays - when displayed with a future date, say 
  # "Expect Delay" (or Expect Delays) rather than simply "Delay". A
  # prefix of "Now" should still display as "Delay", rather than
  # "Expect Delay".
  defp description(:delay, "Now"), do: "Delay"
  defp description(:delay, prefix) when is_binary(prefix), do: "Expect Delay"
  defp description(:shuttle, _), do: "Shuttles"
  defp description(status, _), do: Alert.human_effect(%Alert{effect: status})

  defp humanize_endpoint_list([{%Stops.Stop{id: id1} = stop, %Stops.Stop{id: id2}}])
       when id1 == id2 do
    "#{humanize_endpoint_name(stop)}"
  end

  defp humanize_endpoint_list([{first, last}]) do
    "#{humanize_endpoint_name(first)} \u2194 #{humanize_endpoint_name(last)}"
  end

  defp humanize_endpoint_list(_list), do: nil

  defp humanize_endpoint_list_a11y([{%Stops.Stop{id: id1} = stop, %Stops.Stop{id: id2}}])
       when id1 == id2 do
    "#{humanize_endpoint_name(stop)}"
  end

  defp humanize_endpoint_list_a11y([{first, last}]) do
    "between #{humanize_endpoint_name(first)} and #{humanize_endpoint_name(last)}"
  end

  defp humanize_endpoint_list_a11y(_list), do: nil

  defp humanize_endpoint_name(%Stops.Stop{name: name}), do: name
  defp humanize_endpoint_name(label) when is_binary(label), do: label

  defp humanize_stop_names([]), do: nil
  defp humanize_stop_names([stop_name]), do: stop_name
  defp humanize_stop_names([stop_name1, stop_name2]), do: "#{stop_name1} & #{stop_name2}"

  defp humanize_stop_names([stop_name1, stop_name2, stop_name3]),
    do: "#{stop_name1}, #{stop_name2} & #{stop_name3}"

  defp humanize_stop_names(stop_names), do: "#{Enum.count(stop_names)} Stops"

  defp top_padding(assigns) do
    ~H"""
    <div class={["h-3", !@hide_route_pill && "border-t-xs border-gray-lightest"]}></div>
    <div class={["h-3", "border-t-xs border-gray-lightest"]}></div>
    """
  end
end
