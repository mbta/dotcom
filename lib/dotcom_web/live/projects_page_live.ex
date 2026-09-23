defmodule DotcomWeb.ProjectsPageLive do
  @moduledoc """
  Explore all the T's projects.
  """
  use DotcomWeb, :live_view

  import MbtaMetro.Components.SystemIcons
  import Phoenix.HTML.Form, only: [input_id: 2, input_name: 2, input_value: 2]

  alias Phoenix.LiveView

  on_mount {DotcomWeb.Hooks.Breadcrumbs, :projects_page}

  @n_projects_per_page 10

  @impl LiveView
  def mount(_params, _session, socket) do
    {:ok,
     socket
     |> assign_new(:intro_content, fn -> intro_content() end)
     |> assign(:form, to_form(%{"mode" => "all", "line" => "subway"}))
     |> assign(:mode_choices, mode_choices())
     |> assign(:subway_mode_choices, subway_mode_choices())
     |> assign(:offset, 0)
     |> assign(:show_subway_filters?, false)
     |> assign(:selected_line_or_mode, "all")
     |> assign(:has_more_projects?, true)
     |> assign(:has_any_projects?, false)
     |> stream_configure(:projects, dom_id: &"project-#{&1.id}")
     |> assign_projects(0, "all", reset: true)
     |> assign_featured_projects("all")}
  end

  defp intro_content do
    DotcomWeb.PartialView.paragraph("paragraphs/custom-html/projects-index", %Plug.Conn{
      query_params: %{}
    })
  end

  defp update_form(form, field, value) do
    form.source
    |> Map.merge(Map.new([{field, value}]))
    |> to_form()
  end

  @impl LiveView
  def handle_event("set_mode", %{"_target" => ["mode"], "mode" => mode}, socket) do
    {:noreply,
     socket
     |> assign(:show_subway_filters?, mode == "subway")
     |> assign(:offset, 0)
     |> assign(:selected_line_or_mode, mode)
     |> update(:form, &update_form(&1, "mode", mode))
     |> assign_projects(0, mode, reset: true)
     |> assign_featured_projects(mode)}
  end

  @impl LiveView
  def handle_event("set_mode", %{"_target" => ["line"], "line" => line}, socket) do
    {:noreply,
     socket
     |> assign(:offset, 0)
     |> assign(:selected_line_or_mode, line)
     |> update(:form, &update_form(&1, "line", line))
     |> assign_projects(0, line, reset: true)
     |> assign_featured_projects(line)}
  end

  @impl LiveView
  def handle_event("paginate", _, socket) do
    offset = socket.assigns.offset + 1

    {:noreply,
     socket
     |> assign(:offset, offset)
     |> assign_projects(offset, socket.assigns.selected_line_or_mode)}
  end

  @impl LiveView
  def handle_info({:projects_batch_loaded, count}, socket) do
    {:noreply,
     socket
     |> assign(:has_more_projects?, count == @n_projects_per_page)
     |> update(:has_any_projects?, &(&1 or count > 0))}
  end

  defp assign_projects(socket, offset, line_or_mode, opts \\ []) do
    reset? = Keyword.get(opts, :reset, false)
    lv_pid = self()

    fetch_fn = fn ->
      teasers = fetch_teasers(offset, line_or_mode)
      send(lv_pid, {:projects_batch_loaded, length(teasers)})
      teasers
    end

    socket = if reset?, do: assign(socket, :has_any_projects?, false), else: socket

    if reset? do
      stream_async(socket, :projects, fn -> {:ok, fetch_fn.(), reset: true} end)
    else
      stream_async(socket, :projects, fn -> {:ok, fetch_fn.()} end)
    end
  end

  defp assign_featured_projects(socket, line_or_mode) do
    assign_async(
      socket,
      :featured_projects,
      fn -> {:ok, %{featured_projects: fetch_featured_teasers(line_or_mode)}} end,
      reset: true
    )
  end

  @n_featured_projects_per_page 4

  @spec fetch_featured_teasers(binary()) :: [map()]
  defp fetch_featured_teasers(line_or_mode) do
    line_or_mode = if line_or_mode != "all", do: line_or_mode
    api_params = [type: [:project], sticky: 1, items_per_page: @n_featured_projects_per_page]

    api_params =
      if line_or_mode do
        Keyword.merge(api_params, route_id: line_or_mode)
      else
        api_params
      end

    api_params
    |> CMS.Repo.teasers()
    |> sort_by_date()
    |> Enum.map(&simplify_teaser/1)
  end

  @spec fetch_teasers(integer(), binary()) :: [map()]
  defp fetch_teasers(offset, line_or_mode) do
    api_params = [
      type: [:project],
      items_per_page: @n_projects_per_page,
      offset: offset * @n_projects_per_page
    ]

    api_params =
      if line_or_mode != "all" do
        Keyword.merge(api_params, route_id: line_or_mode)
      else
        api_params
      end

    api_params
    |> CMS.Repo.teasers()
    |> sort_by_date()
    |> Enum.map(&simplify_teaser/1)
  end

  @spec simplify_teaser(map()) :: map()
  defp simplify_teaser(teaser) do
    teaser
    |> Map.put(:path, DotcomWeb.CmsRouterHelpers.project_path(DotcomWeb.Endpoint, :show, teaser))
    |> Map.take(~w(id text image path title routes date status)a)
  end

  @spec sort_by_date([Teaser.t()]) :: [Teaser.t()]
  defp sort_by_date(teasers) do
    Enum.sort_by(teasers, fn %{date: date} -> date_sort_key(date) end, :desc)
  end

  # Teasers without a date (e.g. projects with no "Updated On" value) sort last.
  @spec date_sort_key(Date.t() | NaiveDateTime.t() | nil) :: {integer(), integer(), integer()}
  defp date_sort_key(nil), do: {0, 0, 0}
  defp date_sort_key(date), do: {date.year, date.month, date.day}

  defp format_date(nil), do: nil

  defp format_date(date) do
    Dotcom.Utils.Time.format!(date, :date_full)
  end

  def placeholder_image(assigns) do
    assigns =
      assign(assigns, :src, CMS.Helpers.rewrite_url("/images/project-image-placeholder.png"))

    ~H"""
    <img
      src={@src}
      alt="MBTA logo"
      class="hidden-xs-down m-more-projects-table__thumbnail"
    />
    """
  end

  defp distinct_routes(routes) do
    Enum.uniq_by(routes, &route_to_mode_name/1)
  end

  def bus_name(id) do
    if Routes.Route.silver_line?(id), do: "silver-line", else: "bus"
  end

  def route_to_mode_name(%{mode: "subway", id: id}) do
    cond do
      Regex.run(~r/^green/i, id) ->
        "green-line"

      id == "subway" ->
        "subway"

      true ->
        id
        |> String.downcase()
        |> String.replace(" ", "-")
        |> Kernel.<>("-line")
    end
  end

  def route_to_mode_name(%{mode: "commuter_rail"}), do: "commuter-rail"
  def route_to_mode_name(%{mode: "ferry"}), do: "ferry"
  def route_to_mode_name(%{id: id}), do: bus_name(id)

  attr :class, :string, default: ""
  attr :routes, :list, required: true

  def route_tag_list(assigns) do
    assigns = assign(assigns, :routes, distinct_routes(assigns.routes))

    ~H"""
    <div class={"mt-xs flex gap-xs items-center #{@class}"}>
      <.route_tag :for={route <- @routes} route={route} />
    </div>
    """
  end

  attr :route, :any, required: true

  def route_tag(assigns) do
    case assigns.route do
      %{mode: "bus"} ->
        ~H"""
        <.mode_icon mode="bus" />
        """

      %{mode: "ferry"} ->
        ~H"""
        <.mode_icon mode="ferry" />
        """

      %{mode: "commuter_rail"} ->
        ~H"""
        <.mode_icon mode="commuter-rail" />
        """

      %{id: id, mode: "subway", group: "branch"} ->
        assigns = assign(assigns, :line, String.downcase(id) <> "-line")

        ~H"""
        <.route_icon line={@line} size="small" />
        """

      %{mode: "subway", group: "mode"} ->
        ~H"""
        <.mode_icon mode="subway" />
        """

      %{id: id, mode: "subway", group: group} when group in ["line", "branch"] ->
        assigns = assign(assigns, :line, String.downcase(id) <> "-line")

        ~H"""
        <.route_icon line={@line} size="small" />
        """

      _ ->
        ~H""
    end
  end

  def icon_class(status) when is_binary(status) do
    "m-more-projects-table__status-icon--#{normalized_status(status)}"
  end

  def icon_class(_), do: nil

  def text_class(status) when is_binary(status) do
    "m-more-projects-table__status-text--#{normalized_status(status)}"
  end

  def text_class(_), do: nil

  defp normalized_status(status) do
    status
    |> String.downcase()
    |> String.replace(" ", "-")
  end

  defp mode_choices do
    [
      {"all", ~t"All"},
      {"subway", ~t"Subway"},
      {"bus", ~t"Bus"},
      {"commuter-rail", ~t"Commuter Rail"},
      {"ferry", ~t"Ferry"}
    ]
  end

  defp subway_mode_choices do
    [
      {"subway", ~t"All"},
      {"red", ~t"Red Line"},
      {"orange", ~t"Orange Line"},
      {"blue", ~t"Blue Line"},
      {"green", ~t"Green Line"},
      {"mattapan", ~t"Mattapan Line"}
    ]
  end

  def mode_map() do
    subway_mode_choices()
    |> Map.new()
    |> Map.merge(Map.new(mode_choices()))
  end

  defp mode_label(mode) do
    mode_map()
    |> Map.get(mode)
  end

  @doc """
  An input group receives input from a group of 2 or more radios and can be displayed as segmented buttons. Input groups include a label for the group.
  """

  slot :input, required: true do
    attr :value, :string, required: true
  end

  attr :options, :list
  attr :label, :string, required: true
  attr :field, :atom
  attr :form, Phoenix.HTML.Form
  attr :class, :string, default: ""
  attr :rest, :global, include: ~w(disabled form required)

  def base_choice_input(assigns) do
    ~H"""
    <fieldset class={"mbta-input-group #{@class}"}>
      <legend class="mbta-label">
        {@label}
      </legend>
      <div class="mbta-input-group--buttons !w-fit">
        <.label
          :for={input <- @input}
          for={input_id(@form, @field) <> "_#{input.value}"}
          class="mbta-button mbta-button-secondary !font-medium text-sm py-xs"
        >
          <input
            id={input_id(@form, @field) <> "_#{input.value}"}
            type="radio"
            name={input_name(@form, @field)}
            value={input.value}
            checked={input_value(@form, @field) == input.value}
            {@rest}
          />
          {render_slot(input)}
        </.label>
      </div>
    </fieldset>
    """
  end
end
