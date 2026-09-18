defmodule DotcomWeb.Hooks.Breadcrumbs do
  @moduledoc """
  Assign the breadcrumbs, before both disconnected and connected mounts.
  """
  alias DotcomWeb.Schedule.RouteBreadcrumbs

  use Dotcom.Gettext.Sigils
  use DotcomWeb, :verified_routes

  alias Routes.Route
  alias Stops.Stop

  import Phoenix.Component, only: [assign: 3]
  import Util.Breadcrumb

  def on_mount(:search_page, _params, _session, socket) do
    {:cont, assign(socket, :breadcrumbs, [build(~t"Search")])}
  end

  def on_mount(:trip_planner, _params, _session, socket) do
    {:cont, assign(socket, :breadcrumbs, [build(~t"Trip Planner")])}
  end

  def on_mount(:schedule_page, _params, _session, %{assigns: %{route: route}} = socket) do
    {:cont, assign(socket, :breadcrumbs, RouteBreadcrumbs.breadcrumbs(route))}
  end

  def on_mount(:stop_page, _params, _session, %{assigns: %{stop: stop}} = socket) do
    routes = socket.assigns[:routes_by_stop] || []

    {:cont,
     socket
     |> assign(:breadcrumbs, stop_breadcrumbs(stop, routes))
     |> assign(
       :meta_description,
       gettext(
         "Station serving MBTA %{lines} lines%{location}.",
         lines: lines(routes),
         location: location(stop)
       )
     )}
  end

  # catch-all case
  def on_mount(_, _params, _session, socket), do: {:cont, socket}

  @spec stop_breadcrumbs(Stop.t(), [Route.t()]) :: [Util.Breadcrumb.t()]
  def stop_breadcrumbs(%Stop{name: name}, []) do
    breadcrumbs_for_station_type(nil, name)
  end

  def stop_breadcrumbs(%Stop{station?: true, name: name}, routes) do
    routes
    |> Enum.min_by(& &1.type)
    |> Route.path_atom()
    |> breadcrumbs_for_station_type(name)
  end

  def stop_breadcrumbs(%Stop{name: name}, _routes) do
    breadcrumbs_for_station_type(nil, name)
  end

  defp breadcrumbs_for_station_type(breadcrumb_tab, name)
       when breadcrumb_tab in ~w(subway commuter-rail ferry)a do
    [
      build(~t"Stations", ~p"/stops/#{breadcrumb_tab}"),
      build(name)
    ]
  end

  defp breadcrumbs_for_station_type(_, name) do
    [build(name)]
  end

  @spec lines([Route.t()]) :: iolist
  defp lines(routes) do
    routes
    |> Enum.map(&(&1.type |> Route.type_atom() |> Route.type_name()))
    |> Enum.uniq()
    |> Util.AndOr.join(:and)
  end

  @spec location(Stop.t()) :: String.t()
  defp location(stop) do
    if stop.address && stop.address != "" do
      gettext(" at %{address}", address: stop.address)
    else
      ""
    end
  end
end
