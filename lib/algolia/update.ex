defmodule Algolia.Update do
  @moduledoc """
  Task that pulls all of the latest stops and routes from the API
  Pulls the current routes and stops from algolia.
  Removes any routes or stops that are no longer in the API from Algolia
  Uploads a list of the routes and stops to Algolia to update/add
  """
  require Logger
  alias Algolia.Api

  @type t :: %{routes: success | error, stops: success | error}
  @type success :: {:ok, String.t() | nil}
  @type error :: {:error, HTTPoison.Response.t() | HTTPoison.Error.t()}

  @indexes Application.compile_env(:dotcom, :algolia_indexes, [])

  @doc """
  Updates stops and routes data on Algolia.
  """
  def update(host \\ nil) do
    Map.new(@indexes, &{&1, update_and_clean_index(&1, host)})
  end

  def update_and_clean_index(index_module, base_url) do
    new_objects =
      index_module.all()
      |> Enum.filter(&has_routes?/1)
      |> Enum.map(&to_data_object/1)

    with {:ok, _body} <- clean_index(new_objects, index_module, base_url),
         {:ok, _body} <- update_index(new_objects, index_module, base_url) do
      :ok
    end
  end

  defp clean_index(new_objects, index_module, base_url) do
    current_objs = current_objects(base_url, index_module, "")

    current_objs
    |> filter_objects(new_objects)
    |> Enum.map(&build_action_map(&1, "deleteObject"))
    |> build_request_object()
    |> send_update(base_url, index_module)
  end

  defp filter_objects(current_objects, new_objects) do
    Enum.filter(current_objects, fn current_object ->
      Enum.find_index(new_objects, fn new_object ->
        new_object.objectID == current_object.objectID
      end) == nil
    end)
  end

  defp update_index(new_objects, index_module, base_url) do
    new_objects
    |> Enum.map(&build_action_map(&1, "addObject"))
    |> build_request_object()
    |> send_update(base_url, index_module)
  end

  defp has_routes?(data) do
    data
    |> Algolia.Object.data()
    |> do_has_routes?(data)
  end

  defp do_has_routes?(%{routes: []}, %Stops.Stop{}), do: false
  defp do_has_routes?(_, _), do: true

  defp current_objects(_base_url, _index_module, nil), do: []

  defp current_objects(base_url, index_module, cursor) do
    with {:ok, body} <- get_current_objects(base_url, index_module, cursor),
         {:ok, json_body} <- Jason.decode(body) do
      Enum.concat(
        response_to_objects(json_body),
        current_objects(base_url, index_module, get_cursor(json_body))
      )
    end
  end

  defp get_current_objects(base_url, index_module, cursor) do
    opts = %Api{
      host: base_url,
      index: index_module.index_name(),
      action: "browse",
      body: "",
      query_params: %{cursor: cursor}
    }

    :get |> Api.action(opts) |> parse_response()
  end

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

  defp get_cursor(%{"cursor" => cursor}), do: cursor
  defp get_cursor(_), do: nil

  defp response_to_objects(json) do
    Enum.map(json["hits"], fn object -> %{objectID: object["objectID"]} end)
  end

  defp parse_response({:ok, %HTTPoison.Response{status_code: 200, body: body}}), do: {:ok, body}
  defp parse_response({:ok, %HTTPoison.Response{} = response}), do: {:error, response}
  defp parse_response({:error, %HTTPoison.Error{} = error}), do: {:error, error}

  defp build_request_object(data) do
    Poison.encode(%{requests: data})
  end

  def build_action_map(data, action) do
    %{
      action: action,
      body: data
    }
  end

  def to_data_object(data) do
    data
    |> Algolia.Object.data()
    |> set_rank(data)
    |> Map.merge(%{
      objectID: Algolia.Object.object_id(data),
      url: Algolia.Object.url(data)
    })
  end

  @type rank :: 1 | 2 | 3 | 4 | 5

  defp set_rank(%{routes: []} = data, %Stops.Stop{}) do
    :ok = Logger.warning("stop has no routes: #{inspect(data)}")
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

  defp do_set_rank(rank, %{} = data) when rank in 1..5 do
    Map.put(data, :rank, rank)
  end

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
