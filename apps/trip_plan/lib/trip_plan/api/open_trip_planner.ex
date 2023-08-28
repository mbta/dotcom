defmodule TripPlan.Api.OpenTripPlanner do
  @moduledoc "Fetches data from the OpenTripPlanner API."
  @behaviour TripPlan.Api
  require Logger
  import __MODULE__.Builder, only: [build_params: 3]
  import __MODULE__.Parser, only: [parse_json: 1]
  alias TripPlan.NamedPosition
  alias Util.Position

  def plan(from, to, connection_opts, opts, _parent) do
    plan(from, to, connection_opts, opts)
  end

  @impl true
  def plan(from, to, connection_opts, opts) do
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

      root_url = params["root_url"] || pick_url(connection_opts)
      full_url = "#{root_url}/otp/routers/default/plan"
      send_request(full_url, params, &parse_json/1)
    end
  end

  def pick_url(connection_opts) do
    user_id = connection_opts[:user_id]

    cond do
      connection_opts[:force_otp2] ->
        Logger.info(fn ->
          "#{__MODULE__}.pick_url Force OTP2 flag enabled, skipping random assignment mbta_id=#{user_id}"
        end)

        config(:otp2_url)

      connection_opts[:force_otp1] ->
        Logger.info(fn ->
          "#{__MODULE__}.pick_url Force OTP1 flag enabled, skipping random assignment mbta_id=#{user_id}"
        end)

        config(:otp1_url)

      true ->
        percent_threshold = get_otp2_percentage()

        :rand.seed(:exsss, user_id)
        placement = :rand.uniform()
        use_otp2 = placement < percent_threshold / 100

        Logger.info(fn ->
          "#{__MODULE__}.pick_url placement=#{placement} otp2_percentage=#{percent_threshold}% mbta_id=#{user_id} use_otp2=#{use_otp2}"
        end)

        if use_otp2 do
          config(:otp2_url)
        else
          config(:otp1_url)
        end
    end
  end

  def get_otp2_percentage() do
    try do
      String.to_integer(config(:otp2_percentage))
    rescue
      e in ArgumentError ->
        Logger.warn(fn ->
          "#{__MODULE__}.get_otp2_percentage Couldn't parse OPEN_TRIP_PLANNER_2_PERCENTAGE env var as an int, using 0. OPEN_TRIP_PLANNER_2_PERCENTAGE=#{config(:otp2_percentage)} parse_error=#{e.message}"
        end)

        0
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
        "#{__MODULE__}.plan_response url=#{url} is_otp2=#{String.contains?(url, config(:otp2_url))} params=#{inspect(params)} #{status_text(response)} duration=#{duration / :timer.seconds(1)}"
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

  defp location(%NamedPosition{} = np) do
    "#{np.name}::#{Position.latitude(np)},#{Position.longitude(np)}"
  end

  defp location(position) do
    "#{Position.latitude(position)},#{Position.longitude(position)}"
  end
end
