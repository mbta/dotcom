defmodule CMS.API.HTTPClient do
  @moduledoc """

  Performs composition of external requests to CMS API.

  """

  alias CMS.ExternalRequest

  @behaviour CMS.API

  @impl true
  def preview(node_id, revision_id) do
    path = ~s(/cms/revisions/#{node_id})

    ExternalRequest.process(
      :get,
      path,
      "",
      params: [_format: "json", vid: revision_id],
      # More time needed to lookup revision (CMS filters through ~50 revisions)
      timeout: 10_000,
      recv_timeout: 10_000
    )
  end

  @impl true
  def view(path, params) do
    params = [
      {"_format", "json"}
      | Enum.reduce(params, [], &stringify_params/2)
    ]

    ExternalRequest.process(:get, path, "", params: params)
  end

  @type param_key :: String.t() | atom()
  @type param_value :: String.t() | atom() | Keyword.t()
  @type param_list :: [{String.t(), String.t()}]
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
