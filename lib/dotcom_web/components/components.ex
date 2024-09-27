defmodule DotcomWeb.Components do
  @moduledoc """
  Shared simple functional components. These components don't manage state and
  events -- those should utilize LiveView/LiveComponents or some other
  technology.
  """
  use Phoenix.Component

  alias Heroicons

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

  slot :inner_block,
    required: false,
    doc:
      "Additional content to render beneath the autocomplete component. With config_type='trip-planner', this can be used to render additional form elements to capture additional details about selected locations."

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
      <%= render_slot(@inner_block) %>
    </div>
    """
  end

  attr :open, :boolean,
    default: false,
    doc: """
    Whether the accordion starts open or closed.
    """

  slot :content, required: true

  slot :extra,
    required: false,
    doc: """
    Supplemental content to be shown below the accordion. Helpful for showing error states if form inputs are inside the component.
    """

  slot :heading,
    required: true,
    doc: """
    The header of the component. Supports HTML markup.
    """

  @doc """
  A disclosure widget that reveals or hides additional content.
  """
  def accordion(assigns) do
    ~H"""
    <details class="group w-full bg-white" open={@open}>
      <summary class="border border-solid border-primary hover:bg-primary-lightest p-2 flex cursor-pointer list-none items-center gap-2 p-2 relative">
        <%= render_slot(@heading) %>
        <Heroicons.chevron_down class="group-open:rotate-180 w-4 h-4 absolute top-3 right-3" />
      </summary>
      <div class="border border-solid border-t-0 border-primary p-2">
        <%= render_slot(@content) %>
      </div>
    </details>
    <%= render_slot(@extra) %>
    """
  end

  @doc """
  Renders an input with label and error messages.

  A `Phoenix.HTML.FormField` may be passed as argument,
  which is used to retrieve the input name, id, and values.
  Otherwise all attributes may be passed explicitly.

  ## Types

  This function accepts all HTML input types, considering that:

    * You may also set `type="select"` to render a `<select>` tag

    * `type="checkbox"` is used exclusively to render boolean values

    * For live file uploads, see `Phoenix.Component.live_file_input/1`

  See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
  for more information. Unsupported types, such as hidden and radio,
  are best written directly in your templates.

  ## Examples

      <.input field={@form[:email]} type="email" />
      <.input name="my-input" errors={["oh no!"]} />
  """
  attr :id, :any, default: nil
  attr :name, :any
  attr :label, :string, default: nil
  attr :value, :any

  attr :type, :string,
    default: "text",
    values:
      ~w(checkbox color date datetime-local email file month number password
               range search select tel text textarea time url week radio checkbox_group_item radio_group_item)

  attr :field, Phoenix.HTML.FormField,
    doc: "a form field struct retrieved from the form, for example: @form[:email]"

  attr :errors, :list, default: []
  attr :class, :string, default: ""
  attr :checked, :boolean, doc: "the checked flag for checkbox inputs"
  attr :prompt, :string, default: nil, doc: "the prompt for select inputs"
  attr :options, :list, doc: "the options to pass to Phoenix.HTML.Form.options_for_select/2"
  attr :multiple, :boolean, default: false, doc: "the multiple flag for select inputs"

  attr :rest, :global,
    include: ~w(accept autocomplete capture cols disabled form list max maxlength min minlength
                multiple pattern placeholder readonly required rows size step)

  def input(%{field: %Phoenix.HTML.FormField{} = field} = assigns) do
    errors = if used_input?(field), do: field.errors, else: []

    assigns
    |> assign(field: nil, id: assigns.id || field.id)
    |> assign(
      :label,
      assigns.label ||
        Phoenix.Naming.humanize(assigns.value)
    )
    |> assign(:errors, errors)
    |> assign_new(:name, fn -> if assigns.multiple, do: field.name <> "[]", else: field.name end)
    |> assign_new(:value, fn -> field.value end)
    |> input()
  end

  def input(%{type: "checkbox"} = assigns) do
    assigns =
      assigns
      |> assign_new(:checked, fn ->
        Phoenix.HTML.Form.normalize_value("checkbox", assigns[:value])
      end)

    ~H"""
    <.label for={@id}>
      <input type="hidden" name={@name} value="false" disabled={@rest[:disabled]} />
      <input
        type="checkbox"
        id={@id}
        name={@name}
        value="true"
        checked={@checked}
        class={[
          "shrink-0 mt-1 mr-3 border-silver-400 rounded text-primary focus:border-primary-lightest checked:border-primary disabled:opacity-50 disabled:pointer-events-none",
          @class
        ]}
        {@rest}
      />
      <%= @label %>
    </.label>
    """
  end

  def input(%{type: "radio"} = assigns) do
    assigns = assigns |> assign_new(:checked, fn -> false end)

    ~H"""
    <.label for={@id}>
      <input
        type="radio"
        id={@id}
        name={@name}
        value={@value}
        checked={@checked}
        class={[
          "shrink-0 mt-1 mr-3 border border-solid border-primary rounded-full text-primary focus:border-primary-lightest checked:border-primary disabled:opacity-50 disabled:pointer-events-none",
          @class
        ]}
        {@rest}
      />
      <%= @label %>
    </.label>
    """
  end

  def input(%{type: "select"} = assigns) do
    ~H"""
    <div>
      <.label for={@id}><%= @label %></.label>
      <select
        id={@id}
        name={@name}
        class="mt-2 block w-full rounded-md border border-silver-400 bg-white shadow-sm focus:border-primary focus:ring-0 sm:text-sm"
        multiple={@multiple}
        {@rest}
      >
        <option :if={@prompt} value=""><%= @prompt %></option>
        <%= Phoenix.HTML.Form.options_for_select(@options, @value) %>
      </select>
      <.feedback :for={msg <- @errors} kind={:error}><%= msg %></.feedback>
    </div>
    """
  end

  def input(%{type: "textarea"} = assigns) do
    ~H"""
    <div>
      <.label for={@id}><%= @label %></.label>
      <textarea
        id={@id}
        name={@name}
        class={[
          "mt-2 block w-full rounded text-silver-900 focus:ring-0 sm:text-sm sm:leading-6 min-h-[6rem]",
          @errors == [] && "border-silver-400 focus:border-primary",
          @errors != [] && "border-red-400 focus:border-red-500"
        ]}
        {@rest}
      ><%= Phoenix.HTML.Form.normalize_value("textarea", @value) %></textarea>
      <.feedback :for={msg <- @errors} kind={:error}><%= msg %></.feedback>
    </div>
    """
  end

  # All other inputs text, datetime-local, url, password, etc. are handled here...
  def input(assigns) do
    ~H"""
    <div>
      <.label for={@id}><%= @label %></.label>
      <input
        type={@type}
        name={@name}
        id={@id}
        value={Phoenix.HTML.Form.normalize_value(@type, @value)}
        class={[
          "mt-2 block w-full rounded text-silver-900 focus:ring-0 sm:text-sm sm:leading-6",
          @errors == [] && "border-silver-400 focus:border-primary",
          @errors != [] && "border-red-400 focus:border-red-500"
        ]}
        {@rest}
      />
      <.feedback :for={msg <- @errors} kind={:error}><%= msg %></.feedback>
    </div>
    """
  end

  @doc """
  Renders a label.
  """
  attr :for, :string, default: nil
  slot :inner_block, required: true

  def label(assigns) do
    ~H"""
    <label for={@for} class="block m-0 px-3 py-2 flex align-center">
      <%= render_slot(@inner_block) %>
    </label>
    """
  end

  @doc """
  Renders a simple fieldset for grouping radio and checkbox inputs.
  """
  attr :legend, :string, required: true, doc: "A concise label for the fieldset."

  slot :inner_block,
    required: true,
    doc: "The fieldset content, containing multiple options for a radio input or checkbox input."

  def fieldset(assigns) do
    ~H"""
    <fieldset class="my-3 w-full">
      <legend class="font-semifold text-slate-600 text-sm"><%= @legend %></legend>
      <%= render_slot(@inner_block) %>
    </fieldset>
    """
  end

  attr :kind, :atom, values: [:info, :error, :success, :warning], doc: "used for styling"

  slot :inner_block, required: true

  @doc """
  Generates a generic feedback message.

  Example:

      <.feedback kind={:info}>This is an info message.</.feedback>
  """
  def feedback(%{kind: :error} = assigns) do
    ~H"""
    <p class="flex gap-2 text-sm leading-6 text-red-600">
      <Heroicons.exclamation_circle class="h-6 w-6 flex-none" />
      <%= render_slot(@inner_block) %>
    </p>
    """
  end

  def feedback(%{kind: :info} = assigns) do
    ~H"""
    <p class="flex gap-2 text-sm leading-6 text-primary">
      <Heroicons.information_circle class="h-6 w-6 flex-none" />
      <%= render_slot(@inner_block) %>
    </p>
    """
  end

  def feedback(%{kind: :success} = assigns) do
    ~H"""
    <p class="flex gap-2 text-sm leading-6 text-green-600">
      <Heroicons.check_circle class="h-6 w-6 flex-none" />
      <%= render_slot(@inner_block) %>
    </p>
    """
  end

  def feedback(%{kind: :warning} = assigns) do
    ~H"""
    <p class="flex gap-2 text-sm leading-6 text-yellow-600">
      <Heroicons.exclamation_triangle class="h-6 w-6 flex-none" />
      <%= render_slot(@inner_block) %>
    </p>
    """
  end

  attr :rest, :global, include: ~w(disabled form name value)
  slot :inner_block, required: true

  def button(assigns) do
    ~H"""
    <button
      class="py-2 px-3 inline-flex items-center gap-x-2 text-sm capitalize font-inter-medium rounded border border-transparent bg-primary text-white hover:bg-primary-darkest focus:bg-primary-darkest disabled:opacity-50 disabled:pointer-events-none phx-submit-loading:opacity-75"
      {@rest}
    >
      <%= render_slot(@inner_block) %>
    </button>
    """
  end
end
