defmodule Dotcom.TripPlan.OpenTripPlannerTest do
  use ExUnit.Case, async: false

  import DotcomWeb.Components.TripPlanner.Helpers, only: [fallback_error_message: 0]
  import Mox
  import Test.Support.Factories.TripPlanner.InputForm

  alias Dotcom.TripPlan.OpenTripPlanner
  alias OpenTripPlannerClient.Plan.RoutingError
  alias OpenTripPlannerClient.Test.Support.Factory, as: OTPFactory

  setup :verify_on_exit!

  setup_all do
    old_level = Logger.level()
    Logger.configure(level: :info)
    on_exit(fn -> Logger.configure(level: old_level) end)
    :ok
  end

  setup do
    stub_with(Dotcom.Utils.DateTime.Mock, Dotcom.Utils.DateTime)

    :ok
  end

  describe "to_params/1 translates an %InputForm{} into %PlanParams{}" do
    test "translates an %InputForm{} into %PlanParams{} with custom numItineraries" do
      input_form = build(:form)

      assert %OpenTripPlannerClient.PlanParams{} =
               plan_params = OpenTripPlanner.to_params(input_form)

      assert plan_params.numItineraries > 5
    end
  end

  describe "plan/1" do
    test "accepts an %InputForm{} and passes %PlanParams{} to OpenTripPlanner" do
      input = build(:form)

      expect(OpenTripPlannerClient.Mock, :plan, fn params ->
        assert %OpenTripPlannerClient.PlanParams{} = params
        assert params == OpenTripPlanner.to_params(input)

        {:ok, []}
      end)

      assert {:ok, _} = OpenTripPlanner.plan(input)
    end

    test "logs timeouts as warnings and preserves the error" do
      input = build(:form)
      error = %Req.TransportError{reason: :timeout}

      expect(OpenTripPlannerClient.Mock, :plan, fn _ -> {:error, error} end)

      log =
        ExUnit.CaptureLog.capture_log(fn ->
          assert {:error, ^error} = OpenTripPlanner.plan(input)
        end)

      assert log =~ "[warning] result=timeout"
      refute log =~ "Req.TransportError"
    end

    test "logs routing errors without itineraries at info level and preserves the plan" do
      input = build(:form)
      error = build_plan_with_routing_error([])

      expect(OpenTripPlannerClient.Mock, :plan, fn _ -> {:error, error} end)

      log =
        ExUnit.CaptureLog.capture_log([level: :info], fn ->
          assert {:error, ^error} = OpenTripPlanner.plan(input)
        end)

      assert log =~ "[info] result=OK routing_error=NO_TRANSIT_CONNECTION_IN_SEARCH_WINDOW"
      refute log =~ "[warning] result="
    end

    for {datetime_type, time_key, representative_index} <- [
          {"depart_at", :start, 0},
          {"arrive_by", :end, 1}
        ] do
      test "returns itinerary groups despite routing errors for #{datetime_type} and logs success" do
        input = build(:form, datetime_type: unquote(datetime_type))
        itineraries = OTPFactory.groupable_otp_itineraries(1, 2)
        error = build_plan_with_routing_error(itineraries)

        expect(OpenTripPlannerClient.Mock, :plan, fn _ -> {:error, error} end)

        log =
          ExUnit.CaptureLog.capture_log([level: :info], fn ->
            assert {:ok,
                    [
                      %OpenTripPlannerClient.ItineraryGroup{
                        itineraries: grouped_itineraries,
                        available?: true,
                        time_key: unquote(time_key),
                        representative_index: unquote(representative_index)
                      }
                    ]} = OpenTripPlanner.plan(input)

            assert Enum.sort_by(
                     grouped_itineraries,
                     &DateTime.to_unix(Map.fetch!(&1, unquote(time_key)), :microsecond)
                   ) ==
                     Enum.sort_by(
                       itineraries,
                       &DateTime.to_unix(Map.fetch!(&1, unquote(time_key)), :microsecond)
                     )
          end)

        assert log =~ "[info] result=otp_error"
        refute log =~ "[warning] result="
        refute log =~ "NO_TRANSIT_CONNECTION_IN_SEARCH_WINDOW"
      end
    end

    test "continues logging other transport errors as warnings" do
      input = build(:form)
      error = %Req.TransportError{reason: :econnrefused}

      expect(OpenTripPlannerClient.Mock, :plan, fn _ -> {:error, error} end)

      log =
        ExUnit.CaptureLog.capture_log(fn ->
          assert {:error, ^error} = OpenTripPlanner.plan(input)
        end)

      assert log =~ "[warning] result=error error=#{inspect(error)}"
    end

    test "handles and logs raised error" do
      input = build(:form)
      raised_error_message = Faker.Company.bullshit()

      expect(OpenTripPlannerClient.Mock, :plan, fn _ ->
        raise raised_error_message
      end)

      log =
        ExUnit.CaptureLog.capture_log(fn ->
          assert {:error, msg} = OpenTripPlanner.plan(input)
          assert msg == fallback_error_message()
        end)

      assert log =~ raised_error_message
    end
  end

  defp build_plan_with_routing_error(itineraries) do
    routing_errors = [
      OTPFactory.build(:routing_error, code: :NO_TRANSIT_CONNECTION_IN_SEARCH_WINDOW)
    ]

    plan = OTPFactory.build(:plan, itineraries: itineraries, routing_errors: routing_errors)
    %{plan | routing_errors: Enum.map(routing_errors, &struct(RoutingError, &1))}
  end
end
