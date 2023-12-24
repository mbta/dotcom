defmodule Vehicles.Supervisor do
  use Supervisor

  def start_link(_) do
    Supervisor.start_link(__MODULE__, [])
  end

  @impl Supervisor
  def init(_) do
    Supervisor.init(children(), strategy: :rest_for_one)
  end

  defp children do
    streams =
      if Application.get_env(:elixir, :start_data_processes) do
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

  defp stream_children("false") do
    # Wiremock does not support server-sent events,
    # so starting the vehicle stream during tests using Wiremock
    # causes the server to crash.
    []
  end

  defp stream_children(_) do
    sses_opts =
      V3Api.Stream.build_options(
        name: Vehicles.Api.SSES,
        path:
          "/vehicles?fields[vehicle]=direction_id,current_status,longitude,latitude,bearing,occupancy_status"
      )

    [
      {ServerSentEventStage, sses_opts},
      {V3Api.Stream, name: Vehicles.Api, subscribe_to: Vehicles.Api.SSES},
      {Vehicles.Stream, subscribe_to: Vehicles.Api}
    ]
  end
end
