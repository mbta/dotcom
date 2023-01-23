defmodule Vehicles do
  use Application

  # See http://elixir-lang.org/docs/stable/elixir/Application.html
  # for more information on OTP Applications
  def start(_type, _args) do
    # See http://elixir-lang.org/docs/stable/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Vehicles.Supervisor]
    children() |> Supervisor.start_link(opts)
  end

  defp children do
    streams =
      "USE_SERVER_SENT_EVENTS"
      |> System.get_env()
      |> stream_children()

    [
      {Phoenix.PubSub.PG2, name: Vehicles.PubSub},
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
