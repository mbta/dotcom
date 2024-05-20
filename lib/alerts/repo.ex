defmodule Alerts.Repo do
  alias Alerts.{Alert, Banner, Priority}
  alias Alerts.Cache.Store

  @spec all(DateTime.t()) :: [Alert.t()]
  def all(now) do
    Store.all_alerts(now)
  end

  @spec banner() :: Banner.t() | nil
  def banner do
    Store.banner()
  end

  @spec by_id(String.t()) :: Alert.t() | nil
  def by_id(id) do
    Store.alert(id)
  end

  @spec by_route_ids([String.t()], DateTime.t()) :: [Alert.t()]
  def by_route_ids([], _now) do
    []
  end

  def by_route_ids(route_ids, now) do
    route_ids
    |> Store.alert_ids_for_routes()
    |> Store.alerts(now)
  end

  @doc """
  Get alerts that are diversion types: shuttle, station_closure, suspension.

  Try to attach an image URL to the alert if it doesn't already have one.
  """
  @spec diversions_by_route_ids([String.t()], DateTime.t()) :: [Alert.t()]
  def diversions_by_route_ids(route_ids, now) do
    route_ids
    |> by_route_ids(now)
    |> Enum.filter(fn alert ->
      Enum.member?([:shuttle, :station_closure, :suspension], alert.effect)
    end)
    |> Enum.map(&maybe_attach_image_url/1)
  end

  @spec by_route_types(Enumerable.t(), DateTime.t()) :: [Alert.t()]
  def by_route_types(types, now) do
    types
    |> Store.alert_ids_for_route_types()
    |> Store.alerts(now)
  end

  @spec by_route_id_and_type(String.t(), 0..4, DateTime.t()) :: [Alert.t()]
  def by_route_id_and_type(route_id, route_type, now) do
    route_id
    |> Store.alert_ids_for_route_id_and_type(route_type)
    |> Store.alerts(now)
  end

  @spec by_stop_id(String.t(), DateTime.t()) :: [Alert.t()]
  def by_stop_id(stop_id, now \\ DateTime.utc_now()) do
    stop_id
    |> Store.alert_ids_for_stop_id()
    |> Store.alerts(now)
  end

  @spec by_priority(DateTime.t(), Priority.priority_level()) :: [Alert.t()]
  def by_priority(now, priority) do
    now
    |> Store.all_alerts()
    |> Enum.filter(&(&1.priority == priority))
  end

  # This function is used to attach an image URL to an alert if it doesn't already have one.
  # It should be removed once alerts support image URLs.
  defp maybe_attach_image_url(alert) do
    if is_nil(alert.image_url) do
      this_month = Timex.format!(Timex.now(), "%Y-%m", :strftime)
      image_url = "/sites/default/files/media/#{this_month}/alert-#{alert.id}.png"

      Map.put(alert, :image_url, image_url)
    else
      alert
    end
  end
end
