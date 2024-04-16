defmodule Facilities.Repo do
  @moduledoc """
  Repo to get facilitiy information.
  """

  alias MBTA.Api.Facilities

  use Nebulex.Caching.Decorators

  @cache Application.compile_env!(:dotcom, :cache)
  @ttl :timer.hours(24)

  @decorate cacheable(cache: @cache, on_error: :nothing, opts: [ttl: @ttl])
  def get_for_stop(stop_id), do: Facilities.filter_by([{"stop", stop_id}])
end
