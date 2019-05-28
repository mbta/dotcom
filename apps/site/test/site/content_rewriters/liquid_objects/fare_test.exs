defmodule Site.ContentRewriters.LiquidObjects.FareTest do
  use ExUnit.Case, async: true

  import Site.ContentRewriters.LiquidObjects.Fare

  alias Fares.{Fare, Format, Repo, Summary}

  describe "fare_request/1" do
    test "it handles fare requests for a given mode name and media" do
      assert [
               name: :local_bus,
               includes_media: :cash,
               reduced: nil,
               duration: :single_trip
             ]
             |> Repo.all()
             |> fare_result() == "$2.00"

      assert fare_request("local_bus:cash") == {:ok, "$2.00"}
    end

    test "it uses the :name key for fare requests where both :mode and :name keys are valid" do
      assert [
               name: :subway,
               reduced: nil,
               duration: :single_trip
             ]
             |> Repo.all()
             |> fare_result() == "$2.25"

      assert fare_request("subway:bus_subway") == {:ok, "$2.25"}
    end

    test "it handles fare summary requests" do
      assert [
               mode: :commuter_rail,
               reduced: nil,
               duration: :single_trip
             ]
             |> Repo.all()
             |> fare_result(:commuter_rail) == "$2.25 – $12.50"

      assert fare_request("commuter_rail") == {:ok, "$2.25 – $12.50"}

      # mticket single-ride fares are not reduced
      assert fare_request("commuter_rail:mticket") == {:ok, "$2.25 – $12.50"}
    end

    test "it handles weekend rail fare requests" do
      assert [
               mode: :commuter_rail,
               reduced: nil,
               duration: :weekend
             ]
             |> Repo.all()
             |> fare_result(:commuter_rail) == "$10.00"

      assert fare_request("commuter_rail:weekend") == {:ok, "$10.00"}
    end

    test "it handles reduced fare requests" do
      assert [
               name: :subway,
               reduced: :senior_disabled,
               duration: :single_trip
             ]
             |> Repo.all()
             |> fare_result() == "$1.10"

      assert fare_request("subway:senior_disabled") == {:ok, "$1.10"}
    end

    test "it handles the ride fare requests" do
      assert [
               name: :ada_ride,
               reduced: :senior_disabled,
               duration: :single_trip
             ]
             |> Repo.all()
             |> fare_result() == "$3.15"

      assert fare_request("subway:ada_ride") == {:ok, "$3.15"}
    end

    test "it handles mticket fare requests" do
      assert [
               name: :ferry_inner_harbor,
               reduced: nil,
               includes_media: :mticket,
               duration: :month
             ]
             |> Repo.all()
             |> fare_result() == "$74.50"

      assert fare_request("ferry_inner_harbor:month:mticket") == {:ok, "$74.50"}
    end

    test "handles :ferry" do
      assert [
               mode: :ferry,
               reduced: nil,
               duration: :single_trip
             ]
             |> Repo.all()
             |> fare_result(:ferry) == "$3.50 – $18.50"

      assert fare_request("ferry") == {:ok, "$3.50 – $18.50"}

      # mticket single-ride fares are not reduced
      assert fare_request("ferry:mticket") == {:ok, "$3.50 – $18.50"}
    end

    test "handles :ferry:month" do
      assert [
               mode: :ferry,
               reduced: nil,
               duration: :month
             ]
             |> Repo.all()
             |> fare_result(:ferry) == "$74.50 – $308.00"

      assert fare_request("ferry:month") == {:ok, "$74.50 – $308.00"}
    end

    test "handles :ferry:month:charlie_ticket" do
      assert [
               mode: :ferry,
               reduced: nil,
               includes_media: :charlie_ticket,
               duration: :month
             ]
             |> Repo.all()
             |> fare_result(:ferry) == "$84.50 – $308.00"

      assert fare_request("ferry:month:charlie_ticket") == {:ok, "$84.50 – $308.00"}
    end

    test "handles :ferry:month:mticket" do
      assert [
               mode: :ferry,
               reduced: nil,
               includes_media: :mticket,
               duration: :month
             ]
             |> Repo.all()
             |> fare_result(:ferry) == "$74.50 – $298.00"

      assert fare_request("ferry:month:mticket") == {:ok, "$74.50 – $298.00"}
    end

    test "handles :zone:X and :interzone:Y requests" do
      assert [
               name: {:zone, "1A"},
               reduced: nil,
               duration: :month
             ]
             |> Repo.all()
             |> fare_result() == "$84.50"

      assert fare_request("zone:1A:month") == {:ok, "$84.50"}

      assert [
               name: {:interzone, "3"},
               reduced: :any,
               duration: :single_trip
             ]
             |> Repo.all()
             |> fare_result() == "$1.75"

      assert fare_request("interzone:3:reduced") == {:ok, "$1.75"}
    end

    test "it uses the last valid value for a key when conflicting values are found" do
      results = Repo.all(name: :local_bus, reduced: nil, duration: :single_trip)
      assert fare_request("subway:local_bus:charlie_card") == {:ok, fare_result(results)}
    end

    test "it reports when there are no results (valid request, but no repo matches)" do
      assert fare_request("local_bus:mticket") == {:error, {:unmatched, "no results"}}
    end

    test "it handles both types of invalid values (non-existent atoms and irrelevant atoms)" do
      assert fare_request("charlie_card:spaceship") == {:error, {:invalid, "spaceship"}}
      assert fare_request("charlie_card:bus") == {:error, {:invalid, "bus"}}
    end

    test "it reports the first invalid string/atom when multiple are present" do
      assert fare_request("local_bus:aaa:cash:bbb") == {:error, {:invalid, "aaa"}}
    end

    test "it handles a blank request (no filters provided)" do
      assert fare_request("") == {:error, {:empty, "no input"}}
    end

    test "it handles an incomplete request (required key values are missing)" do
      assert fare_request("cash") == {:error, {:incomplete, "missing mode/name"}}
    end
  end

  describe "fare_object_request" do
    test "it handles fare requests for a given mode name and media" do
      result =
        Repo.all(name: :local_bus, includes_media: :cash, reduced: nil, duration: :single_trip)
        |> List.first()

      assert fare_object_request("local_bus:cash") == result
    end

    test "it returns an 'invalid' fare when a token is invalid" do
      invalid_fare = %Fare{
        name: :invalid,
        mode: :subway,
        duration: :invalid
      }

      assert fare_object_request("local_bus:token") == invalid_fare
    end
  end

  defp fare_result(args) do
    args
    |> List.first()
    |> Format.price()
  end

  defp fare_result(args, summary_mode) do
    args
    |> Format.summarize(summary_mode)
    |> List.first()
    |> Summary.price_range()
  end
end
