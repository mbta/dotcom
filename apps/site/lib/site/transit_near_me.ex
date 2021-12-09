defmodule Site.TransitNearMe do
  @moduledoc """
  Struct and helper functions for gathering data to use on TransitNearMe.
  """

  alias GoogleMaps.Geocode.Address
  alias Predictions.Prediction
  alias Routes.Route
  alias Schedules.{Schedule, Trip}
  alias SiteWeb.{TimeHelpers, ViewHelpers}
  alias Stops.{Nearby, Stop}
  alias Util.Distance

  defstruct stops: [],
            distances: %{},
            schedules: %{}

  @type schedule_data :: %{
          Route.id_t() => %{
            Trip.headsign() => Schedule.t()
          }
        }

  @type distance_hash :: %{Stop.id_t() => float}

  @type t :: %__MODULE__{
          stops: [Stop.t()],
          distances: distance_hash,
          schedules: %{Stop.id_t() => schedule_data}
        }

  @type stops_with_distances :: %{
          stops: [Stop.t()],
          distances: distance_hash
        }

  @type error :: {:error, :timeout | :no_stops}

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

  @default_opts [
    stops_nearby_fn: &Nearby.nearby_with_varying_radius_by_mode/1,
    schedules_fn: &Schedules.Repo.schedule_for_stop/2
  ]

  @spec build(Address.t(), Keyword.t()) :: stops_with_distances
  def build(%Address{} = location, opts) do
    opts = Keyword.merge(@default_opts, opts)
    nearby_fn = Keyword.fetch!(opts, :stops_nearby_fn)
    stops = nearby_fn.(location)

    %{
      stops: stops,
      distances:
        Map.new(
          stops,
          &{&1.id, &1 |> Distance.haversine(location) |> ViewHelpers.round_distance()}
        )
    }
  end

  @spec get_direction_map([PredictedSchedule.t()], Keyword.t()) :: [direction_data]
  def get_direction_map(predicted_schedules, opts) do
    predicted_schedules
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
  def build_direction_map({direction_id, [ps | _] = predicted_schedules}, opts) do
    headsign_fn = Keyword.get(opts, :headsign_fn, &build_headsign_map/2)
    now = Keyword.fetch!(opts, :now)

    route = PredictedSchedule.route(ps)

    stop_id =
      ps
      |> PredictedSchedule.stop()
      |> Stops.Repo.get_parent()
      |> Map.fetch!(:id)

    {closest_time, headsigns} =
      predicted_schedules
      |> PredictedSchedule.Filter.by_route_with_predictions(route, stop_id, now)
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
    TimeHelpers.format_schedule_time(time)
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
    |> Map.put(:time, TimeHelpers.format_prediction_time(prediction.time, route_type, now))
    |> Map.put(:seconds, seconds)
  end
end
