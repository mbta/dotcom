defmodule Site.TripPlan.QueryTest do
  use ExUnit.Case, async: true

  import Site.TripPlan.Query
  alias Site.TripPlan.Query
  alias TripPlan.NamedPosition

  @date_time Timex.to_datetime(~N[2017-05-30T19:30:00], "America/New_York")
  @date_time_params %{
    "year" => Integer.to_string(@date_time.year),
    "month" => Integer.to_string(@date_time.month),
    "day" => Integer.to_string(@date_time.day),
    "hour" => Integer.to_string(@date_time.hour),
    "minute" => Integer.to_string(@date_time.minute),
    "am_pm" => "PM"
  }

  @date_opts [
    now: @date_time,
    end_of_rating:
      @date_time
      |> Timex.shift(months: 3)
      |> DateTime.to_date()
  ]

  @connection_opts [
    user_id: 1,
    force_otp1: false,
    force_otp2: false
  ]

  describe "from_query/1" do
    test "can plan a basic trip with defaults from query params" do
      params = %{"from" => "from address", "to" => "to address"}
      actual = from_query(params, @connection_opts, @date_opts)
      assert actual.errors == MapSet.new([])
      assert_received {:geocoded_address, "from address", {:ok, from_position}}
      assert_received {:geocoded_address, "to address", {:ok, to_position}}

      assert_received {:planned_trip, {^from_position, ^to_position, first_opts},
                       {:ok, accessible_itineraries}}

      assert_received {:planned_trip, {^from_position, ^to_position, second_opts},
                       {:ok, nonaccessible_itineraries}}

      assert length(
               Enum.filter([first_opts, second_opts], &Keyword.get(&1, :wheelchair_accessible?))
             ) == 1

      assert %Query{} = actual
      assert actual.from == from_position
      assert actual.to == to_position
      assert {:depart_at, %DateTime{}} = actual.time
      assert {:ok, actual_itineraries} = actual.itineraries

      assert Enum.sort(actual_itineraries) ==
               Enum.sort(accessible_itineraries ++ nonaccessible_itineraries)
    end

    test "can plan a basic trip from query params" do
      params = %{
        "from" => "from address",
        "to" => "to address",
        "optimize_for" => "accessibility",
        "date_time" => @date_time_params
      }

      actual = from_query(params, @connection_opts, @date_opts)
      assert actual.errors == MapSet.new([])
      assert_received {:geocoded_address, "from address", {:ok, from_position}}
      assert_received {:geocoded_address, "to address", {:ok, to_position}}
      assert_received {:planned_trip, {^from_position, ^to_position, _}, {:ok, itineraries}}
      assert %Query{} = actual
      assert actual.from == from_position
      assert actual.to == to_position
      assert {:depart_at, %DateTime{}} = actual.time
      assert actual.wheelchair_accessible?
      assert actual.itineraries == {:ok, itineraries}
    end

    test "can use lat/lng instead of an address" do
      params = %{
        "from" => "from address",
        "to" => "Your current location",
        "to_latitude" => "42.3428",
        "to_longitude" => "-71.0857",
        "optimize_for" => "accessibility",
        "date_time" => @date_time_params
      }

      actual = from_query(params, @connection_opts, @date_opts)

      to_position = %TripPlan.NamedPosition{
        latitude: 42.3428,
        longitude: -71.0857,
        name: "Your current location"
      }

      assert_received {:geocoded_address, "from address", {:ok, from_position}}
      assert_received {:planned_trip, {^from_position, ^to_position, _}, {:ok, itineraries}}
      assert %Query{} = actual
      assert actual.from == from_position
      assert actual.to == to_position
      assert actual.itineraries == {:ok, itineraries}
    end

    test "ignores lat/lng that are empty strings" do
      params = %{
        "from" => "from address",
        "from_latitude" => "",
        "from_longitude" => "",
        "to" => "to address",
        "date_time" => @date_time_params,
        "optimize_for" => "accessibility"
      }

      actual = from_query(params, @connection_opts, @date_opts)
      assert_received {:geocoded_address, "from address", {:ok, from_position}}
      assert_received {:geocoded_address, "to address", {:ok, to_position}}
      assert_received {:planned_trip, {^from_position, ^to_position, _}, {:ok, itineraries}}
      assert %Query{} = actual
      assert actual.from == from_position
      assert actual.to == to_position
      assert actual.itineraries == {:ok, itineraries}
    end

    test "ignores params that are empty strings or missing" do
      params = %{"from" => ""}
      actual = from_query(params, @connection_opts, @date_opts)
      assert %Query{} = actual
      assert actual.from == {:error, :required}
      assert actual.to == nil
      assert actual.itineraries == nil
    end

    test "can include other params in the plan" do
      params = %{
        "from" => "from address",
        "to" => "to address",
        "time" => "arrive",
        "date_time" => @date_time_params,
        "include_car?" => "false",
        "optimize_for" => "accessibility"
      }

      query = from_query(params, @connection_opts, @date_opts)
      assert {:arrive_by, %DateTime{}} = query.time
      assert query.wheelchair_accessible?
      assert_received {:planned_trip, {_from_position, _to_position, opts}, {:ok, _itineraries}}
      assert opts[:arrive_by] == @date_time
      assert opts[:wheelchair_accessible?]
    end

    test "depart_at time works as expected" do
      params = %{
        "from" => "from address",
        "to" => "to address",
        "time" => "depart",
        "date_time" => @date_time_params,
        "optimize_for" => "accessibility"
      }

      actual = from_query(params, @connection_opts, @date_opts)
      assert_received {:geocoded_address, "from address", {:ok, from_position}}
      assert_received {:geocoded_address, "to address", {:ok, to_position}}
      assert_received {:planned_trip, {^from_position, ^to_position, _}, {:ok, itineraries}}
      assert %Query{} = actual
      assert actual.from === from_position
      assert actual.to === to_position
      assert actual.time === {:depart_at, @date_time}
      assert actual.wheelchair_accessible? === true
      assert actual.itineraries == {:ok, itineraries}
    end

    test "does not plan a trip if we fail to geocode" do
      params = %{
        "from" => "no results",
        "to" => "too many results",
        "time" => "depart",
        "date_time" => @date_time_params
      }

      actual = from_query(params, @connection_opts, @date_opts)
      assert_received {:geocoded_address, "no results", from_result}
      assert_received {:geocoded_address, "too many results", to_result}
      refute_received {:planned_trip, _, _}
      assert {:error, :no_results} = from_result
      assert {:error, {:multiple_results, _}} = to_result
      assert %Query{} = actual
      assert actual.from == from_result
      assert actual.to == to_result
      assert actual.itineraries == nil
    end

    test "keeps original from/to if no trips are found" do
      params = %{
        "from" => "path_not_found",
        "to" => "stops_nearby no_results",
        "time" => "depart",
        "date_time" => @date_time_params,
        "include_car?" => "false",
        "accessible" => "true"
      }

      query = from_query(params, @connection_opts, @date_opts)
      assert %Query{} = query
      assert %NamedPosition{name: "Geocoded path_not_found"} = query.from
      assert %NamedPosition{name: "Geocoded stops_nearby no_results"} = query.to
      assert query.itineraries == {:error, :path_not_found}
    end

    test "makes single request when accessibility is checked" do
      params = %{
        "from" => "from_address",
        "to" => "to address",
        "time" => "depart",
        "date_time" => @date_time_params,
        "optimize_for" => "accessibility"
      }

      assert %Query{} = from_query(params, @connection_opts, @date_opts)

      inaccessible_opts = [
        max_walk_distance: 805,
        wheelchair_accessible?: false,
        depart_at: @date_time
      ]

      refute_received {:planned_trip, {_from, _to, ^inaccessible_opts}, {:ok, _itineraries}}
      assert_received {:planned_trip, {_from, _to, opts}, {:ok, itineraries}}
      assert Keyword.get(opts, :wheelchair_accessible?)
      assert Enum.all?(itineraries, & &1.accessible?)
    end

    test "When accessible trip returns error, all returned trips are marked as not accessible" do
      params = %{
        "from" => "Accessible error",
        "to" => "to address",
        "time" => "depart",
        "date_time" => @date_time_params
      }

      {:ok, itineraries} = from_query(params, @connection_opts, @date_opts).itineraries
      refute Enum.any?(itineraries, & &1.accessible?)
    end

    test "When inaccessible trip returns error, all accessible trips are returned" do
      params = %{
        "from" => "Inaccessible error",
        "to" => "to address",
        "time" => "depart",
        "date_time" => @date_time_params
      }

      {:ok, itineraries} = from_query(params, @connection_opts, @date_opts).itineraries
      assert Enum.all?(itineraries, & &1.accessible?)
    end

    test "Handles timeout gracefully" do
      params = %{
        "from" => "Timeout error",
        "from_latitude" => "1",
        "from_longitude" => "1",
        "to" => "to address",
        "date_time" => @date_time_params
      }

      log =
        ExUnit.CaptureLog.capture_log(fn ->
          assert %Query{itineraries: {:error, :timeout}} =
                   from_query(params, @connection_opts, @date_opts)
        end)

      assert log =~ "timed out"
    end
  end

  describe "opts_from_query/1" do
    test "handles mode options" do
      assert opts_from_query(
               %{
                 "modes" => %{"subway" => "true", "bus" => "false"}
               },
               []
             ) == [
               mode: ["TRAM", "SUBWAY"]
             ]
    end

    test "handles optimize_for options" do
      assert opts_from_query(
               %{
                 "optimize_for" => "accessibility"
               },
               []
             ) == [
               wheelchair_accessible?: true
             ]

      assert opts_from_query(
               %{
                 "optimize_for" => "less_walking"
               },
               []
             ) == [
               optimize_for: :less_walking
             ]

      assert opts_from_query(
               %{
                 "optimize_for" => "fewest_transfers"
               },
               []
             ) == [
               optimize_for: :fewest_transfers
             ]

      assert opts_from_query(
               %{
                 "optimize_for" => "best_route"
               },
               []
             ) == []
    end
  end

  describe "itineraries?/1" do
    test "Returns true if query has itineraries" do
      query = %Query{itineraries: {:ok, [%{}]}, from: nil, to: nil}
      assert itineraries?(query)
    end

    test "Returns false if query has no itineraries" do
      query = %Query{itineraries: {:ok, []}, from: nil, to: nil}
      refute itineraries?(query)
    end

    test "Returns false if query recieved an error fetching itineraries" do
      query = %Query{itineraries: {:error, "Could not fetch itineraries"}, from: nil, to: nil}
      refute itineraries?(query)
    end

    test "Returns false if query is nil" do
      refute itineraries?(nil)
    end
  end

  describe "get_itineraries/1" do
    test "returns itineraries if present" do
      itineraries = [%{}, %{}]
      query = %Query{itineraries: {:ok, itineraries}, from: nil, to: nil}
      assert get_itineraries(query) == itineraries
    end

    test "returns empty list if no itineraries" do
      query = %Query{itineraries: {:ok, []}, from: nil, to: nil}
      assert get_itineraries(query) == []
    end

    test "returns empty list on failure" do
      query = %Query{itineraries: {:error, "message"}, from: nil, to: nil}
      assert get_itineraries(query) == []
    end
  end

  describe "location_name/2" do
    test "Returns from name if one exists" do
      query = %Query{itineraries: {:ok, []}, from: %NamedPosition{name: "from name"}, to: nil}
      assert location_name(query, :from) == "from name"
    end

    test "Returns to name if one exists" do
      query = %Query{itineraries: {:ok, []}, to: %NamedPosition{name: "to name"}, from: nil}
      assert location_name(query, :to) == "to name"
    end

    test "Returns false otherwise" do
      query = %Query{itineraries: {:ok, []}, from: {:error, "error"}, to: nil}
      refute location_name(query, :from)
      refute location_name(query, :to)
    end
  end

  describe "get_mode_opts/2" do
    test "adds an empty list to opts if all modes are disabled" do
      assert get_mode_opts(%{"subway" => "false", "bus" => "false"}, []) == [mode: []]
    end

    test "adds a list of specific modes if any modes are enabled" do
      assert get_mode_opts(%{"subway" => "false", "bus" => "true", "commuter_rail" => "true"}, []) ==
               [mode: ["RAIL", "BUS"]]

      assert get_mode_opts(%{"subway" => "true", "ferry" => "true"}, []) == [
               mode: ["TRAM", "SUBWAY", "FERRY"]
             ]
    end
  end

  describe "default_optimize_for/1" do
    test "adds a default of best route for optimize" do
      opts = %{"modes" => %{"bus" => "true"}}
      assert Map.merge(opts, %{"optimize_for" => "best_route"}) == default_optimize_for(opts)
    end
  end

  describe "default_mode/1" do
    test "adds a default of modes" do
      opts = %{"optimize_for" => "best_route"}

      assert Map.merge(opts, %{
               "modes" => %{
                 "bus" => "true",
                 "commuter_rail" => "true",
                 "ferry" => "true",
                 "subway" => "true"
               }
             }) == default_mode(opts)
    end
  end

  describe "get_query_options/1" do
    test "keeps optimize_for if provided" do
      opts = %{"optimize_for" => "accessibility"}

      assert [
               mode: ["TRAM", "SUBWAY", "FERRY", "RAIL", "BUS"],
               wheelchair_accessible?: true
             ] == get_query_options(opts)
    end

    test "keeps mode if provided" do
      opts = %{"modes" => %{"bus" => "true"}}
      assert [mode: ["BUS"]] == get_query_options(opts)
    end
  end
end
