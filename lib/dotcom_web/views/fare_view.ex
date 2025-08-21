defmodule DotcomWeb.FareView do
  @moduledoc """
  View for the Fares section of the website.
  """
  use DotcomWeb, :view

  alias CMS.Partial.Paragraph.{
    Description,
    DescriptionList
  }

  alias DotcomWeb.PartialView.SvgIconWithCircle
  alias Fares.Summary
  alias Phoenix.HTML
  alias Plug.Conn
  alias Routes.Route
  alias Util.Position

  @doc """
  Returns the url to view directions to a location on https://maps.google.com.
  """
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

  @doc "Renders a summary of fares into HTML"
  def summarize(summaries, opts \\ []) do
    render("_summary.html",
      summaries: summaries,
      class: opts[:class],
      link_class: Keyword.get(opts, :link_class, "")
    )
  end

  def summary_url(%Summary{url: url}) when not is_nil(url), do: url

  def summary_url(%Summary{modes: [subway_or_bus | _], duration: duration})
      when subway_or_bus in [:subway, :bus] do
    anchor =
      cond do
        duration in ~w(day week)a -> "#7-day"
        duration in ~w(month)a -> "#monthly"
        true -> ""
      end

    do_summary_url(subway_or_bus, anchor)
  end

  def summary_url(%Summary{modes: [mode | _]}) do
    do_summary_url(mode)
  end

  defp do_summary_url(name, anchor \\ "") do
    name
    |> Atom.to_string()
    |> String.replace("_", "-")
    |> then(fn name ->
      fare_path(DotcomWeb.Endpoint, :show, name <> "-fares") <> anchor
    end)
  end

  def fare_passes(:subway) do
    %DescriptionList{
      descriptions: [
        %Description{
          term: fare_pass_name("7-Day Pass"),
          details: fare_pass_price("{{fare:subway:week}}")
        },
        %Description{
          term: fare_pass_name("Monthly LinkPass"),
          details: fare_pass_price("{{fare:subway:month}}")
        }
      ]
    }
  end

  def fare_passes(:bus) do
    %DescriptionList{
      descriptions: [
        %Description{
          term: fare_pass_name("Express Bus One-Way"),
          details: fare_pass_price("{{fare:express_bus:charlie_card}}")
        },
        %Description{
          term: fare_pass_name("Monthly Local Bus Pass"),
          details: fare_pass_price("{{fare:local_bus:month}}")
        },
        %Description{
          term: fare_pass_name("7-Day Pass"),
          details: fare_pass_price("{{fare:subway:week}}")
        }
      ]
    }
  end

  def fare_passes(:commuter_rail) do
    %DescriptionList{
      descriptions: [
        %Description{
          term: fare_pass_name("Commuter Rail Monthly Pass"),
          details: fare_pass_price("{{fare:commuter_rail:month:commuter_ticket}}")
        }
      ]
    }
  end

  def fare_passes(:ferry) do
    %DescriptionList{
      descriptions: [
        %Description{
          term: fare_pass_name("Ferry Monthly Pass"),
          details: fare_pass_price("{{fare:ferry:month:charlie_ticket}}")
        }
      ]
    }
  end

  defp fare_pass_name(name), do: content_tag(:h3, name, class: "c-fare-pass__name")

  defp fare_pass_price(price),
    do: content_tag(:span, price, class: "h2 c-fare-pass__price")

  def fare_overview_link(mode, conn) do
    link(
      "View fares overview",
      to:
        cms_static_page_path(
          conn,
          "/fares/#{mode |> Atom.to_string() |> String.replace("_", "-")}-fares"
        ),
      class: "c-call-to-action"
    )
  end
end
