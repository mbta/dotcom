defmodule Dotcom.Cache.SubscriberTest do
  use ExUnit.Case, async: false

  alias Dotcom.Cache.Publisher
  alias Dotcom.Cache.Subscriber
  alias Dotcom.Redix.PubSub.Mock

  import ExUnit.CaptureLog
  import Mox

  setup :set_mox_global

  setup do
    expect(Mock, :start_link, fn _ -> {:ok, 0} end)
    expect(Mock, :subscribe, fn _, _, _ -> {:ok, 0} end)

    uuid = UUID.uuid4()

    {:ok, pid} = GenServer.start_link(Subscriber, uuid)

    %{pid: pid, uuid: uuid}
  end

  setup :verify_on_exit!

  @cache Application.compile_env!(:dotcom, :cache)
  @channel Publisher.channel()

  describe "handle_info" do
    test "returns the state if we get a subscription message", %{uuid: uuid} do
      {:noreply, state} =
        Subscriber.handle_info(
          {:redix_pubsub, nil, nil, :subscribed, %{channel: @channel}},
          uuid
        )

      assert state == uuid
    end

    test "executes the command", %{uuid: uuid} do
      @cache.put("foo", "bar")

      msg = {:redix_pubsub, nil, nil, :message, %{channel: @channel, payload: "eviction|0|foo"}}

      {:noreply, _} = Subscriber.handle_info(msg, uuid)

      assert @cache.get("foo") == nil
    end
  end

  test "does not execute the command if the subscriber is the publisher", %{uuid: uuid} do
    @cache.put("foo", "bar")

    msg =
      {:redix_pubsub, nil, nil, :message, %{channel: @channel, payload: "eviction|#{uuid}|foo"}}

    {:noreply, _} = Subscriber.handle_info(msg, uuid)

    refute @cache.get("foo") == nil
  end

  test "does not execute the command if the command is not in the execution list", %{uuid: uuid} do
    msg = {:redix_pubsub, nil, nil, :message, %{channel: @channel, payload: "foo|0|key"}}

    log = capture_log(fn -> Subscriber.handle_info(msg, uuid) end)

    assert log =~ "unknown_command command=foo"
  end
end
