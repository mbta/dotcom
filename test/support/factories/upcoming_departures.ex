defmodule Test.Support.Factories.UpcomingDepartures do
  use ExMachina

  alias Test.Support.Factories

  def upcoming_departure_factory do
    %Dotcom.UpcomingDepartures.UpcomingDeparture{
      arrival_status: {:arrival_minutes, Faker.Util.pick(1..60)},
      route: Factories.Routes.Route.build(:route),
      time: sequence(:time, &DateTime.from_unix!/1)
    }
  end
end
