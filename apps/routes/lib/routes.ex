defmodule Routes do
  use Application

  # See http://elixir-lang.org/docs/stable/elixir/Application.html
  # for more information on OTP Applications
  def start(_type, _args) do
    import Supervisor.Spec, warn: false

    children = [
      # Define workers and child supervisors to be supervised
      # worker(Routes.Worker, [arg1, arg2, arg3]),
      Routes.Repo
    ]

    children =
      if Application.get_env(:routes, :populate_caches?) and
           Application.get_env(:elixir, :start_data_processes) do
        children ++
          [
            Routes.PopulateCaches
          ]
      else
        children
      end

    # See http://elixir-lang.org/docs/stable/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :rest_for_one, name: Routes.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
