defmodule Journey.Filter do
  @moduledoc """
  Helpful functions for filtering and sorting Journeys
  """

  @type filter_flag_t :: :last_trip_and_upcoming | :predictions_then_schedules

  # Max amount of trips that should be displayed
  @trip_limit 14

  # filter the journeys based on the filter_flag
  # Currently, the following options are supported:
  # * :last_trip_and_upcoming -- only leave upcoming trips and one before (used for Commuter Rail and Ferry)
  # * :predictions_then_schedules -- remove all scheduled trips before predictions.
  #                                  That is, make sure the list starts with predictions, followed by schedules
  #
  @spec filter([Journey.t()], filter_flag_t, DateTime.t() | nil) :: [Journey.t()]
  def filter(journeys, _filter_flag, nil), do: journeys

  def filter(journeys, :last_trip_and_upcoming, current_time) do
    remove_departure_schedules_before_last_trip(journeys, current_time)
  end

  def filter(journeys, :predictions_then_schedules, current_time) do
    remove_departure_schedules_before_predictions(journeys, current_time)
  end

  # remove all journeys without predictions (that just have schedule) before the predicted ones
  @spec remove_departure_schedules_before_predictions([Journey.t()], DateTime.t() | nil) :: [
          Journey.t()
        ]
  def remove_departure_schedules_before_predictions(journeys, current_time) do
    max_prediction_time = find_max_departure_prediction_time(journeys)

    if max_prediction_time do
      remove_departure_schedules_before(journeys, max_prediction_time)
    else
      remove_departure_schedules_before_last_trip(journeys, current_time)
    end
  end

  # remove all journeys without predictions before `current_time`
  # except for the most recent one
  @spec remove_departure_schedules_before_last_trip([Journey.t()], DateTime.t() | nil) :: [
          Journey.t()
        ]
  def remove_departure_schedules_before_last_trip(journeys, current_time) do
    last_trip_time = find_max_earlier_departure_schedule_time(journeys, current_time)

    if last_trip_time do
      remove_departure_schedules_before(journeys, last_trip_time)
    else
      journeys
    end
  end

  @spec find_max_departure_prediction_time([Journey.t()]) :: DateTime.t() | nil
  def find_max_departure_prediction_time(journeys) do
    journeys
    |> Enum.max_by(&Journey.departure_prediction_time/1, fn -> nil end)
    |> Journey.departure_prediction_time()
  end

  # find the maximum scheduled departure before given time
  @spec find_max_earlier_departure_schedule_time([Journey.t()], DateTime.t()) ::
          DateTime.t() | nil
  def find_max_earlier_departure_schedule_time(journeys, time) do
    only_past_schedules =
      journeys
      |> Enum.reject(&is_nil(&1))
      |> Enum.filter(&Journey.has_departure_schedule?(&1))
      |> Enum.reject(&Journey.departure_schedule_after?(&1, time))

    if only_past_schedules == journeys do
      nil
    else
      only_past_schedules
      |> Enum.max_by(&Journey.departure_schedule_time(&1), fn -> nil end)
      |> Journey.departure_schedule_time()
    end
  end

  @spec remove_departure_schedules_before([Journey.t()], DateTime.t()) :: [Journey.t()]
  def remove_departure_schedules_before(journeys, nil), do: journeys

  def remove_departure_schedules_before(journeys, time) do
    journeys
    |> Enum.reject(&is_nil(&1))
    |> Enum.filter(&(Journey.has_prediction?(&1) or not Journey.departure_schedule_before?(&1, time)))
  end

  def sort(journeys) do
    Enum.sort(journeys, &Journey.before?/2)
  end

  @doc """
  When given true, limits the amount of journeys to `@trip_limit`
  Otherwise, returns the list as is
  """
  @spec limit([Journey.t()], boolean) :: [Journey.t()]
  def limit(journeys, false), do: journeys

  def limit(journeys, true) do
    Enum.take(journeys, @trip_limit)
  end

  @doc """
  Determines whether the filtered times are expanded, collapsed, or neither.
  """
  @spec expansion([Journey.t()], [Journey.t()], boolean) :: :expanded | :collapsed | :none
  def expansion(expanded_times, collapsed_times, keep_all?) do
    cond do
      length(expanded_times) == length(collapsed_times) -> :none
      keep_all? -> :expanded
      true -> :collapsed
    end
  end
end
