defmodule DotcomWeb.WhereTrainsLive do
  alias DotcomWeb.WorldCupTimetable
  use DotcomWeb, :live_view
  import CSSHelpers
  alias Vehicles.Vehicle

  @vehicles_repo Application.compile_env!(:dotcom, :repo_modules)[:vehicles]

  @impl LiveView
  def mount(_params, _session, socket) do
    {:ok, socket}
  end

  @impl LiveView
  def render(assigns) do
    vehicles = Vehicles.Repo.all()
    assigns = assigns |> assign(:vehicles, vehicles)

    ~H"""
    <div class="container">
      <.show_vehicle :for={vehicle <- @vehicles} assigns={assigns} vehicle={vehicle} />
    </div>
    """
  end

  def show_vehicle(assigns) do
    ~H"""
    <div>
      {@vehicle.id} serving {@vehicle.route_id} is at {@vehicle.longitude}, {@vehicle.latitude}
    </div>
    """
  end
end
