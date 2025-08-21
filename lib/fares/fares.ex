defmodule Fares do
  @moduledoc """

  Handling logic around fares.

  """

  alias Routes.Route
  alias Stops.Stop

  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]
  @stops_repo Application.compile_env!(:dotcom, :repo_modules)[:stops]

  @silver_line_rapid_transit ~w(741 742 743 746)
  @silver_line_rapid_transit_set MapSet.new(@silver_line_rapid_transit)

  @express_routes ~w(170 325 326 352 354 426 428 434 450 459 501 502 503 504 505)
  @express_route_set MapSet.new(@express_routes)

  # For the time being, these stops are ONLY served by the Winthrop Ferry
  @winthrop_ferry_stops ["Boat-Aquarium", "Boat-Fan", "Boat-Quincy", "Boat-Winthrop"]

  @type ferry_name ::
          :ferry_cross_harbor
          | :ferry_inner_harbor
          | :ferry_east_boston
          | :ferry_lynn
          | :ferry_winthrop
          | :commuter_ferry_logan
          | :commuter_ferry
          | :ferry_george

  @type fare_type :: :highest_one_way_fare | :lowest_one_way_fare | :reduced_one_way_fare
  @type zone :: String.t()

  @doc """
  Calculate the fare between a pair of stops.
  """
  def fare_for_stops(:commuter_rail, origin_id, destination_id) do
    with origin_zone when not is_nil(origin_zone) <- zone_for_stop(origin_id),
         dest_zone when not is_nil(dest_zone) <- zone_for_stop(destination_id) do
      {:ok, calculate_commuter_rail(origin_zone, dest_zone)}
    else
      _ -> :error
    end
  end

  def fare_for_stops(:ferry, origin, destination) do
    {:ok, calculate_ferry(origin, destination)}
  end

  defp zone_for_stop(stop_id) do
    case @stops_repo.get(stop_id) do
      %Stops.Stop{zone: zone} -> zone
      _ -> nil
    end
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

  def calculate_ferry(origin, destination)
      when "Boat-George" in [origin, destination] do
    :ferry_george
  end

  def calculate_ferry(origin, destination)
      when "Boat-Blossom" in [origin, destination] do
    :ferry_lynn
  end

  def calculate_ferry(origin, destination)
      when origin in @winthrop_ferry_stops or destination in @winthrop_ferry_stops do
    :ferry_winthrop
  end

  def calculate_ferry(origin, destination)
      when "Boat-Charlestown" in [origin, destination] and "Boat-Logan" in [origin, destination] do
    :ferry_cross_harbor
  end

  def calculate_ferry(origin, destination)
      when "Boat-Long" in [origin, destination] and "Boat-Logan" in [origin, destination] do
    :ferry_cross_harbor
  end

  def calculate_ferry(origin, destination)
      when "Boat-Long" in [origin, destination] and "Boat-Lewis" in [origin, destination] do
    :ferry_east_boston
  end

  def calculate_ferry(origin, destination)
      when "Boat-Charlestown" in [origin, destination] and
             "Boat-Long-South" in [origin, destination] do
    :ferry_inner_harbor
  end

  def calculate_ferry(origin, destination) when "Boat-Logan" in [origin, destination] do
    :commuter_ferry_logan
  end

  def calculate_ferry(_origin, _destination) do
    :commuter_ferry
  end

  def silver_line_rapid_transit?(<<id::binary>>),
    do: id in @silver_line_rapid_transit_set

  def silver_line_airport_stop?(route_id, origin_id)
  def silver_line_airport_stop?(_, nil), do: false
  def silver_line_airport_stop?("741", "17091"), do: true
  def silver_line_airport_stop?("741", "27092"), do: true
  def silver_line_airport_stop?("741", "17093"), do: true
  def silver_line_airport_stop?("741", "17094"), do: true
  def silver_line_airport_stop?("741", "17095"), do: true
  def silver_line_airport_stop?(<<_route_id::binary>>, <<_origin_id::binary>>), do: false

  def express?(<<id::binary>>), do: id in @express_route_set

  def silver_line_rapid_transit, do: @silver_line_rapid_transit

  def express, do: @express_routes

  @type fare_atom :: Route.gtfs_route_type() | :express_bus | :free_service

  def to_fare_atom(route_or_atom) do
    case route_or_atom do
      %Route{description: :rail_replacement_bus} ->
        :free_service

      %Route{type: 3, id: id} ->
        cond do
          silver_line_rapid_transit?(id) -> :subway
          express?(id) -> :express_bus
          true -> :bus
        end

      %Route{} ->
        Route.type_atom(route_or_atom)

      <<id::binary>> ->
        @routes_repo.get(id) |> to_fare_atom

      _ ->
        route_or_atom
    end
  end
end
