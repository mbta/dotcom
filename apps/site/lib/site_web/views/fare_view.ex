defmodule SiteWeb.FareView do
  use SiteWeb, :view

  alias Content.Field.Link

  alias Content.Paragraph.{
    Column,
    CustomHTML,
    Description,
    DescriptionList,
    FareCard
  }

  alias Fares.{Fare, Format, Summary}
  alias Phoenix.HTML
  alias Plug.Conn
  alias Routes.Route
  alias SiteWeb.PartialView.SvgIconWithCircle
  alias Util.AndOr

  defdelegate description(fare, assigns), to: SiteWeb.FareView.Description

  @doc "Renders a summary of fares into HTML"
  @spec summarize([Summary.t()], Keyword.t()) :: HTML.safe()
  def summarize(summaries, opts \\ []) do
    render("_summary.html",
      summaries: summaries,
      class: opts[:class],
      link_class: Keyword.get(opts, :link_class, "")
    )
  end

  @doc "Return the reduced fare note for the given fare"
  @spec fare_type_note(Plug.Conn.t(), Fare.t()) :: HTML.safe() | nil
  def fare_type_note(conn, %Fare{reduced: :student}) do
    [
      content_tag(
        :span,
        [
          "Middle and high school students with an MBTA-issued ",
          link(
            "Student CharlieCard",
            to: cms_static_page_path(conn, "/fares/reduced/student-charliecards"),
            data: [turbolinks: "false"]
          ),
          " or a current school ID are eligible for reduced Commuter Rail fares. Students with M7 CharlieCards can travel free up to Zone 2 and are eligible for reduced interzone fares."
        ]
      ),
      content_tag(
        :p,
        [
          "College students are not eligible for these discounts, but may be able to purchase a ",
          link(
            "Semester Pass",
            to: "https://passprogram.mbta.com/Public/ppinfo.aspx?p=u",
            data: [turbolinks: "false"]
          ),
          " through their school."
        ]
      )
    ]
  end

  def fare_type_note(conn, %Fare{reduced: :senior_disabled}) do
    content_tag :span do
      [
        "Seniors are eligible for reduced fares on the subway, bus, Commuter Rail, and ferry with a ",
        link(
          "Senior CharlieCard",
          to: cms_static_page_path(conn, "/fares/reduced/senior-charliecard"),
          data: [turbolinks: "false"]
        ),
        " or state-issued ID. People with disabilities are eligible for reduced fares with a ",
        link(
          "Transportation Access Pass (TAP)",
          to: cms_static_page_path(conn, "/fares/reduced/transportation-access-pass"),
          data: [turbolinks: "false"]
        ),
        ". People who are blind or have low vision ride all MBTA services for free with a ",
        link(
          "Blind Access Card",
          to: cms_static_page_path(conn, "/fares/reduced/blind-access-charliecard"),
          data: [turbolinks: "false"]
        ),
        "."
      ]
    end
  end

  def fare_type_note(_conn, %Fare{reduced: nil, mode: mode}) when mode in [:bus, :subway] do
    content_tag :span do
      ~s(For information about 1-day, 7-day, and monthly passes, click on the "Passes" tab below.)
    end
  end

  def fare_type_note(_conn, %Fare{reduced: nil, mode: :ferry}) do
    content_tag :span do
      ~s(You can buy a ferry ticket after you board the boat, but we recommend buying your ticket or pass in advance.)
    end
  end

  def fare_type_note(_conn, %Fare{reduced: nil, mode: :commuter_rail}) do
    content_tag(:span, [
      ~s(Tickets purchased on board the train in cash may include a $3 surcharge, and may only be valid until the end of service that day. ),
      link("Learn more about paying your Commuter Rail fare.",
        to: cms_static_page_path(SiteWeb.Endpoint, "/fares/commuter-rail-fares")
      )
    ])
  end

  def fare_type_note(_conn, _fare) do
    nil
  end

  @spec summary_url(Summary.t()) :: String.t()
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

  @spec do_summary_url(atom, String.t()) :: String.t()
  defp do_summary_url(name, anchor \\ "") do
    fare_path(SiteWeb.Endpoint, :show, SiteWeb.StaticPage.convert_path(name) <> "-fares") <>
      anchor
  end

  @spec callout(Fare.t()) :: String.t() | iolist
  def callout(%Fare{name: :inner_express_bus}) do
    [AndOr.join(Fares.inner_express(), :and), "."]
  end

  def callout(%Fare{name: :outer_express_bus}) do
    [AndOr.join(Fares.outer_express(), :and), "."]
  end

  def callout(%Fare{}), do: ""

  def callout_description(%Fare{name: name})
      when name == :outer_express_bus or name == :inner_express_bus do
    "Routes "
  end

  def callout_description(%Fare{}), do: ""

  @doc "Returns the svg icons for the modes passed in"
  @spec fare_mode_icons([:bus | :subway | :commuter_rail | :ferry]) :: HTML.safe()
  def fare_mode_icons(modes) do
    content_tag :span, class: "payment-method-modes no-wrap" do
      for mode <- modes do
        svg_icon_with_circle(%SvgIconWithCircle{icon: mode, size: :small})
      end
    end
  end

  @doc "Display name for given fare"
  @spec format_name(Fare.t(), map()) :: HTML.safe()
  def format_name(%Fare{mode: :ferry} = base_fare, %{origin: origin, destination: destination}) do
    content_tag :span do
      [
        origin.name,
        " ",
        fa("arrow-right"),
        " ",
        destination.name,
        " ",
        content_tag(:span, Fares.Format.duration(base_fare), class: "no-wrap")
      ]
    end
  end

  def format_name(base_fare, _assigns) do
    Fares.Format.full_name(base_fare)
  end

  @doc "Filter out key stops that are not in possible destinations"
  @spec destination_key_stops([Stops.Stop.t()], [Stops.Stop.t()]) :: [Stops.Stop.t()]
  def destination_key_stops(destination_stops, key_stops) do
    key_stop_ids = Enum.map(key_stops, & &1.id)

    destination_stops
    |> Enum.filter(&(&1.id in key_stop_ids))
  end

  @doc "Summary copy for describing origin-destination modes."
  @spec origin_destination_description(:commuter_rail | :ferry) :: HTML.safe()
  def origin_destination_description(:commuter_rail) do
    content_tag(:p, [
      "Select your origin and destination stations from the drop-down lists below to find your Commuter Rail fare."
    ])
  end

  def origin_destination_description(:ferry) do
    content_tag(:p, [
      "Select your origin and destination stops from the drop-down lists below to find your ferry fare."
    ])
  end

  def charlie_card_store_link(conn) do
    content_tag :span, class: "no-wrap" do
      [
        "(",
        link(
          "view details",
          to: Path.join(fare_path(conn, :show, :charlie_card), "#store"),
          "data-turbolinks": "false"
        ),
        ")"
      ]
    end
  end

  @spec cta_for_mode(Plug.Conn.t(), :commuter_rail | :ferry) :: HTML.safe()
  def cta_for_mode(conn, mode) do
    name = Routes.Route.type_name(mode)

    mode =
      mode
      |> Atom.to_string()
      |> String.replace("_", "-")

    url = "/fares/" <> mode <> "-fares"

    content_tag(
      :p,
      do: [
        link(
          ["Learn more about ", name, " fares "],
          to: cms_static_page_path(conn, url),
          class: "c-call-to-action"
        )
      ]
    )
  end

  @spec fare_card(Route.gtfs_route_type()) :: Column.t()
  def fare_card(:subway) do
    %Column{
      paragraphs: [
        %FareCard{
          fare_token: "subway:charlie_card",
          note: %CustomHTML{
            body: content_tag(:p, "#{fare_price("subway:cash")} with a CharlieTicket or cash")
          },
          link: %Link{url: "/fares/subway-fares"}
        }
      ]
    }
  end

  def fare_card(:bus) do
    %Column{
      paragraphs: [
        %FareCard{
          fare_token: "local_bus:charlie_card",
          note: %CustomHTML{
            body: content_tag(:p, "#{fare_price("local_bus:cash")} with a CharlieTicket or cash")
          },
          link: %Link{url: "/fares/bus-fares"}
        }
      ]
    }
  end

  def fare_card(:commuter_rail) do
    %Column{
      paragraphs: [
        %FareCard{
          fare_token: "commuter_rail",
          note: %CustomHTML{body: content_tag(:p, "Price based on distance traveled")},
          link: %Link{url: "/fares/commuter-rail-fares"}
        }
      ]
    }
  end

  def fare_card(:ferry) do
    %Column{
      paragraphs: [
        %FareCard{
          fare_token: "ferry",
          note: %CustomHTML{body: content_tag(:p, "Price based on route taken")},
          link: %Link{url: "/fares/ferry-fares"}
        }
      ]
    }
  end

  @spec fare_card_double(:subway | :bus) :: [Column.t()]
  def fare_card_double(:subway) do
    [
      %Column{
        paragraphs: [
          %FareCard{
            fare_token: "subway:charlie_card",
            link: %Link{url: "/fares/subway-fares"},
            note: %CustomHTML{
              body: content_tag(:p, "1 free transfer to Local Bus within 2 hours"),
              right_rail: nil
            }
          }
        ]
      },
      %Column{
        paragraphs: [
          %FareCard{
            fare_token: "subway:cash",
            link: nil,
            note: %CustomHTML{
              body: content_tag(:p, "Limited transfers"),
              right_rail: nil
            }
          }
        ]
      }
    ]
  end

  def fare_card_double(:bus) do
    [
      %Column{
        paragraphs: [
          %FareCard{
            fare_token: "local_bus:charlie_card",
            link: %Link{url: "/fares/bus-fares"},
            note: %CustomHTML{
              body: content_tag(:p, "1 free transfer to Local Bus within 2 hours"),
              right_rail: nil
            }
          }
        ]
      },
      %Column{
        paragraphs: [
          %FareCard{
            fare_token: "local_bus:cash",
            link: nil,
            note: %CustomHTML{
              body: content_tag(:p, "Limited transfers")
            }
          }
        ]
      }
    ]
  end

  @spec fare_passes(Route.gtfs_route_type()) :: DescriptionList.t()
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
          term: fare_pass_name("Inner Express Bus One-Way"),
          details: fare_pass_price("{{fare:inner_express_bus:charlie_card}}")
        },
        %Description{
          term: fare_pass_name("Outer Express Bus One-Way"),
          details: fare_pass_price("{{fare:outer_express_bus:charlie_card}}")
        },
        %Description{
          term: fare_pass_name("Monthly LinkPass"),
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

  @spec fare_pass_name(String.t()) :: HTML.safe()
  defp fare_pass_name(name), do: content_tag(:h3, name, class: "c-fare-pass__name")

  @spec fare_pass_price(String.t()) :: HTML.safe()
  defp fare_pass_price(price), do: content_tag(:span, price, class: "h2 c-fare-pass__price")

  @spec fare_finder_link(Route.gtfs_route_type(), Conn.t()) :: HTML.safe()
  def fare_finder_link(:commuter_rail, conn) do
    content_tag(:p, [
      link(
        "Commuter Rail Fare Finder",
        to: cms_static_page_path(conn, "/fares/commuter-rail"),
        class: "c-call-to-action"
      )
    ])
  end

  def fare_finder_link(:ferry, conn) do
    content_tag(:p, [
      link(
        "Ferry Fare Finder",
        to: cms_static_page_path(conn, "/fares/ferry"),
        class: "c-call-to-action"
      )
    ])
  end

  def fare_finder_link(_, _), do: nil

  @spec fare_overview_link(Route.gtfs_route_type(), Conn.t()) :: HTML.safe()
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

  defp fare_price(token) do
    token
    |> String.replace_prefix("fare:", "")
    |> fare_from_token()
    |> Format.price()
  end
end
