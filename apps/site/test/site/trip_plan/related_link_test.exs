defmodule Site.TripPlan.RelatedLinkTest do
  use ExUnit.Case, async: true
  import Site.TripPlan.RelatedLink
  import SiteWeb.Router.Helpers, only: [fare_path: 4]
  alias Routes.Route
  alias TripPlan.{Itinerary, Api.MockPlanner}

  setup do
    from = MockPlanner.random_stop()
    to = MockPlanner.random_stop()
    {:ok, [itinerary]} = TripPlan.plan(from, to, [])
    {:ok, %{itinerary: itinerary}}
  end

  describe "links_for_itinerary/1" do
    test "returns a list of related links", %{itinerary: itinerary} do
      {expected_route, expected_icon} =
        case Itinerary.route_ids(itinerary) do
          ["Blue"] -> {"Blue Line schedules", :blue_line}
          ["1"] -> {"Route 1 schedules", :bus}
          ["CR-Lowell"] -> {"Lowell Line schedules", :commuter_rail}
        end

      [trip_id] = Itinerary.trip_ids(itinerary)
      assert [route_link, fare_link] = links_for_itinerary(itinerary)
      assert text(route_link) == expected_route
      assert url(route_link) =~ Timex.format!(itinerary.start, "date={ISOdate}")
      assert url(route_link) =~ URI.encode("trip=#{trip_id}")
      assert route_link.icon_name == expected_icon
      assert fare_link.text == "View fare information"
      # fare URL is tested later
    end

    test "returns a non-empty list for multiple kinds of itineraries" do
      for _i <- 0..100 do
        {:ok, [itinerary]} =
          TripPlan.plan(MockPlanner.random_stop(), MockPlanner.random_stop(), [])

        assert [_ | _] = links_for_itinerary(itinerary)
      end
    end

    test "with multiple types of fares, returns relevant fare links", %{itinerary: itinerary} do
      for _i <- 0..10 do
        itinerary =
          itinerary
          |> MockPlanner.add_transit_leg()
          |> MockPlanner.add_transit_leg()

        links = links_for_itinerary(itinerary)
        # for each leg, we build the expected test along with the URL later, if
        # we only have one expected text, assert that we've cleaned up the text
        # to be only "View fare information".
        expected_text_url = fn leg ->
          case leg.mode do
            %{route_id: "1"} ->
              {"bus/subway", fare_path(SiteWeb.Endpoint, :show, :bus_subway, [])}

            %{route_id: "Blue"} ->
              {"bus/subway", fare_path(SiteWeb.Endpoint, :show, :bus_subway, [])}

            %{route_id: "CR-Lowell"} ->
              {"commuter rail",
               fare_path(
                 SiteWeb.Endpoint,
                 :show,
                 :commuter_rail,
                 origin: fare_stop_id(leg.from.stop_id),
                 destination: fare_stop_id(leg.to.stop_id)
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

          text_urls ->
            # we reverse the lists since the fare links are at the end
            links_with_expectations = Enum.zip(Enum.reverse(links), Enum.reverse(text_urls))

            for {link, {expected_text, expected_url}} <- links_with_expectations do
              assert text(link) =~ "View #{expected_text} fare information"
              assert url(link) == expected_url
            end
        end
      end
    end
  end

  describe "links_for_itinerary/2" do
    test "returns custom links for custom routes", %{itinerary: itinerary} do
      url = "http://custom.url"
      legs = Enum.map(itinerary.legs, &%{&1 | url: url})
      itinerary = %TripPlan.Itinerary{itinerary | legs: legs}
      mapper = fn _route -> %Route{custom_route?: true} end

      assert [%Site.TripPlan.RelatedLink{text: "Route information", url: ^url}] =
               links_for_itinerary(itinerary, route_by_id: mapper)
    end
  end

  defp fare_stop_id("North Station"), do: "place-north"
  defp fare_stop_id(other), do: other
end
