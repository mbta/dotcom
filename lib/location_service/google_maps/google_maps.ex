defmodule GoogleMaps do
  @moduledoc """

  Helper functions for working with the Google Maps API.

  """
  alias Util.Position
  alias GoogleMaps.MapData

  @host "https://maps.googleapis.com"
  @host_uri URI.parse(@host)
  @web "https://maps.google.com"
  @web_uri URI.parse(@web)

  @doc """
  Given a path, returns a full URL with a signature.

  Options:
  * client_id: client to use for the request
  * google_api_key: if no client ID is specified, a key to use
  * signing_key: the private key used to sign the path.

  If no options are passed, they'll be looked up out of the GoogleMaps
  configuration in config.exs
  """
  @spec signed_url(binary, Keyword.t()) :: binary
  def signed_url(path, opts \\ []) do
    opts =
      default_options()
      |> Keyword.merge(opts)

    path
    |> URI.parse()
    |> do_signed_url(opts[:client_id], opts[:signing_key], opts)
  end

  @doc """
  For URLs which don't require a signature (JS libraries), this function
  returns the URL but without the signature.
  """
  @spec unsigned_url(binary, Keyword.t()) :: binary
  def unsigned_url(path, opts \\ []) do
    opts = Keyword.merge(default_options(), opts)
    parsed = URI.parse(path)

    parsed =
      case opts[:client_id] do
        "" ->
          append_api_key(parsed, opts[:google_api_key])

        nil ->
          append_api_key(parsed, opts[:google_api_key])

        client_id ->
          append_query(parsed, :client, client_id)
      end

    prepend_host(parsed)
  end

  @doc """
  Returns the url to view directions to a location on https://maps.google.com.
  """
  @spec direction_map_url(Position.t(), Position.t()) :: String.t()
  def direction_map_url(origin, destination) do
    origin_lat = Position.latitude(origin)
    origin_lng = Position.longitude(origin)
    dest_lat = Position.latitude(destination)
    dest_lng = Position.longitude(destination)

    path =
      Path.join([
        "/",
        "maps",
        "dir",
        URI.encode("#{origin_lat},#{origin_lng}"),
        URI.encode("#{dest_lat},#{dest_lng}")
      ])

    URI.to_string(%{@web_uri | path: path})
  end

  defp default_options do
    [
      client_id: get_env(:google_client_id),
      google_api_key: get_env(:google_api_key),
      signing_key: get_env(:google_signing_key)
    ]
  end

  @doc "Given a GoogleMaps.MapData struct, returns a URL to a static map image."
  @spec static_map_url(MapData.t()) :: String.t()
  def static_map_url(map_data) do
    map_data
    |> MapData.static_query()
    |> URI.encode_query()
    |> (fn query -> "/maps/api/staticmap?#{query}" end).()
    |> signed_url
  end

  defp get_env(key) do
    Application.get_env(:site, LocationService)[key]
  end

  defp do_signed_url(uri, "", _, opts) do
    uri
    |> append_api_key(opts[:google_api_key])
    |> prepend_host
  end

  defp do_signed_url(uri, _, "", opts) do
    uri
    |> append_api_key(opts[:google_api_key])
    |> prepend_host
  end

  defp do_signed_url(uri, client_id, signing_key, _) do
    uri
    |> append_query(:client, client_id)
    |> append_signature(signing_key)
    |> prepend_host
  end

  defp append_query(%URI{query: nil} = uri, key, value) do
    %{uri | query: "#{key}=#{value}"}
  end

  defp append_query(%URI{query: query} = uri, key, value) when is_binary(query) do
    %{uri | query: "#{query}&#{key}=#{value}"}
  end

  @spec prepend_host(URI.t()) :: binary
  defp prepend_host(uri) do
    host = get_env(:domain) || @host_uri

    host
    |> URI.merge(uri)
    |> URI.to_string()
  end

  defp append_api_key(uri, key) do
    # Fallback to the existing API key for now. -ps
    uri
    |> append_query(:key, key)
  end

  defp append_signature(uri, signing_key) do
    uri
    |> append_query(:signature, signature(uri, signing_key))
  end

  defp signature(uri, key) do
    de64ed_key = Base.url_decode64!(key)

    uri_string = uri |> URI.to_string()

    binary_hash = :crypto.mac(:hmac, :sha, de64ed_key, uri_string)

    Base.url_encode64(binary_hash)
  end

  def scale(list_of_width_height_pairs) do
    list_of_width_height_pairs
    |> Enum.flat_map(fn {width, height} ->
      [
        {width, height, 1},
        {width, height, 2}
      ]
    end)
    |> Enum.sort_by(fn {width, _, scale} -> width * scale end)
  end
end
