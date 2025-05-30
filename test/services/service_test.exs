defmodule Services.ServiceTest do
  use ExUnit.Case, async: false
  import Mock
  alias JsonApi.Item
  alias Services.Service

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
          "end_date" => "2019-08-31",
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

      assert Service.new(item) == %Service{
               added_dates: ["2019-06-29", "2019-07-06", "2019-07-13"],
               added_dates_notes: %{
                 "2019-06-29" => nil,
                 "2019-07-06" => nil,
                 "2019-07-13" => nil
               },
               description: "Saturday schedule",
               end_date: ~D[2019-08-31],
               id: "RTL32019-hms39016-Saturday-01-L",
               name: "Saturday",
               removed_dates: [],
               removed_dates_notes: %{},
               start_date: ~D[2019-06-29],
               type: :saturday,
               typicality: :typical_service,
               valid_days: [1, 2, 3]
             }
    end

    test "should parse and set the canonical typicality" do
      item = %Item{
        attributes: %{
          "added_dates" => [
            "2019-06-29",
            "2019-07-06",
            "2019-07-13"
          ],
          "end_date" => "2019-08-31",
          "schedule_type" => "Saturday",
          "schedule_typicality" => 6,
          "start_date" => "2019-06-29"
        },
        type: "service"
      }

      assert Service.new(item) == %Service{
               added_dates: ["2019-06-29", "2019-07-06", "2019-07-13"],
               added_dates_notes: %{},
               end_date: ~D[2019-08-31],
               removed_dates_notes: %{},
               start_date: ~D[2019-06-29],
               type: :saturday,
               typicality: :canonical
             }
    end
  end

  describe "special_service_dates/1" do
    test "should return only the dates of non typical services (special service)" do
      with_mock(Services.Repo, [:passthrough], by_route_id: &test_services(&1)) do
        assert [~D[2022-12-03], ~D[2022-12-04], ~D[2022-12-14], ~D[2022-12-15]] =
                 Service.special_service_dates("45")
      end
    end
  end

  describe "serves_date?/2" do
    test "returns true if the date is in added_dates" do
      assert Service.serves_date?(
               %Service{
                 added_dates: ["2022-12-15"],
                 start_date: ~D[2022-12-01],
                 end_date: ~D[2022-12-14],
                 valid_days: [1, 2, 3, 5]
               },
               ~D[2022-12-15]
             )
    end

    test "returns false if the date is in removed_dates" do
      refute Service.serves_date?(
               %Service{
                 removed_dates: ["2022-12-15", "2022-12-14"],
                 start_date: ~D[2022-12-11],
                 end_date: ~D[2022-12-22],
                 valid_days: [1, 2, 3, 4, 5, 6, 7]
               },
               ~D[2022-12-15]
             )
    end

    test "returns true if the date is on a 'valid_days' day of the week" do
      assert Service.serves_date?(
               %Service{
                 start_date: ~D[2022-12-11],
                 end_date: ~D[2022-12-22],
                 valid_days: [4, 5, 6]
               },
               ~D[2022-12-15]
             )
    end

    test "returns false if the date is not on a 'valid_days' day of the week" do
      refute Service.serves_date?(
               %Service{
                 start_date: ~D[2022-12-11],
                 end_date: ~D[2022-12-22],
                 valid_days: [1, 2, 3]
               },
               ~D[2022-12-15]
             )
    end
  end

  defp test_services(_) do
    [
      %Service{
        added_dates: ["2022-12-15", "2022-12-14"],
        added_dates_notes: %{
          "2022-12-14" => nil,
          "2022-12-15" => nil
        },
        typicality: :extra_service
      },
      %Service{
        added_dates: ["2022-12-03", "2022-12-04"],
        removed_dates_notes: %{
          "2022-12-03" => nil,
          "2022-12-04" => nil,
          "2022-12-15" => nil
        },
        typicality: :extra_service
      },
      %Service{
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
      }
    ]
  end
end
