defmodule LocationServiceTest do
  use ExUnit.Case, async: true
  import LocationService
  import Mox

  setup :verify_on_exit!

  setup do
    body_string =
      %{
        "Results" => [
          %{
            "Place" => %{
              "Label" => "Somewhere",
              "Geometry" => %{"Point" => [Faker.Address.longitude(), Faker.Address.latitude()]}
            }
          }
        ]
      }
      |> Jason.encode!()

    good_response = %{status_code: 200, body: body_string}
    {:ok, no_results} = Jason.encode(%{"Results" => []})
    no_results = %{status_code: 200, body: no_results}
    %{good_response: good_response, no_results: no_results}
  end

  describe "geocode/1" do
    test "can parse a response with results", %{good_response: good_response} do
      address = Faker.Address.street_address()

      expect(ExAws.Mock, :request, fn operation ->
        assert %ExAws.Operation.RestQuery{body: %{Text: ^address}} = operation
        {:ok, good_response}
      end)

      assert {:ok, body} = geocode(address)
      assert [%LocationService.Address{} | _] = body
    end

    test "can parse a response with no results", %{no_results: no_results} do
      expect(ExAws.Mock, :request, fn _ ->
        {:ok, no_results}
      end)

      assert {:error, :zero_results} = geocode("test no results")
    end

    test "can parse a response with no body" do
      expect(ExAws.Mock, :request, fn _ ->
        {:ok, %{status_code: 412}}
      end)

      assert {:error, :internal_error} = geocode("test no body")
    end

    test "can parse a response with error" do
      expect(ExAws.Mock, :request, fn _ ->
        {:error, {:http_error, 500, "bad news"}}
      end)

      assert {:error, :internal_error} = geocode("test error")
    end
  end

  describe "reverse_geocode/2" do
    test "can parse a response with results" do
      latitude = Faker.Address.latitude()
      longitude = Faker.Address.longitude()

      expect(ExAws.Mock, :request, fn operation ->
        assert %ExAws.Operation.RestQuery{body: %{Position: coordinates}} = operation
        assert [^longitude, ^latitude] = coordinates

        {:ok,
         %{
           status_code: 200,
           body:
             %{
               "Results" => [
                 %{
                   "Place" => %{
                     "Label" => "Geocoded page",
                     "Geometry" => %{"Point" => coordinates}
                   }
                 }
               ]
             }
             |> Jason.encode!()
         }}
      end)

      assert {:ok, [%LocationService.Address{}]} = reverse_geocode(latitude, longitude)
    end
  end

  describe "autocomplete/2" do
    test "can parse a response with results" do
      expect(ExAws.Mock, :request, fn _ ->
        {:ok,
         %{
           status_code: 200,
           body:
             %{
               "Results" => [
                 %{
                   "Text" => "Test Location"
                 }
               ]
             }
             |> Jason.encode!()
         }}
      end)

      assert {:ok, result} = autocomplete("Tes", 2)

      assert [%LocationService.Suggestion{address: "Test Location"}] = result
    end

    test "can parse a response with error" do
      expect(ExAws.Mock, :request, fn _ ->
        {:error, {:http_error, 500, "bad news"}}
      end)

      assert {:error, :internal_error} = autocomplete("test", 2)
    end
  end
end
