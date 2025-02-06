defmodule Dotcom.TripPlan.QueryTest do
  use ExUnit.Case, async: true

  import Dotcom.TripPlan.Query
  import Mox
  import Test.Support.Factories.LocationService.LocationService
  alias Dotcom.TripPlan.{Itinerary, NamedPosition, Query}

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

  setup :verify_on_exit!

  setup do
    stub(LocationService.Mock, :geocode, fn address ->
      {:ok, [build(:address, %{formatted: address})]}
    end)

    stub(OpenTripPlannerClient.Mock, :plan, fn _, _, _ ->
      {:ok, %OpenTripPlannerClient.Plan{itineraries: []}}
    end)

    :ok
  end

  describe "from_query/1" do
    test "can plan a basic trip with defaults from query params" do
      expect(OpenTripPlannerClient.Mock, :plan, fn from, to, opts ->
        assert Keyword.get(from, :name) == "from address"
        assert Keyword.get(to, :name) == "to address"
        assert Keyword.get(opts, :depart_at) == @date_time
        assert Keyword.get(opts, :tags)
        assert Keyword.get(opts, :mode) == ["TRAM", "SUBWAY", "FERRY", "RAIL", "BUS"]

        {:ok, %OpenTripPlannerClient.Plan{itineraries: []}}
      end)

      params = %{"from" => "from address", "to" => "to address"}
      actual = from_query(params, @date_opts)
      assert actual.errors == MapSet.new([])
      assert %Query{} = actual
      assert %NamedPosition{name: "from address"} = actual.from
      assert %NamedPosition{name: "to address"} = actual.to
      assert {:depart_at, %DateTime{}} = actual.time
      assert {:ok, _} = actual.itineraries
    end

    test "can plan a basic trip from query params" do
      params = %{
        "from" => "from address",
        "to" => "to address",
        "wheelchair" => "true",
        "date_time" => @date_time_params
      }

      actual = from_query(params, @date_opts)
      assert actual.errors == MapSet.new([])
      assert %Query{} = actual
      assert {:depart_at, %DateTime{}} = actual.time
      assert actual.wheelchair
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

      actual = from_query(params, @date_opts)
      assert %Query{} = actual
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

      actual = from_query(params, @date_opts)
      assert %Query{} = actual
    end

    test "ignores params that are empty strings or missing" do
      params = %{"from" => ""}
      actual = from_query(params, @date_opts)
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

      query = from_query(params, @date_opts)
      assert {:arrive_by, %DateTime{}} = query.time
      assert query.wheelchair
    end

    test "depart_at time works as expected" do
      params = %{
        "from" => "from address",
        "to" => "to address",
        "time" => "depart",
        "date_time" => @date_time_params,
        "wheelchair" => "true"
      }

      actual = from_query(params, @date_opts)
      assert %Query{} = actual
      assert actual.time === {:depart_at, @date_time}
      assert actual.wheelchair === true
    end

    test "does not plan a trip if we fail to geocode" do
      error = {:error, :internal_error}

      stub(LocationService.Mock, :geocode, fn _ ->
        error
      end)

      params = %{
        "from" => "no results",
        "to" => "too many results",
        "time" => "depart",
        "date_time" => @date_time_params
      }

      actual = from_query(params, @date_opts)

      assert %Query{
               from: ^error,
               to: ^error,
               errors: errors
             } = actual

      assert MapSet.size(errors)
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

      query = from_query(params, @date_opts)
      assert %Query{} = query
      assert %NamedPosition{name: "path_not_found"} = query.from
      assert %NamedPosition{name: "stops_nearby no_results"} = query.to
      assert ^error = query.itineraries
    end

    test "handles OTP error" do
      error = :UNDERSPECIFIED_TRIANGLE

      stub(OpenTripPlannerClient.Mock, :plan, fn _, _, _ ->
        {:error, error}
      end)

      params = %{"from" => "from address", "to" => "to address"}
      actual = from_query(params, @date_opts)

      assert %Query{
               itineraries: {:error, ^error},
               errors: errors
             } = actual

      assert errors == MapSet.new([error])
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
        %Itinerary{
          start: Dotcom.Utils.DateTime.now(),
          stop: Dotcom.Utils.DateTime.now()
        },
        %Itinerary{
          start: Dotcom.Utils.DateTime.now(),
          stop: Dotcom.Utils.DateTime.now()
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

    test "returns empty list on nil" do
      query = %Query{itineraries: nil, from: nil, to: nil}
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
