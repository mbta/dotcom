defmodule DotcomWeb.SearchController do
  @moduledoc """
  Supports a combined list of many search types.
  """
  use DotcomWeb, :controller

  import Dotcom.ResponsivePagination, only: [build: 1]
  import DotcomWeb.Router.Helpers, only: [search_path: 2]

  alias CMS.Search.{Facets, Result}
  alias Plug.Conn

  plug(:breadcrumbs)

  @search_service Application.compile_env!(:dotcom, :search_service)

  @spec index(Conn.t(), Keyword.t()) :: Conn.t()
  def index(
        conn,
        %{"search" => %{"query" => query} = search_input}
      )
      when query != "" do
    offset = offset(search_input)
    content_types = content_types(search_input)

    case Facets.facet_responses(query, offset, content_types) do
      :error ->
        render_error(conn)

      {response, facet_response} ->
        conn
        |> assign(:query, query)
        |> assign_facets(facet_response, content_types)
        |> assign(:results, response.results)
        |> render_index(offset, response.count, search_input)
    end
  end

  def index(conn, _params) do
    conn
    |> assign(:empty_query, true)
    |> render("index.html")
  end

  @spec query(Conn.t(), map) :: Conn.t()
  def query(%Conn{} = conn, %{
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

  @spec render_error(Conn.t()) :: Conn.t()
  defp render_error(conn) do
    conn
    |> assign(:show_error, true)
    |> render("index.html")
  end

  @per_page 10

  @spec render_index(Conn.t(), integer, integer, map) :: Conn.t()
  defp render_index(%Conn{assigns: %{results: []}} = conn, _, _, _),
    do: render(conn, "index.html")

  defp render_index(conn, offset, count, search_input) do
    conn
    |> stats(offset, count)
    |> link_context(search_input)
    |> pagination()
    |> render("index.html")
  end

  @spec breadcrumbs(Conn.t(), Keyword.t()) :: Conn.t()
  defp breadcrumbs(conn, _) do
    assign(conn, :breadcrumbs, [Breadcrumb.build(~t"Search")])
  end

  @spec link_context(Conn.t(), map) :: Conn.t()
  defp link_context(conn, search_input) do
    search_params = search_params(search_input)
    link_context = %{path: search_path(conn, :index), form: "search", params: search_params}
    assign(conn, :link_context, link_context)
  end

  @spec pagination(Conn.t()) :: Conn.t()
  defp pagination(%Conn{assigns: %{stats: stats}} = conn) do
    pagination = build(stats)
    assign(conn, :pagination, pagination)
  end

  @spec assign_facets(Conn.t(), Result.t(), [String.t()]) ::
          Conn.t()
  def assign_facets(conn, %Result{content_types: response_types}, content_types) do
    assign(conn, :facets, Facets.build("content_type", response_types, content_types))
  end

  @spec stats(Conn.t(), integer, integer) :: Conn.t()
  defp stats(conn, offset, count) do
    stats = %{
      total: count,
      per_page: @per_page,
      offset: offset,
      showing_from: offset * @per_page + 1,
      showing_to: min(offset * @per_page + @per_page, count)
    }

    assign(conn, :stats, stats)
  end

  @spec search_params(map) :: map
  defp search_params(search_input) do
    %{
      "[query]" => Map.get(search_input, "query", ""),
      "[offset]" => Map.get(search_input, "offset", "0")
    }
    |> Map.merge(convert_filter_to_param(search_input, "content_type"))
    |> Map.merge(convert_filter_to_param(search_input, "year"))
  end

  @spec offset(map) :: integer
  defp offset(search_input) do
    input = Map.get(search_input, "offset", "0")

    case Integer.parse(input) do
      :error -> 0
      {search_offset, _} -> search_offset
    end
  end

  @spec content_types(map) :: [String.t()]
  defp content_types(search_input) do
    search_input
    |> Map.get("content_type", %{})
    |> Map.keys()
  end

  @spec convert_filter_to_param(map, String.t()) :: map
  defp convert_filter_to_param(search_input, field) do
    search_input
    |> Map.get(field, %{})
    |> Enum.reduce(%{}, fn {key, _value}, output ->
      Map.put(output, "[#{field}][#{key}]", "true")
    end)
  end
end
