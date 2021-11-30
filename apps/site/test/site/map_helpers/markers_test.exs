defmodule Site.MapHelpers.MarkersTest do
  use ExUnit.Case, async: true
  alias GoogleMaps.MapData.Marker
  alias Site.MapHelpers.Markers

  @stop %Stops.Stop{
    accessibility: ["accessible"],
    address: nil,
    closed_stop_info: nil,
    has_charlie_card_vendor?: false,
    has_fare_machine?: false,
    id: "place-sstat",
    is_child?: true,
    latitude: 42.352271,
    longitude: -71.055242,
    name: "South Station",
    note: nil,
    parking_lots: [],
    station?: false
  }

  describe "stop/2" do
    test "builds data for a stop icon" do
      assert %Marker{
               latitude: latitude,
               longitude: longitude,
               id: id,
               size: :tiny,
               icon: "000000-dot",
               tooltip: tooltip
             } = Markers.stop(@stop, false)

      assert latitude == @stop.latitude
      assert longitude == @stop.longitude
      assert id == "stop-" <> @stop.id
      assert tooltip == @stop.name

      assert %Marker{
               icon: "000000-dot-filled"
             } = Markers.stop(@stop, true)
    end
  end
end
