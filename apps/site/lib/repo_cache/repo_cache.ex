defmodule RepoCache do
  @moduledoc """

  Helps repositories cache their results easily.

  ## Usage

  defmodule Repo do
    use RepoCache

    def method(opts) do
      opts
      |> cache(fn opts ->
        # long process returning the data to cache
      end)
    end
  end

  ## Options

  Both `use` and calls to `cache` take a `ttl` parameter, which is a number
  of milliseconds to cache the value.

  """
  defmacro __using__(opts \\ []) do
    opts = include_defaults(opts)

    quote location: :keep do
      require unquote(__MODULE__)
      import unquote(__MODULE__), only: [cache: 2, cache: 3]

      def opts, do: unquote(opts)

      unquote(server_functions())
    end
  end

  defp include_defaults(opts) do
    opts =
      opts
      |> Keyword.put_new(:ttl, :timer.seconds(1))
      |> Keyword.put(:read_concurrency, true)
      |> Keyword.put(:write_concurrency, true)

    Keyword.put_new(opts, :ttl_check, opts[:ttl])
  end

  defmacro cache(fun_param, fun, cache_opts \\ []) do
    quote do
      [mod | _] = __ENV__.context_modules
      {name, _} = __ENV__.function

      unquote(__MODULE__).do_cache(
        mod,
        name,
        unquote(fun),
        unquote(fun_param),
        unquote(cache_opts)
      )
    end
  end

  def server_functions do
    quote do
      def start_link do
        ConCache.start_link(opts(), name: __MODULE__)
      end

      def default_ttl do
        Keyword.get(opts(), :ttl)
      end

      def clear_cache do
        __MODULE__
        |> ConCache.ets()
        |> :ets.delete_all_objects()
      end

      def child_spec(_opts) do
        %{
          id: __MODULE__,
          start: {__MODULE__, :start_link, []},
          type: :worker,
          restart: :permanent,
          shutdown: 500
        }
      end
    end
  end

  def do_cache(mod, name, fun, fun_param, cache_opts) do
    key = {name, fun_param}
    timeout = Keyword.get(cache_opts, :timeout)

    case ConCache.get(mod, key) do
      nil ->
        RepoCache.Log.log(:miss, mod, name)

        ConCache.isolated(mod, key, timeout, fn ->
          do_cache_isolated(fun, fun_param, mod, key, cache_opts)
        end)

      value ->
        RepoCache.Log.log(:hit, mod, name)
        value
    end
  end

  defp do_cache_isolated(fun, fun_param, mod, key, cache_opts) do
    # We try again to get a value: if we were waiting a while for the lock,
    # another process may have already updated the cache for us.
    case ConCache.get(mod, key) do
      nil ->
        maybe_set_value(fun.(fun_param), mod, key, cache_opts)

      value ->
        value
    end
  end

  defp maybe_set_value({:error, _} = error, _, _, _) do
    error
  end

  defp maybe_set_value(value, mod, key, cache_opts) do
    ttl = Keyword.get(cache_opts, :ttl, mod.default_ttl())
    item = %ConCache.Item{value: value, ttl: ttl}
    ConCache.dirty_put(mod, key, item)
    value
  end
end
