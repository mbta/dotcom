defmodule SiteWeb.Components do
  @moduledoc """
  Shared simple functional components. These components don't manage state and
  events -- those should utilize LiveView/LiveComponents or some other
  technology.
  """
  use Phoenix.Component
  alias Algolia.Query

  attr(:id, :string, required: true, doc: "A unique identifier for this search input.")

  attr(:algolia_indexes, :list,
    required: false,
    doc:
      "Enable searching one or more Algolia indexes. Valid indexes are defined in `Algolia.Query.valid_indexes()`."
  )

  attr(:locations_count, :integer,
    required: false,
    doc:
      "Number of locations returned via the AWS Location Service. Omitting this will result in no location searching"
  )

  attr(:locations_url_type, :string,
    required: false,
    doc: "Type of URL to request for each location.",
    values: ["transit-near-me", "retail-sales-locations", "proposed-sales-locations"]
  )

  attr(:popular_locations, :boolean,
    required: false,
    doc: "Enable display of popular locations on initial focus."
  )

  attr(:geolocation, :boolean,
    required: false,
    doc: "Enable prompt for user geolocation."
  )

  attr(:placeholder, :string,
    required: false,
    doc: "Placeholder text for empty search bar.",
    default: "Search for routes, info, and more"
  )

  attr(:state_change_listener, :string,
    doc: "Name of event listener that responds to Autocomplete.js state changes",
    default: nil
  )

  attr(:submit_handler, :string,
    doc: "Name of event handler that responds to Autocomplete.js form submission",
    default: "to_search_page"
  )

  @doc """
  Instantiates a search box using Algolia's Autocomplete.js library, configured
  to search our application's Algolia indexes, AWS Location Service, and
  potentially more!

  ### Usage

  A unique ID value is required. All searches are initialized to `false`, and an
  error will be raised if no search attributes are set to `true`.

  ```elixir
  <.algolia_autocomplete id="transit-near-me-locations" locations_count={3} locations_url_type="transit-near-me" algolia_indexes={[:stops]} />
  <.algolia_autocomplete id="cms-search" algolia_indexes={[:drupal]} />
  ```
  """
  def algolia_autocomplete(assigns) do
    assigns =
      assigns
      |> assign_new(:algolia_indexes, fn -> [] end)
      |> assign_new(:popular_locations, fn -> false end)
      |> assign_new(:geolocation, fn -> false end)
      |> assign_new(:locations_count, fn -> false end)
      |> assign_new(:locations_url_type, fn -> false end)
      |> assign_new(:submit_handler, fn -> false end)

    valid_algolia_indexes =
      Query.valid_indexes()
      |> Keyword.take(assigns.algolia_indexes)
      |> Keyword.keys()

    if length(valid_algolia_indexes) == 0 and
         !assigns.geolocation and
         !assigns.locations_count do
      raise "Nothing to search! Please enable at least one search type."
    end

    assigns =
      assign(
        assigns,
        :valid_indexes,
        if(length(valid_algolia_indexes) > 0, do: Enum.join(valid_algolia_indexes, ","))
      )

    ~H"""
    <div
      phx-hook="AlgoliaAutocomplete"
      data-turbolinks-permanent
      id={@id}
    >
      <div
        class="c-search-bar__autocomplete"
        data-geolocation={@geolocation}
        data-popular-locations={@popular_locations}
        data-locations-count={@locations_count}
        data-locations-url-type={@locations_url_type}
        data-algolia={@valid_indexes}
        data-placeholder={@placeholder}
        data-state-change-listener={@state_change_listener}
        data-submit-handler={@submit_handler}
      />
      <div class="c-search-bar__autocomplete-results" />
    </div>
    """
  end
end
