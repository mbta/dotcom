defmodule Dotcom.TripPlan.RelatedLinkTest do
  use ExUnit.Case, async: true
  # @moduletag :external

  import Dotcom.TripPlan.RelatedLink
  import DotcomWeb.Router.Helpers, only: [fare_path: 4]
  import Mox
  import Test.Support.Factory.TripPlanner

  alias TripPlan.Itinerary

  setup :verify_on_exit!

  setup do
    # The itinerary parsing currently queries for trips to aid in assigning fare
    # values to legs, when those legs are transit legs within the MBTA service
    # network.
    stub(MBTA.Api.Mock, :get_json, fn path, _ ->
      case path do
        "/trips/" <> _ ->
          %JsonApi{links: %{}, data: [Test.Support.Factory.MbtaApi.build(:trip_item)]}

        "/routes/" <> _ ->
          %JsonApi{links: %{}, data: [Test.Support.Factory.MbtaApi.build(:route_item)]}

        _ ->
          %JsonApi{links: %{}, data: []}
      end
    end)

    stub(Stops.Repo.Mock, :get, fn _ ->
      Test.Support.Factory.Stop.build(:stop)
    end)

    itinerary =
      build(:itinerary,
        legs: [build(:transit_leg)]
      )

    {:ok, %{itinerary: itinerary}}
  end

  describe "links_for_itinerary/1" do
    test "returns a list of related links", %{itinerary: itinerary} do
      {expected_route, expected_icon} =
        case Itinerary.route_ids(itinerary) do
          ["Blue"] -> {"Blue Line schedules", :blue_line}
          ["Red"] -> {"Red Line schedules", :red_line}
          ["1"] -> {"Route 1 schedules", :bus}
          ["350"] -> {"Route 350 schedules", :bus}
          ["CR-Lowell"] -> {"Lowell Line schedules", :commuter_rail}
        end

      [trip_id] = Itinerary.trip_ids(itinerary)
      assert [route_link, fare_link] = links_for_itinerary(itinerary)
      assert text(route_link) == expected_route
      assert url(route_link) =~ Timex.format!(itinerary.start, "date={ISOdate}")
      assert url(route_link) =~ ~s(trip=#{String.replace(trip_id, ":", "%3A")})
      assert route_link.icon_name == expected_icon
      assert fare_link.text == "View fare information"
      # fare URL is tested later
    end

    test "returns a non-empty list for multiple kinds of itineraries" do
      stub(Stops.Repo.Mock, :get_parent, fn _ -> Test.Support.Factory.Stop.build(:stop) end)

      for _i <- 0..100 do
        itinerary =
          build(:itinerary,
            legs: build_list(2, :transit_leg)
          )

        assert [_ | _] = links_for_itinerary(itinerary)
      end
    end

    test "with multiple types of fares, returns one link to the fare overview", %{
      itinerary: itinerary
    } do
      stub(Stops.Repo.Mock, :get_parent, fn _ -> Test.Support.Factory.Stop.build(:stop) end)

      for _i <- 0..10 do
        leg = build(:transit_leg)
        itinerary = %Itinerary{itinerary | legs: [leg | itinerary.legs]}

        links = links_for_itinerary(itinerary)
        # for each leg, we build the expected test along with the URL later, if
        # we only have one expected text, assert that we've cleaned up the text
        # to be only "View fare information".
        expected_text_url = fn leg ->
          case leg.mode do
            %{route_id: id} when id in ["1", "350"] ->
              {"bus", fare_path(DotcomWeb.Endpoint, :show, "bus-fares", [])}

            %{route_id: id} when id in ["Red", "Blue"] ->
              {"subway", fare_path(DotcomWeb.Endpoint, :show, "subway-fares", [])}

            %{route_id: "CR-Lowell"} ->
              {"commuter rail",
               fare_path(
                 DotcomWeb.Endpoint,
                 :show,
                 :commuter_rail,
                 origin: fare_stop_id(leg.from.stop.id),
                 destination: fare_stop_id(leg.to.stop.id)
               )}

            _ ->
              nil
          end
        end

        expected_text_urls =
          for leg <- itinerary,
              expected = expected_text_url.(leg) do
            expected
          end

        case Enum.uniq(expected_text_urls) do
          [{_expected_text, expected_url}] ->
            # only one expected
            fare_link = List.last(links)
            assert text(fare_link) == "View fare information"
            assert url(fare_link) == expected_url

          _text_urls ->
            # only one expected
            fare_link = List.last(links)
            assert text(fare_link) == "View fare information"
            assert url(fare_link) == "/fares"
        end
      end
    end
  end

  describe "links_for_itinerary/2" do
    test "returns custom links for custom routes", %{itinerary: itinerary} do
      url = "http://custom.url"
      legs = Enum.map(itinerary.legs, &%{&1 | url: url})
      itinerary = %TripPlan.Itinerary{itinerary | legs: legs}

      assert [%Dotcom.TripPlan.RelatedLink{text: "Route information", url: ^url}] =
               links_for_itinerary(itinerary)
    end
  end

  defp fare_stop_id("North Station"), do: "place-north"
  defp fare_stop_id(other), do: other
end
