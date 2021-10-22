defmodule Site.TripPlan.RelatedLink do
  @moduledoc """
  A link related to a particular itinerary.
  """
  @type t :: %__MODULE__{
          text: iodata,
          url: String.t(),
          icon_name: icon_name
        }
  @type icon_name :: Routes.Route.gtfs_route_type() | Routes.Route.subway_lines_type() | nil

  defstruct text: "",
            url: "",
            icon_name: nil

  @default_opts [route_by_id: &Routes.Repo.get/1, stop_by_id: &Stops.Repo.get_parent/1]

  import Phoenix.HTML.Link, only: [link: 2]
  # Need a view in order to use the components. Ideally we'd have a separate
  # module, but that doesn't work at the moment.
  import SiteWeb.Router.Helpers
  alias TripPlan.{Itinerary, Leg}
  alias Routes.Route
  alias SiteWeb.PartialView.SvgIconWithCircle

  @doc "Returns a new RelatedLink"
  @spec new(text, url, icon_name) :: t when text: iodata, url: String.t()
  def new(text, url, icon_name \\ nil)
      when is_binary(url) and (is_binary(text) or is_list(text)) do
    %__MODULE__{
      text: text,
      url: url,
      icon_name: icon_name
    }
  end

  @doc "Returns the text of the link as a binary"
  @spec text(t) :: binary
  def text(%__MODULE__{text: text}) do
    IO.iodata_to_binary(text)
  end

  @doc "Returns the URL of the link"
  @spec url(t) :: String.t()
  def url(%__MODULE__{url: url}) do
    url
  end

  @doc "Returns the HTML link for the RelatedLink"
  @spec as_html(t) :: Phoenix.HTML.Safe.t()
  def as_html(%__MODULE__{} = rl) do
    link to: rl.url do
      [
        optional_icon(rl.icon_name),
        rl.text
      ]
    end
  end

  @doc "Builds a list of related links for an Itinerary"
  @spec links_for_itinerary(Itinerary.t(), Keyword.t()) :: [t]
  def links_for_itinerary(itinerary, opts \\ []) do
    opts = Keyword.merge(@default_opts, opts)

    for func <- [&route_links/2, &fare_links/2],
        link <- func.(itinerary, opts) do
      link
    end
  end

  defp optional_icon(nil), do: []

  defp optional_icon(icon_name) do
    SvgIconWithCircle.svg_icon_with_circle(%SvgIconWithCircle{icon: icon_name, size: :small})
  end

  defp route_links(itinerary, opts) do
    route_by_id = Keyword.get(opts, :route_by_id)
    not_shuttle? = fn route -> route.description !== :rail_replacement_bus end

    for {route_id, trip_id} <- Itinerary.route_trip_ids(itinerary),
        %Route{} = route <- [route_by_id.(route_id)],
        not_shuttle?.(route) do
      route_link(route, trip_id, itinerary)
    end
  end

  defp route_link(route, trip_id, itinerary) do
    icon_name = Route.icon_atom(route)

    cond do
      String.starts_with?(route.id, "Massport") ->
        new("Massport schedules", "https://massport.com/", icon_name)

      route.custom_route? ->
        leg = Enum.find(itinerary.legs, &match?(%TripPlan.Leg{url: url} when url != nil, &1))
        new("Route information", leg.url, icon_name)

      true ->
        base_text =
          if Route.type_atom(route) == :bus do
            ["Route ", route.name]
          else
            route.name
          end

        date = Date.to_iso8601(itinerary.start)
        url = schedule_path(SiteWeb.Endpoint, :show, route, date: date, trip: trip_id)
        new([base_text, " schedules"], url, icon_name)
    end
  end

  defp fare_links(itinerary, opts) do
    route_by_id = Keyword.get(opts, :route_by_id)

    for leg <- itinerary,
        {:ok, route_id} <- [Leg.route_id(leg)],
        %Route{custom_route?: false} = route <- [route_by_id.(route_id)] do
      fare_link(route, leg, opts)
    end
    |> Enum.uniq()
    |> simplify_fare_text
  end

  defp fare_link(route, leg, opts) do
    type_atom = Route.type_atom(route)
    text = fare_link_text(type_atom)
    {fare_section, opts} = fare_link_url_opts(type_atom, leg, opts)
    url = fare_path(SiteWeb.Endpoint, :show, fare_section, opts)
    new(["View ", text, " fare information"], url)
  end

  defp fare_link_text(type) when type in [:commuter_rail, :ferry, :bus, :subway] do
    Atom.to_string(type) |> String.replace("_", " ")
  end

  defp fare_link_url_opts(type, leg, opts) when type in [:commuter_rail, :ferry] do
    stop_by_id = Keyword.get(opts, :stop_by_id)

    link_opts =
      for {key, stop_id} <- [origin: leg.from.stop_id, destination: leg.to.stop_id],
          is_binary(stop_id) do
        # fetch a parent stop ID
        stop_id = stop_by_id.(stop_id).id
        {key, stop_id}
      end

    {type, link_opts}
  end

  defp fare_link_url_opts(type, _leg, _opts) when type in [:bus, :subway] do
    {"#{type}-fares", []}
  end

  # if there are multiple fare links, show fare overview link
  defp simplify_fare_text(fare_links) when Kernel.length(fare_links) > 1,
    do: [fare_overview_link()]

  defp simplify_fare_text([fare_link]) do
    # if there's only one fare link, change the text to "View fare information"
    [%{fare_link | text: "View fare information"}]
  end

  defp simplify_fare_text(fare_links) do
    fare_links
  end

  defp fare_overview_link do
    new(["View fare information"], "/fares")
  end
end

defimpl Phoenix.HTML.Safe, for: Site.TripPlan.RelatedLink do
  alias Site.TripPlan.RelatedLink

  def to_iodata(rl) do
    rl
    |> RelatedLink.as_html()
    |> Phoenix.HTML.Safe.to_iodata()
  end
end
