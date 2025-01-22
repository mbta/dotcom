defmodule Alerts.BusStopChangeSupervisor do
  @moduledoc """
  Supervisor for the alert app's processes for the Bus Stop Change page.
  """

  use Supervisor

  alias Alerts.Cache.BusStopChangeS3

  def start_link(opts) do
    Supervisor.start_link(__MODULE__, opts, name: Keyword.get(opts, :name, __MODULE__))
  end

  @impl Supervisor
  def init(_) do
    children =
      if Application.get_env(:dotcom, :start_data_processes) do
        [{Alerts.Cache.Fetcher, BusStopChangeS3.fetcher_opts()}]
      else
        []
      end

    Supervisor.init(children, strategy: :rest_for_one)
  end
end
