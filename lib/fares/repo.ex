defmodule Fares.Repo do
  @moduledoc false

  use Nebulex.Caching.Decorators

  alias Fares.Fare

  @cache Application.compile_env!(:dotcom, :cache)
  @ttl :timer.hours(24)

  @fares Fares.FareInfo.fare_info()

  @spec all() :: [Fare.t()]
  @spec all(Keyword.t()) :: [Fare.t()]
  def all do
    @fares
  end

  @decorate cacheable(cache: @cache, on_error: :nothing, opts: [ttl: @ttl])
  def all(opts) when is_list(opts) do
    filter(all(), opts)
  end

  @doc """
  Filter fares using a keyword list. Returns fares whose struct key/value pairs
  all exactly match the provided key/value pairs. In addition, supports the
  :includes_media keyword, which will match against a fare whose :media list
  includes that media (possibly among other media types).
  """
  @spec filter([Fare.t()], Keyword.t()) :: [Fare.t()]
  def filter(fares, opts) do
    filter_all(fares, Map.new(opts))
  end

  @spec filter_all([Fare.t()], %{}) :: [Fare.t()]
  defp filter_all(fares, opts) do
    {media, opts} = Map.pop(opts, :includes_media)

    Enum.filter(fares, fn fare ->
      (!media || media in fare.media) && match?(^opts, Map.take(fare, Map.keys(opts)))
    end)
  end

  @spec for_fare_class(Routes.Route.gtfs_fare_class(), Keyword.t()) :: [Fare.t()]
  def for_fare_class(fare_class, opts \\ []) do
    opts = Keyword.merge(opts, fare_class_opts(fare_class))

    all(opts)
  end

  def fare_class_opts(:free_fare), do: [name: :free_fare]

  def fare_class_opts(:express_bus_fare), do: [name: :express_bus]

  def fare_class_opts(:local_bus_fare), do: [name: :local_bus]

  def fare_class_opts(:rapid_transit_fare), do: [mode: :subway]

  def fare_class_opts(:ferry_fare), do: [mode: :ferry]

  def fare_class_opts(:commuter_rail_fare), do: [mode: :commuter_rail]

  def fare_class_opts(_), do: []
end
