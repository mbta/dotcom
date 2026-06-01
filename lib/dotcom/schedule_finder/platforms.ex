defmodule Dotcom.ScheduleFinder.Platforms do
  @moduledoc """
  Rules and allowlists for whether platform names should be shown for a stop.
  """

  @stations_with_bus_platforms_list ~w(
    place-ER-0115
    place-ER-0168
    place-MM-0150
    place-MM-0186
    place-NB-0120
    place-alfcl
    place-andrw
    place-aport
    place-asmnl
    place-bbsta
    place-brntn
    place-davis
    place-fldcr
    place-forhl
    place-harsq
    place-jaksn
    place-jfk
    place-kencl
    place-lech
    place-matt
    place-mlmnl
    place-mvbcl
    place-nqncy
    place-ogmnl
    place-orhte
    place-qamnl
    place-qnctr
    place-river
    place-rsmnl
    place-rugg
    place-sull
    place-welln
    place-wimnl
    place-wondl
  )
  @stations_with_commuter_rail_platforms_list ~w(
    place-DB-0095
    place-FR-0494
    place-FR-3338
    place-NEC-1659
    place-NEC-1768
    place-NEC-1851
    place-NEC-1969
    place-NEC-2139
    place-NEC-2203
    place-NHRML-0254
    place-WML-0025
    place-bbsta
    place-forhl
    place-north
    place-rugg
    place-sstat
  )
  @stations_with_bus_platforms MapSet.new(@stations_with_bus_platforms_list)
  @stations_with_commuter_rail_platforms MapSet.new(@stations_with_commuter_rail_platforms_list)

  @doc """
  Returns the station ID's where bus platform names should be shown, as a `MapSet`.
  """
  @spec stations_with_bus_platforms() :: MapSet.t(Stops.Stop.id_t())
  def stations_with_bus_platforms, do: @stations_with_bus_platforms

  @doc """
  Returns the station ID's where commuter rail platform names should be shown, as a `MapSet`.
  """
  @spec stations_with_commuter_rail_platforms() :: MapSet.t(Stops.Stop.id_t())
  def stations_with_commuter_rail_platforms, do: @stations_with_commuter_rail_platforms

  @doc """
  Returns true if platform names should be shown for the given route type and stop id.
  """
  @spec has_platforms?(Routes.Route.type_int() | Routes.Route.route_type(), Stops.Stop.id_t()) ::
          boolean()
  def has_platforms?(route_type, _stop_id) when route_type in [0, 1, :subway], do: false
  def has_platforms?(route_type, _stop_id) when route_type in [4, :ferry], do: true

  def has_platforms?(route_type, stop_id) when route_type in [2, :commuter_rail],
    do: MapSet.member?(@stations_with_commuter_rail_platforms, stop_id)

  def has_platforms?(route_type, stop_id) when route_type in [3, :bus],
    do: MapSet.member?(@stations_with_bus_platforms, stop_id)

  def has_platforms?(_, _), do: true
end
