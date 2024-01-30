defmodule LocationService.ResultTest do
  @moduledoc false

  use ExUnit.Case, async: false
  import ExUnit.CaptureLog
  import LocationService.Result
  import Test.Support.EnvHelpers

  @input "anything really"

  setup do
    {:ok, encoded_body} =
      Jason.encode(%{
        "Results" => [
          %{
            "Place" => %{
              "Label" => "Somewhere",
              "Geometry" => %{"Point" => [-71.05566, 42.35913]}
            }
          }
        ]
      })

    {:ok, empty_encoded_body} = Jason.encode(%{"status" => "ZERO_RESULTS"})

    set_log_level(:info)

    %{
      encoded_body: encoded_body,
      empty_encoded_body: empty_encoded_body
    }
  end

  describe "handle_response/2" do
    test "handles and parses a result with a body and 200 status code", %{
      encoded_body: encoded_body
    } do
      log =
        capture_log(fn ->
          aws_result = {:ok, %{status_code: 200, body: encoded_body}} |> handle_response(@input)

          assert {:ok, [%LocationService.Address{} | _]} = aws_result
        end)

      assert log =~ "[info]"
      assert log =~ "result="
    end

    test "returns an error for a result with a non-200 code", %{
      encoded_body: encoded_body
    } do
      log =
        capture_log(fn ->
          result = {:ok, %{status_code: 416, body: encoded_body}} |> handle_response(@input)

          assert {:error, :internal_error} = result
        end)

      assert log =~ "[warning]"
      assert log =~ "status_code=416"
      assert log =~ "Unexpected HTTP code"
    end

    test "returns an error for no results" do
      log =
        capture_log(fn ->
          assert {:error, :zero_results} =
                   {:ok, %{"status" => "ZERO_RESULTS"}} |> handle_response(@input)

          assert {:error, :zero_results} =
                   {:ok, %{"status" => "OK", "Results" => []}} |> handle_response(@input)
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

      assert log =~ "[warning]"
      assert log =~ "Error parsing to JSON"
    end

    test "handles errors generally, logging error" do
      log =
        capture_log(fn ->
          assert {:error, :internal_error} =
                   {:error, "something bad"}
                   |> handle_response(@input)
        end)

      assert log =~ "[warning]"
      assert log =~ "something bad"
    end
  end
end
