defmodule DotcomWeb.Components do
  @moduledoc """
  Shared simple functional components. These components don't manage state and
  events -- those should utilize LiveView/LiveComponents or some other
  technology.
  """
  use Dotcom.Gettext.Sigils
  use Phoenix.Component

  use Phoenix.VerifiedRoutes,
    endpoint: DotcomWeb.Endpoint,
    router: DotcomWeb.Router

  import MbtaMetro.Components.Badge, only: [badge: 1]
  import MbtaMetro.Components.Button, only: [button: 1]
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

  slot(:inner_block, required: true)
  attr(:class, :string, default: "")
  attr(:href, :string, default: nil)

  @doc """
  An understated informational banner containing a concise description and/or call to action.
  """
  def promo_banner(%{href: href} = assigns) when is_nil(href) do
    ~H"""
    <div class={"bg-amethyst-90 text-center #{@class}"}>
      {render_slot(@inner_block)}
    </div>
    """
  end

  def promo_banner(assigns) do
    ~H"""
    <a href={@href} class={"block bg-amethyst-80 text-black text-center #{@class}"} target="_blank">
      {render_slot(@inner_block)}
    </a>
    """
  end

  slot(:inner_block, required: true, doc: "The modal contents")
  attr(:modal_id, :string, required: true, doc: "A unique identifier for the modal")
  slot(:modal_heading, doc: "A heading to show at top of the modal")
  attr :open, :boolean, default: false, doc: "Initialize as open yes/no?"

  @doc """
  If in a LiveView, use MbtaMetro's modal component instead.

  Otherwise, use this. Can display this modal using a `<button>` element with the `data-dialog-modal` attribute set to this modal's ID.

  ```
  <button data-dialog-modal="test">Show modal</button>
  <.dialog_modal modal_id="test">
    <:modal_heading>Modal heading</:modal_heading>
    This is a modal
  </.dialog_modal>
  ```
  """
  def dialog_modal(assigns) do
    ~H"""
    <dialog id={@modal_id} class="mbta-modal min-w-[40%] min-h-[50%]" closedby="any" data-open={@open}>
      <form method="dialog" class="flex justify-between gap-md items-center">
        <h1 :if={@modal_heading} class="h4 m-0">
          {render_slot(@modal_heading)}
        </h1>
        <div>
          <.button autofocus size="small">{~t"Close"}</.button>
        </div>
      </form>
      {render_slot(@inner_block)}
    </dialog>
    """
  end

  slot(:inner_block, required: true, doc: "Content displayed within the link")
  slot(:title, required: true)
  attr(:href, :string, doc: "Optional link to navigate to")
  attr(:rest, :global, include: ~w(disabled))

  @doc """
  A stylish link or button with a prominent right caret, containing content.
  As a button, can open additional content via a modal.
  """
  def descriptive_link(%{href: _} = assigns) do
    ~H"""
    <a href={@href} class="c-descriptive-link">
      <div class="c-descriptive-link__text">
        <div class="c-descriptive-link__title">{render_slot(@title)}</div>
        {render_slot(@inner_block)}
      </div>
      <div class="c-descriptive-link__caret-wrapper">
        <i class="fa fa-angle-right notranslate c-descriptive-link__caret" aria-hidden="true"></i>
      </div>
    </a>
    """
  end

  def descriptive_link(assigns) do
    ~H"""
    <button type="button" class="c-descriptive-link" {@rest}>
      <div class="c-descriptive-link__text">
        <div class="c-descriptive-link__title mb-0">{render_slot(@title)}</div>
        {render_slot(@inner_block)}
      </div>
      <div class="c-descriptive-link__caret-wrapper">
        <i class="fa fa-angle-right notranslate c-descriptive-link__caret" aria-hidden="true"></i>
      </div>
    </button>
    """
  end
end
