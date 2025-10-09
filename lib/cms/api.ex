defmodule CMS.Api do
  @moduledoc """
  Handles fetching and caching generic JSON:API responses from the CMS API.
  """

  @behaviour CMS.Api.Behaviour

  @req Application.compile_env(:dotcom, :req_module)

  @impl CMS.Api.Behaviour
  def preview(node_id, revision_id) do
    path = ~s(/cms/revisions/#{node_id})

    params = [
      {"_format", "json"},
      {"vid", revision_id}
    ]

    client(vid: revision_id)
    |> @req.get(url: path, params: params, decode_body: false, redirect: false)
    |> handle_response()
  end

  @impl CMS.Api.Behaviour
  def view(path, params) do
    params = [
      {"_format", "json"}
      | Enum.reduce(params, [], &stringify_params/2)
    ]

    client()
    |> @req.get(url: path, params: params, decode_body: false, redirect: false)
    |> handle_response()
  end

  defp handle_response({:ok, response}) do
    case response.status do
      200 -> Jason.decode(response.body)
      301 -> handle_redirect(response)
      302 -> handle_redirect(response)
      404 -> {:error, :not_found}
      _ -> {:error, :unexpected_status}
    end
  end

  defp handle_response({:error, reason}), do: {:error, reason}

  def client(headers \\ []) do
    config = Application.get_env(:dotcom, :cms_api)

    case config[:connect_options] do
      nil ->
        @req.new(
          base_url: config[:base_url],
          headers: config[:headers] ++ headers,
          finch: Dotcom.Finch
        )

      connect_options ->
        @req.new(
          base_url: config[:base_url],
          headers: config[:headers] ++ headers,
          connect_options: connect_options
        )
    end
  end

  # Drupal's Redirect module forces all location header values to be
  # absolute paths, so we need to determine if the domain qualifies
  # as internal (originally entered as a /relative/path) or external
  # (entered into Drupal with a URI scheme). Sets :opts for redirect/2.

  defp handle_redirect(%Req.Response{headers: headers, status: status}) do
    headers
    |> Enum.find(fn {key, _} -> String.downcase(key) == "location" end)
    |> do_get_redirect(status)
  end

  @spec do_get_redirect({String.t(), String.t()} | nil, integer) :: {:error, API.error()}
  defp do_get_redirect(nil, _), do: {:error, :invalid_response}

  defp do_get_redirect({_key, url}, status) do
    opts =
      url
      |> List.first()
      |> URI.parse()
      |> set_redirect_options()

    {:error, {:redirect, status, opts}}
  end

  @spec set_redirect_options(URI.t()) :: Keyword.t()
  def set_redirect_options(%URI{host: host} = uri) when is_nil(host) do
    [to: uri |> internal_uri() |> parse_redirect_query()]
  end

  def set_redirect_options(uri) do
    base_url = Application.get_env(:dotcom, :cms_api)[:base_url]

    if String.contains?(base_url, uri.host) do
      [to: uri |> internal_uri() |> parse_redirect_query()]
    else
      [external: parse_redirect_query(uri)]
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

  @format_re ~r/^_format=json&|&_format=json(&)?/
  defp update_query(query) when is_binary(query) do
    # If the redirect path happens to include query params, Drupal will add the
    # request query parameters to the redirect params, in an unspecified order
    Regex.replace(@format_re, query, "\\1", global: false)
  end

  @spec internal_uri(URI.t()) :: URI.t()
  defp internal_uri(%URI{} = uri) do
    %URI{uri | scheme: nil, authority: nil, host: nil}
  end

  @type param_key :: String.t() | atom()
  @type param_list :: [{String.t(), String.t()}]
  @type param_value :: String.t() | atom() | Keyword.t()
  @type nested_param :: {safe_key(), String.t()} | map | String.t()

  # Allow only whitelisted, known, nested params.
  # Note: when redirecting from CMS, nested params will
  # be shaped as a Map.t() with String.t() keys and values.
  @type safe_key :: :value | :min | :max | String.t()
  @safe_keys [:value, :min, :max, "latitude", "longitude", "type"]

  @spec stringify_params({param_key, param_value}, param_list) :: param_list
  def stringify_params({key, val}, acc) when is_atom(key) do
    stringify_params({Atom.to_string(key), val}, acc)
  end

  def stringify_params({key, val}, acc) when is_atom(val) do
    stringify_params({key, Atom.to_string(val)}, acc)
  end

  def stringify_params({key, val}, acc) when is_integer(val) do
    stringify_params({key, Integer.to_string(val)}, acc)
  end

  def stringify_params({key, val}, acc) when is_binary(key) and is_binary(val) do
    [{key, val} | acc]
  end

  def stringify_params({key, val}, acc) when is_binary(key) and (is_map(val) or is_list(val)) do
    val
    # drop original param, add new key/vals for nested params
    |> Enum.reduce(acc, fn nested_param, acc -> list_to_params(key, acc, nested_param) end)
    # restore original order of nested params
    |> Enum.reverse()
  end

  def stringify_params(_, acc) do
    # drop invalid param
    acc
  end

  # Convert nested key values to their own keys, if whitelisted
  @spec list_to_params(String.t(), param_list, nested_param) :: param_list
  defp list_to_params(key, acc, {sub_key, sub_val}) when sub_key in @safe_keys do
    stringify_params({key <> "[#{sub_key}]", sub_val}, acc)
  end

  # Drupal's View system expects a key[]=value format for multiple values
  defp list_to_params(key, acc, value) when key in @safe_keys do
    stringify_params({key <> "[]", value}, acc)
  end

  # Drop entire param (key[subkey]=val) completely
  defp list_to_params(_, acc, _) do
    acc
  end
end
