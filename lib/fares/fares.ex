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

  # This is a list of ferry zones, according to
  # https://www.mbta.com/fares/ferry-fares, along with a list of which
  # dock ID's belong to each zone. This is necessary for fare
  # calculation, since ferry fares are based on the zones of the stops
  # visited in a similar (though not identical) way to Commuter Rail.
  @ferry_zones [
    %{
      zone: %{fare_name: :ferry_winthrop, zone_number: 1},
      dock_ids: [
        "Boat-Quincy",
        "Boat-Winthrop"
      ]
    },
    %{
      zone: %{fare_name: :ferry_lynn, zone_number: 2},
      dock_ids: [
        "Boat-Blossom"
      ]
    },
    %{
      zone: %{fare_name: :commuter_ferry, zone_number: 5},
      dock_ids: [
        "Boat-George",
        "Boat-Hingham",
        "Boat-Hull"
      ]
    }
  ]

  # A "default" zone - docks that aren't listed above are assumed to
  # be in the inner harbor, Zone 1A (which, for the sake of integer
  # comparison, can be given a zone number of 0).
  @inner_harbor_ferry_zone %{fare_name: :ferry_inner_harbor, zone_number: 0}

  # The same data as in @ferry_zones, but arranged as a map of dock_id
  # to zone, like
  #   %{
  #     "Boat-Quincy" => %{fare_name: :ferry_winthrop, zone_number: 1},
  #     "Boat-Winthrop" => %{fare_name: :ferry_winthrop, zone_number: 1},
  #     "Boat-Blossom" => %{fare_name: :ferry_lynn, zone_number: 2},
  #     ...
  #   }
  # ... for easier lookup
  @ferry_zones_by_dock @ferry_zones
                       |> Enum.flat_map(fn %{zone: zone, dock_ids: dock_ids} ->
                         dock_ids |> Enum.map(&{&1, zone})
                       end)
                       |> Map.new()

  @winthrop_ferry_stops [
    "Boat-Aquarium",
    "Boat-Fan",
    "Boat-Quincy",
    "Boat-Winthrop",
    "Boat-Logan"
  ]
  @inner_harbor_winthrop [
    "Boat-Aquarium",
    "Boat-Fan",
    "Boat-Logan"
  ]
  @loop_ferry_stops ["Boat-Commonwealth", "Boat-Aquarium", "Boat-Lovejoy", "Boat-Logan"]

  @type ferry_name ::
          :ferry_cross_harbor
          | :ferry_inner_harbor
          | :ferry_east_boston
          | :ferry_harbor_loop
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

  @spec fare_for_stops(
          :commuter_rail | :ferry,
          Stop.id_t(),
          Stop.id_t()
        ) ::
          {:ok, Fares.Fare.fare_name()}
          | :error
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

  # Ferry fares are based on zones, similar to Commuter Rail (and in
  # fact have the same zone prices), but with two key differences:
  #
  # - Ferry trips can start and end in Zone 1A, while having
  #   intermediate stops in zones further out. Fares are based on the
  #   furthest-out zone that you visit, regardless of where you embark
  #   or debark, so for instance, if you travel from Central Wharf to
  #   Logan (both Zone 1A) via Quincy (Zone 1), then you pay the
  #   higher Zone 1 fare.
  #
  # - Interzone fares are not considered. If you take the trip from
  #   Hingham to Hull, then even though you've stayed in Zone 5, you
  #   pay the Zone 5 fare, not the single-zone interzone fare.
  #
  # All this to say that the actual formula for a ferry fare is to
  # pull the zones for all of the stops, origin, destination, and
  # stops in between, and base the fare on the highest-priced zone.
  def calculate_ferry(origin, destination, between) do
    [origin, destination | between]
    |> Enum.map(&Map.get(@ferry_zones_by_dock, &1, @inner_harbor_ferry_zone))
    |> Enum.max_by(& &1.zone_number)
    |> then(& &1.fare_name)
  end

  def calculate_ferry(origin, destination)
      when origin in @inner_harbor_winthrop and destination in @inner_harbor_winthrop
      when origin in @loop_ferry_stops and destination in @loop_ferry_stops and
             origin != destination
      when "Boat-Long" in [origin, destination] and "Boat-Logan" in [origin, destination]
      when "Boat-Long-North-5B" in [origin, destination] and "Boat-Lewis" in [origin, destination] do
    :ferry_inner_harbor
  end

  def calculate_ferry(origin, destination)
      when origin in @winthrop_ferry_stops and destination in @winthrop_ferry_stops do
    :ferry_winthrop
  end

  @spec calculate_ferry(String.t(), String.t()) :: ferry_name
  def calculate_ferry(origin, destination)
      when "Boat-George" in [origin, destination] do
    :ferry_george
  end

  def calculate_ferry(origin, destination)
      when "Boat-Blossom" in [origin, destination] do
    :ferry_lynn
  end

  def calculate_ferry(origin, destination)
      when "Boat-Charlestown" in [origin, destination] and "Boat-Logan" in [origin, destination] do
    :ferry_cross_harbor
  end

  def calculate_ferry(origin, destination)
      when "Boat-Charlestown" in [origin, destination] and
             "Boat-Long-South" in [origin, destination] do
    :ferry_inner_harbor
  end

  def calculate_ferry(_origin, _destination) do
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

  @spec express?(Route.id_t()) :: boolean
  def express?(<<id::binary>>), do: id in @express_route_set

  def silver_line_rapid_transit, do: @silver_line_rapid_transit

  def express, do: @express_routes

  @type fare_atom :: Route.gtfs_route_type() | :express_bus | :free_service

  @spec to_fare_atom(fare_atom | Route.id_t() | Route.t()) :: fare_atom
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
