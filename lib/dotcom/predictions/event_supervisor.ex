defmodule Dotcom.Predictions.EventSupervisor do
  use Supervisor

  alias Dotcom.Predictions.EventBroadcaster

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
    query = api_query_params(params)
    url = "#{base_url()}/predictions?#{query}"

    Supervisor.init(
      [
        {ServerSentEventStage, url: url, headers: headers(), name: process_name({:sses, params})},
        {EventBroadcaster,
         publish_to: publish_to,
         subscribe_to: process_name({:sses, params}),
         name: process_name({:broadcast, params})}
      ],
      strategy: :one_for_all
    )
  end

  defp api_query_params(%{route_id: route_id, direction_id: direction_id, stop_id: stop_id}) do
    %{
      "filter[route]" => route_id,
      "filter[direction_id]" => direction_id,
      "filter[stop]" => stop_id
    }
    |> URI.encode_query()
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
