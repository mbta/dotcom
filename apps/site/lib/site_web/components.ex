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

  attr(:locations, :boolean,
    required: false,
    doc: "Enable search of locations via the AWS Location Service."
  )

  attr(:geolocation, :boolean,
    required: false,
    doc: "Enable prompt for user geolocation."
  )

  @doc """
  Instantiates a search box using Algolia's Autocomplete.js library, configured
  to search our application's Algolia indexes, AWS Location Service, and
  potentially more!

  ### Usage

  A unique ID value is required. All searches are initialized to `false`, and an
  error will be raised if no search attributes are set to `true`.

  ```elixir
  <.algolia_autocomplete id="transit-near-me-locations" locations={true} algolia_indexes={[:stops]} />
  <.algolia_autocomplete id="cms-search" algolia_indexes={[:drupal]} />
  ```
  """
  def algolia_autocomplete(assigns) do
    assigns =
      assigns
      |> assign_new(:algolia_indexes, fn -> [] end)
      |> assign_new(:geolocation, fn -> false end)
      |> assign_new(:locations, fn -> false end)

    valid_algolia_indexes =
      Query.valid_indexes()
      |> Keyword.take(assigns.algolia_indexes)
      |> Keyword.keys()

    if length(valid_algolia_indexes) == 0 and
         !assigns.geolocation and
         !assigns.locations do
      raise "Nothing to search! Please enable at least one search type."
    end

    assigns = assign(assigns, :valid_indexes, valid_algolia_indexes)

    ~H"""
    <div
      phx-hook="AlgoliaAutocomplete"
      data-turbolinks-permanent
      id={@id}
    >
      <div
        class="c-search-bar__autocomplete"
        data-geolocation={@geolocation}
        data-locations={@locations}
        data-algolia={Enum.join(@valid_indexes, ",")}
      />
      <div class="c-search-bar__autocomplete-results" />
    </div>
    """
  end
end
