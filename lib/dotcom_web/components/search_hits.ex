defmodule DotcomWeb.Components.SearchHits do
  @moduledoc """
  Rendering search results from our Algolia data. Highly dependent on the
  format of data returned from Drupal, and from our own /algolia API endpoint
  """

  use DotcomWeb, :component

  import DotcomWeb.Components.TransitIcons, only: [zone: 1]
  alias MbtaMetro.Components.SystemIcons

  attr :hit, :any, doc: "A single search result"
  attr :rest, :global

  def hit(assigns) do
    url = hit_url(assigns.hit)

    assigns =
      assigns
      |> assign(:url, unverified_url(DotcomWeb.Endpoint, url))
      |> assign(:location, location(assigns.hit))
      |> assign(:bus_stop_id, bus_stop_id(assigns.hit))

    ~H"""
    <.link
      href={@url}
      class="font-normal hover:no-underline w-full flex flex-col gap-sm"
    >
      <div class="flex items-center gap-sm">
        <.hit_icon hit={@hit} />
        <.hit_highlighted_name hit={@hit} />
        <span :if={@bus_stop_id} class="text-gray-500 text-sm">#{@bus_stop_id}</span>
        <.hit_time hit={@hit} />
      </div>
      <div :if={@hit["index"] == "stops"} class="flex items-center gap-sm justify-between">
        <.hit_connections hit={@hit} />
        <div :if={@location} class="text-nowrap text-gray text-sm">
          {@location}
        </div>
      </div>
    </.link>
    """
  end

  defp bus_stop_id(%{
         "index" => "stops",
         "stop" => %{"id" => id, "ferry?" => false, "station?" => false}
       }) do
    id
  end

  defp bus_stop_id(_), do: nil

  defp hit_icon(%{hit: %{"index" => "stops", "stop" => %{"station?" => station}}} = assigns) do
    name =
      if station do
        "icon-circle-t-default"
      else
        "icon-stop-default"
      end

    assigns = assign(assigns, :name, name)

    ~H"""
    <.icon
      type="icon-svg"
      name={@name}
      class="h-5 w-5 shrink-0"
      aria-hidden="true"
    />
    """
  end

  defp hit_icon(%{hit: %{"index" => "routes", "route" => route}} = assigns) do
    line_name = hit_route_line_name(route)

    cond do
      not is_nil(line_name) ->
        assigns = assign(assigns, :line, line_name)

        ~H"""
        <SystemIcons.route_icon line={@line} class="shrink-0" />
        """

      route["type"] == 2 ->
        ~H"""
        <SystemIcons.mode_icon mode="commuter-rail" class="shrink-0" />
        """

      route["type"] == 4 ->
        ~H"""
        <SystemIcons.mode_icon mode="ferry" class="shrink-0" />
        """

      true ->
        ~H"""
        <SystemIcons.route_icon name={@hit["route"]["name"]} class="shrink-0" />
        """
    end
  end

  defp hit_icon(
         %{hit: %{"search_api_datasource" => "entity:file", "_file_type" => "image" <> _}} =
           assigns
       ) do
    ~H"""
    <img class="w-32 h-auto" src={hit_url(@hit)} alt={@hit["file_name_raw"]} />
    """
  end

  defp hit_icon(
         %{hit: %{"search_api_datasource" => "entity:file", "_file_type" => file_type}} = assigns
       ) do
    assigns = assign(assigns, :icon_name, hit_file_icon_name(file_type))

    ~H"""
    <.icon name={@icon_name} class="h-5 w-5 fill-brand-primary shrink-0" aria-hidden="true" />
    """
  end

  defp hit_icon(%{hit: %{"_content_type" => type}} = assigns)
       when type in ~w(project project_update) do
    related_transit = assigns.hit["related_transit_gtfs_id"]

    case related_transit do
      transit when is_binary(transit) ->
        assigns = assign(assigns, :transit, transit)

        ~H"""
        <.hit_transit_icon transit={@transit} />
        """

      transit when is_list(transit) and length(transit) > 0 ->
        assigns = assign(assigns, :transit, Enum.uniq_by(transit, &transit_name/1))

        ~H"""
        <div class="inline-flex gap-xs">
          <.hit_transit_icon :for={t <- @transit} transit={t} />
        </div>
        """

      _ ->
        ~H"""
        <.icon
          name="wrench"
          class="h-4 w-4 fill-brand-primary shrink-0"
          aria-hidden="true"
        />
        """
    end
  end

  defp hit_icon(%{hit: %{"_content_type" => content_type}} = assigns) do
    assigns =
      assign_new(assigns, :icon_name, fn ->
        case content_type do
          "news_entry" -> "newspaper"
          "event" -> "calendar-days"
          "person" -> "user"
          _ -> "circle-info"
        end
      end)

    ~H"""
    <.icon
      name={@icon_name}
      class="h-4 w-4 fill-brand-primary shrink-0"
      aria-hidden="true"
    />
    """
  end

  defp hit_icon(assigns) do
    ~H"""
    <.icon name="info" class="h-4 w-4 fill-brand-primary shrink-0" aria-hidden="true" />
    """
  end

  defp hit_file_icon_name(type)
       when type in ~w(application/vnd.openxmlformats-officedocument.presentationml.presentation
  application/vnd.ms-powerpoint),
       do: "file-powerpoint"

  defp hit_file_icon_name(type)
       when type in ~w(application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
  application/vnd.ms-excel),
       do: "file-excel"

  defp hit_file_icon_name(type)
       when type in ~w(application/vnd.openxmlformats-officedocument.wordprocessingml.document
  application/msword),
       do: "file-word"

  defp hit_file_icon_name("application/pdf"), do: "file-pdf"
  defp hit_file_icon_name(_), do: "file"

  defp hit_highlight(%{"_highlightResult" => %{"content_title" => %{"value" => value}}}),
    do: value

  defp hit_highlight(%{"_highlightResult" => %{"file_name_raw" => %{"value" => value}}}),
    do: value

  defp hit_highlight(%{"_highlightResult" => %{"stop" => %{"name" => %{"value" => value}}}}),
    do: value

  defp hit_highlight(%{
         "_highlightResult" => %{
           "route" => %{
             "long_name" => %{"value" => long_value},
             "name" => %{"value" => value}
           }
         },
         "route" => %{"type" => route_type, "long_name" => route_long_name}
       }) do
    if route_type == 3 and not String.starts_with?(route_long_name, "Silver Line") do
      long_value
    else
      value
    end
  end

  defp hit_highlight(_), do: nil

  defp hit_route_line_name(%{"id" => route_id}) do
    case route_id do
      "Mattapan" -> "mattapan-line"
      "Red" -> "red-line"
      "Green" -> "green-line"
      "Green-" <> branch -> "green-line-#{String.downcase(branch)}"
      "Blue" -> "blue-line"
      "Orange" -> "orange-line"
      _ -> nil
    end
  end

  defp transit_name("CR-" <> _), do: "commuter-rail"
  defp transit_name("local_bus"), do: "bus"

  defp transit_name(mode) when mode in ~w(subway commuter_rail bus ferry),
    do: String.replace(mode, "_", "-")

  defp transit_name(line) when line in ~w(Red Orange Green Blue),
    do: String.downcase(line) <> "-line"

  defp transit_name("Green-" <> branch),
    do: "green-line-#{String.downcase(branch)}"

  defp transit_name(other) do
    if other in Routes.Route.silver_line() do
      "silver-line"
    else
      "bus"
    end
  end

  defp hit_transit_icon(%{transit: transit} = assigns) do
    assigns = assign(assigns, :transit, transit_name(transit))

    case assigns.transit do
      mode when mode in ~w(subway commuter-rail bus ferry) ->
        ~H"""
        <SystemIcons.mode_icon mode={@transit} size="small" class="w-5 h-5 shrink-0" />
        """

      _ ->
        ~H"""
        <SystemIcons.route_icon line={@transit} size="small" class="shrink-0" />
        """
    end
  end

  defp hit_time(assigns) do
    time =
      assigns.hit["_event_start_time"] || assigns.hit["_file_created"] ||
        assigns.hit["_content_posted_on"]

    assigns =
      assign(
        assigns,
        :formatted_time,
        if(time,
          do:
            time
            |> DateTime.from_unix!()
            |> Dotcom.Utils.Time.format!(:short_date)
        )
      )

    ~H"""
    <span :if={@formatted_time} class="text-gray ml-auto text-nowrap">{@formatted_time}</span>
    """
  end

  defp hit_highlighted_name(assigns) do
    highlighted_value = hit_highlight(assigns.hit)

    assigns =
      assign(assigns, :text, if(highlighted_value, do: replace_highlight(highlighted_value)))

    ~H"""
    <span :if={@text} class={["text-[initial]", if(file_hit?(@hit), do: "break-all")]}>
      {raw(@text)}
    </span>
    """
  end

  defp file_hit?(%{"search_api_datasource" => "entity:file"}), do: true
  defp file_hit?(_), do: false

  defp replace_highlight(text) do
    text
    |> String.replace("__aa-highlight__", "<strong>")
    |> String.replace("__/aa-highlight__", "</strong>")
  end

  defp hit_connections(
         %{
           hit: %{
             "index" => "stops",
             "routes" => routes,
             "stop" => stop
           }
         } = assigns
       ) do
    stop =
      for {key, val} <- stop, into: %{} do
        {String.to_existing_atom(key), val}
      end
      |> then(&struct(Stops.Stop, &1))

    assigns =
      assign(assigns, :stop, stop)
      |> assign(:connections, routes)

    ~H"""
    <div class="inline-flex gap-1 items-center">
      <.connecting_route :for={cx <- @connections} cx={cx} stop={@stop} />
    </div>
    """
  end

  defp hit_connections(assigns) do
    ~H""
  end

  defp connecting_route(%{cx: %{"type" => 2}} = assigns) do
    ~H"""
    <SystemIcons.mode_icon mode="commuter-rail" size="small" class="w-5 h-5 shrink-0" />
    <.zone stop={@stop} />
    """
  end

  defp connecting_route(%{cx: %{"display_name" => "Bus: " <> buses, "type" => 3}} = assigns) do
    assigns = assign(assigns, :buses, String.split(buses, ", "))

    ~H"""
    <SystemIcons.route_icon :for={bus <- @buses} name={bus} size="small" />
    """
  end

  defp connecting_route(%{cx: %{"type" => 4}} = assigns) do
    ~H"""
    <SystemIcons.mode_icon mode="ferry" size="small" class="w-5 h-5 shrink-0" />
    """
  end

  defp connecting_route(%{cx: %{"type" => t, "icon" => icon_name}} = assigns)
       when t in [0, 1] do
    assigns = assign(assigns, :icon_name, String.replace(icon_name, "_", "-"))

    ~H"""
    <SystemIcons.route_icon line={@icon_name} size="small" />
    """
  end

  defp connecting_route(%{cx: %{"icon" => icon_name}} = assigns) do
    assigns = assign(assigns, :icon_name, String.replace(icon_name, "_", "-"))

    ~H"""
    <SystemIcons.route_icon line={@icon_name} size="small" />
    """
  end

  defp location(%{"index" => "stops", "stop" => %{"municipality" => municipality} = stop}) do
    address =
      with addr when is_binary(addr) <- Map.get(stop, "address"),
           [match | _] <- Regex.run(~r/,\s(MA|NH|RI)\s/, addr) do
        String.replace(match, ", ", "")
      else
        _ ->
          "MA"
      end

    "#{municipality}, #{address}"
  end

  defp location(_), do: nil

  defp hit_url(%{"url" => url}), do: url

  defp hit_url(%{"search_api_datasource" => "entity:file", "_file_uri" => uri}),
    do: "/sites/default/files/#{String.replace(uri, ~r/public:\/\//, "")}"

  defp hit_url(%{"_content_type" => "search_result", "_search_result_url" => url}),
    do: String.replace(url, ~r/internal:/, "")

  defp hit_url(%{"_content_url" => url}), do: url
end
