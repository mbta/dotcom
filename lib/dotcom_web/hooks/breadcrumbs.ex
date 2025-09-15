defmodule DotcomWeb.Hooks.Breadcrumbs do
  @moduledoc """
  Assign the breadcrumbs, before both disconnected and connected mounts.
  """

  use Dotcom.Gettext.Sigils

  import Phoenix.Component, only: [assign: 3]
  import Util.Breadcrumb

  def on_mount(:search_page, _params, _session, socket) do
    {:cont, assign(socket, :breadcrumbs, [build(~t"Search")])}
  end

  def on_mount(:trip_planner, _params, _session, socket) do
    {:cont, assign(socket, :breadcrumbs, [build(~t"Trip Planner")])}
  end

  # catch-all case
  def on_mount(:default, _params, _session, socket), do: {:cont, socket}
end
