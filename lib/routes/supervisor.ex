defmodule Routes.Supervisor do
  @moduledoc """
  Supervisor for loading and caching V3 API route information.
  """
  use Supervisor

  def start_link(_) do
    Supervisor.start_link(__MODULE__, [])
  end

  @impl Supervisor
  def init(_) do
    children = [
      Routes.Repo
    ]

    children =
      if Application.get_env(:dotcom, :route_populate_caches?) &&
           Application.get_env(:dotcom, :start_data_processes) do
        children ++
          [
            Routes.PopulateCaches
          ]
      else
        children
      end

    Supervisor.init(children, strategy: :rest_for_one)
  end
end
