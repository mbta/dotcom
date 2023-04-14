defmodule Fares do
  @moduledoc """

  Handling logic around fares.

  """

  alias Routes.Route
  alias Schedules.Trip
  alias Stops.Stop
  alias Zones.Zone

  @silver_line_rapid_transit ~w(741 742 743 746)
  @silver_line_rapid_transit_set MapSet.new(@silver_line_rapid_transit)

  @express_routes ~w(170 325 326 352 354 426 428 434 450 459 501 502 503 504 505)
  @express_route_set MapSet.new(@express_routes)

  @foxboro_reverse_commute ~w(741 743 745 750 752 754 756)
  @foxboro_reverse_commute_set MapSet.new(@foxboro_reverse_commute)

  @terminus_stops ["place-sstat", "place-north", "North Station", "South Station"]

  @type ferry_name ::
          :ferry_cross_harbor
          | :ferry_inner_harbor
          | :ferry_east_boston
          | :commuter_ferry_logan
          | :commuter_ferry
          | :ferry_george

  @type fare_type :: :highest_one_way_fare | :lowest_one_way_fare | :reduced_one_way_fare

  @doc """
  Calculate the fare between a pair of stops.

  NB: origin and destination can be Stop IDs or names.
  """
  @spec fare_for_stops(
          :commuter_rail | :ferry,
          String.t(),
          String.t(),
          String.t() | Trip.t() | nil
        ) ::
          {:ok, Fares.Fare.fare_name()}
          | :error
  def fare_for_stops(route_type_atom, origin, destination, trip_details \\ nil)

  def fare_for_stops(:commuter_rail, origin, destination, trip_details) do
    with origin_zone when not is_nil(origin_zone) <- zone_for_stop(origin),
         dest_zone when not is_nil(dest_zone) <- zone_for_stop(destination) do
      cond do
        foxboro_pilot?(trip_details) ->
          {:ok, calculate_foxboro_zones(origin_zone, dest_zone)}

        Zone.combo_zone?(origin_zone) ->
          {:ok, calculate_combo(origin_zone, dest_zone, destination)}

        Zone.combo_zone?(dest_zone) ->
          {:ok, calculate_combo(dest_zone, origin_zone, origin)}

        true ->
          {:ok, calculate_commuter_rail(origin_zone, dest_zone)}
      end
    else
      _ -> :error
    end
  end

  def fare_for_stops(:ferry, origin, destination, _) do
    {:ok, calculate_ferry(origin, destination)}
  end

  defp zone_for_stop(stop_id) do
    case Stops.Repo.get(stop_id) do
      %{zone: zone} -> zone
      _ -> nil
    end
  end

  @spec calculate_commuter_rail(any, any) :: {:interzone, binary} | {:zone, any}
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

  @spec calculate_combo(Zone.t(), Zone.t(), Stop.id_t()) :: {:interzone, binary} | {:zone, any}
  defp calculate_combo(combo_zone, _other_zone, other_stop_id)
       when other_stop_id in @terminus_stops do
    {:zone, Zone.terminus_zone(combo_zone)}
  end

  defp calculate_combo(combo_zone, other_zone, _other_stop_id) do
    general_combo_zone = Zone.general_zone(combo_zone)
    general_other_zone = Zone.general_zone(other_zone)
    calculate_commuter_rail(general_combo_zone, general_other_zone)
  end

  def calculate_foxboro_zones(start_zone, "1A") when start_zone != "1A" do
    calculate_commuter_rail(start_zone, "1")
  end

  def calculate_foxboro_zones("1A", end_zone) when end_zone != "1A" do
    calculate_commuter_rail("1", end_zone)
  end

  def calculate_foxboro_zones(start_zone, end_zone) do
    calculate_commuter_rail(start_zone, end_zone)
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
       when "Boat-Long" in [origin, destination] and "Boat-Lewis" in [origin, destination] do
    :ferry_east_boston
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

  @spec foxboro_pilot?(Trip.t() | nil) :: boolean
  defp foxboro_pilot?(%Trip{name: id, id: "CR-Weekday-Fall-19" <> _}),
    do: id in @foxboro_reverse_commute_set

  defp foxboro_pilot?(_), do: false

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

  @spec express?(Route.id_t()) :: boolean
  def express?(<<id::binary>>), do: id in @express_route_set

  def silver_line_rapid_transit, do: @silver_line_rapid_transit

  def express, do: @express_routes

  @type fare_atom :: Route.gtfs_route_type() | :express_bus

  @spec to_fare_atom(fare_atom | Route.id_t() | Route.t()) :: fare_atom
  def to_fare_atom(route_or_atom) do
    case route_or_atom do
      %Route{type: 3, id: id} ->
        cond do
          silver_line_rapid_transit?(id) -> :subway
          express?(id) -> :express_bus
          true -> :bus
        end

      %Route{} ->
        Route.type_atom(route_or_atom)

      <<id::binary>> ->
        Routes.Repo.get(id) |> to_fare_atom

      _ ->
        route_or_atom
    end
  end

  @spec get_fare_by_type(TripPlan.Leg.t(), fare_type) :: Fares.Fare.t() | nil
  def get_fare_by_type(leg, fare_type) do
    leg
    |> Kernel.get_in([
      Access.key(:mode, %{}),
      Access.key(:fares, %{}),
      Access.key(fare_type)
    ])
  end
end
