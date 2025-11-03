defmodule Dotcom.TransitNearMe do
  @moduledoc """
  Struct and helper functions for gathering data to use on TransitNearMe.
  """

  use Dotcom.Gettext.Sigils

  require Logger

  alias DotcomWeb.ViewHelpers
  alias PredictedSchedule.Display
  alias Predictions.Prediction
  alias Routes.Route
  alias Schedules.{Schedule, Trip}
  alias Stops.Stop
  alias Vehicles.Vehicle

  @stops_repo Application.compile_env!(:dotcom, :repo_modules)[:stops]

  @stops_without_predictions [
    "place-lake",
    "place-clmnl",
    "place-river",
    "place-hsmnl"
  ]

  @type schedule_data :: %{
          Route.id_t() => %{
            Trip.headsign() => Schedule.t()
          }
        }

  @type error :: {:error, :timeout | :no_stops}

  @type enhanced_time_data_by_stop :: %{
          Stop.id_t() => [enhanced_time_data()]
        }

  @type enhanced_time_data :: %{
          # Headsign name
          name: String.t(),
          time_data_with_crowding_list: [
            time_data_with_crowding()
          ],
          train_number: String.t() | nil
        }

  @type time_data_with_crowding :: %{
          time_data: time_data(),
          crowding: Vehicle.crowding() | nil,
          predicted_schedule: PredictedSchedule
        }

  @type time_data :: %{
          required(:scheduled_time) => [String.t()] | nil,
          required(:prediction) => simple_prediction() | nil,
          required(:delay) => integer
        }

  @type simple_prediction :: %{
          required(:seconds) => integer,
          required(:time) => [String.t()],
          required(:status) => String.t() | nil,
          required(:track) => String.t() | nil,
          required(:schedule_relationship) => Prediction.schedule_relationship()
        }

  @type enhanced_predicted_schedule :: %{
          predicted_schedule: PredictedSchedule.t(),
          time_data: time_data(),
          crowding: Vehicle.crowding() | nil
        }

  @spec get_direction_map([PredictedSchedule.t()], Keyword.t()) :: [direction_data]
  def get_direction_map(schedules, opts) do
    schedules
    |> Enum.group_by(&PredictedSchedule.direction_id/1)
    |> Enum.map(&build_direction_map(&1, opts))
    |> sort_by_time()
    |> elem(1)
  end

  @spec build_time_map(PredictedSchedule.t(), Keyword.t()) :: predicted_schedule_and_time_data
  def build_time_map(%PredictedSchedule{} = predicted_schedule, opts) do
    now = Keyword.fetch!(opts, :now)

    route_type =
      predicted_schedule
      |> PredictedSchedule.route()
      |> Route.type_atom()

    {
      predicted_schedule,
      %{
        delay: PredictedSchedule.delay(predicted_schedule),
        scheduled_time: scheduled_time(predicted_schedule),
        prediction: simple_prediction(predicted_schedule.prediction, route_type, now)
      }
    }
  end

  @spec format_prediction_time(DateTime.t(), DateTime.t(), atom, integer) ::
          [String.t()] | String.t()

  def format_prediction_time(%DateTime{} = time, now, :subway, seconds) when seconds > 30 do
    Display.do_time_difference(time, now, &format_time/1, 120)
  end

  def format_prediction_time(_, _, :subway, _), do: [~t"arriving"]

  def format_prediction_time(%DateTime{} = time, now, :bus, seconds) when seconds > 60 do
    Display.do_time_difference(time, now, &format_time/1, 120)
  end

  def format_prediction_time(_, _, :bus, _), do: [~t"arriving"]

  def format_prediction_time(%DateTime{} = time, _now, _, _) do
    format_time(time)
  end

  @spec format_time(DateTime.t()) :: [String.t()]
  def format_time(time) do
    [time, am_pm] =
      time
      |> Dotcom.Utils.Time.format!(:hour_12_minutes)
      |> String.split(" ")

    [time, " ", am_pm]
  end

  @spec sort_by_time([{DateTime.t() | nil, any}]) ::
          {DateTime.t() | nil, [any]}

  defp sort_by_time([]) do
    {nil, []}
  end

  defp sort_by_time(list) do
    {[closest_time | _], sorted} =
      list
      |> Enum.sort_by(fn
        {nil, _data} -> nil
        {time, _data} -> DateTime.to_unix(time)
      end)
      |> Enum.unzip()

    {closest_time, sorted}
  end

  @type headsign_data :: %{
          required(:name) => String.t(),
          required(:times) => [time_data],
          required(:train_number) => String.t() | nil
        }

  @type direction_data :: %{
          required(:direction_id) => 0 | 1,
          required(:headsigns) => [headsign_data]
        }

  @spec build_direction_map({0 | 1, [PredictedSchedule.t()]}, Keyword.t()) ::
          {DateTime.t(), direction_data}
  def build_direction_map({direction_id, [ps | _] = schedules}, opts) do
    headsign_fn = Keyword.get(opts, :headsign_fn, &build_headsign_map/2)
    now = Keyword.fetch!(opts, :now)

    route = PredictedSchedule.route(ps)

    stop_id =
      ps
      |> PredictedSchedule.stop()
      |> @stops_repo.get_parent()
      |> Map.fetch!(:id)

    {closest_time, headsigns} =
      schedules
      |> filter_predicted_schedules(route, stop_id, now)
      |> Enum.group_by(&((trip = PredictedSchedule.trip(&1)) && trip.headsign))
      |> Enum.map(fn {headsign, predicted_scheds} ->
        predicted_scheds =
          Enum.sort_by(predicted_scheds, &(&1 |> PredictedSchedule.time() |> DateTime.to_unix()))

        headsign_fn.({headsign, predicted_scheds}, opts)
      end)
      |> sort_by_time()

    {
      closest_time,
      %{
        direction_id: direction_id,
        headsigns: headsigns
      }
    }
  end

  @spec filter_predicted_schedules(
          [PredictedSchedule.t()],
          Routes.Route.t(),
          Stop.id_t(),
          DateTime.t()
        ) :: [
          PredictedSchedule.t()
        ]
  def filter_predicted_schedules(predicted_schedules, %Route{}, stop_id, %DateTime{})
      when stop_id in @stops_without_predictions do
    predicted_schedules
  end

  def filter_predicted_schedules(predicted_schedules, %Route{type: type}, _stop_id, now)
      when type in [0, 1] do
    # subway routes should only use predictions
    predicted_schedules
    |> Enum.filter(&PredictedSchedule.has_prediction?/1)
    |> case do
      [_ | _] = predictions ->
        predictions

      [] ->
        if late_night?(now) do
          predicted_schedules
        else
          []
        end
    end
  end

  def filter_predicted_schedules(predicted_schedules, %Route{}, _stop_id, %DateTime{}) do
    # all other modes can use schedules
    predicted_schedules
  end

  def late_night?(%DateTime{} = datetime) do
    time = DateTime.to_time(datetime)

    after_midnight?(time) and before_service_start?(time)
  end

  defp after_midnight?(%Time{} = time), do: Time.compare(time, ~T[00:00:00]) in [:eq, :gt]

  defp before_service_start?(%Time{} = time), do: Time.compare(time, ~T[03:00:00]) === :lt

  @spec build_headsign_map(
          {Schedules.Trip.headsign(), [PredictedSchedule.t()]},
          Keyword.t()
        ) :: {DateTime.t(), headsign_data}
  defp build_headsign_map({headsign, [ps | _] = schedules}, opts) do
    route = PredictedSchedule.route(ps)
    trip = PredictedSchedule.trip(ps)

    {[soonest | _], headsign_schedules} =
      schedules
      |> Enum.take(schedule_count(route))
      |> Enum.map(&build_time_map(&1, opts))
      |> filter_headsign_schedules(route)
      |> Enum.unzip()

    {
      PredictedSchedule.time(soonest),
      %{
        name: headsign && ViewHelpers.break_text_at_slash(headsign),
        times: headsign_schedules,
        train_number: trip && trip.name
      }
    }
  end

  def schedule_count(%Route{type: 2}), do: 1
  # get more bus schedules because some will be dropped later
  def schedule_count(%Route{type: 3}), do: 4
  def schedule_count(%Route{}), do: 2

  @type predicted_schedule_and_time_data :: {PredictedSchedule.t(), time_data}

  @spec filter_headsign_schedules([predicted_schedule_and_time_data], Route.t() | nil) :: [
          predicted_schedule_and_time_data
        ]
  def filter_headsign_schedules(schedules, %Route{type: 3}) do
    # for bus, remove items with a nil prediction when at least one item has a prediction
    prediction_available? =
      Enum.any?(schedules, &(&1 |> elem(0) |> PredictedSchedule.has_prediction?()))

    if prediction_available? do
      schedules
      |> Enum.filter(&(&1 |> elem(0) |> PredictedSchedule.has_prediction?()))
      |> Enum.take(2)
    else
      schedules
      |> Enum.take(2)
      |> filter_headsign_schedules(nil)
    end
  end

  def filter_headsign_schedules(
        [{%PredictedSchedule{}, _} = keep, {%PredictedSchedule{prediction: nil}, _}],
        _
      ) do
    # only show one schedule if the second schedule has no prediction
    [keep]
  end

  def filter_headsign_schedules(schedules, _) do
    schedules
  end

  defp scheduled_time(%PredictedSchedule{schedule: %Schedule{time: time}}) do
    format_time(time)
  end

  defp scheduled_time(%PredictedSchedule{}) do
    nil
  end

  @spec simple_prediction(Prediction.t() | nil, atom, DateTime.t()) :: simple_prediction | nil
  def simple_prediction(nil, _route_type, _now) do
    nil
  end

  def simple_prediction(%Prediction{time: nil}, _route_type, _now) do
    nil
  end

  def simple_prediction(%Prediction{time: %DateTime{}} = prediction, route_type, now) do
    seconds = DateTime.diff(prediction.time, now)

    prediction
    |> Map.take([:status, :track, :schedule_relationship])
    |> Map.put(:time, format_prediction_time(prediction.time, now, route_type, seconds))
    |> Map.put(:seconds, seconds)
  end
end
