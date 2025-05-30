defmodule DotcomWeb.Components.SystemStatus.CommuterRailStatus do
  @moduledoc """
  Component displaying the status of the commuter rail system.
  """

  use DotcomWeb, :component

  import DotcomWeb.Components, only: [bordered_container: 1]
  import DotcomWeb.Components.SystemStatus.StatusIcon, only: [status_icon: 1]

  attr :commuter_rail_status, :map

  @doc """
  Shows the status of the commuter rail system as a table of rows where each row represents a line.
  Multiple rows may be shown for a line if there are multiple alerts.
  But, it depends on the types of alerts.
  """
  def alerts_commuter_rail_status(assigns) do
    status_for_line =
      assigns
      |> Map.get(:commuter_rail_status)
      |> Enum.map(fn {id, row} ->
        row
        |> Map.put(:id, id)
        |> attach_url()
      end)
      |> Enum.sort_by(& &1.sort_order)

    assigns = Map.put(assigns, :status_for_line, status_for_line)

    ~H"""
    <.bordered_container hide_divider>
      <:heading>
        <div class="mb-sm">
          Current Status
        </div>
      </:heading>
      <div class="border-b-xs border-gray-lightest">
        <.rows_for_line :for={status <- @status_for_line} status={status} />
      </div>
    </.bordered_container>
    """
  end

  # Attaches a URL to the row based on the number of alerts.
  # If there are no alerts, the URL will be for the timetable.
  # If there are alerts, the URL will be for the alerts page.
  defp attach_url(%{alert_counts: alert_counts, id: id} = row) when alert_counts == %{} do
    row
    |> Map.put(:url, ~p"/schedules/#{id}/timetable")
  end

  defp attach_url(%{id: id} = row) do
    row
    |> Map.put(:url, ~p"/schedules/#{id}/alerts")
  end

  # Returns a list of tuples where the first element is the effect of the alert
  # and the second element is a string describing the number of alerts.
  # For example, if there are 2 delays and 1 cancellation,
  # the list would be `[{:alert, "2 Delays"}, {:alert, "1 Cancellation"}]`.
  # If there are no alerts, the list will be empty.
  # We use the `:alert` atom to represent a generic effect.
  defp combine_alert_counts(alert_counts) when alert_counts == %{}, do: []

  # We have at least one cancellation and one delay.
  defp combine_alert_counts(%{delay: delays, cancellation: cancellations} = alert_counts) do
    other_alert_counts =
      reject_cancellations_and_delays(alert_counts)

    combine_alert_counts(other_alert_counts) ++
      [{:alert, "#{cancellations + delays} Cancellations / Delays"}]
  end

  # We have at least one cancellation and no delays.
  defp combine_alert_counts(%{cancellation: cancellations} = alert_counts) do
    other_alert_counts = reject_cancellations_and_delays(alert_counts)
    effect_string = if cancellations == 1, do: "Cancellation", else: "Cancellations"

    combine_alert_counts(other_alert_counts) ++ [{:alert, "#{cancellations} #{effect_string}"}]
  end

  # We have at least one delay and no cancellations.
  defp combine_alert_counts(%{delay: delays} = alert_counts) do
    other_alert_counts = reject_cancellations_and_delays(alert_counts)
    effect_string = if delays == 1, do: "Delay", else: "Delays"

    combine_alert_counts(other_alert_counts) ++ [{:alert, "#{delays} #{effect_string}"}]
  end

  # The default case where we have non-cancellation and non-delay alerts.
  # If there is one alert, we say "1 ...".
  # If there are multiple alerts, but of only one type, we say "X ...".
  # If there are multiple types of alerts, we combine them to just say "X Service Alerts".
  defp combine_alert_counts(alert_counts) do
    effect_count = alert_counts |> Map.keys() |> Enum.count()
    total_count = Enum.reduce(alert_counts, 0, fn {_, count}, acc -> acc + count end)

    case {effect_count, total_count} do
      {0, _} ->
        []

      {1, 1} ->
        effect = alert_counts |> Map.keys() |> List.first()
        effect_string = effect |> Atom.to_string() |> Recase.to_title()

        [{effect, "1 #{effect_string}"}]

      {1, _} ->
        effect = alert_counts |> Map.keys() |> List.first()
        effect_string = effect |> Atom.to_string() |> Recase.to_title() |> Inflex.pluralize()
        count = alert_counts[effect]

        [{effect, "#{count} #{effect_string}"}]

      _ ->
        [{:alert, "#{total_count} Service Alerts"}]
    end
  end

  # Rejects cancellations and delays from the alert counts
  # so that we can separate cancellations and delays from other alerts.
  defp reject_cancellations_and_delays(alert_counts) when alert_counts == %{}, do: %{}

  defp reject_cancellations_and_delays(alert_counts) do
    alert_counts
    |> Enum.reject(fn {effect, _} -> Enum.member?(~w(cancellation delay)a, effect) end)
    |> Map.new()
  end

  # A row that indicates that the service is not running today.
  # This trumps any other status.
  defp rows_for_line(%{status: %{service_today?: false}} = assigns) do
    ~H"""
    <.row
      label="No Scheduled Service"
      row_name={row_name(@status)}
      status={:no_scheduled_service}
      url={@status.url}
    />
    """
  end

  # The 'normal' case where there are no alerts.
  # We show a row indicating "Normal Service".
  defp rows_for_line(%{status: %{alert_counts: alert_counts}} = assigns)
       when alert_counts == %{} do
    ~H"""
    <.row label="Normal Service" row_name={row_name(@status)} status={:normal} url={@status.url} />
    """
  end

  # For cases where we have alerts, we have to show the first alert along with route information
  # and then show subsequent rows without the route information.
  defp rows_for_line(assigns) do
    ~H"""
    <.row
      :for={
        {{status, label}, index} <-
          @status.alert_counts |> combine_alert_counts() |> Enum.with_index()
      }
      disrupted
      label={label}
      row_name={if index == 0, do: row_name(@status)}
      status={status}
      url={@status.url}
    />
    """
  end

  attr :disrupted, :boolean, default: false
  attr :label, :string, required: true
  attr :status, :atom, required: true
  attr :row_name, :any, required: true
  attr :url, :string, required: true

  defp row(assigns) do
    ~H"""
    <a
      class={[
        "flex items-stretch",
        "hover:bg-brand-primary-lightest cursor-pointer group/row",
        "text-black no-underline font-normal",
        "min-h-12"
      ]}
      href={@url}
      data-test="status-row"
    >
      <div class="grid items-stretch grid-cols-[min-content_min-content_auto] items-center grow">
        <div class={[
          "flex items-center pl-1 py-2 min-w-32 sm:min-w-48 md:min-w-56 lg:min-w-72 text-md md:text-lg",
          @row_name != nil && "border-t-xs border-gray-lightest"
        ]}>
          <span>{@row_name}</span>
        </div>

        <div class="px-2 flex items-center border-t-xs border-gray-lightest">
          <.status_icon status={@status} />
        </div>

        <div class={[
          "grow flex items-center py-2 border-t-xs border-gray-lightest text-md",
          @disrupted && "font-bold md:text-lg"
        ]}>
          {@label}
        </div>
      </div>
      <div class="self-stretch flex items-center border-t-xs border-gray-lightest">
        <.icon name="chevron-right" class="h-3 w-2 fill-gray-dark ml-3 mr-2 shrink-0" />
      </div>
    </a>
    """
  end

  defp row_name(%{name: name}) do
    name
    |> String.replace(" Line", "")
    |> String.replace("/", "/&#8203;")
    |> Phoenix.HTML.raw()
  end
end
