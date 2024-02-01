defmodule TripPlan.Api.OpenTripPlanner.HttpTest do
  @moduledoc """
  Tests for OpenTripPlanner that require overriding the OTP host or making
  external requests.

  We pull these into a separate module so that the main body of tests can
  remain async: true.

  """
  use ExUnit.Case
  import TripPlan.Api.OpenTripPlanner
  alias TripPlan.NamedPosition
  import Plug.Conn, only: [send_resp: 3]

  describe "plan/4" do
    @describetag :external
    @describetag :skip

    test "can make a basic plan with OpenTripPlanner" do
      # use a NamedPosition + a regular Position to test both kinds of location handling
      north_station = %NamedPosition{
        name: "North Station",
        stop_id: "place-north",
        latitude: 42.365551,
        longitude: -71.061251
      }

      connection_opts = [user_id: 1]
      boylston = {42.348777, -71.066481}

      assert {:ok, itineraries} =
               plan(north_station, boylston, connection_opts, depart_at: DateTime.utc_now())

      refute itineraries == []
    end
  end

  describe "error handling/logging" do
    setup do
      bypass = Bypass.open()
      host = "http://localhost:#{bypass.port}"
      old_config = Application.get_env(:dotcom, OpenTripPlanner)
      old_level = Logger.level()

      on_exit(fn ->
        Application.put_env(:dotcom, OpenTripPlanner, old_config)
        Logger.configure(level: old_level)
      end)

      new_config = put_in(old_config[:otp_url], host)
      Application.put_env(:dotcom, OpenTripPlanner, new_config)
      Logger.configure(level: :info)

      {:ok, %{bypass: bypass, config: new_config}}
    end

    @tag :capture_log
    test "HTTP errors are converted to error tuples", %{bypass: bypass} do
      Bypass.expect(bypass, fn conn ->
        send_resp(conn, 500, "{}")
      end)

      connection_opts = [user_id: 1]
      assert {:error, _} = plan({1, 1}, {2, 2}, connection_opts, depart_at: DateTime.utc_now())
    end

    @tag :capture_log
    test "connection errors are converted to error tuples", %{bypass: bypass} do
      Bypass.down(bypass)
      connection_opts = [user_id: 1]
      assert {:error, _} = plan({1, 1}, {2, 2}, connection_opts, depart_at: DateTime.utc_now())
    end
  end
end
