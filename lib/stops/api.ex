defmodule Stops.Api do
  @moduledoc """
  Wrapper around the remote stop information service.
  """

  require Logger

  alias JsonApi.Item
  alias MBTA.Api
  alias Stops.Stop
  alias Stops.Stop.ParkingLot.{Capacity, Manager, Payment, Utilization}

  @default_params [
    include: "parent_station,facilities,child_stops",
    "fields[facility]": "long_name,type,properties,latitude,longitude,id",
    "fields[stop]":
      "address,name,latitude,longitude," <>
        "municipality,wheelchair_boarding,location_type," <>
        "platform_name,platform_code,description"
  ]

  @accessible_facilities ~w(elevator escalator ramp portable_boarding_lift
                            tty_phone elevated_subplatform fully_elevated_platform
                            escalator_up escalator_down escalator_both)a

  @fare_facilities ~w(
    fare_vending_retailer
    fare_vending_machine
    fare_media_assistant
    fare_media_assistance_facility
    ticket_window
  )a

  @type fare_facility ::
          :fare_vending_retailer
          | :fare_vending_machine
          | :fare_media_assistant
          | :fare_media_assistance_facility
          | :ticket_window

  @doc """
  Returns a Stop by its GTFS ID.

  If a stop is found, we return `{:ok, %Stop{}}`. If no stop exists with that
  ID, we return `{:ok, nil}`. If there's an error fetching data, we return
  that as an `{:error, any}` tuple.
  """
  @spec by_gtfs_id(String.t()) :: {:ok, Stop.t() | nil} | {:error, any}
  def by_gtfs_id(gtfs_id) do
    gtfs_id
    |> Api.Stops.by_gtfs_id(@default_params)
    |> extract_v3_response()
    |> parse_v3_response()
  end

  def all do
    @default_params
    |> Api.Stops.all()
    |> parse_v3_multiple()
  end

  @spec by_route({Routes.Route.id_t(), 0 | 1, Keyword.t()}) :: [Stop.t()]
  def by_route({route_id, direction_id, opts}) do
    @default_params
    |> Keyword.put(:route, route_id)
    |> Keyword.put(:direction_id, direction_id)
    |> Keyword.merge(opts)
    |> Api.Stops.all()
    |> parse_v3_multiple()
  end

  @spec by_route_type({0..4, Keyword.t()}) :: [Stop.t()]
  def by_route_type({route_type, opts}) do
    @default_params
    |> Keyword.put(:route_type, route_type)
    |> Keyword.merge(opts)
    |> Api.Stops.all()
    |> parse_v3_multiple()
  end

  def by_trip(trip_id) do
    case Api.Trips.by_id(trip_id, include: "stops") do
      %JsonApi{
        data: [
          %JsonApi.Item{
            relationships: %{
              "stops" => stops
            }
          }
        ]
      } ->
        stops
        |> Enum.map(&parse_v3_response/1)
        |> Enum.map(fn {:ok, stop} -> stop end)

      _ ->
        []
    end
  end

  @spec parse_v3_multiple(JsonApi.t() | {:error, any}) :: [Stop.t()] | {:error, any}
  defp parse_v3_multiple({:error, _} = error) do
    error
  end

  defp parse_v3_multiple(api) do
    api.data
    |> Enum.map(&parse_v3_response/1)
    |> Enum.map(fn {:ok, stop} -> stop end)
  end

  @spec parent_id(Item.t()) :: Stop.id_t() | nil
  defp parent_id(%Item{relationships: %{"parent_station" => [%Item{id: parent_id}]}}) do
    parent_id
  end

  defp parent_id(_) do
    nil
  end

  defp child_ids(%Item{relationships: %{"child_stops" => children}}) do
    Enum.map(children, & &1.id)
  end

  defp child_ids(%Item{}) do
    []
  end

  @spec child?(Item.t()) :: boolean
  defp child?(%Item{relationships: %{"parent_station" => [%Item{}]}}), do: true
  defp child?(_), do: false

  @spec v3_name(Item.t()) :: String.t()
  defp v3_name(%Item{attributes: %{"name" => name}}), do: name

  @spec extract_v3_response(JsonApi.t()) :: {:ok, Item.t()} | {:error, any}
  defp extract_v3_response(%JsonApi{data: [item | _]}) do
    {:ok, item}
  end

  defp extract_v3_response({:error, _} = error) do
    error
  end

  @spec parse_v3_response(Item.t() | {:ok, Item.t()} | {:error, any}) ::
          {:ok, Stop.t() | nil}
          | {:error, any}
  defp parse_v3_response({:ok, %Item{} = item}), do: parse_v3_response(item)
  defp parse_v3_response({:error, [%JsonApi.Error{code: "not_found"} | _]}), do: {:ok, nil}
  defp parse_v3_response({:error, _} = error), do: error

  defp parse_v3_response(%Item{} = item) do
    fare_facilities = fare_facilities(item)

    stop = %Stop{
      id: item.id,
      parent_id: parent_id(item),
      child_ids: child_ids(item),
      name: v3_name(item),
      address: item.attributes["address"],
      municipality: item.attributes["municipality"],
      accessibility: merge_accessibility(v3_accessibility(item), item.attributes),
      parking_lots: v3_parking(item),
      fare_facilities: fare_facilities,
      bike_storage: bike_storage(item),
      child?: child?(item),
      station?: item.attributes["location_type"] == 1,
      has_fare_machine?: MapSet.member?(fare_facilities, :fare_vending_machine),
      has_charlie_card_vendor?: MapSet.member?(fare_facilities, :fare_media_assistant),
      latitude: item.attributes["latitude"],
      longitude: item.attributes["longitude"],
      type: type(item),
      platform_name: platform_name(item),
      platform_code: platform_code(item),
      description: description(item),
      zone: zone_number(item)
    }

    {:ok, stop}
  end

  defp type(%Item{attributes: %{"location_type" => 0}}) do
    # A location where passengers board or disembark from a transit vehicle
    :stop
  end

  defp type(%Item{attributes: %{"location_type" => 1}}) do
    # A physical structure or area that contains one or more stops.
    :station
  end

  defp type(%Item{attributes: %{"location_type" => 2}}) do
    # A location where passengers can enter or exit a station from the street.
    :entrance
  end

  defp type(%Item{attributes: %{"location_type" => 3}}) do
    # A generic nodes within a parent station which is neither a service stop
    # nor a station entrance. These node stops will be used for locations such
    # as (but not limited to) the ends of staircases, elevators, escalators,
    # and fare gates.
    :generic_node
  end

  defp platform_name(%Item{attributes: %{"platform_name" => name}}), do: name

  defp platform_code(%Item{attributes: %{"platform_code" => code}}), do: code

  defp description(%Item{attributes: %{"description" => description}}), do: description

  @spec v3_accessibility(Item.t()) :: [String.t()]
  defp v3_accessibility(item) do
    {escalators, others} =
      Enum.split_with(item.relationships["facilities"], &(&1.attributes["type"] == "ESCALATOR"))

    escalators = parse_escalator_direction(escalators)
    other = MapSet.new(others, &facility_atom_from_string(&1.attributes["type"]))
    matching_others = MapSet.intersection(other, MapSet.new(@accessible_facilities))
    Enum.map(escalators ++ MapSet.to_list(matching_others), &Atom.to_string/1)
  end

  @type bike_storage_types ::
          :bike_storage_rack
          | :bike_storage_rack_covered
          | :bike_storage_cage

  defp bike_storage(item) do
    item
    |> filter_facilities(MapSet.new([:bike_storage]))
    |> Enum.map(&bike_storage_type/1)
    |> MapSet.new()
  end

  @spec bike_storage_type(Item.t()) :: bike_storage_types
  def bike_storage_type(%Item{attributes: %{"properties" => properties}}) do
    properties
    |> Map.new(fn %{"name" => key, "value" => value} -> {key, value} end)
    |> do_bike_storage_type()
  end

  def do_bike_storage_type(%{"enclosed" => 1, "secured" => 1}) do
    :bike_storage_cage
  end

  def do_bike_storage_type(%{"enclosed" => 2, "secured" => 2}) do
    :bike_storage_rack
  end

  def do_bike_storage_type(%{"enclosed" => 1, "secured" => 2}) do
    :bike_storage_rack_covered
  end

  def do_bike_storage_type(_unknown) do
    :bike_storage_rack
  end

  @spec parse_escalator_direction([Item.t()]) :: [
          :escalator | :escalator_up | :escalator_down | :escalator_both
        ]
  defp parse_escalator_direction([]), do: []

  defp parse_escalator_direction(escalators) do
    directions =
      escalators
      |> Enum.map(& &1.attributes["properties"])
      |> List.flatten()
      |> Enum.filter(&(&1["name"] == "direction"))
      |> Enum.map(& &1["value"])

    down? = "down" in directions
    up? = "up" in directions
    [do_escalator(down?, up?)]
  end

  defp do_escalator(down?, up?)
  defp do_escalator(true, false), do: :escalator_down
  defp do_escalator(false, true), do: :escalator_up
  defp do_escalator(true, true), do: :escalator_both
  defp do_escalator(false, false), do: :escalator

  @spec v3_parking(Item.t()) :: [Stop.ParkingLot.t()]
  defp v3_parking(item) do
    item.relationships["facilities"]
    |> Enum.filter(&(&1.attributes["type"] == "PARKING_AREA"))
    |> Enum.map(&parse_parking_area/1)
  end

  @spec parse_parking_area(Item.t()) :: Stop.ParkingLot.t()
  defp parse_parking_area(parking_area) do
    parking_area.attributes["properties"]
    |> Enum.reduce(%{}, &property_acc/2)
    |> Map.put("name", parking_area.attributes["long_name"])
    |> Map.put("latitude", parking_area.attributes["latitude"])
    |> Map.put("longitude", parking_area.attributes["longitude"])
    |> Map.put("id", parking_area.id)
    |> to_parking_lot
  end

  @spec to_parking_lot(map) :: Stop.ParkingLot.t()
  defp to_parking_lot(props) do
    %Stop.ParkingLot{
      id: Map.get(props, "id"),
      name: Map.get(props, "name"),
      address: Map.get(props, "address"),
      capacity: Stops.Helpers.struct_or_nil(Capacity.parse(props)),
      payment: Stops.Helpers.struct_or_nil(Payment.parse(props)),
      utilization: Stops.Helpers.struct_or_nil(Utilization.parse(props)),
      note: Map.get(props, "note"),
      manager: Stops.Helpers.struct_or_nil(Manager.parse(props)),
      latitude: Map.get(props, "latitude"),
      longitude: Map.get(props, "longitude")
    }
  end

  defp property_acc(property, acc) do
    case property["name"] do
      "payment-form-accepted" ->
        payment = pretty_payment(property["value"])
        Map.update(acc, "payment-form-accepted", [payment], &[payment | &1])

      _ ->
        Map.put(acc, property["name"], property["value"])
    end
  end

  @spec pretty_payment(String.t()) :: String.t()
  def pretty_payment("cash"), do: "Cash"
  def pretty_payment("check"), do: "Check"
  def pretty_payment("coin"), do: "Coin"
  def pretty_payment("credit-debit-card"), do: "Credit/Debit Card"
  def pretty_payment("e-zpass"), do: "EZ Pass"
  def pretty_payment("invoice"), do: "Invoice"
  def pretty_payment("mobile-app"), do: "Mobile App"
  def pretty_payment("smartcard"), do: "Smart Card"
  def pretty_payment("tapcard"), do: "Tap Card"
  def pretty_payment(_), do: ""

  @spec merge_accessibility([String.t()], %{String.t() => any}) :: [String.t()]
  defp merge_accessibility(accessibility, stop_attributes)

  defp merge_accessibility(accessibility, %{"wheelchair_boarding" => 0}) do
    # if GTFS says we don't know what the accessibility situation is, then
    # add "unknown" as the first attribute
    ["unknown" | accessibility]
  end

  defp merge_accessibility(accessibility, %{"wheelchair_boarding" => 1}) do
    # make sure "accessibile" is the first list option
    ["accessible" | accessibility]
  end

  defp merge_accessibility(accessibility, _) do
    accessibility
  end

  @type gtfs_facility_type ::
          :elevator
          | :escalator
          | :ramp
          | :elevated_subplatform
          | :fully_elevated_platform
          | :portable_boarding_lift
          | :bridge_plate
          | :parking_area
          | :pick_drop
          | :taxi_stand
          | :bike_storage
          | :tty_phone
          | :electric_car_chargers
          | :fare_vending_retailer
          | :other

  @spec facility_atom_from_string(String.t()) :: gtfs_facility_type
  defp facility_atom_from_string("ELEVATOR"), do: :elevator
  defp facility_atom_from_string("ESCALATOR"), do: :escalator
  defp facility_atom_from_string("ESCALATOR_UP"), do: :escalator_up
  defp facility_atom_from_string("ESCALATOR_DOWN"), do: :escalator_down
  defp facility_atom_from_string("ESCALATOR_BOTH"), do: :escalator_both
  defp facility_atom_from_string("RAMP"), do: :ramp
  defp facility_atom_from_string("ELEVATED_SUBPLATFORM"), do: :elevated_subplatform
  defp facility_atom_from_string("FULLY_ELEVATED_PLATFORM"), do: :fully_elevated_platform
  defp facility_atom_from_string("PORTABLE_BOARDING_LIFT"), do: :portable_boarding_lift
  defp facility_atom_from_string("BRIDGE_PLATE"), do: :bridge_plate
  defp facility_atom_from_string("PARKING_AREA"), do: :parking_area
  defp facility_atom_from_string("PICK_DROP"), do: :pick_drop
  defp facility_atom_from_string("TAXI_STAND"), do: :taxi_stand
  defp facility_atom_from_string("BIKE_STORAGE"), do: :bike_storage
  defp facility_atom_from_string("TTY_PHONE"), do: :tty_phone
  defp facility_atom_from_string("ELECTRIC_CAR_CHARGERS"), do: :electric_car_chargers
  defp facility_atom_from_string("FARE_VENDING_RETAILER"), do: :fare_vending_retailer
  defp facility_atom_from_string("FARE_VENDING_MACHINE"), do: :fare_vending_machine
  defp facility_atom_from_string("FARE_MEDIA_ASSISTANT"), do: :fare_media_assistant
  defp facility_atom_from_string("TICKET_WINDOW"), do: :ticket_window
  defp facility_atom_from_string("OTHER"), do: :other

  defp facility_atom_from_string("FARE_MEDIA_ASSISTANCE_FACILITY"),
    do: :fare_media_assistance_facility

  defp facility_atom_from_string(other) do
    _ = Logger.warning("module=#{__MODULE__} unknown facility type: #{other}")
    :other
  end

  @spec fare_facilities(Item.t()) :: MapSet.t(fare_facility)
  defp fare_facilities(%Item{relationships: %{"facilities" => facilities}}) do
    Enum.reduce(facilities, MapSet.new(), &add_facility_type/2)
  end

  @spec add_facility_type(Item.t(), MapSet.t(fare_facility)) ::
          MapSet.t(fare_facility)
  defp add_facility_type(%Item{attributes: %{"type" => type_str}}, acc) do
    type = facility_atom_from_string(type_str)

    if @fare_facilities |> MapSet.new() |> MapSet.member?(type) do
      MapSet.put(acc, type)
    else
      acc
    end
  end

  defp add_facility_type(%Item{}, acc) do
    acc
  end

  @spec filter_facilities(Item.t(), MapSet.t()) :: [Item.t()]
  defp filter_facilities(%Item{relationships: %{"facilities" => facilities}}, facility_types) do
    Enum.filter(facilities, &filter_facility_types(&1, facility_types))
  end

  def filter_facility_types(%Item{attributes: %{"type" => type_str}}, facility_types) do
    MapSet.member?(facility_types, facility_atom_from_string(type_str))
  end

  @spec zone_number(Item.t()) :: String.t() | nil
  defp zone_number(%Item{relationships: %{"zone" => zone}}) do
    case zone do
      [%Item{:id => id}] -> get_zone_number(id)
      _ -> nil
    end
  end

  @spec get_zone_number(String.t() | nil) :: String.t() | nil
  defp get_zone_number(nil), do: nil

  defp get_zone_number(zone) do
    case zone do
      "CR-zone-" <> zone_number -> zone_number
      _ -> nil
    end
  end
end
