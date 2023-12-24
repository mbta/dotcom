defmodule V3Api.Supervisor do
  use Supervisor

  def start_link(_) do
    Supervisor.start_link(__MODULE__, [])
  end

  @impl Supervisor
  def init(_) do
    children = [
      V3Api.Cache
    ]

    Supervisor.init(children, strategy: :rest_for_one)
  end
end
