defmodule Test.Support.Factories.Services.Service do
  @moduledoc """
  Generated fake data for %Services.Service{}
  """

  use ExMachina

  alias Services.Service
  alias Test.Support.FactoryHelpers

  def service_factory do
    Faker.random_between(1, 9) |> Faker.Date.forward() |> service_for_date()
  end

  def service_for_date(date) do
    rating_end = Date.shift(date, day: Faker.random_between(60, 120))
    rating_start = Date.shift(date, day: -Faker.random_between(60, 120))
    service_end = Date.shift(date, day: Faker.random_between(10, 59))
    service_start = Date.shift(date, day: -Faker.random_between(10, 59))

    %Service{
      id: FactoryHelpers.build(:id),
      added_dates: [],
      added_dates_notes: %{},
      description: Faker.Lorem.sentence(),
      end_date: service_end,
      name: Faker.App.name(),
      removed_dates: [],
      removed_dates_notes: %{},
      start_date: service_start,
      type: Faker.Util.pick([:saturday, :sunday, :weekday, :weekend, :other]),
      typicality:
        Faker.Util.pick([
          :unknown,
          :typical_service,
          :extra_service,
          :holiday_service,
          :planned_disruption,
          :unplanned_disruption
        ]),
      valid_days: [1, 2, 3, 4, 5, 6, 7],
      rating_start_date: rating_start,
      rating_end_date: rating_end,
      rating_description: Faker.Lorem.sentence()
    }
  end
end
