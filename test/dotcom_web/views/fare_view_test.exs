defmodule DotcomWeb.FareViewTest do
  @moduledoc false
  use ExUnit.Case, async: true

  import DotcomWeb.FareView

  alias DotcomWeb.Router.Helpers
  alias Fares.Summary

  @location_1 %{lat: 42.354199, lng: -71.07399}
  @location_2 %{lat: 42.34735, lng: -71.075727}

  describe "direction_map_url/2" do
    test "returns a correctly formatted url" do
      url =
        direction_map_url(
          {@location_1.lat, @location_1.lng},
          {@location_2.lat, @location_2.lng}
        )

      assert url ==
               "https://maps.google.com" <>
                 Path.join([
                   "/",
                   "maps",
                   "dir",
                   URI.encode("#{@location_1.lat},#{@location_1.lng}"),
                   URI.encode("#{@location_2.lat},#{@location_2.lng}")
                 ])
    end
  end

  describe "summary_url/1" do
    test "links to :mode-fares for bus/subway summaries" do
      expected = Helpers.fare_path(DotcomWeb.Endpoint, :show, "bus-fares")
      assert summary_url(%Summary{modes: [:bus]}) == expected
      expected = Helpers.fare_path(DotcomWeb.Endpoint, :show, "subway-fares")
      assert summary_url(%Summary{modes: [:subway]}) == expected
    end

    test "if the summary has a duration, link to the correct anchor" do
      expected = Helpers.fare_path(DotcomWeb.Endpoint, :show, "subway-fares")

      assert summary_url(%Summary{modes: [:subway, :bus], duration: :week}) ==
               expected <> "#7-day"

      assert summary_url(%Summary{modes: [:subway, :bus], duration: :month}) ==
               expected <> "#monthly"
    end

    test "links directly for commuter rail/ferry" do
      for mode <- [:commuter_rail, :ferry] do
        expected =
          Helpers.fare_path(
            DotcomWeb.Endpoint,
            :show,
            mode
            |> Atom.to_string()
            |> String.replace("_", "-")
          )

        assert summary_url(%Summary{modes: [mode, :bus]}) == expected <> "-fares"
      end
    end

    test "defers to the summary's provided URL if present" do
      assert summary_url(%Summary{modes: [:bus], url: "/expected_url"}) == "/expected_url"
    end
  end
end
