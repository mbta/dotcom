defmodule Dotcom.ServicePatternsTest do
  use ExUnit.Case, async: true

  import Dotcom.ServicePatterns
  import Mox
  import Test.Support.Factories.Services.Service
  import Test.Support.Generators.Date, only: [random_date: 0]

  alias Services.Service
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
      date = random_date()

      expect(Services.Repo.Mock, :by_route_id, fn _ ->
        build_list(5, :service, %{date: date})
      end)

      assert has_service?(route: FactoryHelpers.build(:id), date: date)
    end

    test "returns false if no service" do
      expect(Services.Repo.Mock, :by_route_id, fn _ ->
        []
      end)

      refute has_service?(route: FactoryHelpers.build(:id))
    end

    test "returns false if services only serve other dates" do
      date = random_date()

      expect(Services.Repo.Mock, :by_route_id, fn _ ->
        build_list(5, :service, %{date: date})
      end)

      other_date = Date.shift(date, year: 5)

      refute has_service?(route: FactoryHelpers.build(:id), date: other_date)
    end
  end

  describe "upcoming_holiday_service_dates_for_route/2" do
    test "returns sorted upcoming dates grouped by atypical service type" do
      route_id = FactoryHelpers.build(:id)
      current_date = ~D[2025-01-10]

      services = [
        %Service{
          typicality: :extra_service,
          all_active_dates: [~D[2025-01-09], ~D[2025-01-20]]
        },
        %Service{
          typicality: :holiday_service,
          all_active_dates: [~D[2025-01-13], ~D[2025-01-10]]
        },
        %Service{
          typicality: :holiday_service,
          all_active_dates: [~D[2025-01-24]]
        },
        %Service{typicality: :typical_service, all_active_dates: [~D[2025-01-11]]}
      ]

      expect(Services.Repo.Mock, :by_route_id, fn ^route_id -> services end)

      assert grouped_dates = upcoming_holiday_service_dates_for_route(route_id, current_date)

      assert grouped_dates |> Enum.map(&elem(&1, 1)) == [
               ~D[2025-01-10],
               ~D[2025-01-13],
               ~D[2025-01-24]
             ]
    end
  end
end
