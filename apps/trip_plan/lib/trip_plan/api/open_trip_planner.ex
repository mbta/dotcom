defmodule TripPlan.Api.OpenTripPlanner do
  @moduledoc "Fetches data from the OpenTripPlanner API."
  @behaviour TripPlan.Api
  require Logger
  import __MODULE__.Builder, only: [build_params: 3]
  import __MODULE__.Parser, only: [parse_json: 1]
  alias TripPlan.NamedPosition
  alias Util.Position

  def plan(from, to, opts, _parent) do
    plan(from, to, opts)
  end

  @impl true
  def plan(from, to, opts) do
    with {:ok, params} <- build_params(from, to, opts) do
      params =
        Map.merge(
          params,
          %{
            "fromPlace" => location(from),
            "toPlace" => location(to),
            "showIntermediateStops" => "true",
            "format" => "json",
            "locale" => "en"
          }
        )

      root_url = params["root_url"] || config(:root_url)
      full_url = "#{root_url}/otp/routers/default/plan"
      send_request(full_url, params, &parse_json/1)
    end
  end

  def config(key) do
    Util.config(:trip_plan, OpenTripPlanner, key)
  end

  defp send_request(url, params, parser) do
    with {:ok, response} <- log_response(url, params),
         %{status_code: 200, body: body} <- response do
      parser.(body)
    else
      %{status_code: _} = response ->
        {:error, response}

      error ->
        error
    end
  end

  defp log_response(url, params) do
    {duration, response} =
      :timer.tc(
        HTTPoison,
        :get,
        [url, build_headers(config(:wiremock_proxy)), [params: params, recv_timeout: 10_000]]
      )

    _ =
      Logger.info(fn ->
        "#{__MODULE__}.plan_response url=#{url} params=#{inspect(params)} #{status_text(response)} duration=#{duration / :timer.seconds(1)}"
      end)

    response
  end

  defp build_headers("true") do
    proxy_url = Application.get_env(:trip_plan, OpenTripPlanner)[:wiremock_proxy_url]
    [{"X-WM-Proxy-Url", proxy_url}]
  end

  defp build_headers(_), do: []

  defp status_text({:ok, %{status_code: code, body: body}}) do
    "status=#{code} content_length=#{byte_size(body)}"
  end

  defp status_text({:error, error}) do
    "status=error error=#{inspect(error)}"
  end

  defp location(%NamedPosition{stop_id: stop_id}) when is_binary(stop_id) do
    # 1 is the name for the MBTA's GTFS feed in the OpenTripPlanner instance.
    "1:#{stop_id}"
  end

  defp location(%NamedPosition{} = np) do
    "#{np.name}::#{Position.latitude(np)},#{Position.longitude(np)}"
  end

  defp location(position) do
    "#{Position.latitude(position)},#{Position.longitude(position)}"
  end
end
