defmodule Test.Support.Factories.LocationService.LocationService do
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
end
