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

  import MbtaMetro.Components.Badge, only: [badge: 1]
  import MbtaMetro.Components.Icon, only: [icon: 1]

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
      "retail-locations",
      "projects",
      "proposed-locations",
      "stops",
      "trip-planner"
    ]
  )

  attr(:rest, :global)

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
  <.algolia_autocomplete id="some-locations" config_type="retail-locations" placeholder="Find retail sales locations near a place" />
  <.algolia_autocomplete id="cms-search" config_type="my-custom-project-search-config" placeholder="Find a project" />
  ```
  """
  def algolia_autocomplete(assigns) do
    assigns =
      assigns
      |> assign_new(:config_type, fn -> false end)

    ~H"""
    <search {@rest} aria-label={@placeholder}>
      <div id={@id} phx-hook="AlgoliaAutocomplete" phx-update="ignore">
        <div
          class="c-search-bar__autocomplete"
          data-placeholder={@placeholder}
          data-config={@config_type}
        />
        <output class="c-search-bar__autocomplete-results" />
      </div>
      {render_slot(@inner_block)}
    </search>
    """
  end

  attr :count, :integer, required: true

  @doc """
  Renders a square badge that is white on blue if the count is greater than 0,
  and black on light gray if the count is 0.
  """
  def count(%{count: 0} = assigns) do
    ~H"""
    <.badge
      class="bg-charcoal-80 text-black !min-w-6 md:!min-w-7 py-1.125 text-sm md:text-base/5"
      variant="square"
    >
      0
    </.badge>
    """
  end

  def count(%{count: _} = assigns) do
    ~H"""
    <.badge
      class="bg-cobalt-30 text-white !min-w-6 md:!min-w-7 py-1.125 text-sm md:text-base/5"
      variant="square"
    >
      {@count}
    </.badge>
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

  slot(:heading, required: false, doc: "Large title shown at top of container.")
  slot(:inner_block, required: true)
  attr(:hide_divider, :boolean, required: false, default: false)

  @doc """
  A generic "card" sort of component, with an optional large header block.

  Example usage:

  ```elixir
  <.bordered_container>
    <:heading>Title on Top</:heading>
    <p class="text-yellow-600">
      <strong>Whatever</strong> else inside.
    </p>
  </.bordered_container>
  ```

  Can omit the divider between the heading and content using
  `hide_divider={true}`.

  ```elixir
  <.bordered_container hide_divider>
    <:heading>
      <div class="flex justify-between">
        Slightly elaborate
        <mark>Thing</mark>
      </div>
    </:heading>
    <p class="border-t-4 border-t-brand-primary p-6 bg-brand-primary-lightest">
      Got my own dividing line
    </p>
  </.bordered_container>
  ```
  """
  def bordered_container(assigns) do
    ~H"""
    <div class="px-2 py-3 md:px-5 md:py-4 border-[1px] bg-white border-gray-lightest rounded-lg">
      <div :if={@heading} class="font-heading font-bold text-[1.75rem] leading-normal">
        {render_slot(@heading)}
      </div>
      <hr :if={!@hide_divider} class="h-px my-2 bg-gray-lightest border-0" />
      {render_slot(@inner_block)}
    </div>
    """
  end

  slot(:content, required: true)
  slot(:heading, required: true)
  attr(:class, :string, default: "")

  attr(:summary_class, :string,
    default: "",
    doc: "Class names applied to the underlying <summary> element."
  )

  attr(:chevron_class, :string, default: "")
  attr(:rest, :global)

  @doc """
  An accordion component optimized for custom styling. Only the caret open/close
  rotation is provided.

  The `@class` attribute and arbitrary HTML attributes included in
  `<.unstyled_accordion />` will be applied to the underlying `<details>`
  element. The `@summary_class` attribute is applied to the underlying
  `<summary>` element, and `@chevron_class` is required to style the underlying
  chevron icon.
  """
  def unstyled_accordion(assigns) do
    ~H"""
    <details class={"#{@class} group"} {@rest}>
      <summary class={"#{@summary_class} cursor-pointer"}>
        {render_slot(@heading)}
        <div class={"#{@chevron_class} shrink-0"}>
          <.icon name="chevron-down" class="h-3 w-3 group-open:rotate-180" />
        </div>
      </summary>
      {render_slot(@content)}
    </details>
    """
  end

  slot(:inner_block, required: true)
  attr(:class, :string, default: "")

  attr(:placement, :atom,
    default: :left,
    values: [:left, :right, :top, :bottom],
    doc: "Where the tooltip appears relative to the hovered content."
  )

  attr(:title, :string,
    doc:
      "A preferably short bit of content which will appear on hover. Supports rendering of HTML."
  )

  @doc """
  Basic tooltip to display content on hover.

  This uses Bootstrap's JS plugin under the hood.
  """
  def tooltip(assigns) do
    ~H"""
    <span
      class={@class}
      data-html="true"
      data-trigger="hover"
      data-toggle="tooltip"
      data-placement={@placement}
      title={@title}
    >
      {render_slot(@inner_block)}
    </span>
    """
  end
end
