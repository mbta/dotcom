defmodule Alerts do
  use Application

  def start(_type, _args) do
    Alerts.Supervisor.start_link()
  end
end
