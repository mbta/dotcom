defmodule Dotcom.VehicleHelpersTest do
  use ExUnit.Case, async: false

  import Mock
  import Mox
  import VehicleHelpers

  @shape %Routes.Shape{id: "9850002", polyline: "polyline"}
  @station %Stops.Stop{id: "place-sstat", name: "South Station"}
  @trip %Schedules.Trip{
    id: "CR-554466-501",
    name: "501",
    headsign: "Worcester",
    shape_id: @shape.id
  }
  @route %Routes.Route{id: "CR-Worcester", name: "Framingham/Worcester Line", type: 2}

  @locations %{
    {"CR-554466-501", "place-sstat"} => %Vehicles.Vehicle{
      latitude: 1.1,
      longitude: 2.2,
      status: :stopped,
      route_id: @route.id,
      stop_id: @station.id,
      trip_id: @trip.id
    }
  }

  @predictions [
    %Predictions.Prediction{
      departing?: true,
      time: ~N[2018-05-01T11:00:00],
      status: "On Time",
      trip: @trip,
      stop: @station
    }
  ]

  setup :verify_on_exit!

  setup do
    stub(Stops.Repo.Mock, :get, fn _ ->
      @station
    end)

    :ok
  end

  setup_with_mocks([
    {Schedules.Repo, [:passthrough],
     [
       trip: fn
         "CR-554466-501" -> @trip
         id -> %Schedules.Trip{id: id}
       end
     ]}
  ]) do
    tooltips = build_tooltip_index(@route, @locations, @predictions)

    {:ok, tooltips: tooltips, tooltip_base: tooltips[@station.id]}
  end

  describe "build_tooltip_index/3" do
    test "verify the Vehicle tooltip data", %{tooltips: tooltips, tooltip_base: tooltip_base} do
      assert length(Map.keys(tooltips)) == 2
      assert Map.has_key?(tooltips, {"CR-554466-501", "place-sstat"})
      assert Map.has_key?(tooltips, "place-sstat")
      assert tooltip_base.route.type == 2
      assert tooltip_base.trip.name == "501"
      assert tooltip_base.trip.headsign == "Worcester"
      assert tooltip_base.prediction.status == "On Time"
      assert tooltip_base.vehicle.status == :stopped
    end

    test "it does not return a tooltip if a vehicle has a null stop_id" do
      null_location = %{{"trip-1", nil} => %Vehicles.Vehicle{}}
      tooltips = build_tooltip_index(@route, Enum.concat(@locations, null_location), @predictions)

      assert length(Map.keys(tooltips)) == 2
      assert Map.has_key?(tooltips, {"CR-554466-501", "place-sstat"})
      assert Map.has_key?(tooltips, "place-sstat")

      tooltip_base = tooltips["place-sstat"]

      assert tooltip_base.route.type == 2
      assert tooltip_base.trip.name == "501"
      assert tooltip_base.trip.headsign == "Worcester"
      assert tooltip_base.prediction.status == "On Time"
      assert tooltip_base.vehicle.status == :stopped
    end

    test "it does return a tooltip if a vehicle has a null trip_id" do
      null_trip = %{{nil, "place-sstat"} => %Vehicles.Vehicle{stop_id: ""}}
      tooltips = build_tooltip_index(@route, null_trip, [])
      tooltip_base = tooltips["place-sstat"]
      assert length(Map.keys(tooltips)) == 2
      assert Map.has_key?(tooltips, {nil, "place-sstat"})
      assert Map.has_key?(tooltips, "place-sstat")
      assert tooltip_base.route.type == 2
      assert tooltip_base.trip == nil
      assert tooltip_base.prediction == nil
      assert tooltip_base.vehicle == %Vehicles.Vehicle{stop_id: ""}
    end

    test "it uses the prediction corresponding to the vehicle's current stop" do
      locations = %{
        {"trip_1", "stop_1"} => %Vehicles.Vehicle{
          stop_id: "stop_1",
          trip_id: "trip_1"
        }
      }

      predictions = [
        %Predictions.Prediction{
          departing?: false,
          time: ~N[2017-01-01T11:10:00],
          status: "On Time",
          trip: %Schedules.Trip{id: "trip_1"},
          stop: %Stops.Stop{id: "stop_2"}
        },
        correct_prediction = %Predictions.Prediction{
          departing?: true,
          time: ~N[2017-01-01T11:00:00],
          status: "On Time",
          trip: %Schedules.Trip{id: "trip_1"},
          stop: %Stops.Stop{id: "stop_1"}
        }
      ]

      route = %Routes.Route{type: 2}

      tooltips = build_tooltip_index(route, locations, predictions)
      tooltip = tooltips[{"trip_1", "stop_1"}]

      assert tooltip.prediction == correct_prediction
    end
  end

  describe "tooltip/1" do
    test "when a prediction has a track, gives the status and the track", %{
      tooltip_base: tooltip_base
    } do
      tooltip = %{
        tooltip_base
        | prediction: %{tooltip_base.prediction | status: "Now Boarding", track: "4"}
      }

      assert tooltip(tooltip) =~ "now boarding on track 4"
    end

    test "when a prediction does not have a track, gives nothing", %{tooltip_base: tooltip_base} do
      tooltip = %{
        tooltip_base
        | prediction: %{tooltip_base.prediction | status: "Now Boarding", track: nil}
      }

      refute tooltip(tooltip) =~ "now boarding"
    end

    test "when there is no time or status for the prediction, returns stop name", %{
      tooltip_base: tooltip_base
    } do
      tooltip = %{
        tooltip_base
        | prediction: %{tooltip_base.prediction | status: nil, time: nil}
      }

      assert tooltip(tooltip) =~ "South Station"
    end

    test "creates a tooltip for the prediction", %{tooltip_base: tooltip_base} do
      time = ~N[2017-02-17T05:46:28]

      result =
        tooltip(%{
          tooltip_base
          | prediction: %Predictions.Prediction{time: time, status: "Now Boarding", track: "4"}
        })

      assert result =~ "now boarding on track 4"
    end

    test "Displays text based on vehicle status", %{tooltip_base: tooltip_base} do
      tooltip1 = %{tooltip_base | vehicle: %Vehicles.Vehicle{status: :incoming}}
      tooltip2 = %{tooltip_base | vehicle: %Vehicles.Vehicle{status: :stopped}}
      tooltip3 = %{tooltip_base | vehicle: %Vehicles.Vehicle{status: :in_transit}}

      assert tooltip(tooltip1) =~ "Worcester train 501 is arriving at"
      assert tooltip(tooltip2) =~ "Worcester train 501 has arrived"
      assert tooltip(tooltip3) =~ "Worcester train 501 is on the way to"
    end

    test "does not include vehicle status if we don't have the name of the next stop", %{
      tooltip_base: tooltip_base
    } do
      tooltip = %{
        tooltip_base
        | vehicle: %Vehicles.Vehicle{status: :in_transit},
          stop_name: ""
      }

      assert tooltip(tooltip) =~ "Worcester train 501"
      refute tooltip(tooltip) =~ "is on the way to"
    end

    test "displays the route when there isn't a trip", %{tooltip_base: tooltip_base} do
      actual = tooltip(%{tooltip_base | prediction: nil, trip: nil})
      assert actual =~ "Framingham/Worcester Line"
      assert actual =~ "train has arrived"
      assert actual =~ "South Station"
    end

    test "special message with conflicting statuses", %{tooltip_base: tooltip_base} do
      actual =
        tooltip(%{
          tooltip_base
          | vehicle: %Vehicles.Vehicle{status: :stopped},
            prediction: %Predictions.Prediction{time: ~N[2021-10-01T11:00:00], status: "Departed", track: "4"}
        })

      assert actual =~ "has left South Station, departed on track 4"
    end
  end

  describe "prediction_for_stop/2" do
    test "do not crash if vehicle prediction does not contain a trip" do
      predictions = [
        %Predictions.Prediction{
          departing?: true,
          time: ~N[2017-01-01T11:00:00],
          status: "On Time"
        }
      ]

      tooltips = build_tooltip_index(@route, @locations, predictions)
      tooltip = tooltips["place-sstat"]
      assert tooltip(tooltip) =~ "train 501 has arrived"
    end
  end

  describe "get_vehicle_polylines/2" do
    test "vehicle polyline not in route polylines" do
      expect(Routes.Repo.Mock, :get_shape, fn _ ->
        [@shape]
      end)

      vehicle_polylines = get_vehicle_polylines(@locations, [])
      assert [<<_::binary>>] = vehicle_polylines
    end

    test "vehicle polyline in route polylines" do
      shape = %Routes.Shape{id: "9850002"}
      vehicle_polylines = get_vehicle_polylines(@locations, [shape])
      assert vehicle_polylines == []
    end
  end
end
