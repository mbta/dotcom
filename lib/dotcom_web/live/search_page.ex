defmodule DotcomWeb.Live.SearchPage do
  @moduledoc """
  The main page for search across every key categories of MBTA.com information, including routes, stops, pages, and other content. Depending on whether the LiveView is connected, will either update all results on every input change or update after form submit.

  When connected, allows toggling category visibility and expanding results within each category.
  """

  use DotcomWeb, :live_view

  alias Phoenix.{LiveView, LiveView.JS}

  @categories ~w(routes stops pages projects documents events news)

  on_mount {DotcomWeb.Hooks.Breadcrumbs, :search_page}

  @impl LiveView
  def mount(params, _session, socket) do
    {:ok,
     socket
     |> assign(:connected?, connected?(socket))
     |> assign_new(:all_categories, fn -> @categories end)
     |> assign_new(:query, fn -> Map.get(params, "query", "") end)
     |> assign_new(:chosen_categories, fn -> nil end)}
  end

  # Asynchronously update all search results with the new query
  @impl LiveView
  def handle_params(%{"query" => query}, _uri, socket) do
    for(category <- @categories) do
      send_update(DotcomWeb.Components.SearchResultsLive,
        id: category,
        query: query
      )
    end

    {:noreply, assign(socket, :query, query)}
  end

  def handle_params(_params, _uri, socket), do: {:noreply, socket}

  # Update the URL, which will trigger handle_params and execute all searches
  @impl LiveView
  def handle_event("find", %{"_target" => ["query"]} = params, socket) do
    query = Map.get(params, "query", "")
    {:noreply, assign(socket, :query, query) |> push_patch(query_patch_opts(query))}
  end

  # Track which categories are enabled via checkbox, for toggling visibility
  def handle_event("find", %{"_target" => ["category", _]} = params, socket) do
    enabled_categories =
      params
      |> Map.get("category", %{})
      |> Map.filter(fn {_key, v} -> v == "on" end)

    if Enum.empty?(Map.values(enabled_categories)) do
      {:noreply, assign(socket, :chosen_categories, nil)}
    else
      {:noreply, assign(socket, :chosen_categories, enabled_categories)}
    end
  end

  def handle_event(_, _, socket), do: {:noreply, socket}

  # Hide the open search filters
  def hide_filters(js \\ %JS{}), do: JS.hide(js, to: "#search-page-filters")

  # Open the search filters in a fullscreen experience
  def show_filters(js \\ %JS{}) do
    js
    |> JS.show(to: "#search-page-filters")
    |> JS.add_class("fixed left-0 right-0 top-0 h-full p-lg bg-white", to: "#search-page-filters")
  end

  defp query_patch_opts(""), do: [to: ~p"/search", replace: true]

  defp query_patch_opts(query) do
    params = %{"query" => query}
    [to: ~p"/search?#{params}", replace: true]
  end

  def categories, do: @categories

  def category_label("stops"), do: ~t"Stations and Stops"
  def category_label("routes"), do: ~t"Lines and Routes"
  def category_label("pages"), do: ~t"Pages"
  def category_label("projects"), do: ~t"Projects"
  def category_label("documents"), do: ~t"Documents"
  def category_label("events"), do: ~t"Events"
  def category_label("news"), do: ~t"News"

  defp category_keys(chosen, _) when is_map(chosen), do: Map.keys(chosen)
  defp category_keys(_, all), do: all

  defp icon_name("stops"), do: "icon-stop-default"
  defp icon_name("routes"), do: "icon-circle-t-default"
  defp icon_name("pages"), do: "info"
  defp icon_name("projects"), do: "wrench"
  defp icon_name("documents"), do: "file"
  defp icon_name("events"), do: "calendar-days"
  defp icon_name("news"), do: "newspaper"

  defp icon_type("stops"), do: "icon-svg"
  defp icon_type("routes"), do: "icon-svg"
  defp icon_type("documents"), do: "regular"
  defp icon_type(_), do: "solid"
end
