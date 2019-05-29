defmodule Site.GreenLine.Supervisor do
  @moduledoc """

  Supervision tree for GreenLine caching.

  It supervises the CacheSupervisor which in turn is responsible for a
  simple_one_for_one set of Agents. Each agent stores data for a
  particular day.

  It also supervises a Cache module which, at application start, spins up an
  agent for every day from today until `Schedules.Repo.end_of_rating`. The
  warmer also schedules itself to run again at 7am ET the next morning. This
  module is also the interface for querying the cache.

  """

  use Supervisor

  def start_link do
    Supervisor.start_link(__MODULE__, nil)
  end

  @impl true
  def init(_) do
    children = [
      supervisor(Registry, [:unique, :green_line_cache_registry]),
      supervisor(Site.GreenLine.CacheSupervisor, []),
      worker(Site.GreenLine.Cache, [])
    ]

    supervise(children, strategy: :rest_for_one)
  end
end
