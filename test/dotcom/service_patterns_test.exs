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
    test "requests services" do
      route_id = FactoryHelpers.build(:id)

      expect(Services.Repo.Mock, :by_route_id, fn ^route_id ->
        []
      end)

      _ = has_service?(route: route_id)
    end

    test "returns true if there are services for that date" do
      expect(Services.Repo.Mock, :by_route_id, fn _ ->
        build_list(5, :service)
      end)

      assert has_service?(route: FactoryHelpers.build(:id))
    end

    test "returns false if no service" do
      expect(Services.Repo.Mock, :by_route_id, fn _ ->
        []
      end)

      refute has_service?(route: FactoryHelpers.build(:id))
    end

    test "returns false if services only serve other dates" do
      expect(Services.Repo.Mock, :by_route_id, fn _ ->
        build_list(5, :service)
      end)

      other_date = Dotcom.Utils.DateTime.now() |> DateTime.to_date() |> Date.shift(year: 5)

      refute has_service?(route: FactoryHelpers.build(:id), date: other_date)
    end
  end
end
