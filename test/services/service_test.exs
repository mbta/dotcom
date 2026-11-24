defmodule Services.ServiceTest do
  use ExUnit.Case, async: false
  import Mox
  import Test.Support.Factories.Services.Service

  alias JsonApi.Item
  alias Services.Service

  setup :verify_on_exit!

  setup do
    stub_with(Dotcom.Utils.DateTime.Mock, Dotcom.Utils.DateTime)

    :ok
  end

  describe "new/1" do
    test "should parse an item into service" do
      item = %Item{
        attributes: %{
          "added_dates" => [
            "2019-06-29",
            "2019-07-06",
            "2019-07-13"
          ],
          "added_dates_notes" => [
            nil,
            nil,
            nil
          ],
          "description" => "Saturday schedule",
          "end_date" => "2019-07-31",
          "removed_dates" => [],
          "removed_dates_notes" => [],
          "schedule_name" => "Saturday",
          "schedule_type" => "Saturday",
          "schedule_typicality" => 1,
          "start_date" => "2019-06-29",
          "valid_days" => [1, 2, 3]
        },
        id: "RTL32019-hms39016-Saturday-01-L",
        type: "service"
      }

      assert Service.new(item) ==
               build(:service, %{
                 added_dates: ["2019-06-29", "2019-07-06", "2019-07-13"],
                 added_dates_notes: %{
                   "2019-06-29" => nil,
                   "2019-07-06" => nil,
                   "2019-07-13" => nil
                 },
                 all_active_dates: [
                   ~D[2019-06-29],
                   ~D[2019-07-01],
                   ~D[2019-07-02],
                   ~D[2019-07-03],
                   ~D[2019-07-06],
                   ~D[2019-07-08],
                   ~D[2019-07-09],
                   ~D[2019-07-10],
                   ~D[2019-07-13],
                   ~D[2019-07-15],
                   ~D[2019-07-16],
                   ~D[2019-07-17],
                   ~D[2019-07-22],
                   ~D[2019-07-23],
                   ~D[2019-07-24],
                   ~D[2019-07-29],
                   ~D[2019-07-30],
                   ~D[2019-07-31]
                 ],
                 description: "Saturday schedule",
                 end_date: ~D[2019-07-31],
                 id: "RTL32019-hms39016-Saturday-01-L",
                 name: "Saturday",
                 removed_dates: [],
                 removed_dates_notes: %{},
                 start_date: ~D[2019-06-29],
                 type: :saturday,
                 typicality: :typical_service,
                 valid_days: [1, 2, 3],
                 rating_start_date: nil,
                 rating_end_date: nil,
                 rating_description: ""
               })
    end

    test "should parse and set the canonical typicality" do
      item = %Item{
        attributes: %{
          "added_dates" => [],
          "end_date" => "2019-08-31",
          "schedule_type" => "Saturday",
          "schedule_typicality" => 6,
          "start_date" => "2019-06-29"
        },
        type: "service"
      }

      assert Service.new(item) ==
               build(:service, %{
                 added_dates: [],
                 added_dates_notes: %{},
                 description: "",
                 end_date: ~D[2019-08-31],
                 id: nil,
                 name: "",
                 removed_dates: [],
                 removed_dates_notes: %{},
                 start_date: ~D[2019-06-29],
                 type: :saturday,
                 typicality: :canonical,
                 valid_days: [],
                 rating_start_date: nil,
                 rating_end_date: nil,
                 rating_description: ""
               })
    end
  end

  describe "special_service_dates/1" do
    test "should return only the dates of non typical services (special service)" do
      Services.Repo.Mock
      |> expect(:by_route_id, fn _ ->
        [
          build(:service, %{
            added_dates: ["2022-12-15", "2022-12-14"],
            added_dates_notes: %{
              "2022-12-14" => nil,
              "2022-12-15" => nil
            },
            typicality: :extra_service
          }),
          build(:service, %{
            added_dates: ["2022-12-03", "2022-12-04"],
            removed_dates_notes: %{
              "2022-12-03" => nil,
              "2022-12-04" => nil,
              "2022-12-15" => nil
            },
            typicality: :extra_service
          }),
          build(:service, %{
            added_dates: ["2022-12-04", "2022-12-05"],
            added_dates_notes: %{
              "2022-12-04" => nil,
              "2022-12-05" => nil
            },
            removed_dates_notes: %{
              "2022-11-01" => nil,
              "2022-11-02" => nil
            },
            typicality: :typical_service
          })
        ]
      end)

      assert [~D[2022-12-03], ~D[2022-12-04], ~D[2022-12-14], ~D[2022-12-15]] =
               Service.special_service_dates("45")
    end
  end

  describe "serves_date?/2" do
    test "returns true if the date is in added_dates" do
      assert Service.serves_date?(
               build(:service, %{
                 added_dates: ["2022-12-15"],
                 start_date: ~D[2022-12-01],
                 end_date: ~D[2022-12-14],
                 valid_days: [1, 2, 3, 5]
               }),
               ~D[2022-12-15]
             )
    end

    test "returns false if the date is in removed_dates" do
      refute Service.serves_date?(
               build(:service, %{
                 removed_dates: ["2022-12-15", "2022-12-14"],
                 start_date: ~D[2022-12-11],
                 end_date: ~D[2022-12-22],
                 valid_days: [1, 2, 3, 4, 5, 6, 7]
               }),
               ~D[2022-12-15]
             )
    end

    test "returns true if the date is on a 'valid_days' day of the week" do
      assert Service.serves_date?(
               build(:service, %{
                 start_date: ~D[2022-12-11],
                 end_date: ~D[2022-12-22],
                 valid_days: [4, 5, 6]
               }),
               ~D[2022-12-15]
             )
    end

    test "returns false if the date is not on a 'valid_days' day of the week" do
      refute Service.serves_date?(
               build(:service, %{
                 start_date: ~D[2022-12-11],
                 end_date: ~D[2022-12-22],
                 valid_days: [1, 2, 3]
               }),
               ~D[2022-12-15]
             )
    end
  end

  describe "all_valid_dates_for_service/1" do
    test "accounts for removed_dates" do
      service = build(:service)

      removed_dates =
        service.start_date
        |> Date.range(service.end_date)
        |> Enum.take(Faker.random_between(2, 6))

      service_with_removed_dates =
        %{
          service
          | removed_dates: Enum.map(removed_dates, &Date.to_iso8601/1)
        }
        |> with_active_dates()

      assert dates = service_with_removed_dates.all_active_dates
      refute Enum.empty?(dates)
      refute Enum.any?(removed_dates, &(&1 in dates))
    end

    test "accounts for added_dates" do
      service = build(:service)

      added_dates =
        Faker.random_between(2, 6)
        |> Faker.Util.list(fn ->
          Date.shift(service.end_date, day: Faker.random_between(2, 6))
        end)

      service_with_added_dates =
        %{
          service
          | added_dates: Enum.map(added_dates, &Date.to_iso8601/1)
        }
        |> with_active_dates()

      refute Enum.empty?(service_with_added_dates.all_active_dates)
      assert Enum.all?(added_dates, &(&1 in service_with_added_dates.all_active_dates))
    end

    test "accounts for valid_days" do
      service = build(:service)
      valid_day = Faker.Util.pick(1..7)
      service_only_valid_day = %{service | valid_days: [valid_day]} |> with_active_dates()

      refute Enum.empty?(service_only_valid_day.all_active_dates)

      assert Enum.all?(
               service_only_valid_day.all_active_dates,
               &(Date.day_of_week(&1) == valid_day)
             )
    end

    test "accounts for nil start date" do
      service = build(:service, date: Faker.Date.forward(1), start_date: nil)
      refute Enum.empty?(service.all_active_dates)
    end

    test "accounts for nil end date" do
      service = build(:service, date: Faker.Date.backward(1), end_date: nil)
      refute Enum.empty?(service.all_active_dates)
    end

    test "accounts for nil start and end date" do
      service = build(:service, start_date: nil, end_date: nil)
      refute Enum.empty?(service.all_active_dates)
    end
  end
end
