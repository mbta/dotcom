defmodule UrlHelpers do
  alias CMS.Field.Link
  alias CMS.Page.NewsEntry
  alias DotcomWeb.CmsRouterHelpers
  alias Plug.Conn.Query

  def update_url(conn, query) do
    conn.query_params
    |> update_query(query)
    |> do_update_url(conn)
  end

  defp do_update_url(updated, conn) when updated == %{} do
    conn.request_path
  end

  defp do_update_url(updated, conn) do
    "#{conn.request_path}?#{Query.encode(updated)}"
  end

  @doc """
  Updates a query parameter map with new values.

  If `nil` is passed as a value, that key is removed from the output.
  """
  def update_query(%{} = old_params, new_params) do
    new_params = ensure_string_keys(new_params)

    old_params
    |> Map.merge(new_params, &update_query_merge/3)
    |> Enum.reject(&empty_value?/1)
    |> Map.new()
  end

  defp ensure_string_keys(map) do
    for {key, value} <- map, into: %{} do
      {Kernel.to_string(key), value}
    end
  end

  defp update_query_merge(_key, old_value, new_value)
       when is_map(old_value) and is_map(new_value) do
    new_value = ensure_string_keys(new_value)
    Map.merge(old_value, new_value, &update_query_merge/3)
  end

  defp update_query_merge(_key, _old_value, new_value) do
    new_value
  end

  defp empty_value?({_, nil}), do: true
  defp empty_value?({_, _}), do: false

  def build_utm_url(%NewsEntry{} = item, opts) do
    nil
    |> CmsRouterHelpers.news_entry_path(:show, item)
    |> do_build_utm_url(item, opts)
  end

  def build_utm_url(%{link: %Link{}} = item, opts) do
    do_build_utm_url(item.link.url, item, opts)
  end

  def build_utm_url(%{path: path} = item, opts) do
    do_build_utm_url(path, item, opts)
  end

  defp do_build_utm_url(url, item, opts) do
    url
    |> URI.parse()
    |> Map.put(:query, build_utm_params(item, opts))
    |> URI.to_string()
  end

  defp build_utm_params(item, opts) when is_list(opts) do
    URI.encode_query(%{
      utm_medium: Keyword.fetch!(opts, :type),
      utm_source: Keyword.fetch!(opts, :source),
      utm_term: Keyword.get(opts, :term, "null"),
      utm_campaign: Keyword.get(opts, :campaign, "curated-content"),
      utm_content: utm_content(item)
    })
  end

  defp utm_content(%{title: title}) do
    title
  end

  defp utm_content(%{id: id}) do
    id
  end
end
