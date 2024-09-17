defmodule Dotcom.TripPlan.RelatedLink do
  @moduledoc """
  A link related to a particular itinerary.
  """

  # Need a view in order to use the components. Ideally we'd have a separate
  # module, but that doesn't work at the moment.
  import DotcomWeb.Router.Helpers
  import PhoenixHTMLHelpers.Link, only: [link: 2]

  alias DotcomWeb.PartialView.SvgIconWithCircle
  alias Routes.Route
  alias TripPlan.{Itinerary, Leg, TransitDetail}

  @stops_repo Application.compile_env!(:dotcom, :repo_modules)[:stops]

  defstruct text: "",
            url: "",
            icon_name: nil

  @type t :: %__MODULE__{
          text: iodata,
          url: String.t(),
          icon_name: icon_name
        }
  @type icon_name :: Routes.Route.gtfs_route_type() | Routes.Route.subway_lines_type() | nil

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
  @spec links_for_itinerary(Itinerary.t()) :: [t]
  def links_for_itinerary(itinerary) do
    for func <- [&route_links/1, &fare_links/1],
        link <- func.(itinerary) do
      link
    end
  end

  defp optional_icon(nil), do: []

  defp optional_icon(icon_name) do
    SvgIconWithCircle.svg_icon_with_circle(%SvgIconWithCircle{icon: icon_name, size: :small})
  end

  defp route_links(itinerary) do
    not_shuttle? = fn route -> route.description !== :rail_replacement_bus end

    for %Leg{mode: %TransitDetail{route: route, trip_id: trip_id}} <- itinerary.legs,
        not_shuttle?.(route) do
      route_link(route, trip_id, itinerary)
    end
  end

  defp route_link(
         %Route{external_agency_name: "Logan Express", name: name, long_name: long_name} = route,
         _,
         _
       ) do
    url =
      if name == "BB" do
        "https://www.massport.com/logan-airport/to-from-logan/transportation-options/logan-express/back-bay/"
      else
        route_name = String.split(long_name, " ") |> List.first()
        "https://www.massport.com/logan-airport/getting-to-logan/logan-express/#{route_name}"
      end

    new("#{long_name} schedules", url, route)
  end

  defp route_link(%Route{external_agency_name: "Massport"}, _, _) do
    url = "https://massport.com/"
    new("Massport schedules", url, :massport_shuttle)
  end

  defp route_link(route, trip_id, itinerary) do
    icon_name = Route.icon_atom(route)
    date = Date.to_iso8601(itinerary.start)
    url = schedule_path(DotcomWeb.Endpoint, :show, route, date: date, trip: trip_id)

    route
    |> link_text()
    |> new(url, icon_name)
  end

  defp link_text(%Route{type: 3} = route) do
    "#{route.name} Bus schedules"
  end

  defp link_text(route) do
    "#{route.long_name} schedules"
  end

  defp fare_links(itinerary) do
    for %Leg{mode: %TransitDetail{route: %Route{external_agency_name: nil} = route}} = leg <-
          itinerary.legs do
      fare_link(route, leg)
    end
    |> Enum.uniq()
    |> simplify_fare_text
  end

  defp fare_link(route, leg) do
    type_atom = Route.type_atom(route)
    text = fare_link_text(type_atom)
    {fare_section, opts} = fare_link_url_opts(type_atom, leg)
    url = fare_path(DotcomWeb.Endpoint, :show, fare_section, opts)
    new(["View ", text, " fare information"], url)
  end

  defp fare_link_text(type) when type in [:commuter_rail, :ferry, :bus, :subway] do
    Atom.to_string(type) |> String.replace("_", " ")
  end

  defp fare_link_url_opts(type, leg) when type in [:commuter_rail, :ferry] do
    link_opts =
      for {key, stop_id} <- [origin: leg.from.stop.id, destination: leg.to.stop.id],
          is_binary(stop_id) do
        # fetch a parent stop ID
        stop_id = @stops_repo.get_parent(stop_id).id
        {key, stop_id}
      end

    {type, link_opts}
  end

  defp fare_link_url_opts(type, _leg) when type in [:bus, :subway] do
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

defimpl Phoenix.HTML.Safe, for: Dotcom.TripPlan.RelatedLink do
  alias Dotcom.TripPlan.RelatedLink

  def to_iodata(rl) do
    rl
    |> RelatedLink.as_html()
    |> Phoenix.HTML.Safe.to_iodata()
  end
end
