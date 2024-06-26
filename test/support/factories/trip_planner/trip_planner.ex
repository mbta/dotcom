defmodule Test.Support.Factories.TripPlanner.TripPlanner do
  @moduledoc """
  Provides generated test data via ExMachina and Faker.
  """
  use ExMachina

  alias Test.Support.FactoryHelpers
  alias TripPlan.{Itinerary, Leg, NamedPosition, PersonalDetail, TransitDetail}

  def itinerary_factory do
    start = Faker.DateTime.forward(1)

    %Itinerary{
      start: start,
      stop: Faker.DateTime.between(start, Timex.shift(start, minutes: 75)),
      legs: Faker.random_between(1, 4) |> build_list(:leg),
      accessible?: Faker.Util.pick([true, false]) |> FactoryHelpers.nullable_item()
    }
  end

  def leg_factory do
    start = Faker.DateTime.forward(1)
    stop = Faker.DateTime.between(start, Timex.shift(start, minutes: 75))
    from = Faker.Util.pick([build(:named_position), build(:stop_named_position)])
    to = Faker.Util.pick([build(:named_position), build(:stop_named_position)])
    mode = Faker.Util.pick([build(:personal_detail), build(:transit_detail)])

    description =
      case mode do
        %TransitDetail{} ->
          Faker.Util.pick(~w(BUS SUBWAY RAIL TRAM FERRY)a)

        _ ->
          "WALK"
      end

    %Leg{
      start: start,
      stop: stop,
      from: from,
      to: to,
      mode: mode,
      polyline: Faker.Lorem.characters(),
      type: "MBTA",
      url: "https://www.mbta.com",
      description: description
    }
  end

  def personal_detail_factory do
    steps = Faker.random_between(1, 4) |> build_list(:step)

    %PersonalDetail{
      distance: Enum.map(steps, & &1.distance) |> Enum.sum(),
      steps: steps
    }
  end

  def step_factory do
    %PersonalDetail.Step{
      distance: Faker.random_uniform() * 1000,
      relative_direction: Faker.Util.pick(~w(left right depart continue)a),
      absolute_direction: Faker.Util.pick(~w(north east south west)a),
      street_name: Faker.Address.street_name()
    }
  end

  def transit_detail_factory do
    %TransitDetail{
      route_id: FactoryHelpers.build(:id),
      trip_id: FactoryHelpers.build(:id),
      intermediate_stop_ids:
        Enum.random([
          FactoryHelpers.build_list(13, :id),
          []
        ])
    }
  end

  def stop_named_position_factory do
    %NamedPosition{
      name: Faker.Address.street_name(),
      stop_id: FactoryHelpers.build(:id),
      latitude: Faker.Address.latitude(),
      longitude: Faker.Address.longitude()
    }
  end

  def named_position_factory do
    %NamedPosition{
      name: Faker.Address.city(),
      stop_id: nil,
      latitude: Faker.Address.latitude(),
      longitude: Faker.Address.longitude()
    }
  end
end
