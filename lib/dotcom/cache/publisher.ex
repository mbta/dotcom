defmodule Dotcom.Cache.Publisher do
  @moduledoc """
  TODO
  """

  # Inherit default transaction implementation
  use Nebulex.Adapter.Transaction

  alias Dotcom.Cache.Subscriber

  @channel "cache_buster"

  def channel, do: @channel

  @behaviour Nebulex.Adapter

  @impl Nebulex.Adapter
  defmacro __before_compile__(_env), do: :ok

  @impl Nebulex.Adapter
  def init(_) do
    uuid = UUID.uuid4(:hex)

    child_spec = %{id: Subscriber, start: {Subscriber, :start_link, [uuid]}}

    {:ok, child_spec, %{uuid: uuid}}
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

  @behaviour Nebulex.Adapter.Stats

  @impl Nebulex.Adapter.Stats
  def stats(_), do: %Nebulex.Stats{}
end
