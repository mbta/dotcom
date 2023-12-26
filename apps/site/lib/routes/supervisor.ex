defmodule Routes.Supervisor do
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
      if Application.get_env(:site, :route_populate_caches?) and
           Application.get_env(:elixir, :start_data_processes) do
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
