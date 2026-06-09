defmodule Test.Support.Factories.UpcomingDepartures do
  use ExMachina

  alias Test.Support.{Factories, FactoryHelpers}

  def upcoming_departure_factory do
    %Dotcom.UpcomingDepartures.UpcomingDeparture{
      arrival_status: {:arrival_minutes, Faker.Util.pick(1..60)},
      crowding: Faker.Util.pick([:not_crowded, :some_crowding, :crowded]),
      headsign: Faker.Address.city(),
      last_trip?: false,
      route: Factories.Routes.Route.build(:route),
      stop_sequence: Faker.Util.pick(0..200),
      time: sequence(:time, &DateTime.from_unix!/1),
      trip_id: FactoryHelpers.build(:id),
      trip_name: Faker.Cat.name()
    }
  end
end
