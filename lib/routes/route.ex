defmodule Routes.Route do
  @moduledoc "Data model and helpers corresponding to the V3 API Route resource."

  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]

  @derive Jason.Encoder

  defstruct color: "",
            description: :unknown,
            direction_destinations: :unknown,
            direction_names: %{0 => "Outbound", 1 => "Inbound"},
            external_agency_name: nil,
            fare_class: :unknown_fare,
            id: "",
            line_id: "",
            long_name: "",
            name: "",
            sort_order: 99_999,
            type: 0

  @type id_t :: String.t()

  @typedoc """
  The Route type is mostly based on the GTFS routes.txt fields.

  ## Fields
  * `:color` - A hex code representing the color to be shown on wayfinding,
    corresponding to the GTFS routes.txt `route_color` field.
  * `:description` - corresponds to the GTFS routes.txt `route_desc` field
  * `:direction_destinations` - map describing the terminus for each direction,
    as might be described on a vehicle headsign
  * `:direction_names` - map describing the name of each direction, e.g.
    "Inbound" or "Outbound"
  * `:external_agency_name` - `nil` if this route is part of the MBTA service,
    otherwise a string representing the name of the associated transit agency,
    e.g. "Massport"
  * `:fare_class` - corresponds to the GTFS routes.txt `route_fare_class` field
  * `:id` - corresponds to the GTFS routes.txt `route_id` field
  * `:line_id` - corresponds to the GTFS routes.txt `line_id` field
  * `:long_name` - corresponds to the GTFS routes.txt `route_long_name` field
  * `:name` - Usually corresponds to the GTFS routes.txt `route_short_name`
    field, falling back on `route_long_name` if no short name is present.
  * `:sort_order` - corresponds to the GTFS routes.txt `route_sort_order` field
  * `:type` - corresponds to the GTFS routes.txt `route_type` field
  """
  @type t :: %__MODULE__{
          color: String.t(),
          description: gtfs_route_desc,
          direction_destinations: %{0 => String.t(), 1 => String.t()} | :unknown,
          direction_names: %{0 => String.t() | nil, 1 => String.t() | nil},
          external_agency_name: String.t() | nil,
          fare_class: gtfs_fare_class,
          id: id_t,
          line_id: String.t() | nil,
          long_name: String.t(),
          name: String.t(),
          sort_order: non_neg_integer,
          type: type_int()
        }
  @type gtfs_route_type ::
          :subway | :commuter_rail | :bus | :ferry | :logan_express | :massport_shuttle
  @type gtfs_route_desc ::
          :airport_shuttle
          | :commuter_rail
          | :rapid_transit
          | :local_bus
          | :ferry
          | :rail_replacement_bus
          | :frequent_bus_route
          | :supplemental_bus
          | :commuter_bus
          | :community_bus
          | :unknown
  @type gtfs_fare_class ::
          :local_bus_fare
          | :express_bus_fare
          | :rapid_transit_fare
          | :commuter_rail_fare
          | :ferry_fare
          | :free_fare
          | :special_fare
          | :unknown_fare
  @type route_type :: gtfs_route_type | :the_ride
  @type type_int :: 0..4
  @type subway_lines_type :: :orange_line | :red_line | :green_line | :blue_line | :mattapan_line
  @type branch_name :: String.t() | nil

  @silver_line ~w(741 742 743 746 749 751)
  @silver_line_set MapSet.new(@silver_line)

  defguard is_external?(route) when not is_nil(route.external_agency_name)

  defguard is_shuttle?(route)
           when route.type == 3 and route.description == :rail_replacement_bus and
                  not is_external?(route)

  def type_atom(%__MODULE__{external_agency_name: "Massport"}), do: :massport_shuttle
  def type_atom(%__MODULE__{external_agency_name: "Logan Express"}), do: :logan_express
  def type_atom(%__MODULE__{type: type}), do: type_atom(type)
  def type_atom(0), do: :subway
  def type_atom(1), do: :subway
  def type_atom(2), do: :commuter_rail
  def type_atom(3), do: :bus
  def type_atom(4), do: :ferry
  def type_atom("commuter-rail"), do: :commuter_rail
  def type_atom("commuter_rail"), do: :commuter_rail
  def type_atom("subway"), do: :subway
  def type_atom("bus"), do: :bus
  def type_atom("ferry"), do: :ferry
  def type_atom("the_ride"), do: :the_ride

  def types_for_mode(:subway), do: [0, 1]
  def types_for_mode(:commuter_rail), do: [2]
  def types_for_mode(:bus), do: [3]
  def types_for_mode(:ferry), do: [4]
  def types_for_mode(:green_line), do: [0]
  def types_for_mode(:green_line_b), do: [0]
  def types_for_mode(:green_line_c), do: [0]
  def types_for_mode(:green_line_d), do: [0]
  def types_for_mode(:green_line_e), do: [0]
  def types_for_mode(:red_line), do: [1]
  def types_for_mode(:blue_line), do: [1]
  def types_for_mode(:orange_line), do: [1]
  def types_for_mode(:mattapan_line), do: [0]
  def types_for_mode(:silver_line), do: [3]

  def icon_atom(%__MODULE__{external_agency_name: "Massport"}), do: :massport_shuttle
  def icon_atom(%__MODULE__{external_agency_name: "Logan Express"}), do: :logan_express
  def icon_atom(%__MODULE__{id: "Red"}), do: :red_line
  def icon_atom(%__MODULE__{id: "Mattapan"}), do: :mattapan_line
  def icon_atom(%__MODULE__{id: "Orange"}), do: :orange_line
  def icon_atom(%__MODULE__{id: "Blue"}), do: :blue_line
  def icon_atom(%__MODULE__{id: "Green"}), do: :green_line
  def icon_atom(%__MODULE__{id: "Green-B"}), do: :green_line_b
  def icon_atom(%__MODULE__{id: "Green-C"}), do: :green_line_c
  def icon_atom(%__MODULE__{id: "Green-D"}), do: :green_line_d
  def icon_atom(%__MODULE__{id: "Green-E"}), do: :green_line_e

  for silver_line_route <- @silver_line do
    def icon_atom(%__MODULE__{id: unquote(silver_line_route)}), do: unquote(:silver_line)
  end

  def icon_atom(%__MODULE__{type: type}) when type in 0..4, do: type_atom(type)

  def icon_atom(_), do: nil

  def path_atom(%__MODULE__{type: 2}), do: :"commuter-rail"
  def path_atom(%__MODULE__{type: type}), do: type_atom(type)

  def type_name(:the_ride), do: "The RIDE"

  for type_atom <- ~w(subway commuter_rail bus ferry
                      orange_line red_line blue_line silver_line
                      green_line green_line_b green_line_c green_line_d green_line_e
                      mattapan_trolley mattapan_line)a do
    type_string =
      type_atom
      |> Atom.to_string()
      |> String.replace("_", " ")
      |> String.split(" ")
      |> Enum.map_join(" ", &String.capitalize(&1, :ascii))

    def type_name(unquote(type_atom)), do: unquote(type_string)
  end

  @doc """
  Standardizes a route with branches into a generic route. Currently only changes Green Line branches.
  """
  def to_naive(%__MODULE__{id: "Green-" <> _, type: 0}) do
    @routes_repo.green_line()
  end

  def to_naive(%__MODULE__{} = route) do
    route
  end

  @doc """
  A slightly more detailed version of &Route.type_name/1.
  The only difference is that route ids are listed for bus routes, otherwise it just returns &Route.type_name/1.
  """
  def type_summary(:bus, [%__MODULE__{} | _] = routes) do
    "Bus: #{bus_route_list(routes)}"
  end

  def type_summary(atom, _) do
    type_name(atom)
  end

  defp bus_route_list(routes) when is_list(routes) do
    routes
    |> Enum.filter(&(icon_atom(&1) == :bus))
    |> Enum.map_join(", ", & &1.name)
  end

  def direction_name(%__MODULE__{direction_names: names}, direction_id)
      when direction_id in [0, 1] do
    names
    |> Map.get(direction_id)
  end

  def direction_destination(%__MODULE__{direction_destinations: destinations}, direction_id)
      when direction_id in [0, 1] do
    Map.get(destinations, direction_id)
  end

  def vehicle_name(%__MODULE__{type: type}) when type in [0, 1, 2] do
    "Train"
  end

  def vehicle_name(%__MODULE__{type: 3}) do
    "Bus"
  end

  def vehicle_name(%__MODULE__{type: 4}) do
    "Boat"
  end

  def vehicle_atom(0), do: :trolley
  def vehicle_atom(1), do: :subway
  def vehicle_atom(2), do: :commuter_rail
  def vehicle_atom(3), do: :bus
  def vehicle_atom(4), do: :ferry
  def vehicle_atom(_), do: :subway

  def frequent_route?(%__MODULE__{description: :frequent_bus_route}), do: true
  def frequent_route?(%__MODULE__{description: :rapid_transit}), do: true
  def frequent_route?(%__MODULE__{}), do: false

  defmacro subway?(type, id) do
    quote do
      unquote(type) in [0, 1] and unquote(id) != "Mattapan"
    end
  end

  def silver_line?(%__MODULE__{id: id}), do: id in @silver_line_set

  def silver_line, do: @silver_line

  @doc """
  Determines if the given route data is hidden
  """
  def hidden?(%{id: "2427"}), do: true
  def hidden?(%{id: "3233"}), do: true
  def hidden?(%{id: "3738"}), do: true
  def hidden?(%{id: "4050"}), do: true
  def hidden?(%{id: "725"}), do: true
  def hidden?(%{id: "8993"}), do: true
  def hidden?(%{id: "116117"}), do: true
  def hidden?(%{id: "214216"}), do: true
  def hidden?(%{id: "441442"}), do: true
  def hidden?(%{id: "9701"}), do: true
  def hidden?(%{id: "9702"}), do: true
  def hidden?(%{id: "9703"}), do: true
  def hidden?(%{id: "Logan-" <> _}), do: true
  def hidden?(%{id: "Boat-F3"}), do: true
  def hidden?(_), do: false

  def rail?(route) do
    type_atom(route) in [:subway, :commuter_rail]
  end

  def commuter_rail?(route) do
    type_atom(route) == :commuter_rail
  end

  def to_json_safe(
        %__MODULE__{
          direction_names: direction_names,
          direction_destinations: direction_destinations
        } = route
      ) do
    direction_destinations_value =
      if direction_destinations == :unknown,
        do: nil,
        else: %{
          "0" => direction_destinations[0],
          "1" => direction_destinations[1]
        }

    %{
      Map.from_struct(route)
      | direction_names: %{
          "0" => direction_names[0],
          "1" => direction_names[1]
        },
        direction_destinations: direction_destinations_value
    }
  end
end

defimpl Phoenix.Param, for: Routes.Route do
  alias Routes.Route
  def to_param(%Route{id: "Green" <> _rest}), do: "Green"
  def to_param(%Route{id: id}), do: id
end

defimpl Poison.Encoder, for: Routes.Route do
  def encode(
        %Routes.Route{
          direction_names: direction_names,
          direction_destinations: direction_destinations
        } = route,
        options
      ) do
    direction_destinations_value =
      if direction_destinations == :unknown,
        do: nil,
        else: encoded_directions(direction_destinations)

    Poison.Encoder.encode(
      %{
        Map.from_struct(route)
        | direction_names: encoded_directions(direction_names),
          direction_destinations: direction_destinations_value
      },
      options
    )
  end

  defp encoded_directions(%{0 => direction0, 1 => direction1}),
    do: %{
      "0" => direction0,
      "1" => direction1
    }

  defp encoded_directions(directions), do: directions
end
