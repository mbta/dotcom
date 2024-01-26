defmodule DotcomWeb.TransitNearMeController.LocationTest do
  use ExUnit.Case, async: true
  alias LocationService.Address
  alias DotcomWeb.TransitNearMeController.Location

  @address %Address{
    latitude: 42.351,
    longitude: -71.066,
    formatted: "10 Park Plaza, Boston, MA, 02116"
  }

  def geocode_fn("10 Park Plaza, Boston, MA, 02116") do
    send(self(), :geocode)

    {:ok, [@address]}
  end

  def reverse_geocode_fn(42.351, -71.066) do
    send(self(), :reverse_geocode)

    {:ok, [@address]}
  end

  def reverse_geocode_fn(+0.0, +0.0) do
    send(self(), :reverse_geocode)

    {:error, :zero_results}
  end

  setup do
    {:ok,
     opts: [
       geocode_fn: &geocode_fn/1,
       reverse_geocode_fn: &reverse_geocode_fn/2
     ]}
  end

  describe "get_location/2" do
    test "can take unnested lat/lng values", %{opts: opts} do
      params = %{
        "latitude" => "42.351",
        "longitude" => "-71.066",
        "location" => %{
          "address" => "10 Park Plaza, Boston, MA, 02116"
        }
      }

      assert Location.get(params, opts) == {:ok, [@address]}

      refute_receive :geocode
      refute_receive :reverse_geocode
    end

    test "does not attempt any geocoding if all params are provided", %{opts: opts} do
      params = %{
        "location" => %{
          "latitude" => "42.351",
          "longitude" => "-71.066",
          "address" => "10 Park Plaza, Boston, MA, 02116"
        }
      }

      assert Location.get(params, opts) == {:ok, [@address]}

      refute_receive :geocode
      refute_receive :reverse_geocode
    end

    test "geocodes address if lat/lng is not provided", %{opts: opts} do
      params = %{
        "location" => %{
          "address" => "10 Park Plaza, Boston, MA, 02116"
        }
      }

      assert Location.get(params, opts) == {:ok, [@address]}

      assert_receive :geocode
      refute_receive :reverse_geocode
    end

    test "geocodes address if lat/lng are not floats", %{opts: opts} do
      params = %{
        "location" => %{
          "latitude" => "",
          "longitude" => "",
          "address" => "10 Park Plaza, Boston, MA, 02116"
        }
      }

      assert Location.get(params, opts) == {:ok, [@address]}

      assert_receive :geocode
      refute_receive :reverse_geocode
    end

    test "reverse geocodes lat/lng if address is not provided", %{opts: opts} do
      params = %{
        "location" => %{
          "latitude" => "42.351",
          "longitude" => "-71.066"
        }
      }

      assert Location.get(params, opts) == {:ok, [@address]}

      refute_receive :geocode
      assert_receive :reverse_geocode
    end

    test "returns an error if there is an error with reverse geocoding", %{
      opts: opts
    } do
      params = %{
        "location" => %{
          "latitude" => "0.0",
          "longitude" => "0.0"
        }
      }

      assert Location.get(params, opts) == {:error, :zero_results}

      refute_receive :geocode
      assert_receive :reverse_geocode
    end

    test "returns :no_address if params don't include address or lat/lng", %{opts: opts} do
      assert Location.get(%{}, opts) == :no_address
    end
  end
end
