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

  describe "upcoming_holidays_and_service/2" do
    test "returns upcoming holiday dates, names, and whether they are served" do
      route_id = FactoryHelpers.build(:id)
      current_date = ~D[2026-12-24]
      holiday_date = ~D[2026-12-25]

      expect(Services.Repo.Mock, :by_route_id, fn ^route_id ->
        [
          %Service{
            typicality: :holiday_service,
            all_active_dates: [holiday_date],
            added_dates_notes: %{Date.to_iso8601(holiday_date) => "Extra Christmas service"}
          }
        ]
      end)

      expect(Schedules.Repo.Mock, :end_of_rating, fn ->
        holiday_date
      end)

      assert upcoming_holidays_and_service(route_id, current_date) == [
               {holiday_date, "Extra Christmas service", true}
             ]
    end
  end
end
