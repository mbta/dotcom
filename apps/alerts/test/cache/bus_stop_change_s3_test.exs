defmodule Alerts.Cache.BusStopChangeS3Test do
  @moduledoc """
  ExAws and ExAws.S3 are mocked in the Alerts.TestExAws module.
  """
  use ExUnit.Case, async: true
  import Alerts.Cache.BusStopChangeS3
  alias Alerts.Cache.BusStopChangeS3
  alias Alerts.{Alert, HistoricalAlert, InformedEntity}

  setup_all do
    # starts RepoCache
    {:ok, _} = BusStopChangeS3.start_link()
    :ok
  end

  describe "fetcher_opts/0" do
    test "returns options for Alerts.Cache.Fetcher" do
      keys = fetcher_opts() |> Keyword.keys()
      assert :api_mfa in keys
      assert :repeat_ms in keys
      assert :update_fn in keys
    end
  end

  describe "copy_alerts_to_s3/2" do
    test "works" do
      alert =
        Alert.new(id: "one", effect: :stop_moved, informed_entity: [%InformedEntity{stop: "1"}])

      log =
        ExUnit.CaptureLog.capture_log(fn ->
          assert :ok = copy_alerts_to_s3([alert], nil)
        end)

      refute log =~ "[warn]"
      refute log =~ "module=Elixir.Alerts.Cache.BusStopChangeS3 func=write_alerts alert=one"
    end

    test "logs if AWS has a problem" do
      # This alert ID has been configured to raise an issue in the mocked AWS module
      alert =
        Alert.new(id: "three", effect: :stop_moved, informed_entity: [%InformedEntity{stop: "1"}])

      log =
        ExUnit.CaptureLog.capture_log(fn ->
          :ok = copy_alerts_to_s3([alert], nil)
        end)

      assert log =~ "[warn]"

      assert log =~
               "module=Elixir.Alerts.Cache.BusStopChangeS3 func=write_alerts alert=three error=\"some_problem\""
    end
  end

  describe "get_stored_alerts/0" do
    test "fetches alerts, logs if problem" do
      log =
        ExUnit.CaptureLog.capture_log(fn ->
          assert [%HistoricalAlert{id: "one"}, %HistoricalAlert{id: "two"}] = get_stored_alerts()
        end)

      assert log =~ "[warn]"

      assert log =~
               "module=Elixir.Alerts.Cache.BusStopChangeS3 func=get_stored_alerts alert=three error=\"some_problem\""
    end
  end
end
