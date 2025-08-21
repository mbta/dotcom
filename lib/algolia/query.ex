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
    ["routes", "stops", "drupal"] |> Enum.map(&{String.to_atom(&1), &1 <> suffix})
  end

  def build(%{"requests" => queries}) do
    %{"requests" => Enum.map(queries, &build_query/1)}
    |> Poison.encode!()
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

    %{"requests" => requests}
    |> Jason.encode!()
  end

  defp build_query(%{"indexName" => index, "params" => params, "query" => query}) do
    %{
      "indexName" => index,
      "query" => query,
      "params" => encode_params(params)
    }
  end

  def encode_params(%{} = params) do
    params
    |> Map.put("analytics", Application.get_env(:dotcom, :algolia_track_analytics?, false))
    |> Enum.map_join("&", &encode_param/1)
  end

  def encode_param({key, val}) when is_list(val) do
    val
    |> Poison.encode!()
    |> URI.encode(&skip_encoding?/1)
    |> do_encode_param(key)
  end

  def encode_param({key, val}) do
    do_encode_param(val, key)
  end

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

  defp skip_encoding?(val) when val in @encode_chars, do: false
  defp skip_encoding?(_), do: true
end
