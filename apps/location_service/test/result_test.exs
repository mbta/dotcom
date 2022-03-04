defmodule LocationService.ResultTest do
  @moduledoc false

  use ExUnit.Case, async: false
  import ExUnit.CaptureLog
  import LocationService.Result

  @input "anything really"

  setup do
    aws_decoded_body = %{
      "Results" => [
        %{
          "Place" => %{
            "Label" => "Somewhere",
            "Geometry" => %{"Point" => [-71.05566, 42.35913]}
          }
        }
      ]
    }

    {:ok, aws_encoded_body} = Jason.encode(aws_decoded_body)
    {:ok, google_decoded_body} = '{
      "address_components" : [{
          "long_name" : "52-2",
          "short_name" : "52-2",
          "types" : [ "street_number" ]
        }],
      "formatted_address" : "52-2 Park Ln, Boston, MA 02210, USA",
      "geometry" : {
        "bounds" : {
          "northeast" : {
            "lat" : 42.3484946,
            "lng" : -71.0389612
          },
          "southwest" : {
            "lat" : 42.3483114,
            "lng" : -71.03938769999999
          }
        },
        "location" : {
          "lat" : 42.3484012,
          "lng" : -71.039176
        }
      }
    }' |> Jason.decode()

    old_level = Logger.level()

    on_exit(fn ->
      Logger.configure(level: old_level)
    end)

    Logger.configure(level: :info)

    %{
      google_decoded_body: google_decoded_body,
      aws_encoded_body: aws_encoded_body
    }
  end

  describe "handle_response/2" do
    test "handles and parses a result with a body and 200 status code", %{
      google_decoded_body: google_decoded_body,
      aws_encoded_body: aws_encoded_body
    } do
      log =
        capture_log(fn ->
          aws_result =
            {:ok, %{status_code: 200, body: aws_encoded_body}} |> handle_response(@input)

          google_result =
            {:ok, %{"status" => "OK", "results" => [google_decoded_body]}}
            |> handle_response(@input)

          assert {:ok, [%LocationService.Address{} | _]} = aws_result
          assert {:ok, [%LocationService.Address{} | _]} = google_result
        end)

      assert log =~ "[info]"
      assert log =~ "result="
    end

    test "returns an error for a result with a non-200 code", %{
      aws_encoded_body: aws_encoded_body
    } do
      log =
        capture_log(fn ->
          result = {:ok, %{status_code: 416, body: aws_encoded_body}} |> handle_response(@input)

          assert {:error, :internal_error} = result
        end)

      assert log =~ "[warn]"
      assert log =~ "status_code=416"
      assert log =~ "Unexpected HTTP code"
    end

    test "returns an error for no results" do
      log =
        capture_log(fn ->
          assert {:error, :zero_results} = {:ok, %{"Results" => []}} |> handle_response(@input)

          assert {:error, :zero_results} =
                   {:ok, %{"status" => "OK", "results" => []}} |> handle_response(@input)
        end)

      assert log =~ "[info]"
      assert log =~ "ZERO_RESULTS"
    end

    test "handles a JSON parsing error" do
      log =
        capture_log(fn ->
          assert {:error, :internal_error} =
                   {:error, %Jason.DecodeError{}}
                   |> handle_response(@input)
        end)

      assert log =~ "[warn]"
      assert log =~ "Error parsing to JSON"
    end

    test "handles errors generally, logging error" do
      log =
        capture_log(fn ->
          assert {:error, :internal_error} =
                   {:error, "something bad"}
                   |> handle_response(@input)
        end)

      assert log =~ "[warn]"
      assert log =~ "something bad"
    end
  end
end
