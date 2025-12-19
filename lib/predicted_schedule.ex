defmodule PredictedSchedule do
  @moduledoc """
  Wraps information about a Predicted Schedule

  * schedule: The schedule for this trip (optional)
  * prediction: The prediction for this trip (optional)
  """
  alias Predictions.Prediction
  alias Schedules.{Schedule, ScheduleCondensed, Trip}
  alias Stops.Stop

  @derive Jason.Encoder

  defstruct schedule: nil,
            prediction: nil

  @type t :: %__MODULE__{
          schedule: Schedule.t() | ScheduleCondensed.t() | nil,
          prediction: Prediction.t() | nil
        }

  @predictions_repo Application.compile_env!(:dotcom, :repo_modules)[:predictions]
  @schedules_repo Application.compile_env!(:dotcom, :repo_modules)[:schedules]

  def get(route_id, stop_id, opts \\ []) do
    now = Keyword.get(opts, :now, Util.now())
    direction_id = Keyword.get(opts, :direction_id)
    sort_fn = Keyword.get(opts, :sort_fn, &sort_predicted_schedules/1)

    schedules =
      [route_id]
      |> @schedules_repo.by_route_ids(
        stop_ids: stop_id,
        direction_id: direction_id,
        date: Util.service_date(now)
      )

    # if there are any schedules without a trip, maybe we need to...
    # force another hit of the endpoint without using the cache??
    # because the trip ids in the cache has probably been changed during a deploy
    schedules =
      if is_list(schedules) &&
           Enum.any?(schedules, fn sched -> sched |> Map.get(:trip) |> is_nil() end) do
        [route_id]
        |> @schedules_repo.by_route_ids(
          stop_ids: stop_id,
          direction_id: direction_id,
          date: Util.service_date(now),
          no_cache: true
        )
      else
        schedules
      end

    predicted_schedules =
      [
        route: route_id,
        direction_id: direction_id,
        include_terminals: opts |> Keyword.get(:include_terminals, false)
      ]
      |> @predictions_repo.all()
      |> Enum.filter(&(&1.stop.id == stop_id))
      |> PredictedSchedule.group(schedules, sort_fn: sort_fn)
      |> filter_predicted_schedules(now)

    if Enum.empty?(predicted_schedules) do
      # if there are no schedules left for today, get schedules for tomorrow
      PredictedSchedule.group(
        [],
        @schedules_repo.by_route_ids(
          [route_id],
          stop_ids: stop_id,
          direction_id: direction_id,
          date: Util.tomorrow_date(now)
        ),
        sort_fn: sort_fn
      )
      |> filter_predicted_schedules(now)
    else
      predicted_schedules
    end
  end

  def filter_predicted_schedules(predicted_schedules, now) do
    Enum.reject(
      predicted_schedules,
      fn predicted_schedule ->
        last_stop?(predicted_schedule) ||
          time(predicted_schedule) == nil ||
          DateTime.compare(time(predicted_schedule), now) == :lt
      end
    )
  end

  @doc """
  The given predictions and schedules will be merged together according to
  stop_id and trip_id to create PredictedSchedules. The final result is a sorted list of
  PredictedSchedules where the `schedule` and `prediction` share a trip_id.
  Either the `schedule` or `prediction` may be nil, but not both.
  """
  @spec group([Prediction.t()], [Schedule.t()] | [ScheduleCondensed.t()], Keyword.t()) :: [
          PredictedSchedule.t()
        ]
  def group(predictions, schedules, opts \\ []) do
    schedule_map = create_map(schedules)
    prediction_map = create_map(predictions)
    sort_fn = Keyword.get(opts, :sort_fn, &sort_predicted_schedules/1)

    schedule_map
    |> unique_map_keys(prediction_map)
    |> Enum.map(fn key ->
      %PredictedSchedule{schedule: schedule_map[key], prediction: prediction_map[key]}
    end)
    |> Enum.sort_by(sort_fn)
  end

  defp create_map({:error, _error}), do: %{}

  defp create_map(predictions_or_schedules) do
    Map.new(predictions_or_schedules, &group_transform/1)
  end

  @spec group_transform(Schedule.t() | ScheduleCondensed.t() | Prediction.t()) ::
          {{String.t(), String.t(), non_neg_integer}, Schedule.t() | Prediction.t()}
  defp group_transform(%{trip: nil} = ps) do
    case ps do
      %Schedule{stop: nil} ->
        {{nil, nil, ps.stop_sequence}, ps}

      %Schedule{stop: stop} ->
        {{nil, stop.id, ps.stop_sequence}, ps}

      %Prediction{id: id, stop: nil} ->
        {{id, nil, ps.stop_sequence}, ps}

      %Prediction{id: id, stop: stop} ->
        {{id, stop.id, ps.stop_sequence}, ps}
    end
  end

  defp group_transform(
         %ScheduleCondensed{trip_id: trip_id, stop_id: stop_id, stop_sequence: stop_sequence} = ps
       ) do
    {{trip_id, stop_id, stop_sequence}, ps}
  end

  defp group_transform(%{trip: %Trip{id: trip_id}, stop: stop} = ps) do
    case stop do
      %Stop{} -> {{trip_id, stop.id, ps.stop_sequence}, ps}
      _ -> {{trip_id, nil, ps.stop_sequence}, ps}
    end
  end

  @doc """
  Returns the stop for a given PredictedSchedule
  """
  @spec stop(PredictedSchedule.t()) :: Stops.Stop.t()
  def stop(%PredictedSchedule{schedule: %Schedule{stop: stop}}), do: stop
  def stop(%PredictedSchedule{prediction: %Prediction{stop: stop}}), do: stop

  @doc """
  Returns the route for a given PredictedSchedule.
  """
  @spec route(PredictedSchedule.t()) :: Routes.Route.t()
  def route(%PredictedSchedule{schedule: %Schedule{route: route}}), do: route
  def route(%PredictedSchedule{prediction: %Prediction{route: route}}), do: route

  @doc """
  Returns the trip for a given PredictedSchedule.
  """
  @spec trip(PredictedSchedule.t()) :: Schedules.Trip.t() | nil
  def trip(%PredictedSchedule{schedule: %Schedule{trip: trip}}), do: trip
  def trip(%PredictedSchedule{prediction: %Prediction{trip: trip}}), do: trip

  @doc """
  Returns the direction ID for a given PredictedSchedule
  """
  @spec direction_id(PredictedSchedule.t()) :: 0 | 1
  def direction_id(%PredictedSchedule{prediction: %Prediction{} = prediction}) do
    prediction.direction_id
  end

  def direction_id(%PredictedSchedule{schedule: %Schedule{trip: trip}}) do
    trip.direction_id
  end

  @doc """
  Determines if the given PredictedSchedule has a schedule
  """
  @spec has_schedule?(PredictedSchedule.t()) :: boolean
  def has_schedule?(%PredictedSchedule{schedule: nil}), do: false
  def has_schedule?(%PredictedSchedule{}), do: true

  @doc """
  Determines if the given PredictedSchedule has a prediction
  """
  @spec has_prediction?(PredictedSchedule.t()) :: boolean
  def has_prediction?(%PredictedSchedule{prediction: nil}), do: false
  def has_prediction?(%PredictedSchedule{}), do: true

  @doc """
  Returns a time value for the given PredictedSchedule. Returned value can be either a scheduled time
  or a predicted time. **Predicted Times are preferred**
  """
  @spec time(PredictedSchedule.t()) :: DateTime.t() | nil
  def time(%PredictedSchedule{prediction: %Prediction{time: time}}) when not is_nil(time) do
    time
  end

  def time(%PredictedSchedule{schedule: %Schedule{time: time}}) do
    time
  end

  def time(%PredictedSchedule{}) do
    # this falls through when there's no predicted time and no scheduled time
    nil
  end

  @spec last_stop?(t) :: boolean
  def last_stop?(%PredictedSchedule{schedule: %Schedule{last_stop?: last_stop?}}) do
    last_stop?
  end

  def last_stop?(%PredictedSchedule{}) do
    false
  end

  @doc """
  Retrieves status from predicted schedule if one is available
  """
  @spec status(PredictedSchedule.t()) :: String.t() | nil
  def status(%PredictedSchedule{prediction: %Prediction{status: status}}), do: status
  def status(_predicted_schedule), do: nil

  @doc """
  Determines if the given predicted schedule occurs after the given time
  """
  @spec upcoming?(PredictedSchedule.t(), DateTime.t()) :: boolean
  def upcoming?(
        %PredictedSchedule{
          schedule: nil,
          prediction: %Prediction{time: nil, departing?: departing?}
        },
        _
      ) do
    departing?
  end

  def upcoming?(ps, %{__struct__: mod} = current_time) do
    # in the tests, schedule.time and prediction.time are NaiveDateTime,
    # rather than DateTime, structs. Luckily they both have a `diff`
    # function, so we can use the `__struct__` attribute to call the
    # correct function.
    mod.compare(time(ps) || current_time, current_time) == :gt
  end

  @doc """
  Determines if this `PredictedSchedule` is departing.
  Departing status is determined by the `pickup_type` field on schedules
  and the `departing?` or `status` field on Predictions. Schedules are preferred for
  determining departing? status.
  """
  @spec departing?(PredictedSchedule.t()) :: boolean
  def departing?(%PredictedSchedule{schedule: nil, prediction: prediction}) do
    prediction.departing?
  end

  def departing?(%PredictedSchedule{schedule: schedule}) do
    schedule.pickup_type != 1
  end

  @doc """
  Returns true if the PredictedSchedule doesn't have a prediction or schedule.
  """
  @spec empty?(PredictedSchedule.t()) :: boolean
  def empty?(%__MODULE__{schedule: nil, prediction: nil}), do: true
  def empty?(%__MODULE__{}), do: false

  @doc """

  Given a Predicted schedule and an order of keys, call the given function
  with the prediction/schedule that's not nil.  If all are nil, then return
  the default value.

  """
  @spec map_optional(
          PredictedSchedule.t(),
          [:schedule | :prediction],
          any,
          (Schedule.t() | Prediction.t() -> any)
        ) :: any
  def map_optional(predicted_schedule, ordering, default \\ nil, func)

  def map_optional(nil, _ordering, default, _func) do
    default
  end

  def map_optional(_predicted_schedule, [], default, _func) do
    default
  end

  def map_optional(predicted_schedule, [:schedule | rest], default, func) do
    case predicted_schedule.schedule do
      nil -> map_optional(predicted_schedule, rest, default, func)
      schedule -> func.(schedule)
    end
  end

  def map_optional(predicted_schedule, [:prediction | rest], default, func) do
    case predicted_schedule.prediction do
      nil -> map_optional(predicted_schedule, rest, default, func)
      prediction -> func.(prediction)
    end
  end

  @spec schedule_after?(PredictedSchedule.t(), DateTime.t()) :: boolean
  def schedule_after?(%PredictedSchedule{schedule: nil}, _time), do: false

  def schedule_after?(%PredictedSchedule{schedule: schedule}, time) do
    DateTime.compare(schedule.time, time) == :gt
  end

  # Returns unique list of all stop_id's from given schedules and predictions
  @spec unique_map_keys(%{key => Schedule.t()}, %{key => Prediction.t()}) :: [key]
        when key: {String.t(), String.t(), non_neg_integer}
  defp unique_map_keys(schedule_map, prediction_map) do
    schedule_map
    |> Map.merge(prediction_map)
    |> Map.keys()
  end

  @spec sort_predicted_schedules(PredictedSchedule.t()) ::
          {integer, non_neg_integer, non_neg_integer}
  defp sort_predicted_schedules(%PredictedSchedule{schedule: nil, prediction: prediction}),
    do: {1, prediction.stop_sequence, to_unix(prediction.time)}

  defp sort_predicted_schedules(%PredictedSchedule{schedule: schedule}),
    do: {2, schedule.stop_sequence, to_unix(schedule.time)}

  defp to_unix(%DateTime{} = time) do
    DateTime.to_unix(time)
  end

  defp to_unix(%NaiveDateTime{} = time) do
    time
    |> DateTime.from_naive!("Etc/UTC")
    |> to_unix()
  end

  defp to_unix(nil) do
    nil
  end

  @doc """
  Returns the time difference between a schedule and prediction. If either is nil, returns 0.
  """
  @spec delay(PredictedSchedule.t() | nil) :: integer
  def delay(nil), do: 0

  def delay(%PredictedSchedule{schedule: schedule, prediction: prediction})
      when is_nil(schedule) or is_nil(prediction),
      do: 0

  def delay(%PredictedSchedule{schedule: schedule, prediction: prediction}) do
    case prediction.time do
      %{__struct__: mod} = time ->
        # in the tests, schedule.time and prediction.time are NaiveDateTime,
        # rather than DateTime, structs. Luckily they both have a `diff`
        # function, so we can use the `__struct__` attribute to call the
        # correct function.
        seconds = mod.diff(time, schedule.time)
        div(seconds, 60)

      _ ->
        0
    end
  end
end
