defmodule PredictedSchedule.Collection do
  @moduledoc """
  A data structure for efficiently combining `Predictions.Prediction`'s and `Schedules.Schedule`'s into
  `PredictedSchedule`'s.

  `PredictedSchedule.Collection` provides the `new/1` function to construct a new collection from
  schedules, and a `to_list/1` function to convert its data into a list. In the absence of
  predictions, it converts each schedule to a `PredictedSchedule` with a `nil` prediction.
      iex> schedule =
      ...>   %Schedules.Schedule{
      ...>     trip: %Schedules.Trip{id: "trip_id"},
      ...>     stop_sequence: 100
      ...>   }
      iex> [schedule]
      ...> |> PredictedSchedule.Collection.new()
      ...> |> PredictedSchedule.Collection.to_list()
      [
        %PredictedSchedule{schedule: schedule, prediction: nil}
      ]

  When given a prediction, it attaches that prediction to its associated schedule, if possible.
      iex> schedule =
      ...>   %Schedules.Schedule{
      ...>     trip: %Schedules.Trip{id: "trip_id"},
      ...>     stop_sequence: 100
      ...>   }
      iex> prediction =
      ...>   %Predictions.Prediction{
      ...>     trip: %Schedules.Trip{id: "trip_id"},
      ...>     stop_sequence: 100
      ...>   }
      iex> [schedule]
      ...> |> PredictedSchedule.Collection.new()
      ...> |> PredictedSchedule.Collection.put_prediction(prediction)
      ...> |> PredictedSchedule.Collection.to_list()
      [
        %PredictedSchedule{schedule: schedule, prediction: prediction}
      ]

  If a prediction isn't associated with a schedule, then it creates a new entry for it.
      iex> prediction =
      ...>   %Predictions.Prediction{
      ...>     trip: %Schedules.Trip{id: "trip_id"},
      ...>     stop_sequence: 100
      ...>   }
      iex> []
      ...> |> PredictedSchedule.Collection.new()
      ...> |> PredictedSchedule.Collection.put_prediction(prediction)
      ...> |> PredictedSchedule.Collection.to_list()
      [
        %PredictedSchedule{schedule: nil, prediction: prediction}
      ]

  Predictions can also be removed.
      iex> schedule =
      ...>   %Schedules.Schedule{
      ...>     trip: %Schedules.Trip{id: "trip_id"},
      ...>     stop_sequence: 100
      ...>   }
      iex> prediction =
      ...>   %Predictions.Prediction{
      ...>     trip: %Schedules.Trip{id: "trip_id"},
      ...>     stop_sequence: 100
      ...>   }
      iex> [schedule]
      ...> |> PredictedSchedule.Collection.new()
      ...> |> PredictedSchedule.Collection.put_prediction(prediction)
      ...> |> PredictedSchedule.Collection.delete_prediction(prediction)
      ...> |> PredictedSchedule.Collection.to_list()
      [
        %PredictedSchedule{schedule: schedule, prediction: nil}
      ]
  """

  @type key_t() :: {Schedules.Trip.id_t(), non_neg_integer()}
  @type t() :: %{
          base: %{key_t() => PredictedSchedule.t()},
          populated: %{key_t() => PredictedSchedule.t()}
        }

  @spec new([Schedules.Schedule.t()]) :: t()
  @doc """
  Constructs a new `Collection` from a list of schedules.
  """
  def new(schedules) do
    predicted_schedule_map =
      schedules
      |> Map.new(fn schedule ->
        {key(schedule), %PredictedSchedule{schedule: schedule}}
      end)

    %{base: predicted_schedule_map, populated: predicted_schedule_map}
  end

  @spec put_prediction(t(), Predictions.Prediction.t()) :: t()
  @doc """
  Efficiently adds a prediction to the `Collection`. If there is an associated schedule,
  it attaches the prediction to that schedule; otherwise, it creates a new entry.
  """
  def put_prediction(%{populated: populated} = collection, prediction) do
    new_map =
      Map.update(
        populated,
        key(prediction),
        %PredictedSchedule{prediction: prediction},
        fn %PredictedSchedule{} = ps ->
          %PredictedSchedule{ps | prediction: prediction}
        end
      )

    %{collection | populated: new_map}
  end

  @spec delete_prediction(t(), Predictions.Prediction.t()) :: t()
  @doc """
  Efficiently removes a prediction from the `Collection`. If there was a schedule associated
  with that prediction, then the schedule is preserved; if there wasn't one, then the entry
  is removed.
  """
  def delete_prediction(%{populated: populated} = collection, prediction) do
    key = key(prediction)

    new_map =
      populated
      |> Map.get(key)
      |> case do
        %PredictedSchedule{schedule: schedule} = ps when schedule != nil ->
          populated |> Map.put(key, %PredictedSchedule{ps | prediction: nil})

        _ ->
          populated |> Map.delete(key)
      end

    %{collection | populated: new_map}
  end

  @spec clear_predictions(t()) :: t()
  @doc """
  Efficiently removes all predictions from the `Collection` and restores it to its state
  before any predictions were added.
  """
  def clear_predictions(%{base: base} = collection) do
    %{collection | populated: base}
  end

  @spec update_schedules(t(), [Schedules.Schedule.t()]) :: t()
  @doc """
  > #### Warning {: .warning}
  >
  > This function is less performant than the others. `put_prediction/2`, `delete_prediction/2`,
  > and `clear_predictions/1` are all expected to be called frequently, but this should only be
  > called at service day boundaries and rating changes, so its efficiency is less important.

  Swaps out the underlying schedules, replaces them with `new_schedules`, and re-applies the
  predictions that were previously passed in.
  """
  def update_schedules(%{populated: populated}, new_schedules) do
    populated
    |> Enum.map(fn {_key, %PredictedSchedule{prediction: prediction}} -> prediction end)
    |> Enum.reject(&is_nil/1)
    |> Enum.reduce(new(new_schedules), fn prediction, new_collection ->
      new_collection |> put_prediction(prediction)
    end)
  end

  @spec to_list(t()) :: [PredictedSchedule.t()]
  @doc """
  Returns a list containing the `PredictedSchedule`'s in the `Collection`.
  """
  def to_list(%{populated: populated}) do
    populated
    |> Map.values()
  end

  @spec key(Schedules.Schedule.t() | Predictions.Prediction.t()) :: key_t()
  defp key(%{trip: %{id: trip_id}, stop_sequence: stop_sequence}), do: {trip_id, stop_sequence}
  defp key(%{trip_id: trip_id, stop_sequence: stop_sequence}), do: {trip_id, stop_sequence}
end
