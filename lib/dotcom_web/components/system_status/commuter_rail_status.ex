defmodule DotcomWeb.Components.SystemStatus.CommuterRailStatus do
  @moduledoc """
  Component displaying the status of the commuter rail system.
  """

  use DotcomWeb, :component

  import DotcomWeb.Components, only: [bordered_container: 1]
  import DotcomWeb.Components.SystemStatus.StatusIcon, only: [status_icon: 1]

  alias Dotcom.SystemStatus.CommuterRail

  attr :commuter_rail_status, :map

  @typep impact_count_t() :: {:trips, integer()} | {:direction, 0 | 1} | :all

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
    cancellation_count = cancellations |> Enum.map(& &1.trip_info) |> count_train_impacts()
    delay_count = delays |> Enum.map(& &1.trip_info) |> count_train_impacts()

    case train_impact_rows(cancellation_count, delay_count) do
      {:suppress_service_impacts, train_impact_rows} ->
        train_impact_rows

      train_impact_rows ->
        train_impact_rows ++ service_impact_rows(service_impacts)
    end
  end

  # This function exists to aggregate train impacts and roll them up
  # as a generalized "count" of how many trains are impacted. If each
  # entry is a single trip, then this will count the number of
  # entries, returning {:trips, <count>}, but if any entries affect
  # the whole line, or a whole direction of the line, then we return
  # the affected direction or :all.
  @spec count_train_impacts([CommuterRail.trip_info_t()]) :: impact_count_t()
  defp count_train_impacts(impact_list)

  defp count_train_impacts([]), do: {:trips, 0}

  defp count_train_impacts([{:trip, _} | rest]) do
    case count_train_impacts(rest) do
      {:trips, n} -> {:trips, n + 1}
    end
  end

  defp count_train_impacts([
         {:direction, %{direction_id: direction_id_1}},
         {:direction, %{direction_id: direction_id_2}} | _rest
       ])
       when direction_id_1 != direction_id_2 do
    :all
  end

  defp count_train_impacts([{:direction, %{direction_id: direction_id}} | _rest]) do
    {:direction, direction_id}
  end

  defp count_train_impacts([:all | _rest]) do
    :all
  end

  @typep impact_row_t() :: %{icon_atom: atom(), label: String.t()}

  # This function converts the counts of delay and cancellation
  # impacts into an array of row data-blobs that can be drawn on the
  # screen (all we need in this context is the icon and the label.
  # The counts provided are the generalized counts returned by
  # `count_train_impacts/1`. The list of train impact rows is either
  # returned as a plain list, or as a tuple of
  # {:suppress_service_impacts, <list>} - when the train impact row
  # says "See Alerts", then including additional service alerts like
  # shuttles would be redundant.
  @spec train_impact_rows(impact_count_t(), impact_count_t()) ::
          [impact_row_t()] | {:suppress_service_impacts, [impact_row_t()]}
  defp train_impact_rows(cancellation_count, delay_count)

  defp train_impact_rows({:trips, 0} = _cancellation_count, {:trips, 0} = _delay_count),
    do: []

  defp train_impact_rows({:trips, 1} = _cancellation_count, {:trips, 0} = _delay_count),
    do: cancellation_row("1 " <> ~t"Cancellation")

  defp train_impact_rows({:trips, cancellation_count}, {:trips, 0} = _delay_count),
    do: cancellation_row("#{cancellation_count} " <> ~t"Cancellations")

  defp train_impact_rows({:trips, 0} = _cancellation_count, {:trips, 1} = _delay_count),
    do: delay_row("1 " <> ~t"Delay")

  defp train_impact_rows({:trips, 0} = _cancellation_count, {:trips, delay_count}),
    do: delay_row("#{delay_count} " <> ~t"Delays")

  defp train_impact_rows({:trips, 0} = _cancellation_count, _delay_count),
    do: delay_row(~t"Delays")

  defp train_impact_rows({:trips, cancellation_count}, {:trips, delay_count}),
    do:
      delay_row(
        "#{cancellation_count + delay_count} " <> ~t"Cancellations" <> " / " <> ~t"Delays"
      )

  defp train_impact_rows({:direction, 0} = _cancellation_count, _delay_count),
    do: cancellation_row(~t"Outbound Trains Cancelled")

  defp train_impact_rows({:direction, 1} = _cancellation_count, _delay_count),
    do: cancellation_row(~t"Inbound Trains Cancelled")

  defp train_impact_rows(:all = _cancellation_count, _delay_count),
    do: cancellation_row(~t"All Trains Cancelled")

  defp train_impact_rows(_cancellation_count, _delay_count),
    do: {:suppress_service_impacts, delay_row(~t"See Alerts")}

  defp cancellation_row(label), do: [%{icon_atom: :cancellation, label: label}]
  defp delay_row(label), do: [%{icon_atom: :delay, label: label}]

  defp service_impact_rows([] = _service_impacts), do: []

  defp service_impact_rows(service_impacts) do
    service_impacts
    |> Enum.group_by(& &1.alert.effect)
    |> Enum.to_list()
    |> case do
      [{effect, impact_list}] ->
        [
          %{icon_atom: effect, label: service_impact_label(impact_list, effect)}
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

  # Constructs a label for a service impact row out of the impact list
  # and the provided effect. If there's a single impact, then it
  # either says "1 <effect>" or "HH:MM: <effect>", depending on
  # whether the alert is active. If there are multiple impacts, then
  # it says "<count> <effects>".
  defp service_impact_label([impact], effect),
    do: "#{count_or_time(impact.start_time)} #{singular_effect_description(effect)}"

  defp service_impact_label(impact_list, effect),
    do: "#{impact_list |> Enum.count()} #{plural_effect_description(effect)}"

  defp singular_effect_description(:station_closure), do: ~t"Stop Skipped"

  defp singular_effect_description(effect),
    do: Alerts.Alert.human_effect(%Alerts.Alert{effect: effect})

  defp plural_effect_description(:station_closure), do: ~t"Stops Skipped"

  defp plural_effect_description(effect),
    do: effect |> singular_effect_description() |> Inflex.pluralize()

  # If there is one alert of the effect, and it is active in the future, give the time.
  # For all others, just give the count.
  defp count_or_time({:future, time}), do: "#{Util.narrow_time(time)}:"

  defp count_or_time({:current, _}), do: "1"

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
