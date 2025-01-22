defmodule Algolia.Query do
  @moduledoc """
  Builds an encoded query to send to Algolia. Adds an "analytics" key and
  sets it to Algolia's :track_analytics? config value (defaults to false).
  When this value is set to false, Algolia will not record that query in
  its analytics, so this should only be set to true in Prod.
  """
  alias Algolia.Query.Request

  @doc "Algolia indexes available to query"
  def valid_indexes do
    suffix = Application.get_env(:dotcom, :algolia_index_suffix, "")
    Enum.map(["routes", "stops", "drupal"], &{String.to_atom(&1), &1 <> suffix})
  end

  @spec build(map) :: String.t()
  def build(%{"requests" => queries}) do
    Poison.encode!(%{"requests" => Enum.map(queries, &build_query/1)})
  end

  def build(%{"algoliaQuery" => query, "algoliaIndexesWithParams" => indexes_with_params}) do
    requests =
      indexes_with_params
      |> Map.to_list()
      |> Enum.reverse()
      |> Enum.map(fn {index_name, index_params} ->
        index_name
        |> Request.new(query, index_params)
        |> Request.encode()
      end)

    Jason.encode!(%{"requests" => requests})
  end

  @spec build_query(map) :: map
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
    |> Map.put("analytics", Application.get_env(:dotcom, :algolia_track_analytics?, false))
    |> Enum.map_join("&", &encode_param/1)
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
    IO.iodata_to_binary([key, "=", val])
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
