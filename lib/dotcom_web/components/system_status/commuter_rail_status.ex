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
      |> Enum.map(fn row ->
        row
        |> attach_url()
        |> Map.put(:rows, status_to_rows(row.status))
      end)

    assigns = assigns |> assign(:status_for_line, status_for_line)

    ~H"""
    <.bordered_container hide_divider>
      <:heading>
        <div class="mb-sm">
          Commuter Rail Status
        </div>
      </:heading>
      <div class="border-b-xs border-gray-lightest grid grid-cols-[min-content_auto_min-content]">
        <.rows_for_line :for={status <- @status_for_line} status={status} />
      </div>
    </.bordered_container>
    """
  end

  defp status_to_rows(:normal) do
    [%{icon_atom: :normal, label: ~t"Normal Service"}]
  end

  defp status_to_rows(:no_scheduled_service) do
    [%{icon_atom: :no_scheduled_service, label: ~t"No Scheduled Service"}]
  end

  defp status_to_rows(%{
         delays: delays,
         cancellations: cancellations,
         service_impacts: service_impacts
       }) do
    train_impact_rows(Enum.count(cancellations), Enum.count(delays)) ++
      service_impact_rows(service_impacts)
  end

  defp train_impact_rows(0 = _cancellation_count, 0 = _delay_count),
    do: []

  defp train_impact_rows(1 = _cancellation_count, 0 = _delay_count),
    do: [%{icon_atom: :cancellation, label: "1 " <> ~t"Cancellation"}]

  defp train_impact_rows(cancellation_count, 0 = _delay_count),
    do: [%{icon_atom: :cancellation, label: "#{cancellation_count} " <> ~t"Cancellations"}]

  defp train_impact_rows(0 = _cancellation_count, 1 = _delay_count),
    do: [%{icon_atom: :delay, label: "1 " <> ~t"Delay"}]

  defp train_impact_rows(0 = _cancellation_count, delay_count),
    do: [%{icon_atom: :delay, label: "#{delay_count} " <> ~t"Delays"}]

  defp train_impact_rows(cancellation_count, delay_count),
    do: [
      %{
        icon_atom: :delay,
        label: "#{cancellation_count + delay_count} " <> ~t"Cancellations" <> " / " <> ~t"Delays"
      }
    ]

  defp service_impact_rows([] = _service_impacts), do: []

  defp service_impact_rows(service_impacts) do
    service_impacts
    |> Enum.group_by(& &1.alert.effect)
    |> Enum.to_list()
    |> case do
      [{effect, impact_list}] ->
        effect_string = Alerts.Alert.human_effect(%Alerts.Alert{effect: effect})

        label =
          case impact_list do
            [impact] ->
              case impact.start_time do
                {:current, _} -> "1 #{effect_string}"
                {:future, start_time} -> "#{Util.narrow_time(start_time)}: #{effect_string}"
              end

            _ ->
              "#{impact_list |> Enum.count()} #{effect_string |> Inflex.pluralize()}"
          end

        [
          %{icon_atom: effect, label: label}
        ]

      _ ->
        [
          %{
            icon_atom: :alert,
            label: "#{Enum.count(service_impacts)}" <> " " <> ~t"Service Alerts"
          }
        ]
    end
  end

  # Attaches a URL to the row.
  defp attach_url(%{route_id: route_id} = row) do
    row
    |> Map.put(:url, ~p"/schedules/#{route_id}/timetable")
  end

  # For cases where we have alerts, we have to show the first alert along with route information
  # and then show subsequent rows without the route information.
  defp rows_for_line(assigns) do
    ~H"""
    <.row
      :for={
        {%{label: label, icon_atom: icon_atom}, index} <-
          @status.rows |> Enum.with_index()
      }
      disrupted={disrupted?(icon_atom)}
      label={label}
      row_name={if index == 0, do: row_name(@status)}
      status={icon_atom}
      url={@status.url}
    />
    """
  end

  defp disrupted?(:normal), do: false
  defp disrupted?(:no_scheduled_service), do: false
  defp disrupted?(_), do: true

  attr :disrupted, :boolean, default: false
  attr :label, :string, required: true
  attr :status, :atom, required: true
  attr :row_name, :any, required: true
  attr :url, :string, required: true

  defp row(assigns) do
    ~H"""
    <a href={@url} class="contents group cursor-pointer text-black">
      <div class="min-h-12 pl-1 pr-6 sm:pr-8 py-2 border-t-xs border-gray-lightest group-hover:bg-brand-primary-lightest flex items-center">
        <span class="text-wrap sm:text-nowrap text-md md:text-lg">{@row_name}</span>
      </div>

      <div class="py-2 border-t-xs border-gray-lightest group-hover:bg-brand-primary-lightest flex items-center gap-2">
        <.status_icon status={@status} />

        <div class={["text-md", @disrupted && "font-bold md:text-lg"]}>
          {@label}
        </div>
      </div>

      <div class="border-t-xs border-gray-lightest group-hover:bg-brand-primary-lightest flex items-center">
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
