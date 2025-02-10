defmodule DotcomWeb.Components do
  @moduledoc """
  Shared simple functional components. These components don't manage state and
  events -- those should utilize LiveView/LiveComponents or some other
  technology.
  """
  use Phoenix.Component

  use Phoenix.VerifiedRoutes,
    endpoint: DotcomWeb.Endpoint,
    router: DotcomWeb.Router

  embed_templates "layouts/*"

  attr(:id, :string, required: true, doc: "A unique identifier for this search input.")

  attr(:placeholder, :string,
    required: false,
    doc: "Placeholder text for empty search bar.",
    default: "Search for routes, info, and more"
  )

  attr(:config_type, :string,
    required: true,
    doc:
      "A mapping to the AlgoliaJS configuration described in assets/ts/ui/autocomplete/config.ts",
    values: [
      "basic-config",
      "transit-near-me",
      "retail-locations",
      "proposed-locations",
      "trip-planner"
    ]
  )

  slot(:inner_block,
    required: false,
    doc:
      "Additional content to render beneath the autocomplete component. With config_type='trip-planner', this can be used to render additional form elements to capture additional details about selected locations."
  )

  @doc """
  Instantiates a search box using Algolia's Autocomplete.js library, configured
  to search our application's Algolia indexes, AWS Location Service, and
  potentially more!

  ### Usage

  A unique ID value is required. A config_type value is required and must map to
  a configuration defined on the frontend, exported in
  assets/ts/ui/autocomplete/config.ts. This frontend configuration must refer to
  a JavaScript object of the AutocompleteSource type, and handle fetching search
  results and rendering them.

  ```elixir
  <.algolia_autocomplete id="transit-near-me-locations" config_type="transit-near-me" placeholder="Find transit near a location" />
  <.algolia_autocomplete id="cms-search" config_type="my-custom-project-search-config" placeholder="Find a project" />
  ```
  """
  def algolia_autocomplete(assigns) do
    assigns =
      assigns
      |> assign_new(:config_type, fn -> false end)

    ~H"""
    <div>
      <div id={@id} phx-hook="AlgoliaAutocomplete" phx-update="ignore">
        <div
          class="c-search-bar__autocomplete"
          data-placeholder={@placeholder}
          data-config={@config_type}
        />
        <div class="c-search-bar__autocomplete-results" />
      </div>
      {render_slot(@inner_block)}
    </div>
    """
  end

  def error_container(assigns) do
    assigns =
      assigns
      |> assign_new(:title, fn -> nil end)
      |> assign_new(:padding_class, fn %{title: title} ->
        if(title, do: "p-6", else: "px-4 py-2")
      end)

    ~H"""
    <div class={"error-container rounded #{@padding_class}"}>
      <p :if={@title} class="font-bold mb-2">{@title}</p>
      {render_slot(@inner_block)}
    </div>
    """
  end
end
