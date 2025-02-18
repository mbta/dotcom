defmodule DotcomWeb.Components.PlannedDisruptions do
  @moduledoc """
  Function components for rendering planned disruptions.
  """

  use DotcomWeb, :component

  import DotcomWeb.Components, only: [bordered_container: 1, lined_list: 1, unstyled_accordion: 1]
  import DotcomWeb.Components.Alerts, only: [embedded_alert: 1]
  import DotcomWeb.Components.RoutePills, only: [route_pill: 1]
  import DotcomWeb.Components.SystemStatus.StatusLabel, only: [status_label: 1]

  alias Alerts.Alert
  alias Dotcom.Routes

  attr :disruptions, :map, required: true

  @doc """
  Planned disruptions organized into service ranges.
  """
  def disruptions(assigns) do
    ~H"""
    <.bordered_container>
      <:heading>Planned Work</:heading>
      <div :for={{service_range, alerts} <- @disruptions} class="py-3">
        <div class="mb-2 font-bold font-heading">{service_range_string(service_range)}</div>
        <.lined_list :let={alert} items={alerts}>
          <.disruption alert={alert} />
        </.lined_list>
      </div>
    </.bordered_container>
    """
  end

  # A single disruption rendered as an accordion with a header and the alert as the content.
  defp disruption(assigns) do
    ~H"""
    <.unstyled_accordion
      summary_class="hover:bg-gray-lightest focus:bg-gray-lightest flex items-center w-full gap-x-3.5 py-3"
      chevron_class="ml-auto mr-2 w-3 h-3"
    >
      <:heading>
        <.heading alert={@alert} />
      </:heading>
      <:content>
        <.embedded_alert alert={@alert} />
      </:content>
    </.unstyled_accordion>
    """
  end

  # The heading for a disruption alert, including the route pill and status label (and active period).
  defp heading(assigns) do
    lines = alert_lines(assigns.alert)

    {start, stop} = alert_date_time_range(assigns.alert)
    time_range_str = "#{format_date(start)} - #{format_date(stop)}"

    assigns = assign(assigns, lines: lines, time_range_str: time_range_str)

    ~H"""
    <.route_pill route_id={@lines.route_id} modifier_ids={@lines.modifier_ids} />
    <.status_label status={@alert.effect} prefix={@time_range_str} />
    """
  end

  # Extracts the start and stop times from the active period of an alert.
  defp alert_date_time_range(%Alert{active_period: active_period}) do
    periods = Enum.sort_by(active_period, fn {start, _} -> start end)

    {start, _} = List.first(periods)
    {_, stop} = List.last(periods)

    {start, stop}
  end

  # Extracts the subway lines from the alert's informed entity.
  defp alert_lines(%Alert{informed_entity: %{entities: entities}}) do
    Enum.map(entities, & &1.route)
    |> Enum.uniq()
    |> Enum.sort()
    |> Enum.reduce(%{modifier_ids: [], route_id: nil}, fn route, acc ->
      if route in Routes.subway_lines() do
        Map.put(acc, :route_id, route)
      else
        Map.update(acc, :modifier_ids, [], &(&1 ++ [route]))
      end
    end)
  end

  # Formats the date for display in the heading.
  # E.g., "Mon Jan 01"
  defp format_date(datetime) do
    datetime |> Util.service_date() |> Timex.format!("%a %b %d", :strftime)
  end

  # Converts a service range atom to a title-cased string.
  defp service_range_string(service_range) do
    service_range
    |> Atom.to_string()
    |> Recase.to_title()
  end
end
