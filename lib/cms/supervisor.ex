defmodule CMS.Supervisor do
  use Supervisor

  def start_link(_) do
    Supervisor.start_link(__MODULE__, [])
  end

  @impl Supervisor
  def init(_) do
    children = [
      CMS.Cache,
      CMS.Repo
    ]

    Supervisor.init(children, strategy: :one_for_one)
  end
end
