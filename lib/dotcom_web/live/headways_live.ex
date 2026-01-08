defmodule DotcomWeb.HeadwaysLive do
  @moduledoc """
  A page that shows subway headways at representative stations throughout the system
  """

  use DotcomWeb, :live_view

  @window_hours 2

  @representative_start_times [
    %{time: ~T[07:00:00], label: "Morning"},
    %{time: ~T[12:00:00], label: "Afternoon"},
    %{time: ~T[17:00:00], label: "Evening"},
    %{time: ~T[23:00:00], label: "Night"}
  ]

  @representative_dates [
    %{label: "Weekday", date: ~D[2026-03-13]},
    %{label: "Saturday", date: ~D[2026-03-14]},
    %{label: "Sunday", date: ~D[2026-03-15]}
  ]

  @representative_stops [
    %{stop_name: "Aquarium", label: "Blue Line"},
    %{stop_name: "Back Bay", label: "Orange Line"},
    %{stop_name: "South Station", label: "Red Line - Trunk"},
    %{stop_name: "Savin Hill", label: "Red Line - Ashmont Branch"},
    %{stop_name: "North Quincy", label: "Red Line - Braintree Branch"},
    %{stop_name: "Copley", label: "Green Line - Trunk"},
    %{stop_name: "Kenmore", label: "Green Line - BCD Shared Trunk"},
    %{stop_name: "Science Park/West End", label: "Green Line - DE Shared Trunk"},
    %{stop_name: "Babcock Street", label: "Green Line - B Branch"},
    %{stop_name: "Coolidge Corner", label: "Green Line - C Branch"},
    %{stop_name: "Newton Centre", label: "Green Line - D Branch"},
    %{stop_name: "Riverway", label: "Green Line - E Branch"}
  ]

  @representative_stop_names @representative_stops |> Enum.map(& &1.stop_name)

  def mount(_params, _session, socket) do
    {:ok,
     socket
     |> assign_async(:grouped_schedules, fn ->
       grouped_schedules =
         @representative_dates
         |> Enum.map(fn %{label: label, date: date} ->
           schedules =
             Dotcom.Routes.subway_route_ids()
             |> Schedules.Repo.by_route_ids(date: date)

           %{date: date, label: label, schedules: group(schedules)}
         end)
         |> Enum.flat_map(fn %{
                               date: date,
                               label: date_label,
                               schedules: schedules_by_stop_and_direction
                             } ->
           schedules_by_stop_and_direction
           |> Enum.flat_map(fn {stop_name, schedules_by_direction} ->
             schedules_by_direction
             |> Enum.flat_map(fn {direction_name, schedules} ->
               @representative_start_times
               |> Enum.map(fn %{time: time, label: time_label} ->
                 %{
                   date: date,
                   date_label: date_label,
                   direction_name: direction_name,
                   stop_name: stop_name,
                   time: time,
                   time_label: time_label,
                   headways: schedules |> headways(date, time)
                 }
               end)
             end)
           end)
         end)
         |> Enum.group_by(& &1.stop_name)
         |> Map.new(fn {stop_name, list} ->
           {stop_name,
            list
            |> Enum.group_by(& &1.direction_name)
            |> Enum.map(fn {direction_name, list} ->
              {direction_name,
               %{
                 dates: list |> Enum.map(&(&1 |> Map.take([:date, :date_label]))) |> Enum.uniq(),
                 by_time:
                   list
                   |> Enum.group_by(&%{time: &1.time, time_label: &1.time_label})
                   |> Enum.map(fn {time_blob, headway_entries} ->
                     {time_blob,
                      headway_entries
                      |> Enum.group_by(& &1.date_label)
                      |> Map.new(fn {date_label, [entry]} -> {date_label, entry} end)}
                   end)
               }}
            end)}
         end)

       {:ok, %{grouped_schedules: grouped_schedules}}
     end)}
  end

  defp group(schedules) do
    schedules
    |> Enum.group_by(& &1.stop.name)
    |> Map.take(@representative_stop_names)
    |> Map.new(fn {stop_name, list} ->
      {stop_name,
       list
       |> Enum.group_by(&(&1.route.direction_names |> Map.get(&1.trip.direction_id)))}
    end)
  end

  def render(assigns) do
    assigns = assigns |> assign(:representative_stop_names, @representative_stop_names)

    ~H"""
    <.async_result
      :let={grouped_schedules}
      assign={@grouped_schedules}
    >
      <:loading>
        <div class="w-full flex justify-center p-3"><.spinner aria_label="Loading..." /></div>
      </:loading>
      <:failed :let={_reason}>
        <div class="w-full flex justify-center p-3 bg-gray-lightest">
          Unable to load schedules
        </div>
      </:failed>
      <.stop_section
        :for={stop_name <- @representative_stop_names}
        stop_name={stop_name}
        stop_info={grouped_schedules |> Map.get(stop_name)}
      />
    </.async_result>
    """
  end

  defp stop_section(assigns) do
    assigns =
      assigns
      |> assign(
        :stop_label,
        @representative_stops
        |> Enum.find(&(&1.stop_name == assigns.stop_name))
        |> then(& &1.label)
      )

    ~H"""
    <h2 class="flex items-center gap-2">
      <span>{@stop_label}</span>
      <span class="text-md">{@stop_name}</span>
    </h2>

    <.direction_section
      :for={{direction_name, headway_data} <- @stop_info}
      direction_name={direction_name}
      headway_data={headway_data}
    />
    """
  end

  defp direction_section(assigns) do
    assigns = assigns |> assign(:window_hours, @window_hours)

    ~H"""
    <h3>{@direction_name}</h3>

    <table class="border border-brand-primary">
      <tr>
        <th class="border border-brand-primary p-2"></th>
        <th
          :for={%{date: date, date_label: date_label} <- @headway_data.dates}
          class="border border-brand-primary p-2"
        >
          <div class="flex items-center gap-1">
            <span>{date_label}</span>
            <span class="text-[0.75rem]">{Dotcom.Utils.Time.format!(date, :date_short)}</span>
          </div>
        </th>
      </tr>

      <tr :for={{%{time: time, time_label: time_label}, data} <- @headway_data.by_time}>
        <th class="border border-brand-primary p-2">
          <div class="flex flex-col">
            <span>{time_label}</span>
            <span class="text-[0.75rem]">
              {time |> Dotcom.Utils.Time.format!(:hour_12)} - {time
              |> Time.shift(hour: @window_hours)
              |> Dotcom.Utils.Time.format!(:hour_12)}
            </span>
          </div>
        </th>
        <td
          :for={%{date_label: date_label} <- @headway_data.dates}
          class="border border-brand-primary p-2"
        >
          {headway_message(data |> Map.get(date_label) |> Map.get(:headways))}
        </td>
      </tr>
    </table>
    """
  end

  defp headway_message({min, max}) do
    "Every #{min} - #{max} minutes"
  end

  defp headways(schedule_list, date, time) do
    start_time = DateTime.new!(date, time, "America/New_York")
    end_time = start_time |> DateTime.shift(hour: @window_hours)

    schedule_list
    |> Enum.map(& &1.time)
    |> Enum.sort(DateTime)
    |> Enum.reject(&DateTime.before?(&1, start_time))
    |> Enum.reject(&DateTime.after?(&1, end_time))
    |> Enum.chunk_every(2, 1, :discard)
    |> Enum.map(fn [t1, t2] -> DateTime.diff(t2, t1, :minute) end)
    |> Enum.min_max()
  end
end
