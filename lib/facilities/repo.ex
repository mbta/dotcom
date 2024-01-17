defmodule Facilities.Repo do
  @moduledoc """
  Repo to get facilitiy information.
  """
  use RepoCache, global_ttl: :timer.hours(1)

  def get_for_stop(stop_id) do
    cache(stop_id, fn stop_id ->
      [{"stop", stop_id}]
      |> V3Api.Facilities.filter_by()
    end)
  end
end
