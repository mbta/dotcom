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

    test "describes alternate times for the group" do
      # SETUP
      itineraries = TripPlanner.build_list(Faker.Util.pick(2..4), :itinerary)
      representative_index = Faker.Util.pick(0..(length(itineraries) - 1))
      start_or_stop = Faker.Util.pick([:start, :stop])

      group = %ItineraryGroup{
        itineraries: itineraries,
        representative_index: representative_index,
        representative_time: start_or_stop
      }

      # EXERCISE
      text = ItineraryGroup.options_text(group)

      # VERIFY
      if Enum.count(itineraries) == 2 do
        # only one alternate trip
        assert text =~ "trip "

        if group.representative_time == :start do
          assert text =~ "departs at"
        else
          assert text =~ "arrives by"
        end
      else
        assert text =~ "trips "

        if group.representative_time == :start do
          assert text =~ "depart at"
        else
          assert text =~ "arrive by"
        end
      end
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
end
