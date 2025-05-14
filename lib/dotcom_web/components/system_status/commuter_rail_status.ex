defmodule DotcomWeb.Components.SystemStatus.CommuterRailStatus do
  @moduledoc """
  TODO
  """

  use DotcomWeb, :component

  import DotcomWeb.Components, only: [bordered_container: 1]
  import DotcomWeb.Components.SystemStatus.StatusLabel, only: [status_label: 1]
  import DotcomWeb.Components.SystemStatus.StatusIcon, only: [status_icon: 1]

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

  defp attach_url(%{alert_counts: [], id: id} = row) do
    row
    |> Map.put(:url, ~p"/schedules/#{id}/timetable")
  end

  defp attach_url(%{id: id} = row) do
    row
    |> Map.put(:url, ~p"/schedules/#{id}/alerts")
  end

  defp combine_alert_counts(alert_counts) when alert_counts == %{}, do: []

  # We have delays and cancellations.
  defp combine_alert_counts(%{delay: delays, cancellation: cancellations} = alert_counts) do
    other_alert_counts =
      reject_cancellations_and_delays(alert_counts)

    [{:alert, "#{cancellations + delays} Cancellations / Delays"}] ++
      combine_alert_counts(other_alert_counts)
  end

  # We have cancellations and no delays.
  defp combine_alert_counts(%{cancellations: cancellations} = alert_counts) do
    other_alert_counts = reject_cancellations_and_delays(alert_counts)
    effect_string = if cancellations == 1, do: "Cancellation", else: "Cancellations"

    [{:alert, "#{cancellations} #{effect_string}"}] ++ combine_alert_counts(other_alert_counts)
  end

  # We have delays and no cancellations.
  defp combine_alert_counts(%{delay: delays} = alert_counts) do
    other_alert_counts = reject_cancellations_and_delays(alert_counts)
    effect_string = if delays == 1, do: "Delay", else: "Delays"

    [{:alert, "#{delays} #{effect_string}"}] ++ combine_alert_counts(other_alert_counts)
  end

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

  defp reject_cancellations_and_delays(alert_counts) when alert_counts == %{}, do: %{}

  defp reject_cancellations_and_delays(alert_counts) do
    alert_counts
    |> Enum.reject(fn {effect, _} -> Enum.member?(~w(cancellation delay)a, effect) end)
    |> Map.new()
  end

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
