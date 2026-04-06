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

  # catch-all case
  def on_mount(:default, _params, _session, socket), do: {:cont, socket}
end
