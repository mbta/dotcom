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
      <div class="border-b-[1px] border-gray-lightest">
        <a
          :for={row <- @rows}
          class={[
            "flex items-center",
            "hover:bg-brand-primary-lightest cursor-pointer group/row",
            "text-black no-underline font-normal"
          ]}
          href={row.url}
          data-test="status-row"
        >
          <.heading row={row} />
          <div class="border-t-[1px] border-gray-lightest self-stretch flex items-center">
            <.icon name="chevron-right" class="h-3 w-2 fill-gray-dark ml-3 mr-2 shrink-0" />
          </div>
        </a>
      </div>
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

  defp combine_alert_counts(alert_counts) do
    alert_counts
    |> Enum.reduce("", fn {effect, count}, acc ->
      effect = effect |> Atom.to_string() |> Recase.to_title()
      count_effect = if count == 1, do: "#{count} #{effect}", else: "#{count} #{Inflex.pluralize(effect)}"

      if acc == "" do
        count_effect
      else
        "#{acc} / #{count_effect}"
      end
    end)
  end

  defp heading(%{row: %{service_today?: false}} = assigns) do
    ~H"""
    <div class="flex items-center pl-1 pr-2">
      <p>{@row.name}</p>
    </div>

    <div class="pr-2 flex items-center">
      <.status_icon status={:not_in_service} />
    </div>

    <div class="grow flex items-center">
      Not in Service
    </div>
    """
  end

  defp heading(%{row: %{alert_counts: []}} = assigns) do
    ~H"""
    <div class="flex items-center pl-1 pr-2">
      <p>{@row.name}</p>
    </div>

    <div class="pr-2 flex items-center">
      <.status_icon status={:normal} />
    </div>

    <div class="grow flex items-center">
      <.status_label status={:normal} />
    </div>
    """
  end

  defp heading(%{row: %{alert_counts: _}} = assigns) do
    ~H"""
    <div class="flex items-center pl-1 pr-2">
      <p>{@row.name}</p>
    </div>

    <div class="pr-2 flex items-center">
      <.status_icon status={:alerts} />
    </div>

    <div class="grow flex items-center">
      {combine_alert_counts(@row.alert_counts)}
    </div>
    """
  end
end
