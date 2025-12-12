defmodule Dotcom.ServicePatternsTest do
  use ExUnit.Case, async: true

  import Dotcom.ServicePatterns
  import Mox
  import Test.Support.Factories.Services.Service

  alias Test.Support.FactoryHelpers

  setup :verify_on_exit!

  setup do
    stub_with(Dotcom.Utils.DateTime.Mock, Dotcom.Utils.DateTime)

    :ok
  end

  describe "has_service?/1" do
    test "requests services - assigns default date if none given" do
      route_id = FactoryHelpers.build(:id)

      expect(Services.Repo.Mock, :by_route_id, fn ^route_id, opts ->
        assert opts[:date]
        []
      end)

      _ = has_service?(route: route_id)
    end

    test "requests services - uses date" do
      route_id = FactoryHelpers.build(:id)
      date = Faker.Date.forward(2)

      expect(Services.Repo.Mock, :by_route_id, fn ^route_id, opts ->
        assert opts[:date] == Date.to_iso8601(date)
        []
      end)

      _ = has_service?(route: route_id, date: date)
    end

    test "returns true if there are services for that date" do
      expect(Services.Repo.Mock, :by_route_id, fn _, _ ->
        build_list(5, :service)
      end)

      assert has_service?(route: FactoryHelpers.build(:id))
    end

    test "returns false if no service" do
      expect(Services.Repo.Mock, :by_route_id, fn _, _ ->
        []
      end)

      refute has_service?(route: FactoryHelpers.build(:id))
    end

    test "returns false if services only serve other dates" do
      expect(Services.Repo.Mock, :by_route_id, fn _, _ ->
        build_list(5, :service)
      end)

      other_date = Dotcom.Utils.DateTime.now() |> DateTime.to_date() |> Date.shift(year: 5)

      refute has_service?(route: FactoryHelpers.build(:id), date: other_date)
    end
  end
end
