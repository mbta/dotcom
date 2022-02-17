defmodule LocationService.AWSTest do
  use ExUnit.Case, async: true

  import LocationService.AWS
  import Mock

  alias LocationService.AWS.Request

  describe "geocode/1" do
    test "can parse a response with results" do
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

      with_mock Request, [],
        new: fn _ ->
          {:ok, %{status_code: 200, body: body_string}}
        end do
        assert {:ok, body} = geocode("testing")

        assert [
                 %LocationService.Address{
                   formatted: "Somewhere",
                   longitude: -71.05566,
                   latitude: 42.35913
                 }
               ] = body
      end
    end

    test "can parse a response with no results" do
      {:ok, no_results} = Jason.encode(%{"Results" => []})

      with_mock Request, [],
        new: fn _ ->
          {:ok, %{status_code: 200, body: no_results}}
        end do
        assert {:error, :zero_results} = geocode("test")
      end
    end

    test "can parse a response with no body" do
      with_mock Request, [],
        new: fn _ ->
          {:ok, %{status_code: 412}}
        end do
        assert {:error, :zero_results} = geocode("test")
      end
    end

    test "can parse a response with error" do
      with_mock Request, [],
        new: fn _ ->
          {:error, {:http_error, 500, "bad news"}}
        end do
        assert {:error, :internal_error} = geocode("test")
      end
    end
  end
end
