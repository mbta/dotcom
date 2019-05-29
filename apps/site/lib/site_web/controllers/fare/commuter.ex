defmodule SiteWeb.FareController.Commuter do
  use SiteWeb.FareController.OriginDestinationFareBehavior

  @impl true
  def route_type, do: 2

  @impl true
  def mode, do: :commuter_rail

  @impl true
  def fares(%{assigns: %{origin: origin, destination: destination}})
      when not is_nil(origin) and not is_nil(destination) do
    case Fares.fare_for_stops(:commuter_rail, origin.id, destination.id) do
      {:ok, fare_name} ->
        Fares.Repo.all(name: fare_name)

      :error ->
        []
    end
  end

  def fares(_conn) do
    []
  end

  @impl true
  def key_stops do
    for stop_id <- ~w(place-sstat place-north place-bbsta)s do
      Stops.Repo.get!(stop_id)
    end
  end
end
