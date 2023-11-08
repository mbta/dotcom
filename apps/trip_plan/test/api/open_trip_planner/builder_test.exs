defmodule TripPlan.Api.OpenTripPlanner.BuilderTest do
  use ExUnit.Case, async: true
  import TripPlan.Api.OpenTripPlanner.Builder

  @from_inside %TripPlan.NamedPosition{
    latitude: 42.356365,
    longitude: -71.060920
  }

  @to_inside %TripPlan.NamedPosition{
    latitude: 42.3636617,
    longitude: -71.0832908
  }

  describe "build_params/1" do
    test "depart_at sets date/time options" do
      expected =
        {:ok,
         %{
           "date" => "\"2017-05-22\"",
           "time" => "\"12:04pm\"",
           "arriveBy" => "false",
           "walkReluctance" => 5,
           "transportModes" => "[{mode: WALK}, {mode: TRANSIT}]",
           "fromPlace" => "\"::42.356365,-71.06092\"",
           "locale" => "\"en\"",
           "toPlace" => "\"::42.3636617,-71.0832908\""
         }}

      actual =
        build_params(
          @from_inside,
          @to_inside,
          depart_at: DateTime.from_naive!(~N[2017-05-22T16:04:20], "Etc/UTC")
        )

      assert expected == actual
    end

    test "arrive_by sets date/time options" do
      expected =
        {:ok,
         %{
           "date" => "\"2017-05-22\"",
           "time" => "\"12:04pm\"",
           "arriveBy" => "true",
           "walkReluctance" => 5,
           "transportModes" => "[{mode: WALK}, {mode: TRANSIT}]",
           "fromPlace" => "\"::42.356365,-71.06092\"",
           "locale" => "\"en\"",
           "toPlace" => "\"::42.3636617,-71.0832908\""
         }}

      actual =
        build_params(
          @from_inside,
          @to_inside,
          arrive_by: DateTime.from_naive!(~N[2017-05-22T16:04:20], "Etc/UTC")
        )

      assert expected == actual
    end

    test "wheelchair_accessible? sets wheelchair option" do
      expected =
        {:ok,
         %{
           "wheelchair" => "true",
           "walkReluctance" => 5,
           "transportModes" => "[{mode: WALK}, {mode: TRANSIT}]",
           "fromPlace" => "\"::42.356365,-71.06092\"",
           "locale" => "\"en\"",
           "toPlace" => "\"::42.3636617,-71.0832908\""
         }}

      actual = build_params(@from_inside, @to_inside, wheelchair_accessible?: true)
      assert expected == actual

      expected =
        {:ok,
         %{
           "walkReluctance" => 5,
           "transportModes" => "[{mode: WALK}, {mode: TRANSIT}]",
           "fromPlace" => "\"::42.356365,-71.06092\"",
           "locale" => "\"en\"",
           "toPlace" => "\"::42.3636617,-71.0832908\""
         }}

      actual = build_params(@from_inside, @to_inside, wheelchair_accessible?: false)
      assert expected == actual
    end

    test ":mode defaults TRANSIT,WALK" do
      expected =
        {:ok,
         %{
           "walkReluctance" => 5,
           "transportModes" => "[{mode: WALK}, {mode: TRANSIT}]",
           "fromPlace" => "\"::42.356365,-71.06092\"",
           "locale" => "\"en\"",
           "toPlace" => "\"::42.3636617,-71.0832908\""
         }}

      actual = build_params(@from_inside, @to_inside, mode: [])
      assert expected == actual
    end

    test ":mode builds a comma-separated list of modes to use" do
      expected =
        {:ok,
         %{
           "walkReluctance" => 5,
           "transportModes" => "[{mode: BUS}, {mode: SUBWAY}, {mode: TRAM}, {mode: WALK}]",
           "fromPlace" => "\"::42.356365,-71.06092\"",
           "locale" => "\"en\"",
           "toPlace" => "\"::42.3636617,-71.0832908\""
         }}

      actual = build_params(@from_inside, @to_inside, mode: ["BUS", "SUBWAY", "TRAM"])
      assert expected == actual
    end

    test "optimize_for: :less_walking sets walkReluctance value" do
      expected =
        {:ok,
         %{
           "transportModes" => "[{mode: WALK}, {mode: TRANSIT}]",
           "walkReluctance" => 17,
           "fromPlace" => "\"::42.356365,-71.06092\"",
           "locale" => "\"en\"",
           "toPlace" => "\"::42.3636617,-71.0832908\""
         }}

      actual = build_params(@from_inside, @to_inside, optimize_for: :less_walking)
      assert expected == actual
    end

    test "optimize_for: :fewest_transfers sets transferPenalty value" do
      expected =
        {:ok,
         %{
           "walkReluctance" => 5,
           "transportModes" => "[{mode: WALK}, {mode: TRANSIT}]",
           "transferPenalty" => 100,
           "fromPlace" => "\"::42.356365,-71.06092\"",
           "locale" => "\"en\"",
           "toPlace" => "\"::42.3636617,-71.0832908\""
         }}

      actual = build_params(@from_inside, @to_inside, optimize_for: :fewest_transfers)
      assert expected == actual
    end

    test "bad options return an error" do
      expected = {:error, {:bad_param, {:bad, :arg}}}
      actual = build_params(@from_inside, @to_inside, bad: :arg)
      assert expected == actual
    end
  end
end
