defmodule SiteWeb.FareController.Commuter do
  @moduledoc "Determines fares for Commuter Rail trips."
  use SiteWeb.FareController.OriginDestinationFareBehavior

  @impl true
  def route_type, do: 2

  @impl true
  def mode, do: :commuter_rail

  @impl true

  @foxboro "place-FS-0049"

  def fares(%{assigns: %{origin: origin, destination: destination}})
      when not is_nil(origin) and not is_nil(destination) do
    case Fares.fare_for_stops(:commuter_rail, origin.id, destination.id) do
      {:ok, fare_name} ->
        standard_fares = get_fares(fare_name)
        foxboro_event_fare = get_fares(:foxboro)

        if foxboro?(origin.id, destination.id) do
          foxboro_event_fare ++ standard_fares
        else
          standard_fares
        end

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

  @spec get_fares(Fares.Fare.fare_name()) :: [Fares.Fare.t()]
  defp get_fares(fare_name), do: Fares.Repo.all(name: fare_name)

  @spec foxboro?(String.t(), String.t()) :: boolean()
  defp foxboro?(a, b) when @foxboro in [a, b], do: true
  defp foxboro?(_, _), do: false
end
