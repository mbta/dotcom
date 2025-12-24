defmodule Dotcom.ScheduleFinder.UpcomingDepartures do
  @moduledoc """
  This represents realtime data for upcoming departures, including trip details.

  This is built out of prediction data, combined with data from stops and vehicles
  in order to present a single model containing everything needed to convey rider
  info about an upcoming departure.
  """

  alias Dotcom.ScheduleFinder.TripDetails
  alias Dotcom.Utils.ServiceDateTime
  alias Predictions.Prediction
  alias Routes.Route
  alias Schedules.Schedule

  @predictions_repo Application.compile_env!(:dotcom, :repo_modules)[:predictions]
  @schedules_repo Application.compile_env!(:dotcom, :repo_modules)[:schedules]
  @stops_repo Application.compile_env!(:dotcom, :repo_modules)[:stops]

  defmodule UpcomingDeparture do
    @moduledoc """
    A struct representing an upcoming departure.
    """

    defstruct [
      :arrival_status,
      :arrival_substatus,
      :headsign,
      :platform_name,
      :route,
      :trip_details,
      :trip_id,
      :trip_name
    ]

    defmodule TripDetails do
      @moduledoc """
      A struct representing trip details, including a list of stops visited before and after
      the stop specified, along with arrival times (or departure times when relevant).
      """

      defstruct [
        :stop,
        :stops_after,
        :stops_before
      ]
    end
  end

  def upcoming_departures(%{
        direction_id: direction_id,
        now: now,
        route: route,
        stop_id: stop_id
      }) do
    route_type = Route.type_atom(route)

    all_predictions =
      [
        route: route.id,
        direction_id: direction_id,
        include_terminals: true
      ]
      |> @predictions_repo.all()

    all_schedules =
      @schedules_repo.by_route_ids([route.id],
        direction_id: direction_id,
        date: now |> ServiceDateTime.service_date()
      )

    predicted_schedules =
      PredictedSchedule.group(all_predictions, all_schedules)
      |> reject_past_schedules(now)

    predicted_schedules_by_trip_id =
      predicted_schedules |> Enum.group_by(&PredictedSchedule.trip(&1).id)

    predicted_schedules
    |> Enum.filter(&(PredictedSchedule.stop(&1).id == stop_id))
    |> Enum.reject(&end_of_trip?/1)
    |> reject_timeless_predictions()
    |> Enum.sort_by(&PredictedSchedule.display_time/1, DateTime)
    |> Enum.map(fn predicted_schedule ->
      to_upcoming_departure(%{
        now: now,
        predicted_schedule: predicted_schedule,
        predicted_schedules_by_trip_id: predicted_schedules_by_trip_id,
        route_type: route_type,
        stop_id: stop_id
      })
    end)
    |> Enum.reject(&(&1.arrival_status == :hidden))
  end

  # We don't want to show upcoming departure rows for
  # predicted_schedules that are the last stop of their trip, since
  # those indicate trips that you can't board. The signal that a
  # predicted_schedule is the end of its trip is that it has a nil
  # departure_time. We check both the scheduled and predicted
  # departure times because a stop along a cancelled trip will have a
  # nil predicted departure_time, but a non-nil scheduled
  # departure_time.
  defp end_of_trip?(%PredictedSchedule{schedule: schedule, prediction: prediction}) do
    schedule_departure_time = schedule && schedule.departure_time
    prediction_departure_time = prediction && prediction.departure_time

    !prediction_departure_time && !schedule_departure_time
  end

  defp reject_past_schedules(predicted_schedules, now) do
    predicted_schedules
    |> Enum.reject(fn
      %PredictedSchedule{schedule: %Schedule{departure_time: time}, prediction: nil}
      when time != nil ->
        DateTime.before?(time, now)

      _ ->
        false
    end)
  end

  defp reject_timeless_predictions(predictions) do
    predictions |> Enum.reject(&(PredictedSchedule.display_time(&1) == nil))
  end

  def to_upcoming_departure(%{
        now: now,
        predicted_schedule: predicted_schedule,
        predicted_schedules_by_trip_id: predicted_schedules_by_trip_id,
        route_type: route_type,
        stop_id: stop_id
      }) do
    trip = predicted_schedule |> PredictedSchedule.trip()

    trip_details =
      trip_details(%{
        predicted_schedules_by_trip_id: predicted_schedules_by_trip_id,
        trip_id: trip.id,
        stop_id: stop_id
      })

    %UpcomingDeparture{
      arrival_status:
        arrival_status(%{
          predicted_schedule: predicted_schedule,
          route_type: route_type,
          now: now
        }),
      arrival_substatus:
        arrival_substatus(%{
          predicted_schedule: predicted_schedule,
          route_type: route_type
        }),
      headsign: trip.headsign,
      platform_name: platform_name(predicted_schedule),
      route: PredictedSchedule.route(predicted_schedule),
      trip_details: trip_details,
      trip_id: trip.id,
      trip_name: if(route_type == :commuter_rail, do: trip.name, else: nil)
    }
  end

  defp trip_details(%{
         predicted_schedules_by_trip_id: predicted_schedules_by_trip_id,
         trip_id: trip_id,
         stop_id: stop_id
       }) do
    %TripDetails{stops: stops} =
      TripDetails.trip_details(%{
        predicted_schedules: predicted_schedules_by_trip_id |> Map.get(trip_id, []),
        trip_id: trip_id
      })

    {stops_before, stop, stops_after} =
      stops
      |> Enum.split_while(&(&1.stop_id != stop_id))
      |> case do
        {all, []} -> {[], nil, all}
        {bef, [st | aft]} -> {bef, st, aft}
      end

    %__MODULE__.UpcomingDeparture.TripDetails{
      stops_before: stops_before,
      stop: stop,
      stops_after: stops_after
    }
  end

  defp seconds_between(nil, _now), do: nil
  defp seconds_between(prediction_time, now), do: DateTime.diff(prediction_time, now, :second)

  defp platform_name(predicted_schedule) do
    predicted_schedule
    |> PredictedSchedule.platform_stop_id()
    |> @stops_repo.get()
    |> Kernel.then(& &1.platform_name)
    |> case do
      nil -> nil
      "Commuter Rail" -> nil
      name -> name |> String.trim("Commuter Rail - ")
    end
  end

  defp arrival_status(%{
         predicted_schedule: %PredictedSchedule{prediction: nil},
         route_type: :subway
       }),
       do: :hidden

  defp arrival_status(%{
         predicted_schedule: %PredictedSchedule{
           prediction: %Prediction{
             schedule_relationship: schedule_relationship,
             departure_time: nil
           },
           schedule: schedule
         },
         route_type: :commuter_rail
       })
       when schedule_relationship in [:cancelled, :skipped] do
    {:cancelled, schedule.departure_time}
  end

  defp arrival_status(%{
         predicted_schedule: %PredictedSchedule{
           prediction: %Prediction{schedule_relationship: relationship, departure_time: nil}
         }
       })
       when relationship in [:skipped, :cancelled] do
    :hidden
  end

  defp arrival_status(%{
         predicted_schedule: %PredictedSchedule{prediction: prediction},
         route_type: :commuter_rail
       })
       when prediction != nil do
    {:time, prediction.departure_time}
  end

  defp arrival_status(%{
         predicted_schedule: %PredictedSchedule{prediction: prediction},
         route_type: route_type,
         now: now
       })
       when prediction != nil do
    arrival_seconds = seconds_between(prediction.arrival_time, now)
    departure_seconds = seconds_between(prediction.departure_time, now)

    realtime_arrival_status(%{
      arrival_seconds: arrival_seconds,
      departure_seconds: departure_seconds,
      route_type: route_type
    })
  end

  defp arrival_status(%{
         predicted_schedule: %PredictedSchedule{schedule: schedule},
         route_type: :commuter_rail
       })
       when schedule != nil do
    {:scheduled, schedule.departure_time}
  end

  defp arrival_status(%{
         predicted_schedule: %PredictedSchedule{schedule: schedule}
       })
       when schedule != nil do
    {:scheduled, PredictedSchedule.display_time(schedule)}
  end

  defp realtime_arrival_status(%{
         arrival_seconds: arrival_seconds,
         departure_seconds: departure_seconds,
         route_type: :subway
       })
       when (arrival_seconds <= 0 or arrival_seconds == nil) and departure_seconds <= 90,
       do: :boarding

  defp realtime_arrival_status(%{
         arrival_seconds: arrival_seconds,
         departure_seconds: departure_seconds,
         route_type: :bus
       })
       when (arrival_seconds <= 0 or arrival_seconds == nil) and departure_seconds <= 90,
       do: :now

  defp realtime_arrival_status(%{
         arrival_seconds: nil,
         departure_seconds: seconds
       }),
       do: {:departure_seconds, seconds}

  defp realtime_arrival_status(%{arrival_seconds: seconds, route_type: :bus}) when seconds <= 30,
    do: :now

  defp realtime_arrival_status(%{arrival_seconds: seconds, route_type: :subway})
       when seconds <= 30,
       do: :arriving

  defp realtime_arrival_status(%{arrival_seconds: seconds, route_type: :subway})
       when seconds <= 60,
       do: :approaching

  defp realtime_arrival_status(%{arrival_seconds: seconds}), do: {:arrival_seconds, seconds}

  defp arrival_substatus(%{route_type: route_type}) when route_type != :commuter_rail, do: nil

  defp arrival_substatus(%{
         predicted_schedule: %PredictedSchedule{prediction: nil}
       }),
       do: :scheduled

  defp arrival_substatus(%{
         predicted_schedule: %PredictedSchedule{prediction: %Prediction{status: status}}
       })
       when status != nil,
       do: {:status, status |> String.split(" ") |> Enum.map_join(" ", &String.capitalize/1)}

  defp arrival_substatus(%{
         predicted_schedule: %PredictedSchedule{schedule: nil}
       }),
       do: :on_time

  defp arrival_substatus(%{
         predicted_schedule: %PredictedSchedule{schedule: schedule, prediction: prediction}
       }) do
    scheduled_time = schedule.departure_time
    predicted_time = prediction.departure_time

    cond do
      predicted_time == nil ->
        prediction.schedule_relationship

      DateTime.diff(scheduled_time, predicted_time, :second) |> abs() < 60 ->
        :on_time

      true ->
        {:scheduled_at, scheduled_time}
    end
  end
end
