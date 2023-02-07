defmodule SiteWeb.BusStopChangeView do
  use SiteWeb, :view
  alias Alerts.Alert

  def related_stops(%Alert{} = alert) do
    Alert.get_entity(alert, :stop)
    |> MapSet.delete(nil)
    |> MapSet.to_list()
    |> Enum.map(&Stops.Repo.get_parent(&1))
    |> Enum.uniq()
  end
end
