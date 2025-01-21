defmodule Dotcom.TripPlan.ItineraryGroupTest do
  @moduledoc false

  use ExUnit.Case, async: true

  import Mox

  alias Dotcom.TripPlan.ItineraryGroup
  alias Test.Support.Factories.{Stops.Stop, TripPlanner.TripPlanner}

  setup :verify_on_exit!

  setup do
    stub(Stops.Repo.Mock, :get, &Stop.build(:stop, id: &1))
    :ok
  end

  describe "options_text/1" do
    test "does nothing if no alternate times" do
      refute ItineraryGroup.options_text(%ItineraryGroup{itineraries: []})

      refute ItineraryGroup.options_text(%ItineraryGroup{
               itineraries: [TripPlanner.build(:itinerary)]
             })
    end

    test "describes alternate times: 1 trip departs at" do
      text =
        build_group(1, :start)
        |> ItineraryGroup.options_text()

      assert text =~ "Similar trip departs at"
    end

    test "describes alternate times: multiple trips departs at" do
      text =
        build_group(Faker.Util.pick(2..5), :start)
        |> ItineraryGroup.options_text()

      assert text =~ "Similar trips depart at"
    end

    test "describes alternate times: 1 trip arrives at" do
      text =
        build_group(1, :stop)
        |> ItineraryGroup.options_text()

      assert text =~ "Similar trip arrives at"
    end

    test "describes alternate times: multiple trips arrive at" do
      text =
        build_group(Faker.Util.pick(2..5), :stop)
        |> ItineraryGroup.options_text()

      assert text =~ "Similar trips arrive at"
    end
  end

  describe "all_times/1" do
    test "uses representative_time to map to chosen times" do
      # SETUP
      itineraries = TripPlanner.build_list(4, :itinerary)

      # EXERCISE
      start_times =
        %ItineraryGroup{
          itineraries: itineraries,
          representative_time: :start
        }
        |> ItineraryGroup.all_times()

      stop_times =
        %ItineraryGroup{
          itineraries: itineraries,
          representative_time: :stop
        }
        |> ItineraryGroup.all_times()

      # VERIFY
      assert start_times != stop_times
    end
  end

  defp build_group(similar_itinerary_count, representative_time) do
    itineraries = TripPlanner.build_list(similar_itinerary_count + 1, :itinerary)

    %ItineraryGroup{
      itineraries: itineraries,
      representative_index: Faker.Util.pick(0..similar_itinerary_count),
      representative_time: representative_time
    }
  end
end
