defmodule GoogleMaps.Place do
  @moduledoc """
  Perform place-related lookups against the Google Maps API.
  """
  require Logger
  use RepoCache, ttl: :timer.hours(24)
  alias GoogleMaps.Place.{AutocompleteQuery, Prediction}

  @type t ::
          {:ok, nonempty_list(Prediction.t()) | map} | {:error, :zero_results | :internal_error}

  @banned_places [
    # Unreachable location @ Boston Logan International Airport
    "ChIJN0na1RRw44kRRFEtH8OUkww"
  ]

  @http_pool Application.compile_env!(:dotcom, :location_http_pool)

  @spec autocomplete(AutocompleteQuery.t()) :: t
  def autocomplete(%AutocompleteQuery{hit_limit: hit_limit} = query) do
    cache(query, fn query ->
      query
      |> autocomplete_url()
      |> HTTPoison.get([], hackney: [pool: @http_pool])
      |> parse_autocomplete_response(hit_limit)
    end)
  end

  @spec autocomplete_url(AutocompleteQuery.t()) :: String.t()
  defp autocomplete_url(%AutocompleteQuery{input: input, session_token: session_token}) do
    :dotcom
    |> Application.get_env(:domain, "https://maps.googleapis.com")
    |> URI.parse()
    |> URI.merge(%URI{
      path: "/maps/api/place/autocomplete/json",
      query:
        URI.encode_query(
          input: input,
          sessiontoken: session_token,
          location: "42.07295,-70.77845",
          radius: "167600",
          key: Application.get_env(:dotcom, :google_api_key)
        )
    })
    |> URI.to_string()
  end

  @spec parse_autocomplete_response(tuple, integer) :: t
  defp parse_autocomplete_response({:error, error}, _hit_limit) do
    _ = Logger.info("module=#{__MODULE__} error=request_failed response=#{inspect(error)}")
    internal_error()
  end

  defp parse_autocomplete_response(
         {:ok, %{status_code: 200, body: body, request_url: url}},
         hit_limit
       ) do
    case Poison.decode(body) do
      {:ok, json} ->
        parse_autocomplete_json(json, hit_limit, url)

      {:error, _} ->
        internal_error()
    end
  end

  defp parse_autocomplete_response(
         {:ok, %{status_code: code, body: body, request_url: url}},
         _hit_limit
       ) do
    _ =
      Logger.info(
        "module=#{__MODULE__} error=bad_response status_code=#{code} response=#{body} url=#{url}"
      )

    internal_error()
  end

  @spec parse_autocomplete_json(map, integer, String.t()) :: t
  defp parse_autocomplete_json(%{"status" => "OK", "predictions" => predictions}, hit_limit, url) do
    _ = Logger.info("module=#{__MODULE__} status_code=200 status=OK url=#{url}")

    results =
      predictions
      |> Enum.map(&Prediction.new/1)
      |> Enum.reject(&(&1.place_id in @banned_places))
      |> Enum.take(hit_limit)

    {:ok, results}
  end

  defp parse_autocomplete_json(%{"status" => "ZERO_RESULTS"}, _hit_limit, url) do
    _ = Logger.info("module=#{__MODULE__} status_code=200 status=OK url=#{url}")
    {:ok, []}
  end

  defp parse_autocomplete_json(%{"status" => status, "error_message" => error}, _hit_limit, url) do
    _ =
      Logger.info(
        "module=#{__MODULE__} error=bad_request status_code=200 status=#{status} message=#{error} url=#{url}"
      )

    internal_error()
  end

  @spec internal_error :: t
  defp internal_error, do: {:error, :internal_error}
end
