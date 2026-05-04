defmodule Dotcom.Playground.PredictionsSupervisor do
  use Supervisor

  alias Dotcom.Playground.PredictionsBroadcasterStage

  # Client
  def start_link(%{params: params} = args) do
    Supervisor.start_link(__MODULE__, args, name: process_name(params))
  end

  def stop(%{params: params}) do
    Supervisor.stop(process_name(params))
  end

  # Server
  @impl Supervisor
  def init(%{params: params, publish_to: publish_to}) do
    query = URI.encode_query(params)

    url = "#{base_url()}/predictions?#{query}"

    Supervisor.init(
      [
        {ServerSentEventStage, url: url, headers: headers(), name: process_name({:sses, params})},
        {PredictionsBroadcasterStage,
         publish_to: publish_to,
         subscribe_to: process_name({:sses, params}),
         name: process_name({:broadcast, params})}
      ],
      strategy: :one_for_all
    )
  end

  defp process_name(args) do
    {:global, {:predictions_supervisor, args}}
  end

  defp base_url() do
    Application.get_env(:dotcom, :mbta_api)[:base_url]
  end

  defp headers() do
    Application.get_env(:dotcom, :mbta_api)[:headers]
  end
end
