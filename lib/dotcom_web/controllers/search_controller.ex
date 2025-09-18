defmodule DotcomWeb.SearchController do
  @moduledoc """
  Supports a combined list of many search types.
  """
  use DotcomWeb, :controller

  @search_service Application.compile_env!(:dotcom, :search_service)

  @spec query(Plug.Conn.t(), map) :: Plug.Conn.t()
  def query(%Plug.Conn{} = conn, %{
        "algoliaIndexesWithParams" => indexes_with_params,
        "algoliaQuery" => query
      }) do
    results =
      indexes_with_params
      |> Enum.map(&opts_from_params/1)
      |> Task.async_stream(&@search_service.query(query, &1))
      |> Enum.flat_map(fn
        {:ok, {:ok, hits}} when is_list(hits) ->
          hits

        _ ->
          []
      end)

    json(conn, %{results: results})
  end

  def query(conn, _) do
    json(conn, %{error: :bad_response})
  end

  defp opts_from_params(index_with_params) do
    [{index, opts}] = Map.to_list(index_with_params)

    Enum.map(opts, fn {k, v} ->
      {String.to_atom(k), v}
    end)
    |> Keyword.new()
    |> Keyword.put(:category, index)
  end
end
