defmodule LocationServiceTest do
  use ExUnit.Case, async: true
  import LocationService
  import Mox

  setup :verify_on_exit!

  setup do
    {:ok, body_string} =
      %{
        "Results" => [
          %{
            "Place" => %{
              "Label" => "Somewhere",
              "Geometry" => %{"Point" => [-71.05566, 42.35913]}
            }
          }
        ]
      }
      |> Jason.encode()

    good_response = %{status_code: 200, body: body_string}
    {:ok, no_results} = Jason.encode(%{"Results" => []})
    no_results = %{status_code: 200, body: no_results}
    %{good_response: good_response, no_results: no_results}
  end

  describe "geocode/1" do
    test "can parse a response with results", %{good_response: good_response} do
      stub(ExAws.Mock, :request, fn _ ->
        {:ok, good_response}
      end)

      assert {:ok, body} = geocode("testing with results")

      assert [
               %LocationService.Address{
                 formatted: "Somewhere",
                 longitude: -71.05566,
                 latitude: 42.35913
               }
             ] = body
    end

    test "can parse a response with no results", %{no_results: no_results} do
      stub(ExAws.Mock, :request, fn _ ->
        {:ok, no_results}
      end)

      assert {:error, :zero_results} = geocode("test no results")
    end

    test "can parse a response with no body" do
      stub(ExAws.Mock, :request, fn _ ->
        {:ok, %{status_code: 412}}
      end)

      assert {:error, :internal_error} = geocode("test no body")
    end

    test "can parse a response with error" do
      stub(ExAws.Mock, :request, fn _ ->
        {:error, {:http_error, 500, "bad news"}}
      end)

      assert {:error, :internal_error} = geocode("test error")
    end
  end

  describe "reverse_geocode/2" do
    test "can parse a response with results" do
      # return the input coordinates along with the time the function evaluates.
      mock_return_coordinates = fn [lat, lon] ->
        {:ok, body_string} =
          %{
            "Results" => [
              %{
                "Place" => %{
                  "Label" => "Geocoded page",
                  "Geometry" => %{"Point" => [lon, lat]}
                }
              }
            ]
          }
          |> Jason.encode()

        body_string
      end

      expect(ExAws.Mock, :request, fn args ->
        assert %ExAws.Operation.RestQuery{body: %{Position: coordinates}} = args
        {:ok, %{status_code: 200, body: mock_return_coordinates.(coordinates)}}
      end)

      lat1 = 71.596
      long1 = -68.321
      assert {:ok, [%LocationService.Address{}]} = reverse_geocode(lat1, long1)
    end
  end

  describe "autocomplete/2" do
    test "can parse a response with results" do
      {:ok, body_string} =
        %{
          "Results" => [
            %{
              "Text" => "Test Location"
            }
          ]
        }
        |> Jason.encode()

      stub(ExAws.Mock, :request, fn _ ->
        {:ok, %{status_code: 200, body: body_string}}
      end)

      assert {:ok, result} = autocomplete("Tes", 2)

      assert [%LocationService.Suggestion{address: "Test Location"}] = result
    end

    test "can parse a response with error" do
      stub(ExAws.Mock, :request, fn _ ->
        {:error, {:http_error, 500, "bad news"}}
      end)

      assert {:error, :internal_error} = autocomplete("test", 2)
    end
  end
end
