defmodule Test.Support.Factories.TripPlanner.InputForm do
  @moduledoc """
  Provides generated test data via ExMachina and Faker.
  """

  use ExMachina

  alias Dotcom.TripPlan.InputForm
  alias Test.Support.Generators

  def form_factory do
    %InputForm{
      from: build(:location),
      to: build(:location),
      modes: build(:modes),
      datetime_type: Faker.Util.pick(["now", "depart_at", "arrive_by"]),
      datetime: Generators.DateTime.random_date_time(),
      wheelchair: Faker.Util.pick([true, false])
    }
  end

  def location_factory do
    %InputForm.Location{
      name: Faker.Address.street_name(),
      latitude: Faker.Address.latitude(),
      longitude: Faker.Address.longitude(),
      stop_id: [Faker.Internet.slug(), nil] |> Faker.Util.pick()
    }
  end

  def modes_factory do
    %InputForm.Modes{
      BUS: Faker.Util.pick([true, false]),
      FERRY: Faker.Util.pick([true, false]),
      SUBWAY: Faker.Util.pick([true, false]),
      RAIL: Faker.Util.pick([true, false])
    }
  end
end
