defmodule DotcomWeb.LayoutView do
  @moduledoc false

  use DotcomWeb, :view

  import Util.BreadcrumbHTML, only: [breadcrumb_trail: 1, title_breadcrumbs: 1]

  def env_links(conn) do
    [
      {"https://dev-blue.mbtace.com", "dev-blue"},
      {"https://dev-green.mbtace.com", "dev-green"},
      {"https://dev.mbtace.com", "dev"},
      {"https://www.mbta.com", "prod"}
    ]
    |> Enum.map(fn {hostname, name} ->
      request_path =
        case conn.query_string do
          "" -> conn.request_path
          params -> "#{conn.request_path}?#{params}"
        end

      path = URI.merge(hostname, request_path)

      %{color_classes: classes_for_env(name), href: path, name: name}
    end)
  end

  def banner_color_classes() do
    Application.get_env(:dotcom, :env_name)
    |> classes_for_env()
  end

  defp classes_for_env("dev-green"), do: "bg-green-line text-white"
  defp classes_for_env("dev-blue"), do: "bg-blue-line text-white"
  defp classes_for_env("dev"), do: "bg-silver-line text-white"
  defp classes_for_env("prod"), do: "bg-white text-black"
  defp classes_for_env(_), do: "bg-brand-bus text-black"

  def favicon_image() do
    Application.get_env(:dotcom, :env_name)
    |> case do
      "dev-green" -> "/images/mbta-logo-green.png"
      "dev-blue" -> "/images/mbta-logo-blue.png"
      "dev" -> "/images/mbta-logo-silver.png"
      _ -> "/images/mbta-logo-yellow.png"
    end
  end

  def bold_if_active(DotcomWeb.Endpoint, _, text) do
    raw(text)
  end

  def bold_if_active(%Plug.Conn{} = conn, path, text) do
    requested_path = Enum.at(String.split(conn.request_path, "/"), 1)

    if requested_path == String.trim(path, "/") do
      raw("<strong>#{text}</strong>")
    else
      raw(text)
    end
  end

  @spec styleguide_main_content_class(map) :: String.t()
  def styleguide_main_content_class(%{all_subpages: _}), do: " col-md-10"
  def styleguide_main_content_class(_), do: ""

  def get_page_classes(module, template) do
    module_class =
      module
      |> Module.split()
      |> Enum.slice(1..-1//1)
      |> Enum.join("-")
      |> String.downcase()

    template_class = template |> String.replace(".html", "-template")

    "#{module_class} #{template_class}"
  end

  def nav_link_content,
    do: [
      %{
        menu_section: ~t(Transit),
        link: ~p"/menu#Transit-section",
        sub_menus: [
          %{
            sub_menu_section: ~t(Modes of Transit),
            links: [
              {~t(Subway), "/schedules/subway", :internal_link},
              {~t(Bus), "/schedules/bus", :internal_link},
              {~t(Commuter Rail), "/schedules/commuter-rail", :internal_link},
              {~t(Ferry), "/schedules/ferry", :internal_link},
              {~t[Paratransit (The RIDE)], "/accessibility/the-ride", :internal_link},
              {~t(All Schedules & Maps), "/schedules", :internal_link}
            ]
          },
          %{
            sub_menu_section: ~t(Plan Your Journey),
            links: [
              {~t(Trip Planner), "/trip-planner", :internal_link},
              {~t(Service Alerts), "/alerts", :internal_link},
              {~t(Sign Up for Service Alerts), "https://alerts.mbta.com/", :external_link},
              {~t(Parking), "/parking", :internal_link},
              {~t(Bikes), "/bikes", :internal_link},
              {~t(User Guides), "/guides", :internal_link},
              {~t(Holidays), "/holidays", :internal_link},
              {~t(Accessibility), "/accessibility", :internal_link}
            ]
          },
          %{
            sub_menu_section: ~t(Find a Location),
            links: [
              {~t(MBTA Stations), "/stops", :internal_link},
              {~t(Destinations), "/destinations", :internal_link},
              {~t(Maps), "/maps", :internal_link}
            ]
          }
        ]
      },
      %{
        menu_section: ~t(Fares),
        link: ~p"/menu#Fares-section",
        sub_menus: [
          %{
            sub_menu_section: ~t(Fares Info),
            links: [
              {~t(Fares Overview), "/fares", :internal_link},
              {~t(Reduced Fares), "/fares/reduced", :internal_link},
              {~t(Transfers), "/fares/transfers", :internal_link},
              {~t(Fare Transformation), "/fare-transformation", :internal_link}
            ]
          },
          %{
            sub_menu_section: ~t(Fares by Mode),
            links: [
              {~t(Subway Fares), "/fares/subway-fares", :internal_link},
              {~t(Bus Fares), "/fares/bus-fares", :internal_link},
              {~t(Commuter Rail Fares), "/fares/commuter-rail-fares", :internal_link},
              {~t(Ferry Fares), "/fares/ferry-fares", :internal_link}
            ]
          },
          %{
            sub_menu_section: ~t(Pay Your Fare),
            links: [
              {~t(Charlie Service Center), "/fares/charliecard-store", :internal_link},
              {~t(Sign up for Auto-pay), "https://mycharlie.mbta.com/", :external_link},
              {~t(Order Monthly Passes), "https://commerce.mbta.com/", :external_link},
              {~t(Get a CharlieCard), "/fares/charliecard#getacharliecard", :internal_link},
              {~t(Retail Sales Locations), "/fares/retail-sales-locations", :internal_link}
            ]
          },
          # special
          %{sub_menu_section: ~t(Most popular fares)}
        ]
      },
      %{
        menu_section: ~t(Contact),
        link: ~p"/menu#Contact-section",
        sub_menus: [
          %{
            sub_menu_section: ~t(Customer Support),
            links: [
              {~t(Send Us Feedback), "/customer-support", :internal_link},
              {~t(View All Contact Numbers), "/customer-support#footer-customer",
               :internal_link},
              {~t(Request Public Records),
               "https://massachusettsdot.mycusthelp.com/WEBAPP/_rs/supporthome.aspx?lp=3&COID=64D93B66",
               :external_link},
              {~t(Lost & Found), "/customer-support/lost-and-found", :internal_link},
              {~t(Language Services), "/language-services", :internal_link}
            ]
          },
          %{
            sub_menu_section: ~t(Transit Police),
            links: [
              {~t(MBTA Transit Police), "/transit-police", :internal_link},
              {~t(See Something, Say Something), "/transit-police/see-something-say-something",
               :internal_link}
            ]
          },
          # special
          %{sub_menu_section: ~t(Emergency Contacts)},
          %{sub_menu_section: ~t(Contact numbers)}
        ]
      },
      %{
        menu_section: ~t(About),
        link: ~p"/menu#About-section",
        sub_menus: [
          %{
            sub_menu_section: ~t(Get to Know Us),
            links: [
              {~t(Overview), "/mbta-at-a-glance", :internal_link},
              {~t(Leadership), "/leadership", :internal_link},
              {~t(History), "/history", :internal_link},
              {~t(Financials), "/financials", :internal_link},
              {~t(Public Meetings), "/events", :internal_link},
              {~t(Media Relations), "/about/media-relations", :internal_link},
              {~t(MBTA Gift Shop), "https://www.mbtagifts.com", :external_link},
              {~t(Policies & Civil Rights), "/policies", :internal_link},
              {~t(Safety), "/safety", :internal_link},
              {~t(Quality, Compliance & Oversight), "/quality-compliance-oversight",
               :internal_link}
            ]
          },
          %{
            sub_menu_section: ~t(Work with Us),
            links: [
              {~t(Careers), "/careers", :internal_link},
              {~t(Institutional Sales), "/pass-program", :internal_link},
              {~t(Business Opportunities), "/business", :internal_link},
              {~t(Innovation Proposals), "/innovation", :internal_link},
              {~t(Engineering Design Standards), "/engineering/design-standards-and-guidelines",
               :internal_link}
            ]
          },
          %{
            sub_menu_section: ~t(Our Work),
            links: [
              {~t(Sustainability), "/sustainability", :internal_link},
              {~t(Capital Transformation), "/projects/capital-transformation-programs",
               :internal_link},
              {~t(Commuter Rail Positive Train Control),
               "/projects/commuter-rail-positive-train-control-ptc", :internal_link},
              {~t(Better Bus Project), "/projects/better-bus-project", :internal_link},
              {~t(All MBTA Improvement Projects), "/projects", :internal_link}
            ]
          }
        ]
      }
    ]

  def render_nav_link({link_name, href, link_host}) do
    link_content =
      if link_host == :external_link do
        [content_tag(:div, link_name), content_tag(:span, fa("external-link"))]
      else
        content_tag(:div, link_name)
      end

    attrs = ["data-nav": "link", href: href, class: "m-menu__link"]

    content_tag(
      :a,
      link_content,
      attrs
    )
  end

  @hidden_from_search_engines [
    "/org",
    "/charlie",
    "/policies/terms-use-charlie"
  ]
  @doc """
  Evaluates whether we want to show a meta tag to disable search engine crawling
  """
  @spec robots_nofollow?(String.t()) :: boolean()
  def robots_nofollow?(request_path) when request_path in @hidden_from_search_engines, do: true

  def robots_nofollow?(request_path) do
    Enum.any?(@hidden_from_search_engines, &String.starts_with?(request_path, &1 <> "/"))
  end

  def meta_description(%{meta_description: meta_description}) when not is_nil(meta_description) do
    Phoenix.HTML.raw(meta_description)
  end

  def meta_description(_) do
    ~t"Official website of the MBTA -- schedules, maps, and fare information for Greater Boston's public transportation system, including subway, commuter rail, bus routes, and boat lines."
  end

  def title(%Plug.Conn{} = conn) do
    title = title_not_found_or_breadcrumbs(conn)

    if Application.get_env(:dotcom, :is_prod_env?) do
      title
    else
      env_name = Application.get_env(:dotcom, :env_name) || "local"

      "#{env_name} | #{title}"
    end
  end

  defp title_not_found_or_breadcrumbs(%Plug.Conn{} = conn) do
    if Phoenix.Controller.view_template(conn) == "404.html" do
      ~t"Page Not Found | MBTA - Massachusetts Bay Transportation Authority"
    else
      title_breadcrumbs(conn)
    end
  end

  def webpack_path do
    Application.get_env(:dotcom, :webpack_path)
  end
end
