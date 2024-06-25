defmodule Dotcom.TripPlan.ItineraryRowListTest do
  use ExUnit.Case, async: true

  alias Test.Support.Factories.{MBTA.Api, Routes.Route, Stops.Stop}

  import Dotcom.TripPlan.ItineraryRowList
  import Mox
  import Test.Support.Factories.TripPlanner.TripPlanner

  @date_time ~N[2017-06-27T11:43:00]
  @from build(:stop_named_position, stop_id: "place-sstat")
  @to build(:named_position)

  setup :verify_on_exit!

  describe "from_itinerary" do
    setup do
      # Start parent supervisor - Dotcom.TripPlan.ItineraryRow.get_additional_routes/5 needs this to be running.
      _ = start_supervised(Dotcom.GreenLine.Supervisor)

      # these rows depend on the itinerary having some sort of logic more
      # advanced than randomly generated data. so here we make sure the legs are
      # timed in sequence.
      itinerary =
        build(:itinerary,
          start: @date_time,
          stop: Timex.shift(@date_time, minutes: 60),
          legs: [
            build(:leg,
              from: @from,
              start: Timex.shift(@date_time, minutes: 10),
              stop: Timex.shift(@date_time, minutes: 20)
            ),
            build(:leg,
              start: Timex.shift(@date_time, minutes: 30),
              stop: Timex.shift(@date_time, minutes: 40)
            ),
            build(:leg,
              to: @to,
              start: Timex.shift(@date_time, minutes: 50),
              stop: Timex.shift(@date_time, minutes: 60)
            )
          ]
        )

      stub(Routes.Repo.Mock, :get, fn id -> Route.build(:route, %{id: id}) end)
      stub(Stops.Repo.Mock, :get_parent, fn id -> Stop.build(:stop, %{id: id}) end)

      stub(MBTA.Api.Mock, :get_json, fn "/trips" <> _, [] ->
        %JsonApi{data: [Api.build(:trip_item)]}
      end)

      {:ok, %{itinerary: itinerary, itinerary_row_list: from_itinerary(itinerary)}}
    end

    @tag :external
    test "ItineraryRow contains given stop name when no stop_id present" do
      from = build(:stop_named_position, stop_id: nil)
      to = build(:stop_named_position, stop_id: "place-sstat")
      date_time = ~N[2017-06-27T11:43:00]

      itinerary =
        build(:itinerary,
          start: date_time,
          legs: [build(:leg, from: from)] ++ build_list(3, :leg) ++ [build(:leg, to: to)]
        )

      itinerary_row_list = from_itinerary(itinerary)

      itinerary_destination =
        itinerary.legs |> Enum.reject(& &1.from.stop_id) |> List.first() |> Map.get(:from)

      row_destination =
        Enum.find(itinerary_row_list.rows, fn %{stop: {_stop_name, stop_id}} ->
          is_nil(stop_id)
        end)

      assert itinerary_destination.name == elem(row_destination.stop, 0)
    end

    test "ItineraryRow contains no consecutive duplicate stops", %{itinerary_row_list: row_list} do
      stops = Enum.map(row_list.rows, & &1.stop)
      assert stops == Enum.dedup(stops)
    end

    test "Rows have departure times of corresponding legs", %{
      itinerary: itinerary,
      itinerary_row_list: row_list
    } do
      for {row, leg} <- Enum.zip(row_list, itinerary) do
        assert row.departure == leg.start
      end
    end

    test "ItineraryRow departure times increase in ascending order", %{
      itinerary_row_list: row_list
    } do
      assert Enum.sort_by(row_list.rows, & &1.departure, &Timex.before?/2) == row_list.rows
    end

    test "Destination is the last stop in itinerary", %{
      itinerary: itinerary,
      itinerary_row_list: row_list
    } do
      last_position = itinerary.legs |> List.last() |> Map.get(:to)
      {stop_name, _stop_id, _arrival_time, _} = row_list.destination

      position_name =
        case stop_mapper(last_position.stop_id) do
          nil -> last_position.name
          %{name: name} -> name
        end

      assert stop_name == position_name
    end

    test "From stops on ItineraryRowList are not duplicated in intermediate stops", %{
      itinerary_row_list: row_list
    } do
      from_stops = MapSet.new(row_list.rows, &elem(&1.stop, 1))

      intermediate_stops =
        row_list.rows |> Enum.filter(& &1.transit?) |> Enum.flat_map(& &1.steps) |> MapSet.new()

      intersection = MapSet.intersection(from_stops, intermediate_stops)
      assert Enum.empty?(intersection)
    end

    test "Distance is given with personal steps", %{itinerary: itinerary} do
      leg =
        build(:leg, mode: build(:personal_detail))

      personal_itinerary = %{itinerary | legs: [leg]}
      row_list = from_itinerary(personal_itinerary)

      for {_step, distance} <- Enum.flat_map(row_list, & &1.steps) do
        assert distance
      end
    end

    test "Distance not given for transit steps", %{itinerary_row_list: row_list} do
      for itinerary_row <- row_list, itinerary_row.transit? do
        for {_step, distance} <- itinerary_row.steps do
          refute distance
        end
      end
    end

    test "Uses to name when one is provided", %{itinerary: itinerary} do
      {destination, stop_id, _datetime, _alerts} =
        from_itinerary(itinerary, to: "Final Destination").destination

      assert destination == "Final Destination"
      refute stop_id
    end

    @tag :external
    test "Does not replace to stop_id" do
      to = build(:stop_named_position, stop_id: "place-north")

      itinerary =
        build(:itinerary,
          start: @date_time,
          legs: [build(:leg, from: @from)] ++ build_list(3, :leg) ++ [build(:leg, to: to)]
        )

      {name, id, _datetime, _alerts} =
        itinerary |> from_itinerary(to: "Final Destination") |> Map.get(:destination)

      assert name == "Final Destination"
      assert id == "place-north"
    end

    test "Uses given from name when one is provided" do
      from = build(:named_position)

      itinerary =
        build(:itinerary,
          start: @date_time,
          legs: [build(:leg, from: from)] ++ build_list(3, :leg) ++ [build(:leg, to: @to)]
        )

      {name, nil} =
        itinerary |> from_itinerary(from: "Starting Point") |> Enum.at(0) |> Map.get(:stop)

      assert name == "Starting Point"
    end

    test "Does not replace from stop_id", %{itinerary: itinerary} do
      {name, id} =
        itinerary |> from_itinerary(from: "Starting Point") |> Enum.at(0) |> Map.get(:stop)

      assert name == "Starting Point"
      assert id == "place-sstat"
    end

    @tag :external
    test "Returns additional routes for Green Line legs", %{itinerary: itinerary} do
      green_leg = %TripPlan.Leg{
        start: @date_time,
        stop: @date_time,
        from: %TripPlan.NamedPosition{stop_id: "place-kencl", name: "Kenmore"},
        to: %TripPlan.NamedPosition{stop_id: "place-pktrm", name: "Park Street"},
        mode: %TripPlan.TransitDetail{
          route_id: "Green-C",
          trip_id: "Green-1",
          intermediate_stop_ids: []
        }
      }

      personal_itinerary = %{itinerary | legs: [green_leg]}
      itinerary_rows = from_itinerary(personal_itinerary)

      additional_routes =
        itinerary_rows.rows |> List.first() |> Map.get(:additional_routes) |> Enum.map(& &1.id)

      assert additional_routes == ["Green-B", "Green-D"]
    end

    test "Uses accessible? flag from itinerary", %{itinerary: itinerary} do
      accessible_itinerary_rows = from_itinerary(%{itinerary | accessible?: true})
      inaccessible_itinerary_rows = from_itinerary(%{itinerary | accessible?: false})

      assert accessible_itinerary_rows.accessible?
      refute inaccessible_itinerary_rows.accessible?
    end

    @tag :external
    test "Alerts for intermediate steps parsed correctly", %{itinerary: itinerary} do
      red_leg = %TripPlan.Leg{
        start: @date_time,
        stop: @date_time,
        from: %TripPlan.NamedPosition{stop_id: "place-sstat", name: "South Station"},
        to: %TripPlan.NamedPosition{stop_id: "place-pktrm", name: "Park Street"},
        mode: %TripPlan.TransitDetail{
          route_id: "Red",
          intermediate_stop_ids: ["place-dwnxg"]
        }
      }

      itinerary = %{itinerary | legs: [red_leg]}
      itinerary_rows = from_itinerary(itinerary, to: "place-pktrm")
      rows = Map.get(itinerary_rows, :rows)
      assert length(List.first(rows).steps) == 1
      intermediate_step = List.first(List.first(rows).steps)

      # Alert id 4 should not be included because it is not of type :ride
      assert length(intermediate_step.alerts) == 1
      assert intermediate_step.description == "Downtown Crossing"
      assert List.first(intermediate_step.alerts).id == 3
    end

    @tag :external
    test "Alerts for stations mid travel and destination parsed correctly", %{
      itinerary: itinerary
    } do
      red_leg = %TripPlan.Leg{
        start: @date_time,
        stop: @date_time,
        from: %TripPlan.NamedPosition{stop_id: "place-sstat", name: "South Station"},
        to: %TripPlan.NamedPosition{stop_id: "place-pktrm", name: "Park Street"},
        mode: %TripPlan.TransitDetail{
          route_id: "Red",
          intermediate_stop_ids: []
        }
      }

      green_leg = %TripPlan.Leg{
        start: @date_time,
        stop: @date_time,
        from: %TripPlan.NamedPosition{stop_id: "place-pktrm", name: "Park Street"},
        to: %TripPlan.NamedPosition{stop_id: "place-kencl", name: "Kenmore"},
        mode: %TripPlan.TransitDetail{
          route_id: "Green-C",
          trip_id: "Green-1",
          intermediate_stop_ids: []
        }
      }

      itinerary = %{itinerary | legs: [red_leg, green_leg]}
      itinerary_rows = from_itinerary(itinerary, to: "place-kencl")
      {_destination, _id, _datetime, destination_alerts} = Map.get(itinerary_rows, :destination)
      assert length(destination_alerts) == 1
      assert List.first(destination_alerts).id == 2
      transfer_alerts = List.last(itinerary_rows.rows).alerts
      assert length(transfer_alerts) == 1
      assert List.first(transfer_alerts).id == 1
    end
  end

  defp stop_mapper("place-north") do
    %Stops.Stop{name: "Repo North Station", id: "place-north"}
  end

  defp stop_mapper("place-sstat") do
    %Stops.Stop{name: "Repo South Station", id: "place-sstat"}
  end

  defp stop_mapper("place-kencl") do
    %Stops.Stop{name: "Kenmore", id: "place-kencl"}
  end

  defp stop_mapper("place-dwnxg") do
    %Stops.Stop{name: "Downtown Crossing", id: "place-dwnxg"}
  end

  defp stop_mapper("place-pktrm") do
    %Stops.Stop{name: "Park Street", id: "place-pktrm"}
  end

  defp stop_mapper(_) do
    nil
  end
end
