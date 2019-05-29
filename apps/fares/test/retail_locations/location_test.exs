defmodule Fares.RetailLocations.LocationsTest do
  use ExUnit.Case, async: true

  alias Fares.RetailLocations.Location
  alias Util.Position

  test "implements Util.Position" do
    location = %Location{latitude: 1.0, longitude: -2.0}
    assert Position.latitude(location) == 1.0
    assert Position.longitude(location) == -2.0
  end
end
