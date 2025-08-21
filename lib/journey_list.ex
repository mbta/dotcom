defmodule JourneyList do
  @moduledoc """
  Responsible for grouping together schedules and predictions based on an origin and destination, in
  a form to be used in the schedule views.
  """

  alias PredictedSchedule.Group
  alias Predictions.Prediction
  alias Routes.Route
  alias Schedules.{Schedule, Trip}

  defstruct journeys: [],
            expansion: :none

  @type t :: %__MODULE__{
          journeys: [Journey.t()],
          expansion: :expanded | :collapsed | :none
        }
  @type stop_id :: Stops.Stop.id_t()
  @type schedule_pair :: Group.schedule_pair_t()
  @type schedule_or_pair :: Schedule.t() | schedule_pair
  @type map_key_t :: Group.map_key_t()
  @type schedule_map :: %{map_key_t => %{stop_id => Schedule.t()}}
  @type schedule_pair_map :: %{map_key_t => schedule_pair}
  @type filter_flag_t :: Journey.Filter.filter_flag_t()
  @type opt_string :: String.t() | nil

  @build_opts [origin_id: nil, destination_id: nil, current_time: nil]

  @doc "Returns true if any of the journeys have a prediction"
  def has_predictions?(journeys) do
    journeys
    |> Enum.any?(&Journey.has_prediction?/1)
  end

  @doc """
  Builds a JourneyList from given schedules and predictions.
  schedules: Schedules to be combined with predictions for Journeys
  predictions: Predictions to combined with schedules for Journeys
  origin_id (optional): Trip origin
  destination_id (optional): Trip Destination
  filter_flag: Flag to determine how the trip list will be filtered and sorted
  current_time (optional): Current time, used to determine the first trip to in filtered/sorted list. If nil, all trips will be returned
  keep_all?: Determines if all journeys should be returned, regardless of filter flag
  """
  def build(schedules, predictions, filter_flag, keep_all?, user_opts) do
    opts = Keyword.merge(@build_opts, user_opts)

    case schedules do
      {:error, _json_api_error} ->
        []

      _ ->
        schedules
        |> build_journeys(predictions, opts[:origin_id], opts[:destination_id])
        |> from_journeys(filter_flag, opts[:current_time], keep_all?)
    end
  end

  @doc """
  Build a JourneyList using only predictions. This will also filter out predictions that are
  missing departure_predictions. Limits to 5 predictions at most.
  """
  def build_predictions_only(schedules, predictions, origin_id, destination_id) do
    journey_list =
      schedules
      |> build_journeys(predictions, origin_id, destination_id)
      |> Enum.filter(&Journey.has_departure_prediction?/1)
      |> from_journeys(:predictions_then_schedules, nil, true)

    next_five =
      journey_list.journeys
      |> Enum.reject(fn journey ->
        journey.departure.prediction.schedule_relationship in [:cancelled, :skipped] ||
          missing_prediction_time_unless_recent_departure(journey)
      end)
      |> Enum.take(5)

    %{journey_list | journeys: next_five}
  end

  # nil prediction times usually mean vehicles having departed in the past, but
  # we can still show them if they're marked with the "Departed" status
  defp missing_prediction_time_unless_recent_departure(%Journey{
         departure: %{
           prediction: %{time: nil, status: status}
         }
       }) do
    status !== "Departed"
  end

  defp missing_prediction_time_unless_recent_departure(_), do: false

  defp build_journeys(schedule_pairs, predictions, origin_id, destination_id)
       when is_binary(origin_id) and is_binary(destination_id) do
    predictions = match_schedule_direction(schedule_pairs, predictions)

    journeys =
      group_trips(
        schedule_pairs,
        predictions,
        origin_id,
        destination_id,
        build_schedule_map_fn: &build_schedule_pair_map/2,
        trip_mapper_fn: &build_journey(&1, &2, &3, origin_id, destination_id)
      )

    Enum.reject(journeys, &reversed_journey?/1)
  end

  defp build_journeys(schedules, predictions, origin_id, nil) when is_binary(origin_id) do
    group_trips(
      schedules,
      predictions,
      origin_id,
      nil,
      build_schedule_map_fn: &build_schedule_map/2,
      trip_mapper_fn: &predicted_departures(&1, &2, &3, origin_id)
    )
  end

  defp build_journeys(_schedules, _predictions, _origin_id, _destination_id), do: []

  # Creates a JourneyList object from a list of journeys and the expansion value
  # Both the expanded and collapsed journeys are calculated in order to determine the `expansion` field
  defp from_journeys(expanded_journeys, filter_flag, current_time, keep_all?) do
    collapsed_journeys =
      expanded_journeys
      |> Journey.Filter.filter(filter_flag, current_time)
      |> Journey.Filter.sort()
      |> Journey.Filter.limit(!keep_all?)

    %__MODULE__{
      journeys:
        if(keep_all?, do: Journey.Filter.sort(expanded_journeys), else: collapsed_journeys),
      expansion: Journey.Filter.expansion(expanded_journeys, collapsed_journeys, keep_all?)
    }
  end

  defp group_trips(schedules, predictions, origin_id, destination_id, mappers) do
    prediction_map = Group.build_prediction_map(predictions, schedules, origin_id, destination_id)

    schedule_map = Enum.reduce(schedules, %{}, mappers[:build_schedule_map_fn])
    trip_mapper_fn = mappers[:trip_mapper_fn]

    schedule_map
    |> get_trips(prediction_map)
    |> Enum.map(&trip_mapper_fn.(&1, schedule_map, prediction_map))
  end

  defp build_journey(key, schedule_map, prediction_map, origin_id, dest) do
    departure_prediction = prediction_map[key][origin_id]
    arrival_prediction = prediction_map[key][dest]

    case Map.get(schedule_map, key) do
      {departure, arrival} ->
        trip = first_trip([departure_prediction, departure, arrival_prediction, arrival])

        %Journey{
          departure: %PredictedSchedule{schedule: departure, prediction: departure_prediction},
          arrival: %PredictedSchedule{schedule: arrival, prediction: arrival_prediction},
          trip: trip
        }

      nil ->
        trip = first_trip([departure_prediction, arrival_prediction])

        %Journey{
          departure: %PredictedSchedule{schedule: nil, prediction: departure_prediction},
          arrival: %PredictedSchedule{schedule: nil, prediction: arrival_prediction},
          trip: trip
        }
    end
  end

  defp predicted_departures(key, schedule_map, prediction_map, origin_id) do
    departure_schedule = schedule_map[key][origin_id]
    departure_prediction = prediction_map[key][origin_id]

    %Journey{
      departure: %PredictedSchedule{
        schedule: departure_schedule,
        prediction: departure_prediction
      },
      arrival: nil,
      trip: first_trip([departure_prediction, departure_schedule])
    }
  end

  defp get_trips(schedule_map, prediction_map) do
    [prediction_map, schedule_map]
    |> Enum.map(&Map.keys/1)
    |> Enum.concat()
    |> Enum.uniq()
  end

  defp build_schedule_pair_map({departure, arrival}, schedule_pair_map) do
    key = departure.trip
    Map.put(schedule_pair_map, key, {departure, arrival})
  end

  defp build_schedule_map(schedule, schedule_map) do
    key = schedule.trip

    # Some ferry trips visit the same stop multiple times along the route. In
    # this case we don't want to overwrite the existing schedule_map entry
    if Route.type_atom(schedule.route) == :ferry && get_in(schedule_map, [key, schedule.stop.id]) do
      schedule_map
    else
      updater = fn trip_map -> Map.merge(trip_map, %{schedule.stop.id => schedule}) end
      Map.update(schedule_map, key, %{schedule.stop.id => schedule}, updater)
    end
  end

  defp first_trip(list_with_trips) do
    list_with_valid_trips =
      list_with_trips
      |> Enum.reject(&is_nil/1)

    if Enum.empty?(list_with_valid_trips) do
      nil
    else
      list_with_valid_trips
      |> List.first()
      |> Map.get(:trip)
    end
  end

  defp reversed_journey?(journey) do
    case {Journey.departure_time(journey), Journey.arrival_time(journey)} do
      {nil, _} ->
        # no departure time, ignore the journey
        true

      {_, nil} ->
        false

      {departure_time, arrival_time} ->
        Timex.after?(departure_time, arrival_time)
    end
  end

  # reject predictions which are going in the wrong direction from the schedule
  defp match_schedule_direction(schedule_pairs, predictions)

  defp match_schedule_direction([], predictions) do
    predictions
  end

  defp match_schedule_direction([{departure_schedule, _} | _], predictions) do
    direction_id = departure_schedule.trip.direction_id
    Enum.filter(predictions, &match?(%{direction_id: ^direction_id}, &1))
  end
end

defimpl Enumerable, for: JourneyList do
  def count(_journey_list) do
    {:error, __MODULE__}
  end

  def member?(_journey_list, %JourneyList{}) do
    {:error, __MODULE__}
  end

  def member?(_journey_list, _other) do
    {:ok, false}
  end

  def reduce(%{journeys: journeys}, acc, fun) do
    Enumerable.reduce(journeys, acc, fun)
  end

  def slice(_journey_list) do
    {:error, __MODULE__}
  end
end
