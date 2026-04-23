defmodule Dotcom.Playground.UpcomingDeparturesSupervisor do
  use Supervisor

  alias Dotcom.Playground.PredictionAggregatorStage

  def start_link(params) do
    Supervisor.start_link(__MODULE__, params, name: process_name(params))
  end

  def stop(params) do
    dbg("Stopping the supervisor")
    Supervisor.stop(process_name(params))
  end

  def init(params) do
    dbg("INIT")
    dbg(params)
    query = URI.encode_query(params)

    dbg(query)
    url = "#{base_url()}/predictions?#{query}"

    children = [
      {ServerSentEventStage, url: url, headers: headers(), name: process_name({:sses, params})},
      {PredictionAggregatorStage,
       subscribe_to: process_name({:sses, params}), name: process_name({:aggregate, params})}
    ]

    children
    |> Supervisor.init(strategy: :one_for_all)
    |> dbg()
  end

  defp base_url() do
    Application.get_env(:dotcom, :mbta_api)[:base_url]
  end

  defp headers() do
    Application.get_env(:dotcom, :mbta_api)[:headers]
  end

  defp process_name(args) do
    {:via, :global, args}
  end
end
