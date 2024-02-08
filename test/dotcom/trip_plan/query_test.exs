defmodule Dotcom.TripPlan.QueryTest do
  use ExUnit.Case, async: true

  import Dotcom.TripPlan.Query
  import Mox
  alias Dotcom.TripPlan.Query
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
    user_id: 1
  ]

  setup :verify_on_exit!

  setup do
    stub_with(OpenTripPlannerClient.Mock, Test.Support.OpenTripPlannerClientStub)
    :ok
  end

  describe "from_query/1" do
    test "can plan a basic trip with defaults from query params" do
      params = %{"from" => "from address", "to" => "to address"}
      actual = from_query(params, @connection_opts, @date_opts)
      assert actual.errors == MapSet.new([])
      assert_received {:geocoded_address, "from address", {:ok, from_position}}
      assert_received {:geocoded_address, "to address", {:ok, to_position}}

      from = NamedPosition.to_keywords(from_position)
      to = NamedPosition.to_keywords(to_position)
      assert_received {:planned_trip, {^from, ^to, _opts}, {:ok, itineraries}}

      assert %Query{} = actual
      assert actual.from == from_position
      assert actual.to == to_position
      assert {:depart_at, %DateTime{}} = actual.time
      assert {:ok, actual_itineraries} = actual.itineraries

      assert Enum.sort(actual_itineraries) ==
               Enum.sort(itineraries)
    end

    test "can plan a basic trip from query params" do
      params = %{
        "from" => "from address",
        "to" => "to address",
        "wheelchair" => "true",
        "date_time" => @date_time_params
      }

      actual = from_query(params, @connection_opts, @date_opts)
      assert actual.errors == MapSet.new([])
      assert_received {:geocoded_address, "from address", {:ok, from_position}}
      assert_received {:geocoded_address, "to address", {:ok, to_position}}
      from = NamedPosition.to_keywords(from_position)
      to = NamedPosition.to_keywords(to_position)
      assert_received {:planned_trip, {^from, ^to, _}, {:ok, itineraries}}
      assert %Query{} = actual
      assert actual.from == from_position
      assert actual.to == to_position
      assert {:depart_at, %DateTime{}} = actual.time
      assert actual.wheelchair
      assert actual.itineraries == {:ok, itineraries}
    end

    test "can use lat/lng instead of an address" do
      params = %{
        "from" => "from address",
        "to" => "Your current location",
        "to_latitude" => "42.3428",
        "to_longitude" => "-71.0857",
        "wheelchair" => "true",
        "date_time" => @date_time_params
      }

      actual = from_query(params, @connection_opts, @date_opts)

      to_position = %TripPlan.NamedPosition{
        latitude: 42.3428,
        longitude: -71.0857,
        name: "Your current location"
      }

      assert_received {:geocoded_address, "from address", {:ok, from_position}}
      from = NamedPosition.to_keywords(from_position)
      to = NamedPosition.to_keywords(to_position)
      assert_received {:planned_trip, {^from, ^to, _}, {:ok, itineraries}}
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
        "wheelchair" => "true"
      }

      actual = from_query(params, @connection_opts, @date_opts)
      assert_received {:geocoded_address, "from address", {:ok, from_position}}
      assert_received {:geocoded_address, "to address", {:ok, to_position}}
      from = NamedPosition.to_keywords(from_position)
      to = NamedPosition.to_keywords(to_position)
      assert_received {:planned_trip, {^from, ^to, _}, {:ok, itineraries}}
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
        "wheelchair" => "true"
      }

      query = from_query(params, @connection_opts, @date_opts)
      assert {:arrive_by, %DateTime{}} = query.time
      assert_received {:planned_trip, {_from_position, _to_position, opts}, {:ok, _itineraries}}
      assert query.wheelchair
      assert opts[:arrive_by] == @date_time
      assert opts[:wheelchair]
    end

    test "depart_at time works as expected" do
      params = %{
        "from" => "from address",
        "to" => "to address",
        "time" => "depart",
        "date_time" => @date_time_params,
        "wheelchair" => "true"
      }

      actual = from_query(params, @connection_opts, @date_opts)
      assert_received {:geocoded_address, "from address", {:ok, from_position}}
      assert_received {:geocoded_address, "to address", {:ok, to_position}}
      from = NamedPosition.to_keywords(from_position)
      to = NamedPosition.to_keywords(to_position)
      assert_received {:planned_trip, {^from, ^to, _}, {:ok, itineraries}}
      assert %Query{} = actual
      assert actual.from === from_position
      assert actual.to === to_position
      assert actual.time === {:depart_at, @date_time}
      assert actual.wheelchair === true
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
      refute_received {:planned_trip, _, _, _}
      assert {:error, :no_results} = from_result
      assert {:error, {:multiple_results, _}} = to_result
      assert %Query{} = actual
      assert actual.from == from_result
      assert actual.to == to_result
      assert actual.itineraries == nil
    end

    test "keeps original from/to if no trips are found" do
      error = {:error, :path_not_found}

      expect(OpenTripPlannerClient.Mock, :plan, fn _, _, _ ->
        error
      end)

      params = %{
        "from" => "path_not_found",
        "to" => "stops_nearby no_results",
        "time" => "depart",
        "date_time" => @date_time_params,
        "accessible" => "true"
      }

      query = from_query(params, @connection_opts, @date_opts)
      assert %Query{} = query
      assert %NamedPosition{name: "Geocoded path_not_found"} = query.from
      assert %NamedPosition{name: "Geocoded stops_nearby no_results"} = query.to
      assert ^error = query.itineraries
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

    test "handles wheelchair option" do
      assert opts_from_query(
               %{
                 "wheelchair" => "true"
               },
               []
             ) == [
               wheelchair: true
             ]
    end

    test "adds an empty list to opts if all modes are disabled" do
      assert opts_from_query(%{"modes" => %{"subway" => "false", "bus" => "false"}}, []) == [
               mode: []
             ]
    end

    test "adds a list of specific modes if any modes are enabled" do
      assert opts_from_query(
               %{"modes" => %{"subway" => "false", "bus" => "true", "commuter_rail" => "true"}},
               []
             ) ==
               [mode: ["RAIL", "BUS"]]

      assert opts_from_query(%{"modes" => %{"subway" => "true", "ferry" => "true"}}, []) == [
               mode: ["TRAM", "SUBWAY", "FERRY"]
             ]
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
      itineraries = [
        %TripPlan.Itinerary{
          start: Util.now(),
          stop: Util.now()
        },
        %TripPlan.Itinerary{
          start: Util.now(),
          stop: Util.now()
        }
      ]

      query = %Query{itineraries: {:ok, itineraries}, from: nil, to: nil}
      assert ^itineraries = get_itineraries(query)
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

  describe "get_query_options/1" do
    test "keeps wheelchair if provided" do
      opts = %{"wheelchair" => "true"}

      assert [
               mode: ["TRAM", "SUBWAY", "FERRY", "RAIL", "BUS"],
               wheelchair: true
             ] == get_query_options(opts)
    end

    test "keeps mode if provided" do
      opts = %{"modes" => %{"bus" => "true"}}
      assert [mode: ["BUS"]] == get_query_options(opts)
    end
  end
end
