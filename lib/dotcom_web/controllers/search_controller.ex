defmodule DotcomWeb.SearchController do
  @moduledoc false
  use DotcomWeb, :controller

  require Logger

  alias Alerts.{Alert, Repo}
  alias Algolia.{Api, Query}
  alias Plug.Conn

  @typep id_map :: %{
           required(:stop) => MapSet.t(String.t()),
           required(:route) => MapSet.t(String.t())
         }

  @spec query(Conn.t(), map) :: Conn.t()
  def query(%Conn{} = conn, params) do
    api = %Api{
      host: conn.assigns[:algolia_host],
      index: "*",
      action: "queries",
      body: Query.build(params)
    }

    Api.action(:post, api) |> do_query(conn)
  end

  defp do_query({:ok, %HTTPoison.Response{status_code: 200, body: body}}, conn) do
    {:ok, json} = Poison.decode(body)
    json(conn, json)
  end

  defp do_query({:error, :bad_config}, conn) do
    json(conn, %{error: "bad_config"})
  end

  defp do_query(response, conn) do
    _ = log_error(response)
    json(conn, %{error: "bad_response"})
  end

  def log_error({:ok, %HTTPoison.Response{} = response}) do
    do_log_error(response.body)
  end

  def log_error({:error, %HTTPoison.Error{} = response}) do
    do_log_error(response.reason)
  end

  def log_error(_) do
    :ok
  end

  defp do_log_error(error) do
    Logger.warning("Received bad response from Algolia: #{inspect(error)}")
  end

  @spec get_alert_ids(DateTime.t(), (DateTime.t() -> [Alert.t()])) :: id_map
  def get_alert_ids(%DateTime{} = dt, alerts_repo_fn \\ &Repo.all/1) do
    dt
    |> alerts_repo_fn.()
    |> Enum.reject(&(&1.priority == :low))
    |> Enum.reduce(%{stop: MapSet.new(), route: MapSet.new()}, &get_entity_ids/2)
  end

  @spec get_entity_ids(Alert.t(), id_map) :: id_map
  defp get_entity_ids(alert, acc) do
    acc
    |> do_get_entity_ids(alert, :stop)
    |> do_get_entity_ids(alert, :route)
  end

  @spec do_get_entity_ids(id_map, Alert.t(), :stop | :route) :: id_map
  defp do_get_entity_ids(acc, %Alert{} = alert, key) do
    alert
    |> Alert.get_entity(key)
    |> Enum.reduce(acc, &add_id_to_set(&2, key, &1))
  end

  @spec add_id_to_set(id_map, :stop | :route, String.t() | nil) :: id_map
  defp add_id_to_set(acc, _set_name, nil) do
    acc
  end

  defp add_id_to_set(acc, set_name, <<id::binary>>) do
    Map.update!(acc, set_name, &MapSet.put(&1, id))
  end
end
