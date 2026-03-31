defmodule Test.Support.PredictedScheduleHelper do
  alias Dotcom.Utils.ServiceDateTime
  alias Test.Support.{Factories, FactoryHelpers, Generators}

  def journey(opts \\ []) do
    include_prediction_statuses = opts |> Keyword.get(:include_prediction_statuses, false)
    last_trip? = opts |> Keyword.get(:last_trip?, false)
    route_types = opts |> Keyword.get(:route_types, [:route])
    stop_count = opts |> Keyword.get(:stop_count, 3)
    stop_id_options = opts |> Keyword.get(:stop_id_options, nil)
    vehicle_stop_index = opts |> Keyword.get(:vehicle_stop_index, 1)
    vehicle_statuses = opts |> Keyword.get(:vehicle_statuses, [:incoming, :in_transit])

    today = Generators.Date.random_date()

    route =
      Factories.Routes.Route.build(Faker.Util.pick(route_types))

    trip = Factories.Schedules.Trip.build(:trip)

    predicted_times =
      Faker.Util.sample_uniq(stop_count, fn ->
        Generators.DateTime.random_time_range_date_time({
          ServiceDateTime.beginning_of_service_day(today),
          ServiceDateTime.end_of_service_day(today)
        })
      end)
      |> Enum.sort(DateTime)

    predicted_arrival_times = predicted_times |> List.replace_at(0, nil)

    predicted_departure_times =
      predicted_times |> Enum.map(&DateTime.shift(&1, second: 30)) |> List.replace_at(-1, nil)

    stop_id_fn =
      case stop_id_options do
        nil -> fn -> FactoryHelpers.build(:id) end
        options -> fn -> Faker.Util.pick(options) end
      end

    stops =
      stop_count
      |> Faker.Util.sample_uniq(stop_id_fn)
      |> Enum.map(&Factories.Stops.Stop.build(:stop, id: &1))

    stop_sequences = Faker.Util.sample_uniq(stop_count, fn -> Faker.random_between(1, 10_000) end)

    prediction_statuses =
      cond do
        include_prediction_statuses ->
          Faker.Util.sample_uniq(stop_count, fn -> Faker.Lorem.sentence() end)

        true ->
          1..stop_count |> Enum.map(fn _ -> nil end)
      end

    platform_stop_ids = stop_count |> Faker.Util.sample_uniq(fn -> FactoryHelpers.build(:id) end)

    predictions =
      Enum.zip([
        stops,
        predicted_arrival_times,
        predicted_departure_times,
        stop_sequences,
        prediction_statuses,
        platform_stop_ids
      ])
      |> Enum.map(fn {stop, arrival_time, departure_time, stop_sequence, status, platform_stop_id} ->
        Factories.Predictions.Prediction.build(:prediction,
          arrival_time: arrival_time,
          departure_time: departure_time,
          last_trip?: last_trip?,
          platform_stop_id: platform_stop_id,
          route: route,
          status: status,
          stop: stop,
          stop_sequence: stop_sequence,
          trip: trip
        )
      end)

    stop_sequence = stop_sequences |> Enum.at(vehicle_stop_index)
    stop = stops |> Enum.at(vehicle_stop_index)

    vehicle =
      Factories.Vehicles.Vehicle.build(:vehicle,
        status: Faker.Util.pick(vehicle_statuses),
        stop_id: stop.id,
        stop_sequence: stop_sequence
      )

    %{
      platform_stop_ids: platform_stop_ids,
      predicted_arrival_times: predicted_arrival_times,
      prediction_statuses: prediction_statuses,
      predictions: predictions,
      route: route,
      stop_sequences: stop_sequences,
      stops: stops,
      trip_id: trip.id,
      trip: trip,
      vehicle: vehicle
    }
  end
end
