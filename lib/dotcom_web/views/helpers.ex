defmodule DotcomWeb.ViewHelpers do
  @moduledoc """
  Helper functions used across DotcomWeb views.
  """

  use Dotcom.Gettext.Sigils

  import Dotcom.ContentRewriters.LiquidObjects.Fare, only: [fare_object_request: 1]
  import DotcomWeb.Router.Helpers, only: [redirect_path: 3, stop_path: 3]
  import Phoenix.HTML, only: [raw: 1]
  import PhoenixHTMLHelpers.Link, only: [link: 2]
  import PhoenixHTMLHelpers.Tag, only: [content_tag: 2, content_tag: 3, tag: 2]
  import Plug.Conn

  alias Phoenix.HTML.Safe
  alias Plug.Conn
  alias Routes.Route

  @stops_repo Application.compile_env!(:dotcom, :repo_modules)[:stops]

  @subway_lines [
    :red_line,
    :blue_line,
    :orange_line,
    :green_line,
    :silver_line
  ]

  # precompile the SVGs, rather than hitting the filesystem every time
  for path <-
        :dotcom
        |> Application.app_dir()
        |> Kernel.<>("/priv/static/icon-svg/*.svg")
        |> Path.wildcard() do
    name = Path.basename(path)

    contents =
      path
      |> File.read!()
      |> String.split("\n")
      |> Enum.join("")
      |> raw

    def svg(unquote(name)) do
      content_tag(
        :span,
        [unquote(contents)],
        class: "notranslate c-svg__#{Path.rootname(unquote(name))}"
      )
    end
  end

  def subway_lines, do: @subway_lines

  def svg(unknown_name) do
    report_missing_icon(unknown_name)

    # An alternate fallback icon
    content_tag(:span, fa("circle-dot", font_family: "fa-regular"))
  end

  def redirect_path(conn, path) do
    redirect_path(conn, :show, []) <> path
  end

  @spec mode_icon(atom, :default | :small) :: Phoenix.HTML.Safe.t()
  def mode_icon(:commuter_rail, size) do
    mode_icon(:"commuter-rail", size)
  end

  def mode_icon(:logan_express, size), do: mode_icon(:bus, size)
  def mode_icon(:massport_shuttle, size), do: mode_icon(:bus, size)

  def mode_icon(mode, size)
      when mode in [:subway, :bus, :"commuter-rail", :ferry, :trolley] and
             size in [:default, :small] do
    svg("icon-mode-#{mode}-#{size}.svg")
  end

  def mode_icon(:the_ride, size) when size in [:default, :small] do
    svg("icon-the-ride-#{size}.svg")
  end

  def mode_icon(:silver_line, size) when size in [:default, :small] do
    svg("icon-silver-line-#{size}.svg")
  end

  @spec bw_circle_icon(integer, :default | :small) :: Phoenix.HTML.Safe.t()
  def bw_circle_icon(type, size) do
    mode =
      type
      |> Route.vehicle_atom()
      |> Atom.to_string()
      |> String.replace("_", "-")

    svg("icon-#{mode}-circle-bw-#{size}.svg")
  end

  @spec route_to_string(integer) :: String.t()
  def route_to_string(type) do
    type
    |> Route.vehicle_atom()
    |> Atom.to_string()
  end

  @spec line_icon(Route.t(), :default | :small) :: Phoenix.HTML.Safe.t()
  def line_icon(%Route{type: type} = route, size) when type in [0, 1] do
    name =
      route
      |> Route.icon_atom()
      |> Atom.to_string()
      |> String.replace("_", "-")

    svg("icon-#{name}-#{size}.svg")
  end

  # Massport shuttle routes
  def line_icon(%Route{external_agency_name: "Massport", name: name}, _)
      when is_binary(name) do
    route_number = String.slice(name, 0..1)

    if route_number in Dotcom.TripPlan.Helpers.massport_icon_names() do
      svg("icon-massport-#{route_number}.svg")
    else
      report_missing_icon("route Massport #{route_number}")
      svg("icon-mode-bus-default.svg")
    end
  end

  # Logan Express shuttle routes
  def line_icon(%Route{external_agency_name: "Logan Express", name: name}, _)
      when is_binary(name) do
    if name in Dotcom.TripPlan.Helpers.logan_express_icon_names() do
      svg("icon-logan-express-#{name}.svg")
    else
      report_missing_icon("route Logan Express #{name}")
      svg("icon-mode-bus-default.svg")
    end
  end

  def line_icon(%Route{} = route, size) do
    route
    |> Route.icon_atom()
    |> mode_icon(size)
  end

  defp report_missing_icon(message) do
    Sentry.capture_message("Missing icon %s", interpolation_parameters: [message])
  end

  def bus_icon_pill(route) do
    bg_class =
      case Routes.Route.silver_line?(route) do
        true -> "u-bg--silver-line"
        _ -> "u-bg--bus"
      end

    content_tag(:span, route.name, class: "c-icon__bus-pill #{bg_class}")
  end

  @doc """
  Use for links to CMS static content. For now just leaves paths alone,
  but at least earmarks them for easy identification or if we need to change our
  frontend<->CMS linking strategy in the future.
  """
  @spec cms_static_page_path(module | Plug.Conn.t(), String.t() | iolist()) :: String.t()
  def cms_static_page_path(_conn, path), do: path

  def google_tag_manager_id do
    case env(:google_tag_manager_id) do
      "" -> nil
      id -> id
    end
  end

  def google_tag_manager_auth do
    case env(:google_tag_manager_auth) do
      "" -> nil
      id -> id
    end
  end

  def google_tag_manager_preview do
    case env(:google_tag_manager_preview) do
      "" -> nil
      id -> id
    end
  end

  defp env(key) do
    Application.get_env(:dotcom, __MODULE__)[key]
  end

  @doc "HTML for a FontAwesome icon, with optional attributes"
  def fa(name, attributes \\ []) when is_list(attributes) do
    content_tag(:i, [], [
      {:"aria-hidden", "true"},
      {:class,
       "notranslate #{Keyword.get(attributes, :font_family, "fa")} fa-#{name} " <>
         Keyword.get(attributes, :class, "")}
      | Keyword.drop(attributes, [:class, :font_family])
    ])
  end

  @doc "The direction with an optional headsign"
  @spec direction_with_headsign(Routes.Route.t(), 0 | 1, iodata) :: Phoenix.HTML.Safe.t()
  def direction_with_headsign(route, direction_id, headsign)

  def direction_with_headsign(route, direction_id, empty) when empty in ["", []] do
    direction_with_headsign(route, direction_id, Route.direction_destination(route, direction_id))
  end

  def direction_with_headsign(route, direction_id, headsign) do
    [
      Route.direction_name(route, direction_id),
      " ",
      fa("arrow-right"),
      content_tag(:span, ~t"to", class: "sr-only"),
      " ",
      headsign
    ]
  end

  @spec mode_name(0..4 | Routes.Route.route_type() | Routes.Route.subway_lines_type() | :access) ::
          String.t()
  @doc "Textual version of a mode ID or type"
  def mode_name(type) when type in [0, 1, :subway], do: ~t"Subway"
  def mode_name(type) when type in [2, :commuter_rail], do: ~t"Commuter Rail"
  def mode_name(type) when type in [3, :bus], do: ~t"Bus"
  def mode_name(type) when type in [4, :ferry], do: ~t"Ferry"

  def mode_name(type) when type in ["2274", "909", :logan_express, "Logan Express"],
    do: ~t"Logan Express"

  def mode_name(type) when type in ["2272", "983", :massport_shuttle],
    do: ~t"Massport Shuttle"

  def mode_name("Massport" <> _route), do: ~t"Massport Shuttle"

  def mode_name(:access), do: ~t"Access"
  def mode_name(:blue_line), do: ~t"Blue Line"
  def mode_name(:free_fare), do: ~t"Free Service"
  def mode_name(:green_line), do: ~t"Green Line"
  def mode_name(:mattapan_trolley), do: ~t"Mattapan Trolley"
  def mode_name(:mattapan_line), do: ~t"Mattapan Trolley"
  def mode_name(:orange_line), do: ~t"Orange Line"
  def mode_name(:red_line), do: ~t"Red Line"
  def mode_name(:silver_line), do: ~t"Silver Line"
  def mode_name(:the_ride), do: ~t"The Ride"

  @spec mode_atom(String.t()) :: atom
  def mode_atom(type_string) do
    type_string
    |> String.downcase()
    |> String.replace(" ", "_")
    |> String.to_existing_atom()
  end

  @doc "Returns a css class: a string with hyphens."
  @spec route_to_class(Routes.Route.t()) :: String.t()
  def route_to_class(nil), do: ""

  def route_to_class(%Routes.Route{external_agency_name: "Logan Express", name: name}) do
    "logan-express-#{name}"
  end

  def route_to_class(route) do
    route
    |> Routes.Route.to_naive()
    |> Routes.Route.icon_atom()
    |> CSSHelpers.atom_to_class()
  end

  @doc "Clean up a GTFS route name for better presentation"
  @spec clean_route_name(String.t()) :: String.t()
  def clean_route_name(name) do
    name
    |> String.replace_suffix(" Line", "")
    |> String.replace_suffix(" Trolley", "")
    |> break_text_at_slash
  end

  @doc """

  Replaces slashes in a given name with a slash + ZERO_WIDTH_SPACE.  It's
  visually the same, but allows browsers to break the text into multiple lines.

  """
  @spec break_text_at_slash(String.t()) :: String.t()
  def break_text_at_slash(name) do
    name
    |> String.replace("/", "/​")
  end

  def route_spacing_class(0), do: "col-xs-6 col-md-3 col-lg-2"
  def route_spacing_class(1), do: "col-xs-6 col-md-3 col-lg-2"
  def route_spacing_class(2), do: "col-xs-12 col-sm-6 col-md-4 col-xxl-3"
  def route_spacing_class(3), do: "col-xs-4 col-sm-3 col-md-2"
  def route_spacing_class(4), do: "col-xs-12 col-sm-6 col-md-4 col-xxl-3"

  def user_agent(conn) do
    case get_req_header(conn, "user-agent") do
      [] -> ""
      [agent | _] -> agent
    end
  end

  @spec tel_link(String.t() | nil) :: Phoenix.HTML.Safe.t()
  def tel_link(number) do
    pretty_formatted = Dotcom.PhoneNumber.pretty_format(number)

    case Dotcom.PhoneNumber.machine_format(number) do
      nil ->
        content_tag(:span, pretty_formatted, [])

      machine_formatted ->
        content_tag(:a, pretty_formatted,
          class: "no-wrap",
          href: "tel:#{machine_formatted}",
          aria: [label: Dotcom.PhoneNumber.aria_format(number)]
        )
    end
  end

  def atom_to_string(atom) do
    atom
    |> Atom.to_string()
    |> String.split("_")
    |> Enum.map_join(" ", &String.capitalize(&1))
  end

  @spec format_schedule_time(DateTime.t()) :: String.t()
  def format_schedule_time(time) do
    time
    |> Timex.format!("{h12}:{m} {AM}")
  end

  @spec format_full_date(Date.t()) :: String.t()
  def format_full_date(date), do: Timex.format!(date, "{Mfull} {D}, {YYYY}")

  def hidden_query_params(conn, opts \\ []) do
    exclude = Keyword.get(opts, :exclude, [])
    include = Keyword.get(opts, :include, %{})

    conn.query_params
    |> Map.merge(include)
    |> Enum.reject(fn {key, _} -> key in exclude end)
    |> Enum.uniq_by(fn {key, _} -> to_string(key) end)
    |> Enum.flat_map(&hidden_tag/1)
  end

  @doc "Specify the mode each type is associated with"
  @spec fare_group(atom | integer) :: String.t()
  def fare_group(type) when is_integer(type) and type in 0..4 do
    type
    |> Routes.Route.type_atom()
    |> fare_group
  end

  def fare_group(:bus), do: "bus_subway"
  def fare_group(:subway), do: "bus_subway"
  def fare_group(type), do: Atom.to_string(type)

  defp hidden_tag({key, value}) when is_list(value) do
    Enum.flat_map(value, fn sub_value ->
      hidden_tag({"#{key}[]", sub_value})
    end)
  end

  defp hidden_tag({key, %{} = value}) do
    # nested key
    Enum.flat_map(value, fn {sub_key, sub_value} ->
      hidden_tag({"#{key}[#{sub_key}]", sub_value})
    end)
  end

  defp hidden_tag({key, value}) do
    [tag(:input, type: "hidden", name: key, value: value)]
  end

  @doc """
  Puts the conn into the assigns dictionary so that downstream templates can use it
  """
  def forward_assigns(%{assigns: assigns} = conn) do
    assigns
    |> Map.put(:conn, conn)
  end

  @doc "Link a stop's name to its page."
  @spec stop_link(Stops.Stop.t() | String.t()) :: Phoenix.HTML.Safe.t()
  def stop_link(%Stops.Stop{} = stop) do
    link(stop.name, to: stop_path(DotcomWeb.Endpoint, :show, stop.id))
  end

  def stop_link(stop_id) do
    stop_id
    |> @stops_repo.get_parent()
    |> stop_link
  end

  @spec external_link(String.t()) :: String.t()
  @doc "Adds protocol if one is needed"
  def external_link(<<"http://", _::binary>> = href), do: href
  def external_link(<<"https://", _::binary>> = href), do: href
  def external_link(href), do: "http://" <> href

  @spec round_distance(float) :: String.t()
  def round_distance(nil), do: ""

  def round_distance(distance) when distance < 0.1 do
    distance
    |> Kernel.*(5820)
    |> round()
    |> :erlang.integer_to_binary()
    |> Kernel.<>(" ft")
  end

  def round_distance(distance) do
    distance
    |> :erlang.float_to_binary(decimals: 1)
    |> Kernel.<>(" mi")
  end

  @spec mode_summaries(atom, {atom, String.t()} | nil, String.t() | nil) :: [Fares.Summary.t()]
  @doc "Return the fare summaries for the given mode"
  def mode_summaries(mode_atom, name \\ nil, url \\ nil)

  def mode_summaries(mode, nil, _url) when mode in [:commuter_rail, :ferry] do
    mode
    |> mode_filters(nil)
    |> summaries_for_filters(mode)
  end

  def mode_summaries(mode, name, url) when mode in [:commuter_rail, :ferry] do
    mode
    |> mode_filters(name)
    |> get_fares
    |> Enum.map(&Fares.Format.summarize_one(&1, url: url))
  end

  def mode_summaries(:bus, name, _url) do
    :local_bus
    |> mode_filters(name)
    |> summaries_for_filters(:bus_subway)
  end

  def mode_summaries(mode, name, _url) do
    mode
    |> mode_filters(name)
    |> summaries_for_filters(:bus_subway)
  end

  @spec mode_filters(atom, {atom, String.t()} | nil) :: [keyword()]
  defp mode_filters(:ferry, nil) do
    [
      [mode: :ferry, duration: :single_trip, reduced: nil],
      [mode: :ferry, duration: :month, reduced: nil]
    ]
  end

  defp mode_filters(:ferry, name) do
    :ferry
    |> mode_filters(nil)
    |> Enum.map(&Keyword.put(&1, :name, name))
  end

  defp mode_filters(:commuter_rail, nil) do
    [
      [mode: :commuter_rail, duration: :single_trip, reduced: nil, includes_media: :cash],
      [mode: :commuter_rail, duration: :month, reduced: nil, includes_media: :commuter_ticket]
    ]
  end

  defp mode_filters(:commuter_rail, name) do
    :commuter_rail
    |> mode_filters(nil)
    |> Enum.map(&Keyword.put(&1, :name, name))
  end

  defp mode_filters(:local_bus, _name) do
    [
      [name: :local_bus, duration: :single_trip, reduced: nil],
      [name: :subway, duration: :week, reduced: nil],
      [name: :subway, duration: :month, reduced: nil]
    ]
  end

  defp mode_filters(:bus_subway, name) do
    [[name: :local_bus, duration: :single_trip, reduced: nil] | mode_filters(:subway, name)]
  end

  defp mode_filters(mode, _name) do
    [
      [name: mode, duration: :single_trip, reduced: nil],
      [name: mode, duration: :week, reduced: nil],
      [name: mode, duration: :month, reduced: nil]
    ]
  end

  defp get_fares(filters) do
    filters |> Enum.flat_map(&Fares.Repo.all/1)
  end

  @spec summaries_for_filters([keyword()], atom, String.t() | nil) :: [Fares.Summary.t()]
  defp summaries_for_filters(filters, mode, url \\ nil) do
    filters |> get_fares |> Fares.Format.summarize(mode, url)
  end

  @doc """
  Turns a word or phrase with spaces or underscores into a camelcased string.
  """
  @spec to_camelcase(String.t()) :: String.t()
  def to_camelcase(phrase) do
    phrase
    |> String.replace("_", " ")
    |> String.split(" ")
    |> do_to_camelcase()
  end

  defp do_to_camelcase([word]), do: String.downcase(word)

  defp do_to_camelcase([first | rest]) do
    [String.downcase(first) | Enum.map(rest, &String.capitalize/1)]
    |> IO.iodata_to_binary()
  end

  @doc "Turns a struct OR an Elixir.Module.Name into an underscored string"
  @spec struct_name_to_string(atom() | struct()) :: String.t()
  def struct_name_to_string(struct_name) when is_atom(struct_name) do
    struct_name
    |> struct()
    |> struct_name_to_string()
  end

  def struct_name_to_string(%{__struct__: struct}) do
    struct
    |> Module.split()
    |> List.last()
    |> Macro.underscore()
  end

  @spec fare_from_token(String.t()) :: Fares.Fare.t() | Fares.Summary.t()
  def fare_from_token(token) do
    fare_object_request(token)
  end

  def pretty_date(date, format \\ "{Mshort} {D}") do
    if date == Util.service_date() do
      ~t"today"
    else
      Timex.format!(date, format)
    end
  end

  def route_term(type) when type in [:bus, :ferry], do: ~t"route"
  def route_term(type) when type in [:subway, :commuter_rail], do: ~t"line"

  @spec banner_message(Conn.t(), atom) :: Safe.t() | nil
  def banner_message(conn, key) do
    if Map.has_key?(conn.assigns, key) do
      content_tag :div, class: "callout" do
        [
          content_tag(:p, conn.assigns[key].header, class: "font-bold"),
          conn.assigns[key].body
        ]
      end
    else
      nil
    end
  end

  @doc """
  Intended for usage with static assets, as these are compatible with the
  Phoenix.Endpoint.static_lookup/1 method. Outputs the static URL, attribute
  with asset integrity hash, and expected crossorigin attribute (as the
  website's assets load from the CDN rather than from the application).
  """
  @spec static_attributes(String.t()) :: map()
  def static_attributes(path) do
    {static_path, static_integrity} = DotcomWeb.Endpoint.static_lookup(path)
    static_url = DotcomWeb.Endpoint.static_url() <> static_path
    href_or_src = if(String.starts_with?(path, "/css"), do: :href, else: :src)

    %{
      integrity: static_integrity,
      crossorigin: "anonymous"
    }
    |> Map.put(href_or_src, static_url)
  end
end
