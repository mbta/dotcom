defmodule DotcomWeb.Hooks.Breadcrumbs do
  @moduledoc """
  Assign the breadcrumbs, before both disconnected and connected mounts.
  """

  use Dotcom.Gettext.Sigils
  use DotcomWeb, :verified_routes

  import Phoenix.Component, only: [assign: 3]
  import Util.Breadcrumb

  def on_mount(:search_page, _params, _session, socket) do
    {:cont, assign(socket, :breadcrumbs, [build(~t"Search")])}
  end

  def on_mount(:trip_planner, _params, _session, socket) do
    {:cont, assign(socket, :breadcrumbs, [build(~t"Trip Planner")])}
  end

  def on_mount(:world_cup_timetable, _params, _session, socket) do
    {:cont,
     assign(socket, :breadcrumbs, [
       build(~t"Schedules & Maps", ~p"/schedules"),
       build(~t"Commuter Rail", ~p"/schedules/commuter-rail"),
       build(~t"Boston Stadium Trains")
     ])}
  end

  def on_mount(:departures, %{"route_id" => route_id}, _session, socket) do
    long_name = Routes.Repo.get(route_id) |> Map.get(:name)

    {:cont,
     assign(socket, :breadcrumbs, [
       build(~t"Departures", ~p"/departures"),
       build(long_name, ~p"/schedules/#{route_id}/line")
     ])}
  end

  # catch-all case
  def on_mount(:default, _params, _session, socket), do: {:cont, socket}
end
