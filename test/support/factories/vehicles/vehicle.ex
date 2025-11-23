defmodule Test.Support.Factories.Vehicles.Vehicle do
  @moduledoc """
  Generated fake data for %Vehicles.Vehicle{}
  """

  alias Vehicles.Vehicle
  use ExMachina

  def vehicle_factory do
    %Vehicle{}
  end
end
