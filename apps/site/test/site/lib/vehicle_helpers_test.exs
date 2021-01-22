defmodule Site.VehicleHelpersTest do
  use ExUnit.Case, async: true

  import VehicleHelpers
  import SiteWeb.ViewHelpers, only: [format_schedule_time: 1]

  @locations %{
    {"CR-Weekday-Storm-20-1501", "place-sstat"} => %Vehicles.Vehicle{
      latitude: 1.1,
      longitude: 2.2,
      status: :stopped,
      stop_id: "place-sstat",
      trip_id: "CR-Weekday-Storm-20-1501",
      shape_id: "9850002"
    }
  }

  @predictions [
    %Predictions.Prediction{
      departing?: true,
      time: ~N[2018-05-01T11:00:00],
      status: "On Time",
      trip: %Schedules.Trip{id: "CR-Weekday-Storm-20-1501", shape_id: "9850002"},
      stop: %Stops.Stop{id: "place-sstat"}
    }
  ]

  @route %Routes.Route{name: "Framingham/Worcester Line", type: 2}

  @tooltips build_tooltip_index(@route, @locations, @predictions)

  @tooltip_base @tooltips["place-sstat"]

  describe "build_tooltip_index/3" do
    test "translate child stop to parent stop" do
      locations = %{
        {"CR-Weekday-Fall-20-531", "South Station-02"} => %Vehicles.Vehicle{
          latitude: 1.1,
          longitude: 2.2,
          status: :stopped,
          stop_id: "South Station-02",
          trip_id: "CR-Weekday-Fall-20-531",
          shape_id: "903_0018"
        }
      }

      assert @route
             |> build_tooltip_index(locations, @predictions)
             |> Map.has_key?("place-sstat")
    end

    test "translate parent stop to itself" do
      locations = %{
        {"CR-Weekday-Fall-19-330", "place-NHRML-0254"} => %Vehicles.Vehicle{
          latitude: 1.1,
          longitude: 2.2,
          status: :stopped,
          stop_id: "place-NHRML-0254",
          trip_id: "CR-Weekday-Fall-19-330",
          shape_id: "903_0018"
        }
      }

      assert @route
             |> build_tooltip_index(locations, @predictions)
             |> Map.has_key?("place-NHRML-0254")
    end

    test "verify the Vehicle tooltip data" do
      assert length(Map.keys(@tooltips)) == 2
      assert Map.has_key?(@tooltips, {"CR-Weekday-Storm-20-1501", "place-sstat"})
      assert Map.has_key?(@tooltips, "place-sstat")
      assert @tooltip_base.route.type == 2
      assert @tooltip_base.trip.name == "1501"
      assert @tooltip_base.trip.headsign == "Worcester"
      assert @tooltip_base.prediction.status == "On Time"
      assert @tooltip_base.vehicle.status == :stopped
    end

    test "it does not return a tooltip if a vehicle has a null stop_id" do
      null_location = %{{"trip-1", nil} => %Vehicles.Vehicle{}}
      tooltips = build_tooltip_index(@route, Enum.concat(@locations, null_location), @predictions)

      assert length(Map.keys(tooltips)) == 2
      assert Map.has_key?(tooltips, {"CR-Weekday-Storm-20-1501", "place-sstat"})
      assert Map.has_key?(tooltips, "place-sstat")

      tooltip_base = tooltips["place-sstat"]

      assert tooltip_base.route.type == 2
      assert tooltip_base.trip.name == "1501"
      assert tooltip_base.trip.headsign == "Worcester"
      assert tooltip_base.prediction.status == "On Time"
      assert tooltip_base.vehicle.status == :stopped
    end

    test "it does return a tooltip if a vehicle has a null trip_id" do
      null_trip = %{{nil, "place-sstat"} => %Vehicles.Vehicle{}}
      tooltips = build_tooltip_index(@route, null_trip, [])
      tooltip_base = tooltips["place-sstat"]
      assert length(Map.keys(tooltips)) == 2
      assert Map.has_key?(tooltips, {nil, "place-sstat"})
      assert Map.has_key?(tooltips, "place-sstat")
      assert tooltip_base.route.type == 2
      assert tooltip_base.trip == nil
      assert tooltip_base.prediction == nil
      assert tooltip_base.vehicle == %Vehicles.Vehicle{}
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
    test "when there is no prediction, there is no prediction time" do
      tooltip = %{@tooltip_base | prediction: nil}
      assert tooltip(@tooltip_base) =~ "11:00 AM"
      refute tooltip(tooltip) =~ "11:00 AM"
    end

    test "when a prediction has a time, gives the arrival time" do
      tooltip = %{
        @tooltip_base
        | prediction: %{
            @tooltip_base.prediction
            | departing?: false,
              time: ~N[2017-01-01T13:00:00]
          }
      }

      assert tooltip(tooltip) =~ "Expected arrival at 1:00 PM"
    end

    test "when a prediction is departing, gives the departing time" do
      tooltip = %{
        @tooltip_base
        | prediction: %{
            @tooltip_base.prediction
            | departing?: true,
              time: ~N[2017-01-01T12:00:00]
          }
      }

      assert tooltip(tooltip) =~ "Expected departure at 12:00 PM"
    end

    test "when a prediction does not have a time, gives nothing" do
      tooltip = %{@tooltip_base | prediction: %{@tooltip_base.prediction | time: nil}}
      result = tooltip(tooltip)
      refute result =~ "P"
      refute result =~ "A"
    end

    test "when a prediction has a track, gives the time, the status and the track" do
      tooltip = %{
        @tooltip_base
        | prediction: %{@tooltip_base.prediction | status: "Now Boarding", track: "4"}
      }

      assert tooltip(tooltip) =~ "Now boarding on track 4"
    end

    test "when a prediction does not have a track, gives nothing" do
      tooltip = %{
        @tooltip_base
        | prediction: %{@tooltip_base.prediction | status: "Now Boarding", track: nil}
      }

      refute tooltip(tooltip) =~ "Now boarding"
    end

    test "when there is no time or status for the prediction, returns stop name" do
      tooltip = %{
        @tooltip_base
        | prediction: %{@tooltip_base.prediction | status: nil, time: nil}
      }

      assert tooltip(tooltip) =~ "South Station"
    end

    test "when there is a time but no status for the prediction, gives a tooltip with arrival time" do
      tooltip = %{
        @tooltip_base
        | prediction: %{@tooltip_base.prediction | status: nil, time: ~N[2017-01-01T12:00:00]}
      }

      assert tooltip(tooltip) =~ "12:00 PM"
    end

    test "when there is a status but no time for the prediction, gives a tooltip with the status" do
      tooltip = %{
        @tooltip_base
        | prediction: %{@tooltip_base.prediction | status: "Now Boarding", time: nil}
      }

      result = tooltip(tooltip)
      assert result =~ "has arrived"
      refute result =~ "A"
      refute result =~ "P"
    end

    test "when there is a status and a time for the prediction, gives a tooltip with both and also replaces double quotes with single quotes" do
      tooltip = %{
        @tooltip_base
        | prediction: %{
            @tooltip_base.prediction
            | status: "now boarding",
              time: ~N[2017-01-01T12:00:00]
          }
      }

      # there will be four single quotes, two for each class declaration
      assert length(String.split(tooltip(tooltip), "'")) == 5
    end

    test "creates a tooltip for the prediction" do
      time = ~N[2017-02-17T05:46:28]
      formatted_time = format_schedule_time(time)

      result =
        tooltip(%{
          @tooltip_base
          | prediction: %Predictions.Prediction{time: time, status: "Now Boarding", track: "4"}
        })

      assert result =~ "Now boarding on track 4"
      assert result =~ "Expected arrival at #{formatted_time}"
    end

    test "Displays text based on vehicle status" do
      tooltip1 = %{@tooltip_base | vehicle: %Vehicles.Vehicle{status: :incoming}}
      tooltip2 = %{@tooltip_base | vehicle: %Vehicles.Vehicle{status: :stopped}}
      tooltip3 = %{@tooltip_base | vehicle: %Vehicles.Vehicle{status: :in_transit}}

      assert tooltip(tooltip1) =~ "Worcester train 1501 is arriving at"
      assert tooltip(tooltip2) =~ "Worcester train 1501 has arrived"
      assert tooltip(tooltip3) =~ "Worcester train 1501 is on the way to"
    end

    test "does not include vehicle status if we don't have the name of the next stop" do
      tooltip = %{
        @tooltip_base
        | vehicle: %Vehicles.Vehicle{status: :in_transit},
          stop_name: ""
      }

      assert tooltip(tooltip) =~ "Worcester train 1501"
      refute tooltip(tooltip) =~ "is on the way to"
    end

    test "displays the route when there isn't a trip" do
      actual = tooltip(%{@tooltip_base | prediction: nil, trip: nil})
      assert actual =~ "Framingham/Worcester Line"
      assert actual =~ "train has arrived"
      assert actual =~ "South Station"
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
      assert tooltip(tooltip) =~ "train 1501 has arrived"
    end
  end

  describe "get_vehicle_polylines/2" do
    test "vehicle polyline not in route polylines" do
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
