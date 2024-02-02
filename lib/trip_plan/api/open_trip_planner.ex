defmodule TripPlan.Api.OpenTripPlanner do
  @moduledoc "Fetches data from the OpenTripPlanner API."
  @behaviour TripPlan.Api
  require Logger
  import __MODULE__.Builder, only: [build_params: 3]
  import __MODULE__.Parser, only: [parse_ql: 1]

  @impl TripPlan.Api
  def plan(from, to, _connection_opts, opts) do
    with {:ok, params} <- build_params(from, to, opts) do
      graphql_query =
        {"""
         query TripPlan(
           $fromPlace: String!
           $toPlace: String!
           $date: String
           $time: String
           $arriveBy: Boolean
           $wheelchair: Boolean
           $transportModes: [TransportMode]
         ) {
           plan(
             fromPlace: $fromPlace
             toPlace: $toPlace
             date: $date
             time: $time
             arriveBy: $arriveBy
             wheelchair: $wheelchair
             transportModes: $transportModes

             # Increased from 30 minutes, a 1-hour search window accomodates infrequent routes
             searchWindow: 3600

             # Increased from 3 to offer more itineraries for potential post-processing
             numItineraries: 5

             # Increased from 2.0 to reduce number of itineraries with significant walking
             walkReluctance: 5.0

             # Theoretically can be configured in the future for visitors using translation?
             locale: "en"

             # Prefer MBTA transit legs over Massport or others.
             preferred: { agencies: "mbta-ma-us:1" }
           )
           #{itinerary_shape()}
         }
         """, params}

      root_url = Keyword.get(opts, :root_url) || config(:otp_url)
      graphql_url = "#{root_url}/otp/routers/default/index/"

      send_request(graphql_url, graphql_query, &parse_ql/1)
    end
  end

  def config(key) do
    Util.config(:dotcom, OpenTripPlanner, key)
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
    graphql_req =
      Req.new(base_url: url, headers: build_headers(config(:wiremock_proxy)))
      |> AbsintheClient.attach()

    {duration, response} =
      :timer.tc(
        Req,
        :post,
        [graphql_req, [graphql: query]]
      )

    Logger.info(fn ->
      "#{__MODULE__}.plan_response url=#{url} #{status_text(response)} duration=#{duration / :timer.seconds(1)}"
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
            gtfsId
            name
            url
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
            absoluteDirection
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
