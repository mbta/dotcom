defmodule RepoCache.Application do
  use Application

  def start(_type, _args) do
    import Supervisor.Spec, warn: false

    children = [
      RepoCache.Log
    ]

    opts = [strategy: :one_for_one, name: RepoCache.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
