defmodule TripPlan.Api.OpenTripPlanner do
  @moduledoc """
  Fetches data from the OpenTripPlanner API.
  """

  require Logger

  import __MODULE__.Builder, only: [build_params: 3]
  import __MODULE__.Parser, only: [parse_ql: 2]

  alias __MODULE__.Behaviour

  @behaviour Behaviour

  def plan(from, to, connection_opts, opts, _parent) do
    Behaviour.plan(from, to, connection_opts, opts)
  end

  @impl Behaviour
  def plan(from, to, _connection_opts, opts) do
    accessible? = Keyword.get(opts, :wheelchair_accessible?, false)

    with {:ok, params} <- build_params(from, to, opts) do
      param_string = Enum.map_join(params, "\n", fn {key, val} -> ~s{#{key}: #{val}} end)

      graphql_query = """
      {
        plan(
          #{param_string}
        )
        #{itinerary_shape()}
      }
      """

      root_url = Keyword.get(opts, :root_url) || config(:otp_url)
      graphql_url = "#{root_url}/otp/routers/default/index/"

      send_request(graphql_url, graphql_query, accessible?, &parse_ql/2)
    end
  end

  def config(key) do
    Util.config(:dotcom, OpenTripPlanner, key)
  end

  defp send_request(url, query, accessible?, parser) do
    with {:ok, response} <- log_response(url, query),
         %{status: 200, body: body} <- response do
      parser.(body, accessible?)
    else
      %{status: _} = response ->
        {:error, response}

      error ->
        error
    end
  end

  defp log_response(url, query) do
    graphql_req =
      Req.new(base_url: url, headers: build_headers(config(:wiremock_proxy)))
      |> AbsintheClient.attach()

    {duration, response} =
      :timer.tc(
        Req,
        :post,
        [graphql_req, [graphql: query]]
      )

    _ =
      Logger.info(fn ->
        "#{__MODULE__}.plan_response url=#{url} query=#{inspect(query)} #{status_text(response)} duration=#{duration / :timer.seconds(1)}"
      end)

    response
  end

  defp build_headers("true") do
    proxy_url = Application.get_env(:dotcom, OpenTripPlanner)[:wiremock_proxy_url]
    [{"X-WM-Proxy-Url", proxy_url}]
  end

  defp build_headers(_), do: []

  defp status_text({:ok, %{status: code, body: body}}) do
    string_body = Poison.encode!(body)
    "status=#{code} content_length=#{byte_size(string_body)}"
  end

  defp status_text({:error, error}) do
    "status=error error=#{inspect(error)}"
  end

  defp itinerary_shape() do
    """
    {
      routingErrors {
        code
        description
      }
      itineraries {
        accessibilityScore
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
