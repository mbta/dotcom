defmodule Routes.Route do
  @moduledoc "Data model and helpers corresponding to the V3 API Route resource."

  alias Routes.Repo

  @derive Jason.Encoder

  defstruct id: "",
            type: 0,
            name: "",
            long_name: "",
            color: "",
            sort_order: 99_999,
            direction_names: %{0 => "Outbound", 1 => "Inbound"},
            direction_destinations: :unknown,
            description: :unknown,
            custom_route?: false

  @type id_t :: String.t()
  @type t :: %__MODULE__{
          id: id_t,
          type: type_int(),
          name: String.t(),
          long_name: String.t(),
          color: String.t(),
          sort_order: non_neg_integer,
          direction_names: %{0 => String.t() | nil, 1 => String.t() | nil},
          direction_destinations: %{0 => String.t(), 1 => String.t()} | :unknown,
          description: gtfs_route_desc,
          custom_route?: boolean
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
          | :key_bus_route
          | :supplemental_bus
          | :commuter_bus
          | :community_bus
          | :unknown
  @type route_type :: gtfs_route_type | :the_ride
  @type type_int :: 0..4
  @type subway_lines_type :: :orange_line | :red_line | :green_line | :blue_line | :mattapan_line
  @type branch_name :: String.t() | nil

  @silver_line ~w(741 742 743 746 749 751)
  @silver_line_set MapSet.new(@silver_line)

  @spec type_atom(t | type_int | String.t()) :: gtfs_route_type
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
  def type_atom("909"), do: :logan_express
  def type_atom("983"), do: :massport_shuttle
  def type_atom("Massport-" <> _), do: :massport_shuttle

  @spec types_for_mode(gtfs_route_type | subway_lines_type) :: [0..4]
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

  @spec icon_atom(t) :: gtfs_route_type | subway_lines_type
  def icon_atom(%__MODULE__{id: "Red"}), do: :red_line
  def icon_atom(%__MODULE__{id: "Mattapan"}), do: :mattapan_line
  def icon_atom(%__MODULE__{id: "Orange"}), do: :orange_line
  def icon_atom(%__MODULE__{id: "Blue"}), do: :blue_line
  def icon_atom(%__MODULE__{id: "Green"}), do: :green_line
  def icon_atom(%__MODULE__{id: "Green-B"}), do: :green_line_b
  def icon_atom(%__MODULE__{id: "Green-C"}), do: :green_line_c
  def icon_atom(%__MODULE__{id: "Green-D"}), do: :green_line_d
  def icon_atom(%__MODULE__{id: "Green-E"}), do: :green_line_e
  def icon_atom(%__MODULE__{id: "Massport-" <> _}), do: :massport_shuttle

  for silver_line_route <- @silver_line do
    def icon_atom(%__MODULE__{id: unquote(silver_line_route)}), do: unquote(:silver_line)
  end

  def icon_atom(%__MODULE__{} = route), do: type_atom(route.type)

  @spec path_atom(t) :: gtfs_route_type
  def path_atom(%__MODULE__{type: 2}), do: :"commuter-rail"
  def path_atom(%__MODULE__{type: type}), do: type_atom(type)

  @spec type_name(atom) :: String.t()
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
      |> Enum.map(&String.capitalize/1)
      |> Enum.join(" ")

    def type_name(unquote(type_atom)), do: unquote(type_string)
  end

  @doc """
  Standardizes a route with branches into a generic route. Currently only changes Green Line branches.
  """
  @spec to_naive(__MODULE__.t()) :: __MODULE__.t()
  def to_naive(%__MODULE__{id: "Green-" <> _, type: 0}) do
    Repo.green_line()
  end

  def to_naive(%__MODULE__{} = route) do
    route
  end

  @doc """
  A slightly more detailed version of &Route.type_name/1.
  The only difference is that route ids are listed for bus routes, otherwise it just returns &Route.type_name/1.
  """
  @spec type_summary(subway_lines_type | gtfs_route_type, [t]) :: String.t()
  def type_summary(:bus, [%__MODULE__{} | _] = routes) do
    "Bus: #{bus_route_list(routes)}"
  end

  def type_summary(atom, _) do
    type_name(atom)
  end

  @spec bus_route_list([Routes.Route.t()]) :: String.t()
  defp bus_route_list(routes) when is_list(routes) do
    routes
    |> Enum.filter(&(icon_atom(&1) == :bus))
    |> Enum.map(& &1.name)
    |> Enum.join(", ")
  end

  @spec direction_name(t, 0 | 1) :: String.t()
  def direction_name(%__MODULE__{direction_names: names}, direction_id)
      when direction_id in [0, 1] do
    names
    |> Map.get(direction_id)
  end

  def direction_destination(%__MODULE__{direction_destinations: destinations}, direction_id)
      when direction_id in [0, 1] do
    Map.fetch!(destinations, direction_id)
  end

  @spec vehicle_name(t) :: String.t()
  def vehicle_name(%__MODULE__{type: type}) when type in [0, 1, 2] do
    "Train"
  end

  def vehicle_name(%__MODULE__{type: 3}) do
    "Bus"
  end

  def vehicle_name(%__MODULE__{type: 4}) do
    "Boat"
  end

  @spec vehicle_atom(0..4) :: atom
  def vehicle_atom(0), do: :trolley
  def vehicle_atom(1), do: :subway
  def vehicle_atom(2), do: :commuter_rail
  def vehicle_atom(3), do: :bus
  def vehicle_atom(4), do: :ferry
  def vehicle_atom(_), do: :subway

  @spec key_route?(t) :: boolean
  def key_route?(%__MODULE__{description: :key_bus_route}), do: true
  def key_route?(%__MODULE__{description: :rapid_transit}), do: true
  def key_route?(%__MODULE__{}), do: false

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
  @spec hidden?(t()) :: boolean
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
  def hidden?(%{id: "CapeFlyer"}), do: true
  def hidden?(%{id: "Boat-F3"}), do: true
  def hidden?(_), do: false

  @doc """
  Determines if given route route is a blended one
  """
  @spec combined_route?(t()) :: boolean
  def combined_route?(%{id: "627"}), do: true
  def combined_route?(_), do: false

  @spec to_json_safe(t) :: map
  def to_json_safe(%__MODULE__{
        id: id,
        type: type,
        name: name,
        long_name: long_name,
        color: color,
        sort_order: sort_order,
        direction_names: direction_names,
        direction_destinations: direction_destinations,
        description: description,
        custom_route?: custom_route?
      }) do
    direction_destinations_value =
      if direction_destinations == :unknown,
        do: nil,
        else: %{
          "0" => direction_destinations[0],
          "1" => direction_destinations[1]
        }

    %{
      id: id,
      type: type,
      name: name,
      long_name: long_name,
      color: color,
      sort_order: sort_order,
      direction_names: %{
        "0" => direction_names[0],
        "1" => direction_names[1]
      },
      direction_destinations: direction_destinations_value,
      description: description,
      custom_route?: custom_route?
    }
  end
end

defimpl Phoenix.Param, for: Routes.Route do
  alias Routes.Route
  def to_param(%Route{id: "Green" <> _rest}), do: "Green"
  def to_param(%Route{id: id}), do: id
end
