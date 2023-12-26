defmodule RepoCache.Log do
  @moduledoc """
  Responsible for logging hit/miss rates for the different caches.

  Maintains an ETS table of hit/miss rates, which looks like:

  {{repo_module, function_name}, hit_count, miss_count}

  Every 60 seconds, we reset the counts and log the rates, along with the
  sizes of the tables.

  """
  use GenServer
  require Logger

  @table __MODULE__

  def start_link([]) do
    GenServer.start_link(__MODULE__, [])
  end

  def log(hit_or_miss, mod, name) do
    do_log({mod, name}, hit_or_miss)
  rescue
    ArgumentError ->
      :error
  end

  defp do_log(key, :hit) do
    default = {key, 1, 0}

    :ets.update_counter(
      @table,
      key,
      {2, 1},
      default
    )

    :ok
  end

  defp do_log(key, :miss) do
    default = {key, 0, 1}

    :ets.update_counter(
      @table,
      key,
      {3, 1},
      default
    )

    :ok
  end

  def all do
    :ets.tab2list(@table)
  end

  def init([]) do
    table_opts = [:named_table, :public, :set, {:write_concurrency, true}]

    @table =
      try do
        :ets.new(@table, table_opts)
      rescue
        ArgumentError ->
          true = :ets.delete(@table)
          :ets.new(@table, table_opts)
      end

    schedule_log()
    {:ok, []}
  end

  def schedule_log do
    Process.send_after(self(), :output_log, 60_000)
  end

  def handle_info(:output_log, state) do
    _ =
      all()
      |> reset_table()
      |> output_cache_hit_rates()
      |> output_sizes()

    schedule_log()
    {:noreply, state, :hibernate}
  end

  def handle_info(msg, state) do
    _ = Logger.error("module=#{__MODULE__} error=unexpected_message message=#{inspect(msg)}")
    {:noreply, state}
  end

  def reset_table(values) do
    for {key, hit, miss} <- values do
      # remove the previous hit/miss count from each
      _ = :ets.update_counter(@table, key, [{2, -hit}, {3, -miss}])
    end

    values
  end

  def output_cache_hit_rates(values) do
    for value <- values do
      _ =
        Logger.info(fn ->
          {{mod, name}, hit, miss} = value
          total = hit + miss

          hit_rate =
            case total do
              0 -> 0.0
              _ -> Float.round(hit / total, 2)
            end

          "repocache_report mod=#{mod} fun=#{name} hit=#{hit} miss=#{miss} total=#{total} hit_rate=#{hit_rate}"
        end)
    end

    values
  end

  def output_sizes(values) do
    modules = values |> Enum.map(&elem(elem(&1, 0), 0)) |> Enum.uniq()

    for mod <- modules do
      {:ok, table} = ets_table(mod)

      _ =
        Logger.info(fn ->
          size = :ets.info(table, :size)
          memory = :ets.info(table, :memory)
          "repocache_report table=#{mod} size=#{size} memory=#{memory}"
        end)
    end

    values
  end

  defp ets_table(mod) do
    {:ok, ConCache.ets(mod)}
  rescue
    _ -> :error
  end
end
