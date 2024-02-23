defmodule Dotcom.Cache.Publisher do
  @moduledoc """
  TODO
  """

  # Inherit default transaction implementation
  use Nebulex.Adapter.Transaction

  alias Dotcom.Cache.Subscriber

  @behaviour Nebulex.Adapter
  @behaviour Nebulex.Adapter.Entry
  @behaviour Nebulex.Adapter.Queryable
  @behaviour Nebulex.Adapter.Persistence
  @behaviour Nebulex.Adapter.Stats

  ## Nebulex.Adapter

  @impl Nebulex.Adapter
  defmacro __before_compile__(_env), do: :ok

  @impl Nebulex.Adapter
  def init(_opts) do
    child_spec = %{id: Subscriber, start: {Subscriber, :start_link, []}}

    {:ok, child_spec, %{}}
  end

  ## Nebulex.Adapter.Entry

  @impl Nebulex.Adapter.Entry
  def get(_, _, _), do: nil

  @impl Nebulex.Adapter.Entry
  def get_all(_, _, _), do: %{}

  @impl Nebulex.Adapter.Entry
  def put(_, _, _, _, _, _), do: true

  @impl Nebulex.Adapter.Entry
  def put_all(_, _, _, _, _), do: true

  @impl Nebulex.Adapter.Entry
  def delete(_, key, _) do
    Dotcom.Cache.Multilevel.Redis.command(["PUBLISH", Subscriber.channel(), key])

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

  ## Nebulex.Adapter.Queryable

  @impl Nebulex.Adapter.Queryable
  def execute(_, :all, _, _), do: []
  def execute(_, _, _, _), do: 0

  @impl Nebulex.Adapter.Queryable
  def stream(_, _, _), do: Stream.each([], & &1)

  ## Nebulex.Adapter.Persistence

  @impl Nebulex.Adapter.Persistence
  def dump(_, _, _), do: :ok

  @impl Nebulex.Adapter.Persistence
  def load(_, _, _), do: :ok

  ## Nebulex.Adapter.Stats

  @impl Nebulex.Adapter.Stats
  def stats(_), do: %Nebulex.Stats{}
end
