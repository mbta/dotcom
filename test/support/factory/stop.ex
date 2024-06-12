defmodule Test.Support.Factory.Stop do
  @moduledoc """
  Generated fake data for %Stop{}
  """
  use ExMachina

  alias Stops.Stop

  def stop_factory do
    %Stop{
      id: Faker.Internet.slug(),
      zone: Faker.Util.pick(["1", "1A", "2", "3", "4", "5", "6", "7", "8", "9"])
    }
  end
end
