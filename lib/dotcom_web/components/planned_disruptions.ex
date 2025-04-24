defmodule DotcomWeb.Components.PlannedDisruptions do
  @moduledoc """
  Function components for rendering planned disruptions.
  """

  use DotcomWeb, :component

  import Dotcom.Routes, only: [line_name_for_subway_route: 1, subway_line_ids: 0]
  import Dotcom.Utils.ServiceDateTime, only: [service_date: 1, service_range_string: 1]
  import DotcomWeb.Components, only: [bordered_container: 1, lined_list: 1, unstyled_accordion: 1]
  import DotcomWeb.Components.Alerts, only: [embedded_alert: 1]
  import DotcomWeb.Components.RouteSymbols, only: [subway_route_pill: 1]
  import DotcomWeb.Components.SystemStatus.StatusLabel, only: [status_label: 1]
  import DotcomWeb.Components.SystemStatus.StatusRowHeading, only: [status_row_heading: 1]

  alias Alerts.Alert

  @date_time_module Application.compile_env!(:dotcom, :date_time_module)

  attr :disruptions, :map, required: true

  @doc """
  Planned disruptions organized into service ranges.
  """
  def disruptions(assigns) do
    ordered_disruptions =
      [:this_week, :next_week, :after_next_week]
      |> Enum.map(fn service_range ->
        {service_range, Map.get(assigns.disruptions, service_range, [])}
      end)
      |> Enum.reject(fn {_, disruptions} ->
        disruptions == []
      end)

    assigns = assign(assigns, :ordered_disruptions, ordered_disruptions)

    ~H"""
    <.bordered_container>
      <:heading>Planned Work</:heading>
      <%= if Enum.empty?(@ordered_disruptions) do %>
        There is no planned work information at this time.
      <% else %>
        <div :for={{service_range, disruptions} <- @ordered_disruptions} class="py-3">
          <div class="mb-2 font-bold font-heading">{service_range_string(service_range)}</div>
          <.lined_list :let={disruption} items={disruptions}>
            <.disruption alert={disruption} />
          </.lined_list>
        </div>
      <% end %>
    </.bordered_container>
    """
  end

  # A single disruption rendered as an accordion with a header and the alert as the content.
  # If the alert affects multiple subway lines, show an accordion for each line
  defp disruption(assigns) do
    route_ids_by_subway_line =
      alert_route_ids(assigns.alert)
      |> Enum.chunk_by(&line_name_for_subway_route/1)
      |> Enum.sort_by(fn [route_id | _] ->
        Enum.find_index(subway_line_ids(), &(&1 == line_name_for_subway_route(route_id)))
      end)

    assigns = assign(assigns, :route_ids_by_subway_line, route_ids_by_subway_line)

    ~H"""
    <.unstyled_accordion
      :for={route_ids <- @route_ids_by_subway_line}
      summary_class="flex items-center hover:bg-brand-primary-lightest cursor-pointer group/row"
      chevron_class="fill-gray-dark px-2 py-3"
    >
      <:heading>
        <.heading route_ids={route_ids} alert={@alert} />
      </:heading>
      <:content>
        <.embedded_alert alert={@alert} />
      </:content>
    </.unstyled_accordion>
    """
  end

  # The heading for a disruption alert, including the route pill and status label (and active period).
  defp heading(assigns) do
    time_range_str =
      assigns.alert
      |> alert_date_range()
      |> formatted_date_range()

    assigns = assign(assigns, time_range_str: time_range_str)

    ~H"""
    <.status_row_heading route_ids={@route_ids} status={@alert.effect} prefix={@time_range_str} />
    """
  end

  defp formatted_date_range({nil, nil}), do: nil
  defp formatted_date_range({nil, stop}), do: "Until #{format_date(stop)}"
  defp formatted_date_range({start, nil}), do: "#{format_date(start)} until further notice"
  defp formatted_date_range({start, stop}) when start == stop, do: "#{format_date(start)}"
  defp formatted_date_range({start, stop}), do: "#{format_date(start)} – #{format_date(stop)}"

  # Extracts the start and stop times from the active periods of an alert.
  # We do this by sorting the active periods by start time then taking the start of the first and the stop of the last.
  defp alert_date_range(%Alert{active_period: active_period}) do
    sorted_active_periods =
      Enum.sort_by(
        active_period,
        fn {start, _} -> start end,
        DateTime
      )

    {start, _} = List.first(sorted_active_periods)
    {_, stop} = List.last(sorted_active_periods)

    {service_date_for_display(start), service_date_for_display(stop)}
  end

  defp service_date_for_display(nil), do: nil
  defp service_date_for_display(datetime), do: service_date(datetime)

  # Extracts the route ids of lines and branches from the alert.
  defp alert_route_ids(%Alert{informed_entity: %{entities: entities}}) do
    Enum.map(entities, & &1.route)
    |> Enum.uniq()
    |> Enum.sort()
  end

  # Formats the date for display in the heading.
  # If the service date is on or before today, we display "Today".
  # Otherwise, we display the date like "Mon Jan 1".
  defp format_date(service_date_datetime) do
    service_date_today = @date_time_module.now() |> service_date()

    if Timex.after?(service_date_datetime, service_date_today) do
      service_date_datetime |> Timex.format!("%a, %b %-d", :strftime)
    else
      "Today"
    end
  end
end
