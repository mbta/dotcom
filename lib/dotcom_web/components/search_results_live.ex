defmodule DotcomWeb.Components.SearchResultsLive do
  @moduledoc """
  A component for handling executing a website search. Fetches results async if possible. If connected, also supports incremental loading of additional results.
  """
  use DotcomWeb, :live_component

  import DotcomWeb.Components.SearchHits

  alias DotcomWeb.Live.SearchPage
  alias Phoenix.LiveComponent

  @initial_pagination %{loaded_count: 0, page: 0}
  @search_service Application.compile_env!(:dotcom, :search_service)

  @impl LiveComponent
  def mount(socket) do
    {:ok,
     socket
     |> assign(:connected?, connected?(socket))
     |> assign(@initial_pagination)
     |> stream_configure(:results, dom_id: & &1["objectID"])}
  end

  @impl LiveComponent
  def handle_event("load_more", _, socket) do
    {:noreply,
     socket
     |> update(:page, &(&1 + 1))
     |> update_results()}
  end

  @impl LiveComponent
  def update(%{loaded_count: count}, socket) do
    {:ok, update(socket, :loaded_count, &(&1 + count))}
  end

  # If the query was updated, remove previous results during async operation
  def update(%{category: _, query: query} = assigns, socket) do
    if socket.assigns[:query] == query do
      {:ok, assign(socket, assigns)}
    else
      {:ok,
       socket
       |> assign(assigns)
       |> assign(@initial_pagination)
       |> update_results(reset: true)}
    end
  end

  def update(assigns, socket), do: {:ok, assign(socket, assigns)}

  defp update_results(socket, stream_opts \\ []) do
    category = Map.fetch!(socket.assigns, :category)
    page = Map.fetch!(socket.assigns, :page)
    query = Map.fetch!(socket.assigns, :query)
    pid = self()
    myself = socket.assigns.myself

    stream_async(socket, :results, fn ->
      case @search_service.query(query, category: category, page: page) do
        {:ok, hits} ->
          send_update(pid, myself, loaded_count: Enum.count(hits))
          {:ok, hits, stream_opts}

        error ->
          error
      end
    end)
  end

  @impl LiveComponent
  def render(%{connected?: true} = assigns) do
    ~H"""
    <div>
      <%= if @results do %>
        <.async_result :let={_} assign={@results}>
          <.section_wrapper
            category={@category}
            loaded_count={@loaded_count}
            loading?={@results.loading}
          >
            <.search_hits_wrapper
              :if={@loaded_count > 0}
              id={@category <> "-results"}
              phx-update="stream"
            >
              <.hit
                :for={{dom_id, hit} <- @streams.results}
                :key={dom_id}
                id={dom_id}
                hit={hit}
              />
            </.search_hits_wrapper>
            <.link
              :if={(@results.ok? && Enum.count(@streams.results) > 0) || @results.loading}
              id={"#{@category}-loader"}
              class="flex justify-center btn-link py-xs"
              phx-click="load_more"
              phx-target={@myself}
            >
              <%= if @results.loading do %>
                {~t(Loading...)}
              <% else %>
                {~t(Load more)}
              <% end %>
            </.link>
          </.section_wrapper>
        </.async_result>
      <% end %>
    </div>
    """
  end

  # Not connected? Just fetch and return a simple list of results
  def render(assigns) do
    with %{category: category, query: query} <- assigns,
         {:ok, hits} <- @search_service.query(query, category: category) do
      assigns =
        assigns
        |> assign(:hits, hits)
        |> assign(:loaded_count, Enum.count(hits))

      ~H"""
      <div>
        <.section_wrapper category={@category} loaded_count={@loaded_count}>
          <.search_hits_wrapper :if={@loaded_count > 0}>
            <.hit :for={hit <- @hits} hit={hit} />
          </.search_hits_wrapper>
        </.section_wrapper>
      </div>
      """
    else
      _ ->
        ~H"""
        <div></div>
        """
    end
  end

  defp section_wrapper(assigns) do
    assigns =
      assigns
      |> assign_new(:loading?, fn -> false end)
      |> assign_new(:no_results?, fn assigns ->
        assigns[:loaded_count] == 0 && !assigns[:loading]
      end)

    ~H"""
    <section class="mb-lg">
      <h2
        :if={!@no_results?}
        class="font-medium text-lg m-0 bg-gray-bordered-background p-sm flex justify-between"
      >
        <span>
          <span class="sr-only">{~t(Search results for)}</span>
          {SearchPage.category_label(@category)}
        </span>
        <span>{~t(1 result | %{count} results | #{@loaded_count})p}</span>
      </h2>
      {render_slot(@inner_block)}
      <div aria-live="assertive" aria-atomic="true" class="sr-only">
        <%= if @no_results? do %>
          {~t(No more results for)} {SearchPage.category_label(@category)}
        <% end %>
      </div>
    </section>
    """
  end
end
