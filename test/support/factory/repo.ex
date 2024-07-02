defmodule Test.Support.Factory.Repo do
  @moduledoc """
  Generated fake data for data from any of the repo modules. Usage:

  ```
  import Test.Support.Factory.Repo
  %RoutePattern{} = build(:route_pattern)
  [%Shape{}, %Shape{}] = build_list(2, :shape)
  ```
  """
  use ExMachina

  alias Predictions.Prediction
  alias RoutePatterns.RoutePattern
  alias Routes.{Route, Shape}
  alias Schedules.Trip
  alias Stops.Stop

  def prediction_factory do
    %Prediction{
      id: arbitary_id(),
      trip: Faker.Util.pick([nil, build(:trip)]),
      stop: build(:stop),
      platform_stop_id: Faker.Util.pick([nil, arbitary_id()]),
      route: build(:route),
      vehicle_id: Faker.Util.pick([nil, arbitary_id()]),
      direction_id: Faker.Util.pick([0, 1]),
      arrival_time: Faker.DateTime.forward(1),
      departure_time: Faker.DateTime.forward(1),
      time: Faker.DateTime.forward(1),
      schedule_relationship:
        Faker.Util.pick([nil, :added, :unscheduled, :cancelled, :skipped, :no_data]),
      track: Faker.Util.pick([nil, Faker.Util.digit()])
    }
  end

  def route_factory do
    %Route{
      id: arbitary_id(),
      type: Faker.Util.pick([0, 1, 2, 3, 4]),
      name: Faker.App.name(),
      long_name: Faker.Company.catch_phrase(),
      color: Faker.Color.rgb_hex(),
      direction_destinations: %{
        0 => Faker.Address.street_address(),
        1 => Faker.Address.street_address()
      },
      description:
        [
          :airport_shuttle,
          :commuter_rail,
          :rapid_transit,
          :local_bus,
          :ferry,
          :rail_replacement_bus,
          :key_bus_route,
          :supplemental_bus,
          :commuter_bus,
          :community_bus,
          :unknown
        ]
        |> Faker.Util.pick(),
      fare_class:
        [
          :local_bus_fare,
          :express_bus_fare,
          :rapid_transit_fare,
          :commuter_rail_fare,
          :ferry_fare,
          :free_fare,
          :special_fare,
          :unknown_fare
        ]
        |> Faker.Util.pick(),
      line_id: arbitary_id()
    }
  end

  def route_pattern_factory do
    %RoutePattern{
      id: arbitary_id(),
      canonical: Faker.Util.pick([true, false]),
      direction_id: Faker.Util.pick([0, 1]),
      headsign: Faker.Address.city(),
      name: Faker.App.name(),
      representative_trip_id: arbitary_id(),
      representative_trip_polyline: Faker.Lorem.characters(),
      route_id: arbitary_id(),
      service_id: arbitary_id(),
      shape_id: arbitary_id(),
      stop_ids: arbitary_ids(),
      time_desc: Faker.Company.catch_phrase(),
      typicality: Faker.Util.pick([0, 1, 2, 3, 4, 5])
    }
  end

  def shape_factory do
    %Shape{
      id: arbitary_id(),
      direction_id: Faker.Util.pick([0, 1]),
      name: Faker.App.name(),
      polyline: Faker.Lorem.characters(),
      stop_ids: arbitary_ids()
    }
  end

  def stop_factory do
    parent_id = Faker.Util.pick([nil, arbitary_id()])

    child_ids =
      if is_nil(parent_id),
        do:
          Faker.Util.pick([
            [],
            arbitary_ids()
          ]),
        else: []

    %Stop{
      id: arbitary_id(),
      parent_id: parent_id,
      child_ids: child_ids,
      child?: !is_nil(parent_id),
      station?: fn -> if(parent_id, do: Faker.Util.pick([true, false]), else: false) end,
      type: Faker.Util.pick([:stop, :station, :entrance, :generic_node]),
      latitude: Faker.Address.latitude(),
      longitude: Faker.Address.longitude(),
      municipality: Faker.Address.city(),
      address: Faker.Address.street_address(),
      name: Faker.App.name()
    }
  end

  def trip_factory do
    %Trip{
      id: arbitary_id(),
      name: Faker.App.name(),
      headsign: Faker.Address.city(),
      direction_id: Faker.Util.pick([0, 1]),
      shape_id: arbitary_id(),
      route_pattern_id: arbitary_id(),
      occupancy: Faker.Util.pick([nil, :not_crowded, :some_crowding, :crowded])
    }
  end

  defp arbitary_id, do: Faker.Internet.slug()

  defp arbitary_ids do
    Faker.random_between(2, 20)
    |> then(&Enum.map(0..&1, fn _ -> arbitary_id() end))
  end
end
