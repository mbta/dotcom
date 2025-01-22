defmodule Stops.Helpers do
  @moduledoc false
  alias Stops.Stop.ParkingLot

  @nil_structs [
    %ParkingLot.Capacity{},
    %ParkingLot.Payment{},
    %ParkingLot.Manager{},
    %ParkingLot.Utilization{},
    %ParkingLot.Payment.MobileApp{}
  ]
  def struct_or_nil(struct) when struct in @nil_structs, do: nil
  def struct_or_nil(struct), do: struct
end
