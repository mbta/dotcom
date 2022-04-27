defmodule LocationService.AddressTest do
  use ExUnit.Case
  alias LocationService.Address
  alias Util.Position

  describe "Address" do
    test "implements the Position protocol" do
      Protocol.assert_impl!(Position, Address)
      address = %Address{}
      assert Position.latitude(address) == address.latitude
      assert Position.longitude(address) == address.longitude
    end
  end
end
