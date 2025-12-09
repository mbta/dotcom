defmodule Dotcom.ServicePatternsTest do
  use ExUnit.Case, async: false

  import Dotcom.ServicePatterns
  import Mox
  import Test.Support.Factories.MBTA.Api

  setup :verify_on_exit!

  setup do
    cache = Application.get_env(:dotcom, :cache)
    cache.flush()
    stub_with(Dotcom.Utils.DateTime.Mock, Dotcom.Utils.DateTime)

    :ok
  end

  describe "has_service?/1" do
    test "requests schedules with params - assigns default date" do
      expect(MBTA.Api.Mock, :get_json, fn "/schedules/", params ->
        assert Keyword.get(params, :date)
        %JsonApi{data: []}
      end)

      _ = has_service?([])
    end

    test "requests schedules with params - custom date" do
      date = Faker.Date.forward(2)

      expect(MBTA.Api.Mock, :get_json, fn "/schedules/", params ->
        assert Keyword.get(params, :date) == Date.to_iso8601(date)
        %JsonApi{data: []}
      end)

      _ = has_service?(date: date)
    end

    test "requests schedules with params - custom params" do
      route = Faker.App.name()

      expect(MBTA.Api.Mock, :get_json, fn "/schedules/", params ->
        assert Keyword.get(params, :"filter[route]") == route
        %JsonApi{data: []}
      end)

      _ = has_service?(route: route)
    end

    test "returns true if there are schedules" do
      expect(MBTA.Api.Mock, :get_json, fn "/schedules/", _params ->
        %JsonApi{data: build_list(1, :schedule_item)}
      end)

      assert has_service?([])
    end

    test "returns false if no schedules" do
      expect(MBTA.Api.Mock, :get_json, fn "/schedules/", _params ->
        %JsonApi{data: []}
      end)

      refute has_service?([])
    end

    test "raises error if error" do
      error_message = Faker.Lorem.sentence()

      expect(MBTA.Api.Mock, :get_json, fn "/schedules/", _params ->
        {:error, [%JsonApi.Error{detail: error_message}]}
      end)

      assert_raise JsonApi.Error, error_message, fn ->
        has_service?([])
      end
    end
  end
end
