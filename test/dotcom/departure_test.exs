defmodule Dotcom.DepartureTest do
  use ExUnit.Case, async: true

  import Dotcom.Departure
  import Mox
  import Test.Support.Factories.Predictions.Prediction

  setup :verify_on_exit!

  setup _ do
    stub_with(Dotcom.Utils.DateTime.Mock, Dotcom.Utils.DateTime)
    :ok
  end

  describe "display/1 for predictions follows the realtime display guidelines" do
    test "doesn't show cancelled/skipped" do
      prediction =
        build(:prediction, schedule_relationship: Faker.Util.pick([:skipped, :cancelled]))

      refute display(prediction)
    end

    test "shows rail status, if present" do
      status = Faker.App.name()
      prediction_with_status = rail_prediction(status: status, track: nil)
      assert display(prediction_with_status) =~ status
    end

    test "shows rail status with track number" do
      status = Faker.App.name()
      track = Faker.Util.digit()
      prediction = rail_prediction(status: status, track: track)
      assert display(prediction) =~ status
      assert display(prediction) =~ track
    end

    test "shows track number" do
      track = Faker.Util.digit()
      prediction = rail_prediction(status: nil, track: track)
      assert display(prediction) =~ track
    end

    test "if no status, shows a countdown" do
      prediction = included_prediction(status: nil, track: nil)
      assert display(prediction) =~ "min"
    end

    test "includes a boarding time for rail" do
      time = Faker.DateTime.forward(1)
      formatted = DotcomWeb.Components.TripPlanner.Helpers.formatted_time(time)
      prediction = rail_prediction(time: time)
      assert display(prediction) =~ formatted
    end

    test "includes a boarding time for bus, if relevant" do
      time = Dotcom.Utils.DateTime.now() |> DateTime.shift(second: 15)
      prediction = bus_prediction(time: time)
      assert display(prediction) == "Now"
    end

    test "includes a boarding time for subway, if relevant" do
      time = Dotcom.Utils.DateTime.now() |> DateTime.shift(second: 15)
      prediction = subway_prediction(time: time)
      assert display(prediction) == "Arriving"
    end
  end

  # skipped/cancelled predictions won't show anything! so make sure we don't
  # generate one here by specifying schedule_relationship: nil
  defp included_prediction(attrs) do
    build(:prediction, Keyword.merge(attrs, schedule_relationship: nil))
  end

  defp rail_prediction(attrs) do
    Keyword.merge(attrs, route: %Routes.Route{type: 2})
    |> included_prediction()
  end

  defp subway_prediction(attrs) do
    route_type = Faker.Util.pick([0, 1])

    Keyword.merge(attrs, route: %Routes.Route{type: route_type})
    |> included_prediction()
  end

  defp bus_prediction(attrs) do
    Keyword.merge(attrs, route: %Routes.Route{type: 3})
    |> included_prediction()
  end
end
