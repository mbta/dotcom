defmodule Fares.Repo do
  @moduledoc false

  use Nebulex.Caching.Decorators

  alias Fares.Fare

  @cache Application.compile_env!(:dotcom, :cache)
  @ttl :timer.hours(24)

  @fares Fares.FareInfo.fare_info()

  def all do
    @fares
  end

  @decorate cacheable(cache: @cache, on_error: :nothing, opts: [ttl: @ttl])
  def all(opts) when is_list(opts) do
    all() |> filter(opts)
  end

  @doc """
  Filter fares using a keyword list. Returns fares whose struct key/value pairs
  all exactly match the provided key/value pairs. In addition, supports the
  :includes_media keyword, which will match against a fare whose :media list
  includes that media (possibly among other media types).
  """
  def filter(fares, opts) do
    fares
    |> filter_all(Map.new(opts))
  end

  defp filter_all(fares, opts) do
    {media, opts} = Map.pop(opts, :includes_media)

    Enum.filter(fares, fn fare ->
      (!media || media in fare.media) && match?(^opts, Map.take(fare, Map.keys(opts)))
    end)
  end

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
