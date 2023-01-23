defmodule Site.GreenLine.Supervisor do
  @moduledoc """

  Supervision tree for GreenLine caching.

  It supervises the CacheSupervisor which in turn is responsible for a
  DynamicSupervisor set of Agents. Each agent stores data for a
  particular day.

  It also supervises a Cache module which, at application start, spins up an
  agent for every day from today until `Schedules.Repo.end_of_rating`. The
  warmer also schedules itself to run again at 7am ET the next morning. This
  module is also the interface for querying the cache.

  """
  use Supervisor

  def start_link(_) do
    Supervisor.start_link(__MODULE__, [])
  end

  @impl Supervisor
  def init(_) do
    children = [
      {Registry, keys: :unique, name: :green_line_cache_registry},
      Site.GreenLine.CacheSupervisor,
      Site.GreenLine.Cache
    ]

    Supervisor.init(children, strategy: :rest_for_one)
  end
end
