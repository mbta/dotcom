defmodule DotcomWeb.Components.SearchResultsLive do
  @moduledoc """
  A component for handling executing a website search. Fetches results async if possible. If connected, also supports incremental loading of additional results.
  """
  use DotcomWeb, :live_component

  import DotcomWeb.Components.SearchHits

  alias DotcomWeb.Live.SearchPage
  alias Phoenix.LiveComponent

  @search_service Application.compile_env!(:dotcom, :search_service)

  @impl LiveComponent
  def mount(socket) do
    {:ok,
     socket
     |> assign_new(:page, fn -> 0 end)
     |> assign_new(:show_results_loader?, fn -> nil end)
     |> assign_new(:total_count, fn -> nil end)
     |> stream_configure(:results, dom_id: & &1["objectID"])
     |> stream(:results, [])}
  end

  @impl LiveComponent
  def handle_event("load_more", _, socket) do
    {:noreply,
     socket
     |> update(:page, &(&1 + 1))
     |> update_results()}
  end

  # If the query was updated, remove previous results during async operation
  @impl LiveComponent
  def update(%{category: _, query: query} = assigns, socket) do
    if socket.assigns[:query] == query do
      {:ok, assign(socket, assigns)}
    else
      {:ok,
       socket
       |> assign(assigns)
       |> assign(:page, 0)
       |> assign(:total_count, nil)
       |> update_results(reset: true)}
    end
  end

  def update(assigns, socket), do: {:ok, assign(socket, assigns)}

  defp update_results(socket, stream_opts \\ []) do
    query = Map.fetch!(socket.assigns, :query)
    connected? = connected?(socket)
    search_opts = search_opts(socket.assigns, connected?)

    case @search_service.query(query, search_opts) do
      {:ok, %{hits: hits, page: page, total_pages: total_pages, total_hits: total_hits}} ->
        socket
        |> assign(:show_results_loader?, connected? and page + 1 < total_pages)
        |> assign(:total_count, total_hits)
        |> stream(:results, hits, stream_opts)

      _ ->
        socket
    end
  end

  defp search_opts(assigns, connected?) do
    search_opts =
      assigns
      |> Map.take([:category, :page])
      |> Keyword.new()

    if connected? do
      search_opts
    else
      Keyword.put(search_opts, :hitsPerPage, 25)
    end
  end

  @impl LiveComponent
  def render(assigns) do
    ~H"""
    <section class="mb-lg">
      <h2 class="font-medium text-lg m-0 bg-gray-bordered-background p-sm flex justify-between">
        <span>
          <span class="sr-only">{~t(Search results for)}</span>
          {SearchPage.category_label(@category)}
        </span>
        <span :if={@total_count}>{~t(1 result | %{count} results | #{@total_count})p}</span>
      </h2>
      <ul
        class="border border-gray-bordered-background divide-y divide-gray-bordered-background w-full p-0 m-0 list-none"
        id={@category <> "-results"}
        phx-update="stream"
      >
        <li
          :for={{dom_id, hit} <- @streams.results}
          class="p-sm hover:cursor-pointer hover:bg-brand-primary-lightest flex items-center leading-[1.25]"
          style="min-height: var(--minimum-tap-target-size)"
          :key={dom_id}
          id={dom_id}
        >
          <.hit hit={hit} />
        </li>
      </ul>
      <.link
        :if={@show_results_loader?}
        id={"#{@category}-loader"}
        class="flex justify-center btn-link py-xs"
        phx-click="load_more"
        phx-target={@myself}
      >
        {~t(Load more)}
      </.link>
    </section>
    """
  end
end
