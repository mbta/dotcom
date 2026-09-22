defmodule DotcomWeb.Components.FareCard do
  @moduledoc """
  A component that will render a fare card given a route
  Current status as of Sept 2026:  Existing fare cards are pulled with CMS involved, new cards only use data within dotcom
  """
  use DotcomWeb, :component

  import DotcomWeb.ModeView, only: [mode_fare_card: 1]

  @dialyzer {:nowarn_function, fare_card: 1}

  def fare_card(%{route: %{fare_class: :free_fare}} = assigns) do
    ~H"""
    <div class="c-fare-card--bus c-fare-card--grouped c-fare-card">
      <div class="c-fare-card__header">
        <div class="c-fare-card__icon">
          <DotcomWeb.Components.RouteSymbols.route_icon route={@route} class="c-svg__icon" />
        </div>
        <h3 class="c-fare-card__name">{~t"Fare-Free Bus"}</h3>
      </div>
      <div class="c-multi-column__column">
        <h4 class="mt-0">{~t"Free"}</h4>
        <p>
          {~t"Service on this route is free"}<br />
          <a class="underline text-sm" href="/projects/fare-free-program-routes-23-28-and-29">
            {~t"Learn more about the Fare-Free Program"}
          </a>
        </p>
      </div>
    </div>
    <.fare_note route={@route} />
    """
  end

  def fare_card(%{route: %{fare_class: :rapid_transit_fare, type: 3}} = assigns) do
    ~H"""
    <div class="text-lg m-[2rem] text-center">RAPID TRANSIT</div>
    <.fare_note route={@route} />
    """
  end

  def fare_card(%{route: %{type: 4, id: id}} = assigns) do
    ~H"""
    <div class="text-lg m-[2rem] text-center">FERRY: {id}</div>
    <.fare_note route={@route} />
    """
  end

  def fare_card(%{route: route} = assigns) do
    ~H"""
    {mode_fare_card(route |> Routes.Route.type_atom())
    |> DotcomWeb.PartialView.paragraph(%Plug.Conn{query_params: %{}})}
    <.fare_note route={@route} />
    """
  end

  def fare_note(assigns) do
    ~H"""
    <div class="text-sm">
      <div :if={@route.id in ["741", "742", "743", "746"]}>
        {~t"﹡SL1, SL2, SL3, and SLW are priced as subway fares"}
      </div>
      <div class="text-sm">
        <.fare_link route={@route} />
      </div>
    </div>
    """
  end

  def fare_link(%{route: %{type: type}} = assigns) when type in [0, 1] do
    ~H"""
    <a href="/fares/subway-fares">{~t"More subway fare options"}</a>
    """
  end

  def fare_link(%{route: %{type: 2}} = assigns) do
    ~H"""
    <a href="/fares/commuter-rail-fares">{~t"More Commuter Rail fare options"}</a>
    """
  end

  def fare_link(%{route: %{type: 3, id: id}} = assigns) when id in ~w(741 742 743 746) do
    ~H"""
    <a href="/fares/subway-fares">{~t"More subway fare options"}</a>
    """
  end

  def fare_link(%{route: %{type: 3}} = assigns) do
    ~H"""
    <a href="/fares/bus-fares">{~t"More bus fare options"}</a>
    """
  end

  def fare_link(%{route: %{type: 4}} = assigns) do
    ~H"""
    <a href="/fares/ferry-fares">{~t"More ferry fare options"}</a>
    """
  end
end
