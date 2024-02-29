defmodule Dotcom.Cache.Publisher do
  @moduledoc """
  TODO
  """

  # Inherit default implementations
  use Nebulex.Adapter.Stats
  use Nebulex.Adapter.Transaction

  alias Dotcom.Cache.Subscriber
  alias Nebulex.Adapter.Stats

  @channel "dotcom:cache:publisher"

  def channel, do: @channel

  @behaviour Nebulex.Adapter

  @impl Nebulex.Adapter
  defmacro __before_compile__(_env), do: :ok

  @impl Nebulex.Adapter
  def init(opts) do
    uuid = UUID.uuid4(:hex)

    child_spec = %{id: Subscriber, start: {Subscriber, :start_link, [uuid]}}

    stats_counter = Stats.init(opts)

    adapter_meta = %{
      uuid: uuid,
      stats_counter: stats_counter,
      telemetry: Keyword.fetch!(opts, :telemetry),
      telemetry_prefix: Keyword.fetch!(opts, :telemetry_prefix)
    }

    {:ok, child_spec, adapter_meta}
  end

  @behaviour Nebulex.Adapter.Entry

  @impl Nebulex.Adapter.Entry
  def get(_, _, _), do: nil

  @impl Nebulex.Adapter.Entry
  def get_all(_, _, _), do: %{}

  @impl Nebulex.Adapter.Entry
  def put(_, _, _, _, _, _), do: true

  @impl Nebulex.Adapter.Entry
  def put_all(_, _, _, _, _), do: true

  @impl Nebulex.Adapter.Entry
  def delete(meta, key, _) do
    Dotcom.Cache.Multilevel.Redis.command(["PUBLISH", @channel, "#{meta.uuid}|#{key}"])

    Stats.incr(meta.stats_counter, :evictions)

    :ok
  end

  @impl Nebulex.Adapter.Entry
  def take(_, _, _), do: nil

  @impl Nebulex.Adapter.Entry
  def has_key?(_, _), do: false

  @impl Nebulex.Adapter.Entry
  def ttl(_, _), do: nil

  @impl Nebulex.Adapter.Entry
  def expire(_, _, _), do: true

  @impl Nebulex.Adapter.Entry
  def touch(_, _), do: true

  @impl Nebulex.Adapter.Entry
  def update_counter(_, _, amount, _, default, _), do: default + amount

  @behaviour Nebulex.Adapter.Queryable

  @impl Nebulex.Adapter.Queryable
  def execute(_, :all, _, _), do: []
  def execute(_, _, _, _), do: 0

  @impl Nebulex.Adapter.Queryable
  def stream(_, _, _), do: Stream.each([], & &1)

  @behaviour Nebulex.Adapter.Persistence

  @impl Nebulex.Adapter.Persistence
  def dump(_, _, _), do: :ok

  @impl Nebulex.Adapter.Persistence
  def load(_, _, _), do: :ok

  @impl Nebulex.Adapter.Stats
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
