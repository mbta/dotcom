defmodule SiteWeb.FareController.Ferry do
  use SiteWeb.FareController.OriginDestinationFareBehavior

  alias Fares
  alias Fares.{FareInfo, Repo}

  @impl true
  def route_type, do: 4

  @impl true
  def mode, do: :ferry

  @impl true
  def fares(%{assigns: %{origin: origin, destination: destination}})
      when not is_nil(origin) and not is_nil(destination) do
    case Fares.fare_for_stops(:ferry, origin.id, destination.id) do
      {:ok, name} ->
        do_fares(name)

      :error ->
        []
    end
  end

  def fares(_conn) do
    []
  end

  defp do_fares(:ferry_george), do: FareInfo.georges_island_ferry_fares()

  defp do_fares(name), do: Repo.all(name: name)
end
