defmodule Fares do
  alias Routes.Route
  alias Stops.Stop

  @silver_line_rapid_transit ~w(741 742 743 746)
  @silver_line_rapid_transit_set MapSet.new(@silver_line_rapid_transit)

  @inner_express_routes ~w(170 325 326 351 426 428 434 448 449 450 459 501 502 503 504 553 554 556 558)
  @inner_express_route_set MapSet.new(@inner_express_routes)

  @outer_express_routes ~w(352 354 505)
  @outer_express_route_set MapSet.new(@outer_express_routes)

  @type ferry_name ::
          :ferry_cross_harbor
          | :ferry_inner_harbor
          | :commuter_ferry_logan
          | :commuter_ferry
          | :ferry_george

  @spec fare_for_stops(:commuter_rail | :ferry, Stops.Stop.id_t(), Stops.Stop.id_t()) ::
          {:ok, Fares.Fare.fare_name()}
          | :error
  def fare_for_stops(route_type_atom, origin_id, destination_id)

  def fare_for_stops(:commuter_rail, origin, destination)
      when origin == "Foxboro" or destination == "Foxboro" do
    {:ok, :foxboro}
  end

  def fare_for_stops(:commuter_rail, origin, destination) do
    with origin_zone when not is_nil(origin_zone) <- Zones.Repo.get(origin),
         dest_zone when not is_nil(dest_zone) <- Zones.Repo.get(destination) do
      {:ok, calculate_commuter_rail(Zones.Repo.get(origin), Zones.Repo.get(destination))}
    else
      _ -> :error
    end
  end

  def fare_for_stops(:ferry, origin, destination) do
    {:ok, calculate_ferry(origin, destination)}
  end

  def calculate_commuter_rail(start_zone, "1A") do
    {:zone, start_zone}
  end

  def calculate_commuter_rail("1A", end_zone) do
    {:zone, end_zone}
  end

  def calculate_commuter_rail(start_zone, end_zone) do
    # we need to include all zones travelled in, ie zone 3 -> 5 is 3 zones
    total_zones = abs(String.to_integer(start_zone) - String.to_integer(end_zone)) + 1

    {:interzone, "#{total_zones}"}
  end

  @spec calculate_ferry(String.t(), String.t()) :: ferry_name
  defp calculate_ferry(origin, destination)
       when "Boat-George" in [origin, destination] do
    :ferry_george
  end

  defp calculate_ferry(origin, destination)
       when "Boat-Charlestown" in [origin, destination] and "Boat-Logan" in [origin, destination] do
    :ferry_cross_harbor
  end

  defp calculate_ferry(origin, destination)
       when "Boat-Long" in [origin, destination] and "Boat-Logan" in [origin, destination] do
    :ferry_cross_harbor
  end

  defp calculate_ferry(origin, destination)
       when "Boat-Charlestown" in [origin, destination] and
              "Boat-Long-South" in [origin, destination] do
    :ferry_inner_harbor
  end

  defp calculate_ferry(origin, destination) when "Boat-Logan" in [origin, destination] do
    :commuter_ferry_logan
  end

  defp calculate_ferry(_origin, _destination) do
    :commuter_ferry
  end

  @spec silver_line_rapid_transit?(Route.id_t()) :: boolean
  def silver_line_rapid_transit?(<<id::binary>>),
    do: id in @silver_line_rapid_transit_set

  @spec silver_line_airport_stop?(Route.id_t(), Stop.id_t() | nil) :: boolean
  def silver_line_airport_stop?(route_id, origin_id)
  def silver_line_airport_stop?(_, nil), do: false
  def silver_line_airport_stop?("741", "17091"), do: true
  def silver_line_airport_stop?("741", "27092"), do: true
  def silver_line_airport_stop?("741", "17093"), do: true
  def silver_line_airport_stop?("741", "17094"), do: true
  def silver_line_airport_stop?("741", "17095"), do: true
  def silver_line_airport_stop?(<<_route_id::binary>>, <<_origin_id::binary>>), do: false

  @spec inner_express?(Route.id_t()) :: boolean
  def inner_express?(<<id::binary>>), do: id in @inner_express_route_set

  @spec outer_express?(Route.id_t()) :: boolean
  def outer_express?(<<id::binary>>), do: id in @outer_express_route_set

  def silver_line_rapid_transit, do: @silver_line_rapid_transit

  def inner_express, do: @inner_express_routes

  def outer_express, do: @outer_express_routes
end
