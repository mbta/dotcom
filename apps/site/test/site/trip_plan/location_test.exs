defmodule Site.TripPlan.LocationTest do
  use ExUnit.Case, async: true
  alias Site.TripPlan.{Location, Query}
  alias TripPlan.NamedPosition

  describe "validate/2" do
    test "sets :to to a NamedPosition when lat/lng are valid floats" do
      params = %{
        "to_latitude" => "42.5678",
        "to_longitude" => "-71.2345",
        "to" => "To Location"
      }

      assert Location.validate(%Query{}, params) == %Query{
               to: %NamedPosition{
                 latitude: 42.5678,
                 longitude: -71.2345,
                 name: "To Location"
               }
             }
    end

    test "encodes name of a NamedPosition when lat/lng are valid floats" do
      params = %{
        "to_latitude" => "42.5678",
        "to_longitude" => "-71.2345",
        "to" => "To Location's &<script>alert(1)</script>"
      }

      assert Location.validate(%Query{}, params) == %Query{
               to: %NamedPosition{
                 latitude: 42.5678,
                 longitude: -71.2345,
                 name: "To Location's &&lt;script&gt;alert(1)&lt;/script&gt;"
               }
             }
    end

    test "sets :to to a NamedPosition when lat/lng are missing but address is valid" do
      assert %Query{
               to: %NamedPosition{
                 latitude: lat,
                 longitude: lng,
                 name: "Geocoded 10 Park Plaza, Boston MA"
               }
             } = Location.validate(%Query{}, %{"to" => "10 Park Plaza, Boston MA"})

      assert "42." <> _ = Float.to_string(lat)
      assert "-71." <> _ = Float.to_string(lng)
    end

    test "sets :from to a NamedPosition when lat/lng are valid floats" do
      params = %{
        "from_latitude" => "42.5678",
        "from_longitude" => "-71.2345",
        "from" => "From Location"
      }

      assert Location.validate(%Query{}, params) == %Query{
               from: %NamedPosition{
                 latitude: 42.5678,
                 longitude: -71.2345,
                 name: "From Location"
               }
             }
    end

    test "sets :from to a NamedPosition when lat/lng are missing but address is valid" do
      result = Location.validate(%Query{}, %{"from" => "10 Park Plaza, Boston MA"})
      assert %Query{} = result
      assert %NamedPosition{} = result.from
      assert "42." <> _ = Float.to_string(result.from.latitude)
      assert "-71." <> _ = Float.to_string(result.from.longitude)
    end

    test "handles lat/lng being set to nil" do
      result =
        Location.validate(%Query{}, %{
          "from" => "10 Park Plaza, Boston MA",
          "from_latitude" => "42.5678",
          "from_longitude" => "-71.2345",
          "to" => "20 Park Plaza, Boston MA",
          "to_latitude" => nil,
          "to_longitude" => nil
        })

      assert %Query{} = result
      assert %NamedPosition{} = result.from
      assert "42." <> _ = Float.to_string(result.from.latitude)
      assert "-71." <> _ = Float.to_string(result.from.longitude)
      assert %NamedPosition{} = result.to
      assert "42" <> _ = Float.to_string(result.to.latitude)
      assert "-71" <> _ = Float.to_string(result.to.longitude)
    end

    test "sets :to to {:error, :invalid} when geolocation returns no results" do
      result = Location.validate(%Query{}, %{"to" => "no results"})
      assert %Query{} = result
      assert result.to == {:error, :no_results}
      assert MapSet.member?(result.errors, :no_results)
    end

    test "sets :from to {:error, :invalid} when geolocation returns no results" do
      result = Location.validate(%Query{}, %{"from" => "no results"})
      assert %Query{} = result
      assert result.from == {:error, :no_results}
      assert MapSet.member?(result.errors, :no_results)
    end

    test "sets :to to {:error, {:multiple_results, _}} when geolocation returns multiple results" do
      result = Location.validate(%Query{}, %{"to" => "too many results"})
      assert %Query{} = result
      assert {:error, {:multiple_results, suggestions}} = result.to
      assert [%NamedPosition{} | _] = suggestions
      assert MapSet.member?(result.errors, :multiple_results)
    end
  end
end
