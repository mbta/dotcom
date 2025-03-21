defmodule Test.Support.Generators.Address do
  @moduledoc """
  Generators to help generate fully-formatted addresses for testing.
  """

  @doc """
  Generate a random fully-formatted address
  """
  def address() do
    "#{Faker.Address.street_address()}, #{Faker.Address.city()}, #{Faker.Address.state()}, #{Faker.Address.zip_code()}"
  end
end
