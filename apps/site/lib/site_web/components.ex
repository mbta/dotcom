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
  <.algolia_autocomplete id="transit-near-me-locations" locations={true} algolia_indexes={["stops"]} />
  <.algolia_autocomplete id="cms-search" algolia_indexes={["drupal"]} />
  ```
  """
  def algolia_autocomplete(assigns) do
    assigns =
      assigns
      |> assign_new(:algolia_indexes, fn -> [] end)
      |> assign_new(:geolocation, fn -> false end)
      |> assign_new(:locations, fn -> false end)

    if not Enum.any?(assigns.algolia_indexes, &(&1 in Query.valid_indexes())) and
         !assigns.geolocation and
         !assigns.locations do
      raise "Nothing to search! Please enable at least one search type."
    end

    ~H"""
    <div
      phx-hook="AlgoliaAutocomplete"
      data-turbolinks-permanent
      id={@id}
      class="c-search-bar__autocomplete"
      data-geolocation={@geolocation}
      data-locations={@locations}
      data-routes={"routes" in @algolia_indexes}
      data-stops={"stops" in @algolia_indexes}
      data-drupal={"drupal" in @algolia_indexes}
    />
    """
  end
end
