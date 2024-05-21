defmodule Test.Support.Factory.LocationService do
  @moduledoc """
  Data generation for LocationService outputs.
  """

  use ExMachina

  def address_factory do
    %LocationService.Address{
      formatted: Faker.Address.street_address(),
      latitude: Faker.Address.latitude(),
      longitude: Faker.Address.longitude()
    }
  end

  def suggestion_factory do
    %LocationService.Suggestion{
      address: Faker.Address.street_address(),
      highlighted_spans: %LocationService.Utils.HighlightedSpan{
        offset: Faker.random_between(0, 10),
        length: Faker.random_between(0, 10)
      }
    }
  end
end
