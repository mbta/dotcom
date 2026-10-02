defmodule JsonApi.Item do
  defstruct [:type, :id, :attributes, :relationships]

  @type t :: %JsonApi.Item{
          type: String.t(),
          id: String.t(),
          attributes: %{String.t() => any},
          relationships: %{String.t() => list(JsonApi.Item.t())}
        }
end

defmodule JsonApi.Error do
  defexception [:code, :source, :detail, :meta]

  @type t :: %__MODULE__{
          code: String.t() | nil,
          source: String.t() | nil,
          detail: String.t() | nil,
          meta: %{String.t() => any}
        }

  def message(%__MODULE__{detail: detail}), do: detail
end

defmodule JsonApi do
  defstruct links: %{}, data: []
  @type t :: %JsonApi{links: %{String.t() => String.t()}, data: list(JsonApi.Item.t())}

  @spec empty() :: JsonApi.t()
  def empty do
    %JsonApi{links: %{}, data: []}
  end

  @spec merge(JsonApi.t(), JsonApi.t()) :: JsonApi.t()
  def merge(j1, j2) do
    %JsonApi{
      links: Map.merge(j1.links, j2.links),
      data: j1.data ++ j2.data
    }
  end

  @spec parse(String.t() | map()) :: {:error, any()} | JsonApi.t()
  def parse(body) when is_binary(body) do
    case Jason.decode(body) do
      {:ok, parsed} -> parse(parsed)
      {:error, error} -> {:error, error}
    end
  end

  def parse(body) do
    case parse_data(body) do
      {:ok, data} ->
        %JsonApi{
          links: parse_links(body),
          data: data
        }

      {:error, [_ | _] = errors} ->
        {:error, parse_errors(errors)}

      error ->
        error
    end
  end

  @spec parse_links(term()) :: %{String.t() => String.t()}
  defp parse_links(%{"links" => links}) do
    links
    |> Enum.filter(fn {key, value} -> is_binary(key) && is_binary(value) end)
    |> Enum.into(%{})
  end

  defp parse_links(_) do
    %{}
  end

  @spec parse_data(term()) :: {:ok, [JsonApi.Item.t()]} | {:error, any}
  defp parse_data(%{"data" => data} = parsed) when is_list(data) do
    included = parse_included(parsed)
    # cache is a mutable-ish accumulator: {type, id} => %JsonApi.Item{}
    {items, _cache} =
      Enum.map_reduce(data, %{}, fn item, cache ->
        parse_data_item(item, included, cache, MapSet.new())
      end)

    {:ok, items}
  end

  defp parse_data(%{"data" => data} = parsed) do
    included = parse_included(parsed)
    {item, _cache} = parse_data_item(data, included, %{}, MapSet.new())
    {:ok, [item]}
  end

  defp parse_data(%{"errors" => errors}) do
    {:error, errors}
  end

  defp parse_data(data) when is_list(data) do
    # MBTA.Api.Stream receives :reset data as a list of items
    parse_data(%{"data" => data})
  end

  defp parse_data(%{"id" => _} = data) do
    # MBTA.Api.Stream receives :add, :update, and :remove data as single items
    parse_data(%{"data" => data})
  end

  defp parse_data(%{}) do
    {:error, :invalid}
  end

  # parse_data_item/2 kept as a public, cache-free convenience wrapper for
  # anywhere else in the codebase that calls it directly (e.g. tests).
  @spec parse_data_item(map(), map()) :: JsonApi.Item.t()
  def parse_data_item(item, included) do
    {parsed, _cache} = parse_data_item(item, included, %{}, MapSet.new())
    parsed
  end

  # The real implementation. `cache` maps {type, id} => already-built Item,
  # so a resource referenced from multiple places in the graph is only ever
  # parsed once. `visiting` is the set of {type, id} pairs currently being
  # expanded on the *current path* - if we hit one of those again, it means
  # the included graph is cyclic (e.g. stop <-> transfer <-> stop), and we
  # stop descending instead of recursing forever.
  @spec parse_data_item(map(), map(), map(), MapSet.t()) :: {JsonApi.Item.t(), map()}
  defp parse_data_item(
         %{"type" => type, "id" => id, "attributes" => attributes} = item,
         included,
         cache,
         visiting
       ) do
    key = {type, id}

    cond do
      Map.has_key?(cache, key) ->
        {Map.fetch!(cache, key), cache}

      MapSet.member?(visiting, key) ->
        # Cycle detected: return a stub without relationships rather than
        # recursing further. This breaks the loop; the caller already has
        # (or will have) the fully-expanded version in the cache once its
        # own parse completes.
        stub = %JsonApi.Item{
          type: type,
          id: id,
          attributes: attributes,
          relationships: %{}
        }

        {stub, cache}

      true ->
        visiting = MapSet.put(visiting, key)

        {relationships, cache} =
          load_relationships(item["relationships"], included, cache, visiting)

        parsed = %JsonApi.Item{
          type: type,
          id: id,
          attributes: attributes,
          relationships: relationships
        }

        {parsed, Map.put(cache, key, parsed)}
    end
  end

  # Bare resource identifier: no "attributes" key, so this is a
  # relationship-linkage object rather than a fully-loaded resource.
  # attributes/relationships are left at their struct defaults (nil/nil).
  defp parse_data_item(%{"type" => type, "id" => id}, _included, cache, _visiting) do
    item = %JsonApi.Item{type: type, id: id}
    {item, Map.put(cache, {type, id}, item)}
  end

  defp load_relationships(nil, _included, cache, _visiting) do
    {%{}, cache}
  end

  defp load_relationships(%{} = relationships, included, cache, visiting) do
    Enum.map_reduce(relationships, cache, fn {name, relationship}, cache ->
      {items, cache} = load_single_relationship(relationship, included, cache, visiting)
      {{name, items}, cache}
    end)
    |> then(fn {pairs, cache} -> {Map.new(pairs), cache} end)
  end

  defp load_single_relationship(relationship, _included, cache, _visiting)
       when relationship == %{} do
    {[], cache}
  end

  defp load_single_relationship(%{"data" => data}, included, cache, visiting)
       when is_list(data) do
    {items, cache} =
      data
      |> Enum.map(&match_included(&1, included))
      |> Enum.reject(&is_nil/1)
      |> Enum.map_reduce(cache, fn item, cache ->
        parse_data_item(item, included, cache, visiting)
      end)

    {items, cache}
  end

  defp load_single_relationship(%{"data" => %{} = data}, included, cache, visiting) do
    case match_included(data, included) do
      nil ->
        {[], cache}

      item ->
        {parsed, cache} = parse_data_item(item, included, cache, visiting)
        {[parsed], cache}
    end
  end

  defp load_single_relationship(_, _included, cache, _visiting) do
    {[], cache}
  end

  defp match_included(nil, _) do
    nil
  end

  defp match_included(%{"type" => type, "id" => id} = item, included) do
    Map.get(included, {type, id}, item)
  end

  defp parse_included(params) do
    included = Map.get(params, "included", [])

    data =
      case Map.get(params, "data") do
        nil -> []
        list when is_list(list) -> list
        item -> [item]
      end

    data = Enum.map(data, fn item -> Map.delete(item, "relationships") end)

    included
    |> Enum.concat(data)
    |> Map.new(fn %{"type" => type, "id" => id} = item ->
      {{type, id}, item}
    end)
  end

  defp parse_errors(errors) do
    Enum.map(errors, &parse_error/1)
  end

  defp parse_error(error) do
    %JsonApi.Error{
      code: error["code"],
      detail: error["detail"],
      source: error["source"],
      meta: error["meta"] || %{}
    }
  end
end
