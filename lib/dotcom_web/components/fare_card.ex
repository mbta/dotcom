defmodule DotcomWeb.Components.FareCard do
  @moduledoc """
  A component that will render a fare card given a route
  Current status as of Sept 2026:  Existing fare cards are pulled with CMS involved, new cards only use data within dotcom
  """
  use DotcomWeb, :component

  import DotcomWeb.ModeView, only: [mode_fare_card: 1]

  @dialyzer {:nowarn_function, fare_card: 1}
  @ferry_routes_to_fare_names %{
    "Boat-F1" => :commuter_ferry,
    "Boat-F2H" => :commuter_ferry,
    "Boat-F4" => :ferry_charlestown,
    "Boat-F6" => :ferry_winthrop,
    "Boat-F7" => :ferry_winthrop,
    "Boat-F8" => :ferry_winthrop,
    "Boat-F10" => :ferry_harbor_loop,
    "Boat-EastBoston" => :ferry_cross_harbor,
    "Boat-Lynn" => :ferry_lynn
  }

  # Free fare card (for free bus routes)
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

  # Silver Line rapid transit fare (same as subway)
  def fare_card(%{route: %{fare_class: :rapid_transit_fare, type: 3}} = assigns) do
    full_fare =
      Fares.Repo.for_fare_class(:rapid_transit_fare)
      |> Fares.Repo.filter(%{duration: :single_trip, includes_media: :charlie_card})
      |> List.first()
      |> Map.get(:cents)

    reduced_fare =
      Fares.Repo.for_fare_class(:rapid_transit_fare)
      |> Fares.Repo.filter(%{duration: :single_trip, includes_media: :student_card})
      |> List.first()
      |> Map.get(:cents)

    assigns = assigns |> assign(:full_fare, full_fare) |> assign(:reduced_fare, reduced_fare)

    ~H"""
    <div class="c-fare-card--subway c-fare-card--grouped c-fare-card">
      <div class="c-fare-card__header">
        <div class="c-fare-card__icon">
          <DotcomWeb.Components.RouteSymbols.route_icon
            route={%Routes.Route{type: 3}}
            class="c-svg__icon c-svg-icon__rapid-bus"
          />
        </div>
        <h3 class="c-fare-card__name">{~t"Silver Line One-Way"}<sup>*</sup></h3>
      </div>
      <div class="c-multi-column__column border-b-2">
        <h4 class="mt-0">{Fares.Format.price(@full_fare)}</h4>
        <p>
          {gettext("with %{ccard}, %{ctick}, contactless payment, or cash", %{
            ccard: "CharlieCard",
            ctick: "CharlieTicket"
          })}
        </p>
      </div>
      <div class="c-multi-column__column">
        <h4 class="mt-0">{Fares.Format.price(@reduced_fare)}</h4>
        <p>
          {gettext("with reduced fare card")}<br />
          <a href="/fares/reduced-fares">{~t"Learn more about reduced fares"}</a>
        </p>
      </div>
    </div>
    <.fare_note route={@route} />
    """
  end

  # Ferry Fare cards that vary depending on the route
  def fare_card(%{route: %{type: 4, id: id}} = assigns) do
    full_fare =
      Fares.Repo.for_fare_class(:ferry_fare)
      |> Fares.Repo.filter(%{
        duration: :single_trip,
        includes_media: :cash,
        name: @ferry_routes_to_fare_names |> Map.get(id)
      })
      |> List.first()
      |> Map.get(:cents)

    reduced_fare =
      Fares.Repo.for_fare_class(:ferry_fare)
      |> Fares.Repo.filter(%{
        duration: :single_trip,
        includes_media: :student_card,
        name: @ferry_routes_to_fare_names |> Map.get(id)
      })
      |> List.first()
      |> Map.get(:cents)

    assigns = assigns |> assign(:full_fare, full_fare) |> assign(:reduced_fare, reduced_fare)

    ~H"""
    <div class="c-fare-card--ferry c-fare-card--grouped c-fare-card">
      <div class="c-fare-card__header">
        <div class="c-fare-card__icon">
          <DotcomWeb.Components.RouteSymbols.route_icon
            route={%Routes.Route{type: 4}}
            class="c-svg__icon"
          />
        </div>
        <h3 class="c-fare-card__name">{gettext("%{route} One-Way", %{route: @route.long_name})}</h3>
      </div>
      <div class="c-multi-column__column border-b-2">
        <h4 class="mt-0">{Fares.Format.price(@full_fare)}</h4>
        <p>
          {gettext("with %{ccard}, %{ctick}, contactless payment, or cash", %{
            ccard: "CharlieCard",
            ctick: "CharlieTicket"
          })}
        </p>
      </div>
      <div class="c-multi-column__column">
        <h4 class="mt-0">{Fares.Format.price(@reduced_fare)}</h4>
        <p>
          {gettext("with reduced fare card")}<br />
          <a href="/fares/reduced-fares">{~t"Learn more about reduced fares"}</a>
        </p>
      </div>
    </div>
    <.fare_note route={@route} />
    """
  end

  # Stock CMS fare cards already in use on the site
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
