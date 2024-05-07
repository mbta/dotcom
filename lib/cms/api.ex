defmodule CMS.Api do
  @moduledoc """
  Handles fetching and caching generic JSON:API responses from the CMS API.
  """

  @behaviour CMS.Api.Behaviour

  @req Application.compile_env(:dotcom, :req_module)

  @impl CMS.Api.Behaviour
  def preview(node_id, revision_id) do
    path = ~s(/cms/revisions/#{node_id})

    case client(vid: revision_id) |> @req.get(url: path) do
      {:ok, response} -> {:ok, response.body}
      {:error, reason} -> {:error, reason}
    end
  end

  @impl CMS.Api.Behaviour
  def view(path, params) do
    params = [
      {"_format", "json"}
      | Enum.reduce(params, [], &stringify_params/2)
    ]

    case client() |> @req.get(url: path, params: params) do
      {:ok, response} -> {:ok, response.body}
      {:error, reason} -> {:error, reason}
    end
  end

  defp client(headers \\ []) do
    config = Application.get_env(:dotcom, :cms_api)

    @req.new(
      base_url: config[:base_url],
      headers: config[:headers] ++ headers
    )
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
