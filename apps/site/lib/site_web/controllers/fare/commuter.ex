defmodule SiteWeb.FareController.Commuter do
  use SiteWeb.FareController.OriginDestinationFareBehavior

  @impl true
  def route_type, do: 2

  @impl true
  def mode, do: :commuter_rail

  @impl true

  @foxboro "place-FS-0049"
  @pilot_launch_date ~D[2019-10-21]

  def fares(%{assigns: %{origin: origin, destination: destination, date: date}})
      when not is_nil(origin) and not is_nil(destination) do
    case Fares.fare_for_stops(:commuter_rail, origin.id, destination.id) do
      {:ok, fare_name} ->
        standard_fares = get_fares(fare_name)
        foxboro_event_fare = get_fares(:foxboro)

        if foxboro?(origin.id, destination.id) do
          if foxboro_pilot?(date),
            do: foxboro_event_fare ++ standard_fares,
            else: foxboro_event_fare
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

  @spec foxboro_pilot?(Calendar.date()) :: boolean
  defp foxboro_pilot?(current_date), do: Date.compare(current_date, @pilot_launch_date) != :lt
end
