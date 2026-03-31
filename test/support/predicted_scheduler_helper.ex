defmodule Test.Support.PredictedScheduleHelper do
  alias Dotcom.Utils.ServiceDateTime
  alias Test.Support.{Factories, FactoryHelpers, Generators}

  def journey(opts \\ []) do
    cancelled? = opts |> Keyword.get(:cancelled?, false)
    include_prediction_statuses = opts |> Keyword.get(:include_prediction_statuses, false)
    last_trip? = opts |> Keyword.get(:last_trip?, false)
    route_types = opts |> Keyword.get(:route_types, [:route])
    seconds_behind = opts |> Keyword.get(:seconds_behind, 0)
    skipped_stops = opts |> Keyword.get(:skipped_stops, []) |> MapSet.new()
    stop_count = opts |> Keyword.get(:stop_count, 3)
    stop_id_options = opts |> Keyword.get(:stop_id_options, nil)
    vehicle_stop_index = opts |> Keyword.get(:vehicle_stop_index, 1)
    vehicle_statuses = opts |> Keyword.get(:vehicle_statuses, [:incoming, :in_transit])

    today = Generators.Date.random_date()

    route =
      Factories.Routes.Route.build(Faker.Util.pick(route_types))

    trip = Factories.Schedules.Trip.build(:trip)

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
    platform_stop_ids = stop_count |> Faker.Util.sample_uniq(fn -> FactoryHelpers.build(:id) end)

    scheduled_times =
      Faker.Util.sample_uniq(stop_count, fn ->
        Generators.DateTime.random_time_range_date_time({
          ServiceDateTime.beginning_of_service_day(today),
          ServiceDateTime.end_of_service_day(today)
        })
      end)
      |> Enum.sort(DateTime)

    scheduled_arrival_times = scheduled_times |> List.replace_at(0, nil)

    scheduled_departure_times =
      scheduled_times |> Enum.map(&DateTime.shift(&1, second: 30)) |> List.replace_at(-1, nil)

    schedules =
      Enum.zip([
        stops,
        scheduled_arrival_times,
        scheduled_departure_times,
        stop_sequences,
        platform_stop_ids
      ])
      |> Enum.map(fn {stop, arrival_time, departure_time, stop_sequence, platform_stop_id} ->
        Factories.Schedules.Schedule.build(:schedule,
          arrival_time: arrival_time,
          departure_time: departure_time,
          platform_stop_id: platform_stop_id,
          route: route,
          stop: stop,
          stop_sequence: stop_sequence,
          trip: trip
        )
      end)

    predicted_times = scheduled_times |> Enum.map(&DateTime.shift(&1, second: seconds_behind))

    predicted_arrival_times = predicted_times |> List.replace_at(0, nil)

    predicted_departure_times =
      predicted_times |> Enum.map(&DateTime.shift(&1, second: 30)) |> List.replace_at(-1, nil)

    prediction_statuses =
      cond do
        include_prediction_statuses ->
          Faker.Util.sample_uniq(stop_count, fn -> Faker.Lorem.sentence() end)

        true ->
          1..stop_count |> Enum.map(fn _ -> nil end)
      end

    predictions =
      Enum.zip([
        stops,
        predicted_arrival_times,
        predicted_departure_times,
        stop_sequences,
        prediction_statuses,
        platform_stop_ids
      ])
      |> Enum.with_index(fn {stop, arrival_time, departure_time, stop_sequence, status,
                             platform_stop_id},
                            index ->
        build_prediction(
          %{
            arrival_time: arrival_time,
            departure_time: departure_time,
            last_trip?: last_trip?,
            platform_stop_id: platform_stop_id,
            route: route,
            status: status,
            stop: stop,
            stop_sequence: stop_sequence,
            trip: trip
          },
          %{
            cancelled?: cancelled?,
            skipped?: MapSet.member?(skipped_stops, index)
          }
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
      scheduled_arrival_times: scheduled_arrival_times,
      scheduled_departure_times: scheduled_departure_times,
      schedules: schedules,
      stop_sequences: stop_sequences,
      stops: stops,
      trip: trip,
      trip_id: trip.id,
      vehicle: vehicle
    }
  end

  defp build_prediction(args, %{cancelled?: true}) do
    Factories.Predictions.Prediction.build(
      :prediction,
      args
      |> Map.merge(%{
        arrival_time: nil,
        departure_time: nil,
        schedule_relationship: :cancelled
      })
    )
  end

  defp build_prediction(args, %{skipped?: true}) do
    Factories.Predictions.Prediction.build(
      :prediction,
      args
      |> Map.merge(%{
        arrival_time: nil,
        departure_time: nil,
        schedule_relationship: :skipped
      })
    )
  end

  defp build_prediction(args, _) do
    Factories.Predictions.Prediction.build(:prediction, args)
  end
end
