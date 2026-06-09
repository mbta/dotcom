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
  @type t() :: %{key_t() => PredictedSchedule.t()}

  @spec new([Schedules.Schedule.t()]) :: t()
  @doc """
  Constructs a new `Collection` from a list of schedules.
  """
  def new(schedules) do
    schedules
    |> Map.new(fn schedule ->
      {key(schedule), %PredictedSchedule{schedule: schedule}}
    end)
  end

  @spec put_prediction(t(), Predictions.Prediction.t()) :: t()
  @doc """
  Efficiently adds a prediction to the `Collection`. If there is an associated schedule,
  it attaches the prediction to that schedule; otherwise, it creates a new entry.
  """
  def put_prediction(collection, prediction) do
    key = key(prediction)

    new_predicted_schedule =
      collection
      |> Map.get(key)
      |> case do
        %PredictedSchedule{} = ps ->
          %PredictedSchedule{ps | prediction: prediction}

        _ ->
          %PredictedSchedule{prediction: prediction}
      end

    collection |> Map.put(key, new_predicted_schedule)
  end

  @spec delete_prediction(t(), Predictions.Prediction.t()) :: t()
  @doc """
  Efficiently removes a prediction from the `Collection`. If there was a schedule associated
  with that prediction, then the schedule is preserved; if there wasn't one, then the entry
  is removed.
  """
  def delete_prediction(collection, prediction) do
    key = key(prediction)

    collection
    |> Map.get(key)
    |> case do
      %PredictedSchedule{schedule: schedule} = ps when schedule != nil ->
        collection |> Map.put(key, %PredictedSchedule{ps | prediction: nil})

      _ ->
        collection |> Map.delete(key)
    end
  end

  @spec to_list(t()) :: [PredictedSchedule.t()]
  @doc """
  Returns a list containing the `PredictedSchedule`'s in the `Collection`.
  """
  def to_list(collection) do
    collection
    |> Map.values()
  end

  @spec key(Schedules.Schedule.t() | Predictions.Prediction.t()) :: key_t()
  defp key(%{trip: %{id: trip_id}, stop_sequence: stop_sequence}) do
    {trip_id, stop_sequence}
  end
end
