defmodule Alerts.Cache.BusStopChangeS3Test do
  use ExUnit.Case, async: false

  import Alerts.Cache.BusStopChangeS3
  import Mox

  alias Alerts.Alert
  alias Alerts.InformedEntity

  setup :verify_on_exit!

  setup do
    stub(Stops.Repo.Mock, :get, fn _ ->
      Test.Support.Factories.Stops.Stop.build(:stop)
    end)

    cache = Application.get_env(:dotcom, :cache)
    cache.flush()

    :ok
  end

  describe "fetcher_opts/0" do
    test "returns options for Alerts.Cache.Fetcher" do
      keys = Keyword.keys(fetcher_opts())
      assert :api_mfa in keys
      assert :repeat_ms in keys
      assert :update_fn in keys
    end
  end

  describe "copy_alerts_to_s3/2" do
    test "works" do
      expect(AwsClient.Mock, :put_object, fn _, _, _ ->
        {:ok, %{}, %{}}
      end)

      alert =
        Alert.new(id: "one", effect: :stop_moved, informed_entity: [%InformedEntity{stop: "1"}])

      log =
        ExUnit.CaptureLog.capture_log(fn ->
          assert :ok = copy_alerts_to_s3([alert], nil)
        end)

      refute log =~ "[warning]"
      refute log =~ "module=Elixir.Alerts.Cache.BusStopChangeS3 func=write_alerts alert=one"
    end

    test "logs if AWS has a problem" do
      expect(AwsClient.Mock, :put_object, fn _, _, _ ->
        {:error, "some_problem"}
      end)

      # This alert ID has been configured to raise an issue in the mocked AWS module
      alert =
        Alert.new(id: "three", effect: :stop_moved, informed_entity: [%InformedEntity{stop: "1"}])

      log =
        ExUnit.CaptureLog.capture_log(fn ->
          :ok = copy_alerts_to_s3([alert], nil)
        end)

      assert log =~ "[warning]"

      assert log =~
               "module=Elixir.Alerts.Cache.BusStopChangeS3 func=write_alerts alert=three error=\"some_problem\""
    end
  end

  describe "get_stored_alerts/0" do
    test "fetches alerts, logs if problem" do
      number_alerts = Faker.random_between(2, 5)
      alert_ids = Faker.Util.list(number_alerts, fn -> Faker.Internet.slug() end)
      [errored_id | object_ids] = alert_ids

      expect(AwsClient.Mock, :list_objects, fn _bucket, key ->
        {:ok,
         %{
           "ListBucketResult" => %{
             "Contents" => Enum.map(alert_ids, &%{"Key" => "#{key}/#{&1}"})
           }
         }, %{}}
      end)

      expect(AwsClient.Mock, :get_object, number_alerts, fn _bucket, object_id ->
        key = object_id |> String.split("/") |> List.last()

        if key == errored_id do
          {:error, %{}}
        else
          object =
            [id: key]
            |> Alerts.Alert.new()
            |> Alerts.HistoricalAlert.from_alert()
            |> :erlang.term_to_binary([:compressed])

          {:ok, %{"Body" => object}, %{}}
        end
      end)

      log =
        ExUnit.CaptureLog.capture_log(fn ->
          stored_alerts = get_stored_alerts()
          assert length(stored_alerts) == length(object_ids)
          assert Enum.map(stored_alerts, & &1.id) == object_ids
        end)

      assert log =~
               "[warning] module=Elixir.Alerts.Cache.BusStopChangeS3 func=get_stored_alerts"

      assert log =~ errored_id
    end
  end
end
