defmodule Dotcom.ScheduleFinder.ServiceGroupTest do
  use ExUnit.Case

  import Dotcom.ScheduleFinder.ServiceGroup
  import Mox
  import Test.Support.Factories.Services.Service

  alias Dotcom.ScheduleFinder.ServiceGroup
  alias Test.Support.{FactoryHelpers, Generators}

  setup :verify_on_exit!

  setup do
    stub_with(Dotcom.Utils.DateTime.Mock, Dotcom.Utils.DateTime)
    :ok
  end

  describe "for_route/2" do
    test "requests services for route" do
      date = Generators.DateTime.random_date_time() |> DateTime.to_date()
      route_id = FactoryHelpers.build(:id)

      expect(Services.Repo.Mock, :by_route_id, fn ^route_id ->
        []
      end)

      assert for_route(route_id, date)
    end

    test "marks active routes based on input date" do
      services = build_list(1, :service)
      date = List.first(services) |> Map.get(:start_date)
      route_id = FactoryHelpers.build(:id)

      expect(Services.Repo.Mock, :by_route_id, fn ^route_id ->
        services
      end)

      assert [%ServiceGroup{services: [active_service]}] = for_route(route_id, date)
      assert active_service.is_now?
    end

    test "if no active routes, mark next active route" do
      inactive_date = Faker.Date.backward(1) |> Date.shift(day: -120)
      route_id = FactoryHelpers.build(:id)

      expect(Services.Repo.Mock, :by_route_id, fn ^route_id ->
        build_list(50, :service)
      end)

      # not every groups will necessarily have a service which is now/next since that's calculated across all groups. so check all of them
      all_services = for_route(route_id, inactive_date) |> Enum.flat_map(& &1.services)
      assert Enum.all?(all_services, &(&1.is_now? == false))
      assert Enum.any?(all_services, &(&1.next_available? == true))
    end

    test "groups and labels every kind of service" do
      date = Generators.DateTime.random_date_time() |> DateTime.to_date()
      route_id = FactoryHelpers.build(:id)

      expect(Services.Repo.Mock, :by_route_id, fn ^route_id ->
        build_list(50, :service)
      end)

      for %ServiceGroup{group_label: label} <- for_route(route_id, date) do
        assert is_binary(label)
      end
    end
  end
end
