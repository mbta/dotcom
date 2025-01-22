defmodule Dotcom.TripPlan.RelatedLinkTest do
  use ExUnit.Case, async: true

  import Dotcom.TripPlan.RelatedLink
  import DotcomWeb.Router.Helpers, only: [fare_path: 4]
  import Mox
  import Test.Support.Factories.TripPlanner.TripPlanner

  alias Dotcom.TripPlan.Itinerary
  alias Stops.Repo.Mock
  alias Test.Support.Factories.Stops.Stop

  setup :verify_on_exit!

  setup do
    stub(Mock, :get, fn _ ->
      Stop.build(:stop)
    end)

    itinerary =
      build(:itinerary,
        legs: [build(:transit_leg)]
      )

    {:ok, %{itinerary: itinerary}}
  end

  describe "links_for_itinerary/1" do
    test "returns a list of related links", %{itinerary: itinerary} do
      %{legs: [%{from: from, to: to, mode: %{route: route}}]} = itinerary

      expect(
        Mock,
        :get_parent,
        if(route.type in [2, 4], do: 2, else: 0),
        fn id -> %Stops.Stop{id: id} end
      )

      assert [route_link, fare_link] = links_for_itinerary(itinerary)
      assert url(route_link) =~ Timex.format!(itinerary.start, "date={ISOdate}")
      assert fare_link.text == "View fare information"

      if route.type == 3 do
        assert text(route_link) == "#{route.name} Bus schedules"
      else
        assert text(route_link) == "#{route.long_name} schedules"
      end

      case route.type do
        4 ->
          assert route_link.icon_name == :ferry

          assert fare_link.url ==
                   URI.encode("/fares/ferry?origin=#{from.stop.id}&destination=#{to.stop.id}")

        3 ->
          assert route_link.icon_name == :bus
          assert fare_link.url == "/fares/bus-fares"

        2 ->
          assert route_link.icon_name == :commuter_rail

          assert fare_link.url ==
                   URI.encode("/fares/commuter_rail?origin=#{from.stop.id}&destination=#{to.stop.id}")

        _ ->
          assert route_link.icon_name == :subway
          assert fare_link.url == "/fares/subway-fares"
      end
    end

    test "returns a non-empty list for multiple kinds of itineraries" do
      stub(Mock, :get_parent, fn _ -> Stop.build(:stop) end)

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
      stub(Mock, :get_parent, fn _ -> Stop.build(:stop) end)

      for _i <- 0..10 do
        leg = build(:transit_leg)
        itinerary = %Itinerary{itinerary | legs: [leg | itinerary.legs]}

        links = links_for_itinerary(itinerary)
        # for each leg, we build the expected test along with the URL later, if
        # we only have one expected text, assert that we've cleaned up the text
        # to be only "View fare information".
        expected_text_url = fn leg ->
          case leg.mode.route.type do
            3 ->
              {"bus", fare_path(DotcomWeb.Endpoint, :show, "bus-fares", [])}

            type when type in [0, 1] ->
              {"subway", fare_path(DotcomWeb.Endpoint, :show, "subway-fares", [])}

            2 ->
              {"commuter rail",
               fare_path(
                 DotcomWeb.Endpoint,
                 :show,
                 :commuter_rail,
                 origin: leg.from.stop.id,
                 destination: leg.to.stop.id
               )}

            4 ->
              {"ferry",
               fare_path(
                 DotcomWeb.Endpoint,
                 :show,
                 :ferry,
                 origin: leg.from.stop.id,
                 destination: leg.to.stop.id
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
end
