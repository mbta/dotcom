defmodule Dotcom.TimetableTest do
  use ExUnit.Case, async: true

  import Dotcom.Timetable

  describe "csv/1" do
    test "nil for invalid route" do
      refute csv(Faker.Internet.slug(), Faker.Util.pick([0, 1]), Date.utc_today())
    end

    test "has data for valid route/direction/date" do
      valid_route_id = Faker.Util.pick(available_route_ids())
      valid_date = Faker.Date.between(~D[2025-05-17], ~D[2025-10-12])
      assert data = csv(valid_route_id, 1, valid_date)
      assert [%{"Stop" => _} | _] = data
    end

    test "special case: weekend F6/F7 returns F8 table" do
      f6_or_f7 = Faker.Util.pick(~w(Boat-F6 Boat-F7))

      weekend_date =
        Date.range(~D[2025-05-17], ~D[2025-10-12])
        |> Enum.filter(&(Date.day_of_week(&1) in [6, 7]))
        |> Faker.Util.pick()

      assert csv(f6_or_f7, 1, weekend_date) == csv("Boat-F8", 0, weekend_date)
    end

    test "no data for valid route on wrong date" do
      valid_route_id = Faker.Util.pick(available_route_ids())
      invalid_date = ~D[2025-12-25]
      refute csv(valid_route_id, 1, invalid_date)
    end
  end
end
