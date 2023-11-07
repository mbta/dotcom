defmodule TripPlan.Api.OpenTripPlanner do
  @moduledoc "Fetches data from the OpenTripPlanner API."
  @behaviour TripPlan.Api
  require Logger
  import __MODULE__.Builder, only: [build_query_params: 3]
  import __MODULE__.Parser, only: [parse_ql: 1]

  def plan(from, to, connection_opts, opts, _parent) do
    plan(from, to, connection_opts, opts)
  end

  @impl true
  def plan(from, to, connection_opts, opts) do
    with {:ok, params} <- build_query_params(from, to, opts) do
      param_string = Enum.map_join(params, "\n", fn {key, val} -> ~s{#{key}: #{val}} end)

      graph_ql_query = """
      {
        plan(
          #{param_string}
        )
        #{itinerary_shape()}
      }
      """

      root_url = params["root_url"] || pick_url(connection_opts)
      graphql_url = "#{root_url}/otp/routers/default/index/"

      send_request(graphql_url, graph_ql_query, &parse_ql/1)
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

  defp send_request(url, query, parser) do
    with {:ok, response} <- log_response(url, query),
         %{status: 200, body: body} <- response do
      parser.(body)
    else
      %{status: _} = response ->
        {:error, response}

      error ->
        error
    end
  end

  defp log_response(url, query) do
    graphql_req = Req.new(base_url: url) |> AbsintheClient.attach()

    {duration, response} =
      :timer.tc(
        Req,
        :post,
        [graphql_req, [graphql: query]]
      )

    _ =
      Logger.info(fn ->
        "#{__MODULE__}.plan_response url=#{url} is_otp2=#{String.contains?(url, config(:otp2_url))} query=#{inspect(query)} #{status_text(response)} duration=#{duration / :timer.seconds(1)}"
      end)

    response
  end

  defp status_text({:ok, %{status: code, body: body}}) do
    "status=#{code} content_length=#{byte_size(body)}"
  end

  defp status_text({:error, error}) do
    "status=error error=#{inspect(error)}"
  end

  defp itinerary_shape() do
    """
    {
      itineraries {
        startTime
        endTime
        duration
        legs {
          mode
          startTime
          endTime
          distance
          duration
          intermediateStops {
            id
            gtfsId
            name
            desc
            lat
            lon
            code
            locationType
          }
          transitLeg
          headsign
          realTime
          realtimeState
          agency {
            id
            gtfsId
            name
          }
          alerts {
            id
            alertHeaderText
            alertDescriptionText
          }
          fareProducts {
            id
            product {
              id
              name
              riderCategory {
                id
                name

              }
            }
          }
          from {
            name
            lat
            lon
            departureTime
            arrivalTime
            stop {
              gtfsId
            }
          }
          to {
            name
            lat
            lon
            departureTime
            arrivalTime
            stop {
              gtfsId
            }
          }
          route {
            gtfsId
            longName
            shortName
            desc
            color
            textColor
          }
          trip {
            gtfsId
          }
          steps {
            distance
            streetName
            lat
            lon
            relativeDirection
            stayOn
          }
          legGeometry {
            points
          }
        }
      }
    }
    """
  end
end
