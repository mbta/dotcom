defmodule Dotcom.Cache.Publisher do
  @moduledoc """
  A Nebulex adapter that publishes cache invalidation messages to a Redis PubSub channel.

  Most of the behaviour defaults are copied from the Nebulex.Adapter.Nil module.

  We only implement the delete/3 function to publish the cache invalidation message and stats/1 to reset the evictions counter.
  """

  @behaviour Nebulex.Adapter
  @behaviour Nebulex.Adapter.Entry
  @behaviour Nebulex.Adapter.Persistence
  @behaviour Nebulex.Adapter.Queryable

  use Nebulex.Adapter.Stats
  use Nebulex.Adapter.Transaction

  alias Dotcom.Cache.Subscriber
  alias Nebulex.Adapter.Entry
  alias Nebulex.Adapter.Persistence
  alias Nebulex.Adapter.Queryable
  alias Nebulex.Adapter.Stats

  require Logger

  # Inherit default implementations
  @channel "dotcom:cache:publisher"
  @redis Application.compile_env!(:dotcom, :redis)

  def channel, do: @channel

  @impl Nebulex.Adapter
  defmacro __before_compile__(_env), do: :ok

  @impl Nebulex.Adapter
  @doc """
  Initializes the adapter with a stats counter and a unique id.
  The unique id is used to identify the Elixir node that published the message.
  This allows us to *not* delete from the local cache if the message was published from this Elixir node.
  Also starts the Subscriber as a child process.
  """
  def init(opts) do
    publisher_id = UUID.uuid4(:hex)

    child_spec = %{id: Subscriber, start: {Subscriber, :start_link, [publisher_id]}}

    stats_counter = Stats.init(opts)

    adapter_meta = %{
      publisher_id: publisher_id,
      stats_counter: stats_counter,
      telemetry: Keyword.fetch!(opts, :telemetry),
      telemetry_prefix: Keyword.fetch!(opts, :telemetry_prefix)
    }

    {:ok, child_spec, adapter_meta}
  end

  @impl Entry
  def get(_, _, _), do: nil

  @impl Entry
  def get_all(_, _, _), do: %{}

  @impl Entry
  def put(_, _, _, _, _, _), do: true

  @impl Entry
  def put_all(_, _, _, _, _), do: true

  @impl Entry
  @doc """
  Publishes cache eviction messages to the Redis PubSub @channel.
  Gives the command as the first argument, the publisher_id as the second, and the key as the third.
  Increments the evictions counter.
  """
  def delete(meta, key, _) do
    command = "eviction"

    @redis.command([
      "PUBLISH",
      @channel,
      "#{command}|#{meta.publisher_id}|#{key}"
    ])

    Logger.notice("dotcom.cache.multilevel.publisher.#{command} publisher_id=#{meta.publisher_id} key=#{key}")

    Stats.incr(meta.stats_counter, :evictions)

    :ok
  end

  @impl Entry
  def take(_, _, _), do: nil

  @impl Entry
  def has_key?(_, _), do: false

  @impl Entry
  def ttl(_, _), do: nil

  @impl Entry
  def expire(_, _, _), do: true

  @impl Entry
  def touch(_, _), do: true

  @impl Entry
  def update_counter(_, _, amount, _, default, _), do: default + amount

  @impl Queryable
  def execute(_, :all, _, _), do: []
  def execute(_, _, _, _), do: 0

  @impl Queryable
  def stream(_, _, _), do: Stream.each([], & &1)

  @impl Persistence
  def dump(_, _, _), do: :ok

  @impl Persistence
  def load(_, _, _), do: :ok

  @impl Nebulex.Adapter.Stats
  @doc """
  Reports the adapter stats and resets the evictions counter.
  Evictions are the only thing we care about; all other stats stay at 0.
  """
  def stats(meta) do
    if stats = super(meta) do
      reset(meta)

      stats
    end
  end

  defp reset(meta) do
    # Reset the counters.
    # 5 corresponds to the evictions counter.
    :counters.put(meta.stats_counter, 5, 0)
  end
end
