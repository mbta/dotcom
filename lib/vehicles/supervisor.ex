defmodule Vehicles.Supervisor do
  @moduledoc """
  Supervisor for handling streaming vehicle data from the V3 API and publishing
  updated vehicle data to subscribed processes.
  """
  use Supervisor

  alias Vehicles.Api.SSES

  def start_link(_) do
    Supervisor.start_link(__MODULE__, [])
  end

  @impl Supervisor
  def init(_) do
    Supervisor.init(children(), strategy: :rest_for_one)
  end

  defp children do
    streams =
      if Application.get_env(:dotcom, :start_data_processes) do
        "USE_SERVER_SENT_EVENTS"
        |> System.get_env()
        |> stream_children()
      else
        []
      end

    [
      {Phoenix.PubSub, name: Vehicles.PubSub},
      Vehicles.Repo
      | streams
    ]
  end

  defp stream_children("false"), do: []

  defp stream_children(_) do
    sses_opts =
      MBTA.Api.Stream.build_options(
        name: SSES,
        path: "/vehicles?fields[vehicle]=direction_id,current_status,longitude,latitude,bearing,occupancy_status"
      )

    [
      {ServerSentEventStage, sses_opts},
      {MBTA.Api.Stream, name: Vehicles.Api, subscribe_to: SSES},
      {Vehicles.Stream, subscribe_to: Vehicles.Api}
    ]
  end
end
