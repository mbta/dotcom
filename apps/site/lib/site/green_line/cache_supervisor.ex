defmodule Site.GreenLine.CacheSupervisor do
  use Supervisor

  alias Site.GreenLine.DateAgent

  def start_link do
    Supervisor.start_link(__MODULE__, nil, name: :green_line_cache_supervisor)
  end

  def start_child(date) do
    Supervisor.start_child(:green_line_cache_supervisor, [date, via_tuple(date)])
  end

  @doc """
  Retrieves the stops_on_routes information for a given date from the cache. If the
  Agent serving as the cache does not exist, just use the API.
  """
  @spec stops_on_routes(0 | 1, Date.t() | nil) :: GreenLine.stop_routes_pair()
  def stops_on_routes(direction_id, date) do
    case lookup(date) do
      nil -> GreenLine.calculate_stops_on_routes(direction_id, date)
      pid -> DateAgent.stops_on_routes(pid, direction_id)
    end
  end

  def lookup(date) do
    case Registry.lookup(:green_line_cache_registry, date) do
      [{pid, _}] -> if Process.alive?(pid), do: pid
      _ -> nil
    end
  end

  @impl true
  def init(_) do
    children = [
      worker(Site.GreenLine.DateAgent, [], restart: :transient)
    ]

    supervise(children, strategy: :simple_one_for_one)
  end

  defp via_tuple(date) do
    {:via, Registry, {:green_line_cache_registry, date}}
  end
end
