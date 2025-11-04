defmodule Facilities.Repo do
  @moduledoc """
  Repo to get facility information.
  """

  defmodule Behaviour do
    @moduledoc """
    Behavior for an API client for fetching facility data.
    """

    @doc """
    Returns a list of all the facilities for a stop
    """
    @callback get_for_stop(String.t()) :: [Facilities.Facility.t()] | {:error, term()}
  end

  use Nebulex.Caching.Decorators

  @behaviour Behaviour
  @cache Application.compile_env!(:dotcom, :cache)
  @ttl :timer.hours(24)

  @impl Behaviour
  def get_for_stop(stop_id) do
    cached_all([{"stop", stop_id}])
  end

  @decorate cacheable(cache: @cache, on_error: :nothing, opts: [ttl: @ttl])
  defp cached_all(opts) do
    with %JsonApi{data: data} when is_list(data) <- MBTA.Api.Facilities.filter_by(opts) do
      data
      |> Enum.map(&Facilities.Facility.parse_v3_response/1)
    end
  end
end
