defmodule DotcomWeb.Components.SystemStatus.CommuterRailStatus do
  @moduledoc """
  Component displaying the status of the commuter rail system.
  """

  use DotcomWeb, :component

  import DotcomWeb.Components, only: [bordered_container: 1]
  import DotcomWeb.Components.SystemStatus.StatusLabel, only: [status_label: 1]
  import DotcomWeb.Components.SystemStatus.StatusIcon, only: [status_icon: 1]

  attr :commuter_rail_status, :map

  @doc """
  Shows the status of the commuter rail system as a table of rows where each row represents a line.
  Multiple rows may be shown for a line if there are multiple alerts.
  But, it depends on the types of alerts.
  """
  def alerts_commuter_rail_status(assigns) do
    rows =
      assigns
      |> Map.get(:commuter_rail_status)
      |> Enum.map(fn {id, row} ->
        row
        |> Map.put(:id, id)
        |> attach_url()
      end)

    assigns = Map.put(assigns, :rows, rows)

    ~H"""
    <.bordered_container hide_divider>
      <:heading>
        <div class="px-2 mb-sm">
          Current Status
        </div>
      </:heading>
      <.row :for={row <- @rows} row={row} />
    </.bordered_container>
    """
  end

  # Attaches a URL to the row based on the number of alerts.
  # If there are no alerts, the URL will be for the timetable.
  # If there are alerts, the URL will be for the alerts page.
  defp attach_url(%{alert_counts: [], id: id} = row) do
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

    [{:alert, "#{cancellations + delays} Cancellations / Delays"}] ++
      combine_alert_counts(other_alert_counts)
  end

  # We have at least one cancellation and no delays.
  defp combine_alert_counts(%{cancellations: cancellations} = alert_counts) do
    other_alert_counts = reject_cancellations_and_delays(alert_counts)
    effect_string = if cancellations == 1, do: "Cancellation", else: "Cancellations"

    [{:alert, "#{cancellations} #{effect_string}"}] ++ combine_alert_counts(other_alert_counts)
  end

  # We have at least one delay and no cancellations.
  defp combine_alert_counts(%{delay: delays} = alert_counts) do
    other_alert_counts = reject_cancellations_and_delays(alert_counts)
    effect_string = if delays == 1, do: "Delay", else: "Delays"

    [{:alert, "#{delays} #{effect_string}"}] ++ combine_alert_counts(other_alert_counts)
  end

  # The default case where we have non-cancellation and non-delay alerts.
  # If there is one alert, we keey the original effect.
  # If there is more than one alert, we combine them to just say "See X Alerts".
  defp combine_alert_counts(alert_counts) do
    total = Enum.reduce(alert_counts, 0, fn {_, count}, acc -> acc + count end)

    case total do
      0 ->
        []

      1 ->
        effect = alert_counts |> Map.keys() |> List.first()
        effect_string = effect |> Atom.to_string() |> Recase.to_title()

        [{effect, "1 #{effect_string}"}]

      _ ->
        [{:alert, "See #{total} Alerts"}]
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
  defp row(%{row: %{service_today?: false}} = assigns) do
    ~H"""
    <a
      class={[
        "flex items-center py-2",
        "hover:bg-brand-primary-lightest cursor-pointer group/row",
        "text-black no-underline font-normal",
        "border-t-[1px] border-gray-lightest"
      ]}
      href={@row.url}
      data-test="status-row"
    >
      <div class="grid items-center grid-cols-[min-content_min-content_auto] items-center grow">
        <div class="flex items-center pl-1 pr-2 min-w-72">
          <span class="text-gray-light text-lg">{@row.name}</span>
        </div>

        <div class="pr-2 flex items-center">
          <.status_icon status={:no_scheduled_service} />
        </div>

        <div class="grow flex items-center text-gray-light">
          No Scheduled Service
        </div>
      </div>
      <div class="self-stretch flex items-center">
        <.icon name="chevron-right" class="h-3 w-2 fill-gray-dark ml-3 mr-2 shrink-0" />
      </div>
    </a>
    """
  end

  # The 'normal' case where there are no alerts.
  # We show a row indicating "Normal Service".
  defp row(%{row: %{alert_counts: alert_counts}} = assigns) when alert_counts == %{} do
    ~H"""
    <a
      class={[
        "flex items-center py-2",
        "hover:bg-brand-primary-lightest cursor-pointer group/row",
        "text-black no-underline font-normal",
        "border-t-[1px] border-gray-lightest"
      ]}
      href={@row.url}
      data-test="status-row"
    >
      <div class="grid items-center grid-cols-[min-content_min-content_auto] items-center grow">
        <div class="flex items-center pl-1 pr-2 min-w-72">
          <span class="text-lg">{@row.name}</span>
        </div>

        <div class="pr-2 flex items-center">
          <.status_icon status={:normal} />
        </div>

        <div class="grow flex items-center">
          <.status_label status={:normal} />
        </div>
      </div>
      <div class="self-stretch flex items-center">
        <.icon name="chevron-right" class="h-3 w-2 fill-gray-dark ml-3 mr-2 shrink-0" />
      </div>
    </a>
    """
  end

  # For cases where we have alerts, we have to show the first alert along with route information
  # and then show subsequent rows without the route information.
  defp row(%{row: %{alert_counts: alert_counts}} = assigns) do
    # alert_counts = %{
    #   cancellation: Enum.random([0, 1]),
    #   delay: Enum.random([0, 1]),
    #   shuttle: Enum.random([0, 1]),
    #   station_closure: Enum.random([0, 1]),
    # } |> Map.reject(fn {_, v} -> v == 0 end) |> Map.new()

    [first | rest] = combine_alert_counts(alert_counts)
    assigns = assigns |> assign(:first, first) |> assign(:rest, rest)

    ~H"""
    <a
      class={[
        "flex items-center py-2",
        "hover:bg-brand-primary-lightest cursor-pointer group/row",
        "text-black no-underline font-normal",
        "border-t-[1px] border-gray-lightest"
      ]}
      href={@row.url}
      data-test="status-row"
    >
      <div class="grid items-center grid-cols-[min-content_min-content_auto] items-center grow">
        <div class="flex items-center pl-1 pr-2 min-w-72">
          <span class="text-lg">{@row.name}</span>
        </div>

        <div class="pr-2 flex items-center">
          <.status_icon status={elem(@first, 0)} />
        </div>

        <div class="grow flex items-center font-bold">
          {elem(@first, 1)}
        </div>
      </div>
      <div class="self-stretch flex items-center">
        <.icon name="chevron-right" class="h-3 w-2 fill-gray-dark ml-3 mr-2 shrink-0" />
      </div>
    </a>
    <a
      :for={row <- @rest}
      class={[
        "flex items-center py-2",
        "hover:bg-brand-primary-lightest cursor-pointer group/row",
        "text-black no-underline font-normal",
        "border-t-[1px] border-gray-lightest"
      ]}
      href={@row.url}
      data-test="status-row"
    >
      <div class="grid items-center grid-cols-[min-content_min-content_auto] items-center grow">
        <div class="flex items-center pl-1 pr-2 min-w-72"></div>

        <div class="pr-2 flex items-center">
          <.status_icon status={elem(row, 0)} />
        </div>

        <div class="grow flex items-center font-bold">
          {elem(row, 1)}
        </div>
      </div>
      <div class="self-stretch flex items-center">
        <.icon name="chevron-right" class="h-3 w-2 fill-gray-dark ml-3 mr-2 shrink-0" />
      </div>
    </a>
    """
  end
end
