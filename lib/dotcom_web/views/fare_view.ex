defmodule DotcomWeb.FareView do
  @moduledoc """
  View for the Fares section of the website.
  """

  use DotcomWeb, :view

  alias CMS.Partial.Paragraph.{
    Description,
    DescriptionList
  }

  alias Phoenix.HTML
  alias Plug.Conn
  alias Routes.Route
  alias Util.Position

  @doc """
  Returns the url to view directions to a location on https://maps.google.com.
  """
  @spec direction_map_url(Position.t(), Position.t()) :: String.t()
  def direction_map_url(origin, destination) do
    origin_lat = Position.latitude(origin)
    origin_lng = Position.longitude(origin)
    dest_lat = Position.latitude(destination)
    dest_lng = Position.longitude(destination)

    path =
      Path.join([
        "/",
        "maps",
        "dir",
        URI.encode("#{origin_lat},#{origin_lng}"),
        URI.encode("#{dest_lat},#{dest_lng}")
      ])

    URI.parse("https://maps.google.com")
    |> URI.append_path(path)
    |> URI.to_string()
  end

  @spec fare_passes(Route.gtfs_route_type()) :: DescriptionList.t()
  def fare_passes(:subway) do
    %DescriptionList{
      descriptions: [
        %Description{
          term: fare_pass_name(~t"7-Day Pass"),
          details: fare_pass_price("{{fare:subway:week}}")
        },
        %Description{
          term: fare_pass_name(~t"Monthly LinkPass"),
          details: fare_pass_price("{{fare:subway:month}}")
        }
      ]
    }
  end

  def fare_passes(:bus) do
    %DescriptionList{
      descriptions: [
        %Description{
          term: fare_pass_name(~t"Express Bus One-Way"),
          details: fare_pass_price("{{fare:express_bus:charlie_card}}")
        },
        %Description{
          term: fare_pass_name(~t"Monthly Local Bus Pass"),
          details: fare_pass_price("{{fare:local_bus:month}}")
        },
        %Description{
          term: fare_pass_name(~t"7-Day Pass"),
          details: fare_pass_price("{{fare:subway:week}}")
        }
      ]
    }
  end

  def fare_passes(:commuter_rail) do
    %DescriptionList{
      descriptions: [
        %Description{
          term: fare_pass_name(~t"Commuter Rail Monthly Pass"),
          details: fare_pass_price("{{fare:commuter_rail:month:commuter_ticket}}")
        }
      ]
    }
  end

  def fare_passes(:ferry) do
    %DescriptionList{
      descriptions: [
        %Description{
          term: fare_pass_name(~t"Ferry Monthly Pass"),
          details: fare_pass_price("{{fare:ferry:month:charlie_ticket}}")
        }
      ]
    }
  end

  @spec fare_pass_name(String.t()) :: HTML.safe()
  defp fare_pass_name(name), do: content_tag(:h3, name, class: "c-fare-pass__name")

  @spec fare_pass_price(String.t()) :: HTML.safe()
  defp fare_pass_price(price),
    do: content_tag(:span, price, class: "h2 c-fare-pass__price")

  @spec fare_overview_link(Route.gtfs_route_type(), Conn.t()) :: HTML.safe()
  def fare_overview_link(mode, conn) do
    link(
      ~t"View fares overview",
      to:
        cms_static_page_path(
          conn,
          "/fares/#{mode |> Atom.to_string() |> String.replace("_", "-")}-fares"
        ),
      class: "c-call-to-action"
    )
  end
end
