defmodule Fares.RetailLocationsDataTest do
  use ExUnit.Case, async: true

  alias Fares.RetailLocations.Data
  alias Fares.RetailLocations.Location

  describe "Fares.RetailLocationsData" do
    @tag :external
    test "get/1 retrieves an array of retail locations data" do
      data = Data.get()
      assert is_list(data)
      refute data == []
    end

    @tag :external
    test "all locations have latitude & longitude values" do
      for %Location{latitude: lat, longitude: lng} <- Data.get() do
        assert lat > 41
        assert lat < 43
        assert is_float(lat) == true
        assert lng < -70
        assert lng > -72
        assert is_float(lng) == true
      end
    end

    @tag :external
    test "build_r_tree returns a tree with all location data" do
      tree = Data.build_r_tree()

      for %Location{name: name} = location <- Data.get() do
        assert [%Location{name: ^name}] = Data.k_nearest_neighbors(tree, location, 1)
      end
    end
  end

  describe "parse_v3_facility" do
    test "parses a location" do
      item = %JsonApi.Item{
        attributes: %{
          "long_name" => "facility_name",
          "latitude" => 32.0,
          "longitude" => -41.0,
          "properties" => [
            %{"name" => "address", "value" => "facility address"},
            %{"name" => "contact-phone", "value" => "1800facility"},
            %{"name" => "payment-form-accepted", "value" => "cash"},
            %{"name" => "payment-form-accepted", "value" => "invoice"}
          ]
        }
      }

      {:ok, loc} = Data.parse_v3_facility(item)

      assert loc ==
               %Location{
                 name: "facility_name",
                 latitude: 32.0,
                 longitude: -41.0,
                 address: "facility address",
                 phone: "1800facility",
                 payment: ["Cash", "Invoice"]
               }
    end

    test "parses error" do
      assert Data.parse_v3_facility({:error, "error"}) == {:error, "error"}
    end

    test "calls itself if passed a wrapped item" do
      item = %JsonApi.Item{
        attributes: %{
          "name" => "facility_name",
          "latitude" => 32.0,
          "longitude" => -41.0,
          "properties" => [
            %{"name" => "address", "value" => "facility address"},
            %{"name" => "contact-phone", "value" => "1800facility"},
            %{"name" => "payment-form-accepted", "value" => "cash"},
            %{"name" => "payment-form-accepted", "value" => "invoice"}
          ]
        }
      }

      assert Data.parse_v3_facility({:ok, item}) == Data.parse_v3_facility(item)
    end

    test "returns error if there is one" do
      assert Data.parse_v3_multiple({:error, "error"}) == {:error, "error"}
    end
  end

  describe "v3_property" do
    test "parses a single property" do
      item = %JsonApi.Item{
        attributes: %{
          "properties" => [
            %{
              "name" => "prop_name",
              "value" => "prop_value"
            }
          ]
        }
      }

      assert Data.v3_property(item, "prop_name") == "prop_value"
    end
  end

  describe "v3_property_multiple" do
    test "parses aggregate properties" do
      item = %JsonApi.Item{
        attributes: %{
          "properties" => [
            %{"name" => "prop_name", "value" => "1"},
            %{"name" => "different_prop", "value" => "2"},
            %{"name" => "prop_name", "value" => "3"}
          ]
        }
      }

      assert Data.v3_property_multiple(item, "prop_name") == ["1", "3"]
    end
  end
end
