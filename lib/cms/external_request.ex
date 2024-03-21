defmodule CMS.ExternalRequest do
  @moduledoc """
  Exposes the function that is used by all requests to simplify testing. This
  function is not intended for direct use. Please see CMS.HTTPClient to
  issue a request.
  """
  require Logger

  import CMS.API.TimeRequest, only: [time_request: 5]

  alias CMS.{API, Config}

  @spec process(atom, String.t(), String.t(), Keyword.t()) :: API.response()
  def process(method, path, body \\ "", opts \\ []) do
    request_path = full_url(path)
    request_headers = build_headers(method)

    response = time_request(method, request_path, body, request_headers, opts)
    handle_response(response, parse_headers(response), request_path)
  end

  @spec handle_response(
          {:ok, HTTPoison.Response.t()} | {:error, HTTPoison.Error.t()},
          map(),
          String.t()
        ) :: CMS.API.response()
  defp handle_response(
         {:ok, %HTTPoison.Response{} = response},
         %{"content-type" => "application/json"},
         path
       ) do
    case response do
      %{status_code: code, body: body} when code in [200, 201] ->
        decode_body(body)

      %{status_code: code} when code in [301, 302] ->
        get_redirect(response)

      %{status_code: code} when code in [400, 401, 403, 404, 406] ->
        # drive handled errors to the 404 page
        {:error, :not_found}

      error ->
        _ = log_bad_response(error, path)
        # unusual/unhandled status codes (will throw 500)
        {:error, :invalid_response}
    end
  end

  defp handle_response({:ok, %HTTPoison.Response{}}, _header_map, _path) do
    # a response that isn't returned in JSON format
    {:error, :not_found}
  end

  defp handle_response({:error, %HTTPoison.Error{reason: :timeout}}, _header_map, path) do
    _ =
      [
        "module=#{inspect(__MODULE__)}",
        "path=#{path}",
        "CMS request timed out"
      ]
      |> Enum.join(" ")
      |> Logger.warning()

    {:error, :timeout}
  end

  defp handle_response({:error, %HTTPoison.Error{} = error}, _header_map, path) do
    _ = log_bad_response(error, path)
    {:error, :invalid_response}
  end

  defp log_bad_response(error, path) do
    [
      "module=#{inspect(__MODULE__)}",
      "path=#{path}",
      "Bad response response received from CMS: #{inspect(error)}"
    ]
    |> Enum.join(" ")
    |> Logger.warning()
  end

  @spec decode_body(String.t()) :: API.response()
  defp decode_body(body) do
    case Poison.decode(body) do
      {:ok, decoded} ->
        {:ok, decoded}

      {:error, error} ->
        _ =
          [
            "module=#{inspect(__MODULE__)}",
            "Error parsing json received from CMS:",
            "#{inspect(error)}"
          ]
          |> Enum.join(" ")
          |> Logger.warning()

        # a malformed JSON response
        {:error, :invalid_response}
    end
  end

  @spec get_redirect(HTTPoison.Response.t()) :: {:error, API.error()}
  defp get_redirect(%HTTPoison.Response{headers: headers, status_code: status}) do
    headers
    |> Enum.find(fn {key, _} -> String.downcase(key) == "location" end)
    |> do_get_redirect(status)
  end

  @spec do_get_redirect({String.t(), String.t()} | nil, integer) :: {:error, API.error()}
  defp do_get_redirect(nil, _), do: {:error, :invalid_response}

  defp do_get_redirect({_key, url}, status_code) do
    opts = set_redirect_options(URI.parse(url))
    {:error, {:redirect, status_code, opts}}
  end

  # Drupal's Redirect module forces all location header values to be
  # absolute paths, so we need to determine if the domain qualifies
  # as internal (originally entered as a /relative/path) or external
  # (entered into Drupal with a URI scheme). Sets :opts for redirect/2.

  @spec set_redirect_options(URI.t()) :: Keyword.t()
  defp set_redirect_options(%URI{host: host} = uri) when is_nil(host) do
    [to: uri |> internal_uri() |> parse_redirect_query()]
  end

  defp set_redirect_options(%URI{host: host} = uri) do
    case String.contains?(Config.root(), host) do
      true -> [to: uri |> internal_uri() |> parse_redirect_query()]
      false -> [external: parse_redirect_query(uri)]
    end
  end

  @spec parse_redirect_query(URI.t()) :: String.t()
  defp parse_redirect_query(%URI{} = uri) do
    uri
    |> Map.update!(:query, &update_query/1)
    |> URI.to_string()
  end

  @spec update_query(String.t() | nil) :: String.t()
  defp update_query(query) when query in ["_format=json", nil] do
    nil
  end

  defp update_query(query) do
    # If the redirect path happens to include query params,
    # Drupal will append the request query parameters to the redirect params.

    query
    |> URI.decode_query()
    |> Map.delete("_format")
    |> URI.encode_query()
  end

  @spec internal_uri(URI.t()) :: URI.t()
  defp internal_uri(%URI{} = uri) do
    %URI{uri | scheme: nil, authority: nil, host: nil}
  end

  defp full_url(path) do
    Config.url(path)
  end

  @spec parse_headers({:ok, HTTPoison.Response.t()} | {:error, HTTPoison.Error.t()}) :: map()
  defp parse_headers({:ok, %HTTPoison.Response{headers: header_list}}) do
    Map.new(header_list, fn {key, value} -> {String.downcase(key), value} end)
  end

  defp parse_headers({:error, %HTTPoison.Error{}}) do
    %{}
  end

  defp build_headers(:get), do: headers()
  defp build_headers(_), do: auth_headers()

  defp headers do
    ["Content-Type": "application/json"]
  end

  defp auth_headers do
    Keyword.merge(headers(), Authorization: "Basic #{encoded_auth_credentials()}")
  end

  defp encoded_auth_credentials, do: Base.encode64("#{username()}:#{password()}")

  defp username, do: System.get_env("DRUPAL_USERNAME")

  defp password, do: System.get_env("DRUPAL_PASSWORD")
end
