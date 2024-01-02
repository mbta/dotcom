defmodule Stops.Supervisor do
  use Supervisor

  def start_link(_) do
    Supervisor.start_link(__MODULE__, [])
  end

  def init(_) do
    children = [
      Stops.Repo
    ]

    Supervisor.init(children, strategy: :one_for_one)
  end
end
