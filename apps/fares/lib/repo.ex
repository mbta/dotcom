defmodule Fares.Repo do
  @fares Fares.FareInfo.fare_info()

  use RepoCache, ttl: :timer.hours(24)

  alias Fares.Fare

  @spec all() :: [Fare.t()]
  @spec all(Keyword.t()) :: [Fare.t()]
  def all do
    @fares
  end

  def all(opts) when is_list(opts) do
    cache(opts, fn opts ->
      all()
      |> filter(opts)
    end)
  end

  @doc """
  Filter fares using a keyword list. Returns fares whose struct key/value pairs
  all exactly match the provided key/value pairs. In addition, supports the
  :includes_media keyword, which will match against a fare whose :media list
  includes that media (possibly among other media types).
  """
  @spec filter([Fare.t()], Keyword.t()) :: [Fare.t()]
  def filter(fares, opts) do
    fares
    |> filter_all(Map.new(opts))
  end

  @spec filter_all([Fare.t()], %{}) :: [Fare.t()]
  defp filter_all(fares, opts) do
    {media, opts} = Map.pop(opts, :includes_media)

    Enum.filter(fares, fn fare ->
      (!media || media in fare.media) && match?(^opts, Map.take(fare, Map.keys(opts)))
    end)
  end
end
