defmodule Dotcom.TripPlan.ItineraryGroupsTest do
  @moduledoc false

  use ExUnit.Case, async: true

  import Mox

  alias Dotcom.TripPlan.ItineraryGroups
  alias Test.Support.Factories.{Stops.Stop, TripPlanner.TripPlanner}

  setup :verify_on_exit!

  setup do
    stub(Stops.Repo.Mock, :get, fn _ ->
      Stop.build(:stop)
    end)

    stops = TripPlanner.build_list(3, :stop_named_position)

    {:ok, stops: stops}
  end

  describe "from_itineraries/2" do
    test "groups itineraries with the same mode, from, and to", %{stops: [a, b, c]} do
      # SETUP
      bus_a_b_leg = TripPlanner.build(:bus_leg, from: a, to: b)
      subway_b_c_leg = TripPlanner.build(:subway_leg, from: b, to: c)

      itineraries =
        TripPlanner.build_list(:rand.uniform(5), :itinerary, legs: [bus_a_b_leg, subway_b_c_leg])

      # EXERCISE
      grouped_itineraries = ItineraryGroups.from_itineraries(itineraries)

      # VERIFY
      assert Kernel.length(grouped_itineraries) == 1
    end

    test "only includes the first few itineraries in a group", %{stops: [a, b, c]} do
      # SETUP
      bus_a_b_leg = TripPlanner.build(:bus_leg, from: a, to: b)
      subway_b_c_leg = TripPlanner.build(:subway_leg, from: b, to: c)

      itineraries =
        TripPlanner.build_list(10, :itinerary, legs: [bus_a_b_leg, subway_b_c_leg])

      # EXERCISE
      [group] = ItineraryGroups.from_itineraries(itineraries)

      # VERIFY
      assert Kernel.length(group.itineraries) == ItineraryGroups.max_per_group()
    end

    test "does not group itineraries with different modes", %{stops: [a, b, c]} do
      # SETUP
      bus_a_b_leg = TripPlanner.build(:bus_leg, from: a, to: b)
      bus_b_c_leg = TripPlanner.build(:bus_leg, from: b, to: c)
      subway_b_c_leg = TripPlanner.build(:subway_leg, from: b, to: c)

      first_itinerary = TripPlanner.build(:itinerary, legs: [bus_a_b_leg, bus_b_c_leg])
      second_interary = TripPlanner.build(:itinerary, legs: [bus_a_b_leg, subway_b_c_leg])

      # EXERCISE
      grouped_itineraries = ItineraryGroups.from_itineraries([first_itinerary, second_interary])

      # VERIFY
      assert Kernel.length(grouped_itineraries) == 2
    end

    test "does not group itineraries with different froms", %{stops: [a, b, c]} do
      # SETUP
      bus_a_b_leg = TripPlanner.build(:bus_leg, from: a, to: b)
      bus_b_c_leg = TripPlanner.build(:bus_leg, from: b, to: c)
      bus_c_a_leg = TripPlanner.build(:bus_leg, from: c, to: a)

      first_itinerary = TripPlanner.build(:itinerary, legs: [bus_a_b_leg, bus_b_c_leg])
      second_interary = TripPlanner.build(:itinerary, legs: [bus_a_b_leg, bus_c_a_leg])

      # EXERCISE
      grouped_itineraries = ItineraryGroups.from_itineraries([first_itinerary, second_interary])

      # VERIFY
      assert Kernel.length(grouped_itineraries) == 2
    end

    test "does not group itineraries with different tos", %{stops: [a, b, c]} do
      # SETUP
      bus_a_b_leg = TripPlanner.build(:bus_leg, from: a, to: b)
      bus_b_c_leg = TripPlanner.build(:bus_leg, from: b, to: c)
      bus_b_a_leg = TripPlanner.build(:bus_leg, from: b, to: a)

      first_itinerary = TripPlanner.build(:itinerary, legs: [bus_a_b_leg, bus_b_c_leg])
      second_interary = TripPlanner.build(:itinerary, legs: [bus_a_b_leg, bus_b_a_leg])

      # EXERCISE
      grouped_itineraries = ItineraryGroups.from_itineraries([first_itinerary, second_interary])

      # VERIFY
      assert Kernel.length(grouped_itineraries) == 2
    end

    test "does not group itineraries with different accessibility", %{stops: [a, b, _]} do
      # SETUP
      bus_legs = TripPlanner.build_list(3, :bus_leg, from: a, to: b)

      first_itinerary = TripPlanner.build(:itinerary, accessible?: true, legs: bus_legs)
      second_interary = TripPlanner.build(:itinerary, accessible?: false, legs: bus_legs)

      # EXERCISE
      grouped_itineraries = ItineraryGroups.from_itineraries([first_itinerary, second_interary])

      # VERIFY
      assert Kernel.length(grouped_itineraries) == 2
    end

    test "does not group bus itineraries with shuttles", %{stops: [a, b, _]} do
      # SETUP
      shuttle_leg = TripPlanner.build(:shuttle_leg, from: a, to: b)

      bus_itineraries =
        TripPlanner.build_list(5, :itinerary,
          accessible?: true,
          legs: [TripPlanner.build(:bus_leg, from: a, to: b)]
        )

      shuttle_itinerary = TripPlanner.build(:itinerary, accessible?: true, legs: [shuttle_leg])
      many_itineraries = [shuttle_itinerary | bus_itineraries]

      # EXERCISE
      grouped_itineraries = ItineraryGroups.from_itineraries(many_itineraries)

      # VERIFY
      assert Kernel.length(grouped_itineraries) == 2
    end
  end

  test "ignores short walking distances of < 0.2 miles when grouping", %{stops: [a, b, c]} do
    # SETUP
    bus_a_b_leg = TripPlanner.build(:bus_leg, from: a, to: b)
    walk_b_c_leg = TripPlanner.build(:walking_leg, from: b, to: c) |> Map.put(:distance, 0.199)
    walk_c_b_leg = TripPlanner.build(:walking_leg, from: c, to: b) |> Map.put(:distance, 0.199)
    bus_b_a_leg = TripPlanner.build(:bus_leg, from: b, to: a)

    first_itinerary =
      TripPlanner.build(:itinerary, legs: [bus_a_b_leg, walk_b_c_leg, walk_c_b_leg, bus_b_a_leg])

    second_itinerary = TripPlanner.build(:itinerary, legs: [bus_a_b_leg, bus_b_a_leg])

    # EXERCISE
    grouped_itineraries = ItineraryGroups.from_itineraries([first_itinerary, second_itinerary])

    # VERIFY
    assert Kernel.length(grouped_itineraries) == 1
  end

  test "ignores intermediate legs with short walking durations of < 5 minutes when summarizing",
       %{stops: [a, b, c]} do
    bus_a_b_leg = TripPlanner.build(:bus_leg, from: a, to: b)

    walk_b_c_leg =
      TripPlanner.build(:walking_leg, from: b, to: c)
      |> Map.merge(%{distance: 0.5, duration: 4})

    walk_c_b_leg =
      TripPlanner.build(:walking_leg, from: c, to: b)
      |> Map.merge(%{distance: 0.5, duration: 6})

    bus_b_a_leg = TripPlanner.build(:bus_leg, from: b, to: a)

    itinerary =
      TripPlanner.build(:itinerary, legs: [bus_a_b_leg, walk_b_c_leg, walk_c_b_leg, bus_b_a_leg])

    [%{summary: %{summarized_legs: legs}}] = ItineraryGroups.from_itineraries([itinerary])

    assert [_, %{walk_minutes: 6}, _] = legs
  end

  test "caps itineraries at certain number each group" do
    base_itinerary = TripPlanner.build(:itinerary)

    itineraries =
      Faker.Util.list(10, fn n ->
        t = base_itinerary.start
        base_itinerary |> Map.put(:start, Timex.shift(t, minutes: 10 * n))
      end)

    counts =
      itineraries
      |> ItineraryGroups.from_itineraries()
      |> Enum.map(&Enum.count(&1.itineraries))

    refute Enum.any?(counts, &(&1 > ItineraryGroups.max_per_group()))
  end

  test "does not cap itineraries in the summary" do
    base_itinerary =
      TripPlanner.build(:itinerary, legs: [TripPlanner.build(:bus_leg)])

    route_ids = Faker.Util.sample_uniq(10, fn -> Faker.Lorem.word() end)

    base_leg = TripPlanner.build(:bus_leg)

    itineraries =
      route_ids
      |> Enum.with_index(fn route_id, n ->
        leg =
          base_leg
          |> Map.update!(:mode, fn mode ->
            mode |> Map.update!(:route, fn route -> route |> Map.put(:id, route_id) end)
          end)

        base_itinerary
        |> Map.put(:start, Timex.shift(base_itinerary.start, minutes: 10 * n))
        |> Map.put(:legs, [leg])
      end)

    summarized_route_ids =
      itineraries
      |> ItineraryGroups.from_itineraries()
      |> List.first()
      |> Map.fetch!(:summary)
      |> Map.fetch!(:summarized_legs)
      |> List.first()
      |> Map.fetch!(:routes)
      |> Enum.map(& &1.id)

    assert MapSet.new(summarized_route_ids) == MapSet.new(route_ids)
  end

  test "uses second argument to pick last N itineraries per group instead of first" do
    base_start_time = Faker.DateTime.forward(1)

    base_itinerary =
      TripPlanner.build(:itinerary,
        start: base_start_time,
        stop: Timex.shift(base_start_time, minutes: 30)
      )

    # list of itineraries sorted by time, that's otherwise identical such that
    # they'll get grouped together
    sorted_itineraries =
      Faker.Util.list(15, fn n ->
        base_itinerary
        |> Map.put(:start, Timex.shift(base_itinerary.start, minutes: 10 * n))
        |> Map.put(:stop, Timex.shift(base_itinerary.stop, minutes: 10 * n))
      end)

    first_n_itineraries = Enum.take(sorted_itineraries, ItineraryGroups.max_per_group())
    last_n_itineraries = Enum.take(sorted_itineraries, -ItineraryGroups.max_per_group())

    assert sorted_itineraries
           |> ItineraryGroups.from_itineraries()
           |> List.first()
           |> Map.get(:itineraries) == first_n_itineraries

    assert sorted_itineraries
           |> ItineraryGroups.from_itineraries(take_from_end: true)
           |> List.first()
           |> Map.get(:itineraries) == last_n_itineraries
  end
end
