defmodule Alerts.Cache.Store do
  @moduledoc """
  A process that maintains a few ETS tables. The tables are

  * :alert_id_to_alerts - a set with has the "alert_id" as the key and
    and %Alerts.Alert{} as the value.

  * :route_id_and_type_to_alert_ids - a bag with "route_id" and "route_type" as keys and "alert_id" as
    value. Each route_id, route_type pair in the table only has a single alert_id, but there can
    be multiple entries for the same route_id and route_type

  * :alert_banner - a set with a single key, :banner, which has either the value
    nil or an %Alert.Banner{}

  All the tables are protected, with read_concurrency: true. The updates occur
  via update/2, which are a GenServer.call to the server, while all the reads
  occur via client functions that query the ETS tables directly.
  """

  use GenServer

  @pubsub_topic "alerts"

  # Client

  def start_link(_) do
    GenServer.start_link(__MODULE__, [], name: __MODULE__)
  end

  @doc """
  Sets the ETS cache to these set of alerts and optional banner.
  The previous alerts in the cache are all removed.
  """
  @spec update([Alerts.Alert.t()], Alerts.Banner.t() | nil) :: :ok
  def update(alerts, banner_alert) do
    GenServer.call(__MODULE__, {:update, alerts, banner_alert})
    DotcomWeb.Endpoint.broadcast(@pubsub_topic, "alerts_updated", alerts)
  end

  @doc """
  Subscribes the caller to updates whenever alerts data is re-fetched. The calling
  process will then need to handle messages like so:

  ```
  def handle_info(%{event: "alerts_updated", payload: alerts}, state) do
    # Logic goes here
  end
  ```
  """
  @spec subscribe() :: :ok | {:error, term()}
  def subscribe() do
    DotcomWeb.Endpoint.subscribe(@pubsub_topic)
  end

  def unsubscribe() do
    DotcomWeb.Endpoint.unsubscribe(@pubsub_topic)
  end

  @doc """
  Retrieves all the alert ids (if any) for the given list of routes.
  The IDs returned here can be passed to alerts/1 to get the alerts themselves.
  """
  @spec alert_ids_for_routes([String.t()]) :: [String.t()]
  def alert_ids_for_routes(route_ids) do
    keys = Enum.map(route_ids, &{{&1, :_, :"$1"}, [], [:"$1"]})
    :ets.select(:route_id_and_type_to_alert_ids, keys)
  end

  @spec alert_ids_for_route_types(Enumerable.t()) :: [String.t()]
  def alert_ids_for_route_types(types) do
    keys = Enum.map(types, &{{:_, &1, :"$1"}, [], [:"$1"]})
    :ets.select(:route_id_and_type_to_alert_ids, keys)
  end

  def alert_ids_for_route_id_and_type(route_id, route_type) do
    keys = [{{route_id, :_, :"$1"}, [], [:"$1"]}, {{nil, route_type, :"$1"}, [], [:"$1"]}]
    :ets.select(:route_id_and_type_to_alert_ids, keys)
  end

  def alert_ids_for_stop_id(stop_id) do
    keys = [{{stop_id, :"$1"}, [], [:"$1"]}]
    :ets.select(:stop_id_to_alert_ids, keys)
  end

  @doc """
  Retrieves the alert objects given a list of alert IDs. If an ID
  is passed that doesn't have a current alert, it is ignored.
  """
  @spec alerts([String.t()], DateTime.t()) :: [Alerts.Alert.t()]
  def alerts(alert_ids, now) do
    :alert_id_to_alert
    |> select_many(alert_ids)
    |> Alerts.Sort.sort(now)
  end

  @doc """
  Retrieves an alert object given an alert ID.
  """
  @spec alert(String.t()) :: Alerts.Alert.t() | nil
  def alert(alert_id) do
    :alert_id_to_alert
    |> select_many([alert_id])
    |> List.first()
  end

  @doc """
  Retrieves the full set of current alerts in priority sorted order.
  """
  @spec all_alerts(DateTime.t()) :: [Alerts.Alert.t()]
  def all_alerts(now) do
    :alert_id_to_alert
    |> :ets.select([{{:_, :"$1"}, [], [:"$1"]}])
    |> Alerts.Sort.sort(now)
  end

  @doc """
  Retrieves the saved Alert Banner if present.
  """
  @spec banner() :: Alerts.Banner.t() | nil
  def banner do
    case :ets.lookup(:alert_banner, :banner) do
      [{:banner, banner}] -> banner
      _ -> nil
    end
  end

  defp select_many(table, keys) do
    selectors = for key <- keys, do: {{key, :"$1"}, [], [:"$1"]}
    :ets.select(table, selectors)
  end

  # Server
  @impl true
  def init(_args) do
    # no cover
    _ = :ets.new(:alert_id_to_alert, [:set, :protected, :named_table, read_concurrency: true])
    # no cover
    _ =
      :ets.new(:route_id_and_type_to_alert_ids, [
        :bag,
        :protected,
        :named_table,
        read_concurrency: true
      ])

    # no cover
    _ = :ets.new(:stop_id_to_alert_ids, [:bag, :protected, :named_table, read_concurrency: true])

    # no cover
    _ = :ets.new(:alert_banner, [:set, :protected, :named_table, read_concurrency: true])

    {:ok, []}
  end

  @impl true
  def handle_call({:update, alerts, banner}, _from, state) do
    {alert_inserts, route_inserts, stop_inserts} =
      Enum.reduce(alerts, {[], [], []}, fn alert,
                                           {alert_inserts_acc, route_inserts_acc,
                                            stop_inserts_acc} ->
        {
          [{alert.id, alert} | alert_inserts_acc],
          Enum.map(alert.informed_entity, &{&1.route, &1.route_type, alert.id}) ++
            route_inserts_acc,
          Enum.map(alert.informed_entity.stop, &{&1, alert.id}) ++ stop_inserts_acc
        }
      end)

    :ets.delete_all_objects(:alert_id_to_alert)
    :ets.delete_all_objects(:route_id_and_type_to_alert_ids)
    :ets.delete_all_objects(:alert_banner)
    :ets.delete_all_objects(:stop_id_to_alert_ids)

    :ets.insert(:alert_id_to_alert, alert_inserts)
    :ets.insert(:route_id_and_type_to_alert_ids, route_inserts)
    :ets.insert(:alert_banner, {:banner, banner})
    :ets.insert(:stop_id_to_alert_ids, stop_inserts)

    {:reply, :ok, state, :hibernate}
  end
end
