defmodule Dotcom.ServicePatternsTest do
  use ExUnit.Case, async: true

  import Dotcom.ServicePatterns
  import Dotcom.Utils.ServiceDateTime, only: [service_date: 0]
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
        build_list(5, :service, %{date: service_date()})
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
        build_list(5, :service, %{date: service_date()})
      end)

      other_date =
        service_date()
        |> Date.shift(year: 5)

      refute has_service?(route: FactoryHelpers.build(:id), date: other_date)
    end
  end

  describe "for_route/1" do
    test "omits canonical typicality" do
      route_id = FactoryHelpers.build(:id)

      expect(Services.Repo.Mock, :by_route_id, fn ^route_id ->
        [build(:service, date: service_date(), typicality: :canonical)]
      end)

      assert for_route(route_id) == []
    end

    test "renames (no school) typical services" do
      route_id = FactoryHelpers.build(:id)

      expect(Services.Repo.Mock, :by_route_id, fn _ ->
        [
          build(:service,
            date: service_date(),
            description: "Weekdays (no school)",
            typicality: :typical_service,
            type: :weekday
          )
        ]
      end)

      assert [%{service_label: {:typical, :weekday, "Weekday schedules"}}] = for_route(route_id)
    end

    test "omits services which ended" do
      route_id = FactoryHelpers.build(:id)

      expect(Services.Repo.Mock, :by_route_id, fn _ ->
        [build(:service, end_date: Faker.Date.backward(1))]
      end)

      assert for_route(route_id) == []
    end

    test "splits multi-holiday services" do
      route_id = FactoryHelpers.build(:id)
      holiday_count = Faker.random_between(2, 4)

      added_dates =
        Faker.Util.sample_uniq(holiday_count, fn ->
          Faker.random_between(2, 6) |> Faker.Date.forward() |> Date.to_string()
        end)

      added_dates_notes =
        Map.new(added_dates, fn d ->
          {d, Faker.Commerce.product_name()}
        end)

      service =
        build(:service,
          typicality: :holiday_service,
          added_dates: added_dates,
          added_dates_notes: added_dates_notes,
          end_date: Faker.Date.forward(11)
        )

      expect(Services.Repo.Mock, :by_route_id, fn _ ->
        [service]
      end)

      patterns = for_route(route_id)
      assert Enum.count(patterns) == holiday_count
      assert Enum.all?(patterns, &(&1.group_label == {:holiday, "Holiday Schedules"}))
    end

    test "adjusts description to add formatted date, for single date services" do
      route_id = FactoryHelpers.build(:id)
      added_date = Faker.random_between(2, 10) |> Faker.Date.forward() |> Date.to_string()
      holiday_description = Faker.Commerce.product_name()
      added_date_notes = Map.new([{added_date, holiday_description}])

      expect(Services.Repo.Mock, :by_route_id, fn _ ->
        [
          build(:service,
            date: service_date(),
            typicality: :holiday_service,
            added_dates: [added_date],
            added_dates_notes: added_date_notes
          )
        ]
      end)

      assert patterns = for_route(route_id)
      %{service_label: {_, _, text}} = List.first(patterns)
      assert text =~ holiday_description

      assert text =~
               added_date |> Date.from_iso8601!() |> Dotcom.Utils.Time.format!(:month_day_short)
    end

    test "adjusts description for planned work" do
      route_id = FactoryHelpers.build(:id)
      disruption_service = build(:service, date: service_date(), typicality: :planned_disruption)

      expect(Services.Repo.Mock, :by_route_id, fn _ ->
        [disruption_service]
      end)

      assert [%{service_label: {:planned_disruption, _, label}}] = for_route(route_id)
      assert disruption_service.description != label
      assert label =~ disruption_service.description
    end

    test "omits duplicates" do
      route_id = FactoryHelpers.build(:id)
      service = build(:service, date: service_date())

      expect(Services.Repo.Mock, :by_route_id, fn _ ->
        [service, service]
      end)

      assert for_route(route_id) |> Enum.count() == 1
    end

    test "omits weekday service if similar" do
      route_id = FactoryHelpers.build(:id)

      mon_thurs_service =
        build(:service,
          date: service_date(),
          typicality: :typical_service,
          type: :weekday,
          valid_days: [1, 2, 3, 4]
        )

      friday_service = mon_thurs_service |> Map.put(:valid_days, [5])
      spurious_weekday_service = mon_thurs_service |> Map.put(:valid_days, [1, 2, 3, 4, 5])

      expect(Services.Repo.Mock, :by_route_id, fn _ ->
        [friday_service, mon_thurs_service, spurious_weekday_service]
      end)

      assert spurious_weekday_service not in for_route(route_id)
    end

    test "omits overlapping service" do
      route_id = FactoryHelpers.build(:id)
      service = build(:service, date: service_date(), typicality: :typical_service)

      overlapping_service =
        service
        |> Map.update!(:start_date, &Date.shift(&1, day: -1))
        |> Map.update!(:end_date, &Date.shift(&1, day: 1))

      expect(Services.Repo.Mock, :by_route_id, fn _ ->
        [overlapping_service, service]
      end)

      assert for_route(route_id) |> Enum.count() == 1
    end
  end
end
