defmodule Algolia.Query do
  @moduledoc """
  Builds an encoded query to send to Algolia. Adds an "analytics" key and
  sets it to Algolia's :track_analytics? config value (defaults to false).
  When this value is set to false, Algolia will not record that query in
  its analytics, so this should only be set to true in Prod.
  """

  @spec build(map) :: String.t()
  def build(%{"requests" => queries}) do
    %{"requests" => Enum.map(queries, &build_query/1)}
    |> Poison.encode!()
  end

  @spec build_query(map) :: map
  defp build_query(%{"indexName" => index, "params" => params, "query" => query, "attributesToHighlight" => attributes}) do
    %{
      "indexName" => index,
      "query" => query,
      "params" => encode_params(params),
      # The highlight tag values are needed for compatibility with Algolia's
      # autocomplete.js library v1+
      "highlightPreTag" => "__aa-highlight__",
      "highlightPostTag" => "__/aa-highlight__",
      "attributesToHighlight" => attributes
    }
  end

  defp build_query(%{"indexName" => index, "params" => params, "query" => query}) do
    %{
      "indexName" => index,
      "query" => query,
      "params" => encode_params(params)
    }
  end

  @spec encode_params(map) :: String.t()
  def encode_params(%{} = params) do
    params
    |> Map.put("analytics", Application.get_env(:algolia, :track_analytics?, false))
    |> Enum.map(&encode_param/1)
    |> Enum.join("&")
  end

  @spec encode_param({String.t(), any}) :: String.t()
  def encode_param({key, val}) when is_list(val) do
    val
    |> Poison.encode!()
    |> URI.encode(&skip_encoding?/1)
    |> do_encode_param(key)
  end

  def encode_param({key, val}) do
    do_encode_param(val, key)
  end

  @spec do_encode_param(any, String.t()) :: String.t()
  defp do_encode_param(<<val::binary>>, key) do
    [key, "=", val]
    |> IO.iodata_to_binary()
  end

  defp do_encode_param(val, key) do
    val
    |> to_string()
    |> do_encode_param(key)
  end

  @encode_chars [?[, ?], ?:, ?,, ?", ?\s]

  @spec skip_encoding?(String.t()) :: boolean
  defp skip_encoding?(val) when val in @encode_chars, do: false
  defp skip_encoding?(_), do: true
end
