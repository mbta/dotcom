defmodule Algolia.Update do
  require Logger
  alias Algolia.Api

  @type t :: %{routes: success | error, stops: success | error}
  @type success :: :ok
  @type error :: {:error, HTTPoison.Response.t() | HTTPoison.Error.t()}

  @indexes Application.get_env(:algolia, :indexes, [])

  @doc """
  Updates stops and routes data on Algolia.
  """
  @spec update(String.t() | nil) :: t
  def update(host \\ nil) do
    Map.new(@indexes, &{&1, update_index(&1, host)})
  end

  @spec update_index(atom, String.t()) :: success | error
  def update_index(index_module, base_url) do
    index_module.all()
    |> Enum.filter(&has_routes?/1)
    |> Enum.map(&build_data_object/1)
    |> build_request_object()
    |> send_delete_and_update(base_url, index_module)
  end

  @spec has_routes?(map) :: boolean
  defp has_routes?(data) do
    data
    |> Algolia.Object.data()
    |> do_has_routes?(data)
  end

  defp send_delete_and_update(update_object, base_url, index_module) do
    with :ok <- clear_index(update_object, base_url, index_module) do
      send_update(update_object, base_url, index_module)
    end
  end

  @spec do_has_routes?(map, Stops.Stop.t() | Routes.Route.t() | map) :: boolean
  defp do_has_routes?(%{routes: []}, %Stops.Stop{}), do: false
  defp do_has_routes?(_, _), do: true

  @spec send_update(
          {:ok, Poison.Parser.t()} | {:error, :invalid} | {:error, {:invalid, String.t()}},
          String.t(),
          atom
        ) :: success | error
  defp send_update({:ok, request}, base_url, index_module) do
    opts = %Api{
      host: base_url,
      index: index_module.index_name(),
      action: "batch",
      body: request
    }

    :post |> Api.action(opts) |> parse_response()
  end

  defp send_update({:error, error}, _, _) do
    {:error, {:json_error, error}}
  end

  defp clear_index({:error, error}, _, _) do
    {:error, {:json_error, error}}
  end

  defp clear_index(_obj, base_url, index_module) do
    opts = %Api{
      host: base_url,
      index: index_module.index_name(),
      action: "clear",
      body: ""
    }

    :post |> Api.action(opts) |> parse_response()
  end

  @spec parse_response({:ok, HTTPoison.Response.t()} | {:error, HTTPoison.Error.t()}) ::
          success | error
  defp parse_response({:ok, %HTTPoison.Response{status_code: 200}}), do: :ok
  defp parse_response({:ok, %HTTPoison.Response{} = response}), do: {:error, response}
  defp parse_response({:error, %HTTPoison.Error{} = error}), do: {:error, error}

  defp build_request_object(data) do
    Poison.encode(%{requests: data})
  end

  @spec build_data_object(Algolia.Object.t()) :: map
  def build_data_object(data) do
    %{
      action: "addObject",
      body: do_build_data_object(data)
    }
  end

  @spec do_build_data_object(Algolia.Object.t()) :: map
  defp do_build_data_object(data) do
    data
    |> Algolia.Object.data()
    |> set_rank(data)
    |> Map.merge(%{
      objectID: Algolia.Object.object_id(data),
      url: Algolia.Object.url(data)
    })
  end

  @type rank :: 1 | 2 | 3 | 4 | 5

  @spec set_rank(map, Stops.Stop.t() | Routes.Route.t() | map) :: map
  defp set_rank(%{routes: []} = data, %Stops.Stop{}) do
    :ok = Logger.warn("stop has no routes: #{inspect(data)}")
    do_set_rank(4, data)
  end

  defp set_rank(%{routes: routes} = data, %Stops.Stop{}) do
    routes
    |> Enum.map(fn %Algolia.Stop.Route{type: type} -> rank_route_by_type(type) end)
    |> Enum.sort()
    |> List.first()
    |> do_set_rank(data)
  end

  defp set_rank(%{} = data, %Routes.Route{} = route) do
    route
    |> rank_route_by_type()
    |> do_set_rank(data)
  end

  defp set_rank(data, _) do
    do_set_rank(1, data)
  end

  @spec do_set_rank(rank, map) :: map
  defp do_set_rank(rank, %{} = data) when rank in 1..5 do
    Map.put(data, :rank, rank)
  end

  @spec rank_route_by_type(Routes.Route.t() | Routes.Route.type_int()) :: rank
  defp rank_route_by_type(%Routes.Route{} = route) do
    if Routes.Route.silver_line?(route) do
      1
    else
      rank_route_by_type(route.type)
    end
  end

  defp rank_route_by_type(0), do: 2
  defp rank_route_by_type(1), do: 2
  defp rank_route_by_type(2), do: 3
  defp rank_route_by_type(4), do: 4
  defp rank_route_by_type(3), do: 5
end
