defmodule PredictedSchedule do
  @moduledoc """
  Wraps information about a Predicted Schedule

  * schedule: The schedule for this trip (optional)
  * prediction: The prediction for this trip (optional)
  """
  alias Schedules.Schedule
  alias Predictions.Prediction

  defstruct schedule: nil,
            prediction: nil

  @type t :: %__MODULE__{
          schedule: Schedule.t() | nil,
          prediction: Prediction.t() | nil
        }

  @doc """
  The given predictions and schedules will be merged together according to
  stop_id and trip_id to create PredictedSchedules. The final result is a sorted list of
  PredictedSchedules where the `schedule` and `prediction` share a trip_id.
  Either the `schedule` or `prediction` may be nil, but not both.
  """
  @spec group([Prediction.t()], [Schedule.t()]) :: [PredictedSchedule.t()]
  def group(predictions, schedules) do
    schedule_map = create_map(schedules)
    prediction_map = create_map(predictions)

    schedule_map
    |> unique_map_keys(prediction_map)
    |> Enum.map(fn key ->
      %PredictedSchedule{schedule: schedule_map[key], prediction: prediction_map[key]}
    end)
    |> Enum.sort_by(&sort_predicted_schedules/1)
  end

  defp create_map(predictions_or_schedules) do
    Map.new(predictions_or_schedules, &group_transform/1)
  end

  @spec group_transform(Schedule.t() | Prediction.t()) ::
          {{String.t(), String.t(), non_neg_integer}, Schedule.t() | Prediction.t()}
  defp group_transform(%{trip: nil} = ps) do
    {{ps.id, ps.stop.id, ps.stop_sequence}, ps}
  end

  defp group_transform(ps) do
    {{ps.trip.id, ps.stop.id, ps.stop_sequence}, ps}
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

  def upcoming?(ps, current_time) do
    Timex.after?(time(ps) || current_time, current_time)
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

  @spec is_schedule_after?(PredictedSchedule.t(), DateTime.t()) :: boolean
  def is_schedule_after?(%PredictedSchedule{schedule: nil}, _time), do: false

  def is_schedule_after?(%PredictedSchedule{schedule: schedule}, time) do
    Timex.after?(schedule.time, time)
  end

  # Returns unique list of all stop_id's from given schedules and predictions
  @spec unique_map_keys(%{key => Schedule.t()}, %{key => Prediction.t()}) :: [String.t()]
        when key: {String.t(), String.t(), non_neg_integer}
  defp unique_map_keys(schedule_map, prediction_map) do
    schedule_map
    |> Map.keys()
    |> Enum.concat(Map.keys(prediction_map))
    |> Enum.uniq()
  end

  @spec sort_predicted_schedules(PredictedSchedule.t()) ::
          {integer, non_neg_integer, non_neg_integer}
  defp sort_predicted_schedules(%PredictedSchedule{schedule: nil, prediction: prediction}),
    do: {1, prediction.stop_sequence, Timex.to_unix(prediction.time)}

  defp sort_predicted_schedules(%PredictedSchedule{schedule: schedule}),
    do: {2, schedule.stop_sequence, Timex.to_unix(schedule.time)}

  def sort_with_status(%PredictedSchedule{
        schedule: _schedule,
        prediction: %Prediction{time: nil, status: status}
      })
      when not is_nil(status) do
    {0, status_order(status)}
  end

  def sort_with_status(predicted_schedule), do: {1, predicted_schedule |> time |> Timex.to_unix()}

  @spec status_order(String.t()) :: non_neg_integer | :sort_max
  defp status_order("Boarding"), do: 0
  defp status_order("Approaching"), do: 1

  defp status_order(status) do
    case Integer.parse(status) do
      {num, _stops_away} -> num + 1
      _ -> :sort_max
    end
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
    if prediction.time do
      Timex.diff(prediction.time, schedule.time, :minutes)
    else
      0
    end
  end

  @doc """
  Determines if the delay between a predicted and scheduled time are represented
  as different minutes
  """
  @spec minute_delay?(PredictedSchedule.t() | nil) :: boolean
  def minute_delay?(nil), do: false

  def minute_delay?(%PredictedSchedule{schedule: schedule, prediction: prediction})
      when is_nil(schedule) or is_nil(prediction) do
    false
  end

  def minute_delay?(%PredictedSchedule{schedule: schedule, prediction: prediction} = ps) do
    if prediction.time do
      delay(ps) > 0 or schedule.time.minute != prediction.time.minute
    else
      false
    end
  end

  @doc """
  Replaces the stop for both predicted and schedule.
  """
  @spec put_stop(PredictedSchedule.t(), Stops.Stop.t()) :: PredictedSchedule.t()
  def put_stop(
        %PredictedSchedule{schedule: schedule, prediction: prediction} = predicted_schedule,
        %Stops.Stop{} = stop
      ) do
    new_schedule = if schedule, do: %{schedule | stop: stop}, else: schedule
    new_prediction = if prediction, do: %{prediction | stop: stop}, else: prediction
    %{predicted_schedule | prediction: new_prediction, schedule: new_schedule}
  end
end
