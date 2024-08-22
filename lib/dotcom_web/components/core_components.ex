defmodule DotcomWeb.CoreComponents do
  @moduledoc """
  Provides core UI components.

  At first glance, this module may seem daunting, but its goal is to provide
  core building blocks for your application, such as modals, tables, and
  forms. The components consist mostly of markup and are well-documented
  with doc strings and declarative assigns. You may customize and style
  them in any way you want, based on your application growth and needs.

  The default components use Tailwind CSS, a utility-first CSS framework.
  See the [Tailwind CSS documentation](https://tailwindcss.com) to learn
  how to customize them or feel free to swap in another framework altogether.

  Icons are provided by [heroicons](https://heroicons.com). See `icon/1` for usage.
  """
  use Phoenix.Component

  alias Phoenix.LiveView.JS
  import DotcomWeb.Gettext

  @doc """
  Renders a modal.

  ## Examples

      <.modal id="confirm-modal">
        This is a modal.
      </.modal>

  JS commands may be passed to the `:on_cancel` to configure
  the closing/cancel event, for example:

      <.modal id="confirm" on_cancel={JS.navigate(~p"/posts")}>
        This is another modal.
      </.modal>

  """
  attr :id, :string, required: true
  attr :show, :boolean, default: false
  attr :on_cancel, JS, default: %JS{}
  slot :inner_block, required: true

  def modal(assigns) do
    ~H"""
    <div
      id={@id}
      phx-mounted={@show && show_modal(@id)}
      phx-remove={hide_modal(@id)}
      data-cancel={JS.exec(@on_cancel, "phx-remove")}
      class="tw-relative tw-z-50 tw-hidden"
    >
      <div
        id={"#{@id}-bg"}
        class="tw-bg-zinc-50/90 tw-fixed tw-inset-0 tw-transition-opacity"
        aria-hidden="true"
      />
      <div
        class="tw-fixed tw-inset-0 tw-overflow-y-auto"
        aria-labelledby={"#{@id}-title"}
        aria-describedby={"#{@id}-description"}
        role="dialog"
        aria-modal="true"
        tabindex="0"
      >
        <div class="tw-flex tw-min-h-full tw-items-center tw-justify-center">
          <div class="tw-w-full tw-max-w-3xl tw-p-4 tw-sm:p-6 tw-lg:py-8">
            <.focus_wrap
              id={"#{@id}-container"}
              phx-window-keydown={JS.exec("data-cancel", to: "##{@id}")}
              phx-key="escape"
              phx-click-away={JS.exec("data-cancel", to: "##{@id}")}
              class="tw-shadow-zinc-700/10 tw-ring-zinc-700/10 tw-relative tw-hidden tw-rounded-2xl tw-bg-white tw-p-14 tw-shadow-lg tw-ring-1 tw-transition"
            >
              <div class="tw-absolute tw-top-6 tw-right-5">
                <button
                  phx-click={JS.exec("data-cancel", to: "##{@id}")}
                  type="button"
                  class="tw--m-3 tw-flex-none tw-p-3 tw-opacity-20 tw-hover:opacity-40"
                  aria-label={gettext("close")}
                >
                  <.icon name="hero-x-mark-solid" class="tw-h-5 tw-w-5" />
                </button>
              </div>
              <div id={"#{@id}-content"}>
                <%= render_slot(@inner_block) %>
              </div>
            </.focus_wrap>
          </div>
        </div>
      </div>
    </div>
    """
  end

  @doc """
  Renders flash notices.

  ## Examples

      <.flash kind={:info} flash={@flash} />
      <.flash kind={:info} phx-mounted={show("#flash")}>Welcome Back!</.flash>
  """
  attr :id, :string, doc: "the optional id of flash container"
  attr :flash, :map, default: %{}, doc: "the map of flash messages to display"
  attr :title, :string, default: nil
  attr :kind, :atom, values: [:info, :error], doc: "used for styling and flash lookup"
  attr :rest, :global, doc: "the arbitrary HTML attributes to add to the flash container"

  slot :inner_block, doc: "the optional inner block that renders the flash message"

  def flash(assigns) do
    assigns = assign_new(assigns, :id, fn -> "flash-#{assigns.kind}" end)

    ~H"""
    <div
      :if={msg = render_slot(@inner_block) || Phoenix.Flash.get(@flash, @kind)}
      id={@id}
      phx-click={JS.push("lv:clear-flash", value: %{key: @kind}) |> hide("##{@id}")}
      role="alert"
      class={[
        "tw-fixed tw-top-2 tw-right-2 tw-mr-2 tw-w-80 tw-sm:w-96 tw-z-50 tw-rounded-lg tw-p-3 tw-ring-1",
        @kind == :info && "tw-bg-emerald-50 tw-text-emerald-800 tw-ring-emerald-500 tw-fill-cyan-900",
        @kind == :error &&
          "tw-bg-rose-50 tw-text-rose-900 tw-shadow-md tw-ring-rose-500 tw-fill-rose-900"
      ]}
      {@rest}
    >
      <p
        :if={@title}
        class="tw-flex tw-items-center tw-gap-1.5 tw-text-sm tw-font-semibold tw-leading-6"
      >
        <.icon :if={@kind == :info} name="hero-information-circle-mini" class="tw-h-4 tw-w-4" />
        <.icon :if={@kind == :error} name="hero-exclamation-circle-mini" class="tw-h-4 tw-w-4" />
        <%= @title %>
      </p>
      <p class="tw-mt-2 tw-text-sm tw-leading-5"><%= msg %></p>
      <button
        type="button"
        class="tw-group tw-absolute tw-top-1 tw-right-1 tw-p-2"
        aria-label={gettext("close")}
      >
        <.icon name="hero-x-mark-solid" class="tw-h-5 tw-w-5 tw-opacity-40 tw-group-hover:opacity-70" />
      </button>
    </div>
    """
  end

  @doc """
  Shows the flash group with standard titles and content.

  ## Examples

      <.flash_group flash={@flash} />
  """
  attr :flash, :map, required: true, doc: "the map of flash messages"
  attr :id, :string, default: "flash-group", doc: "the optional id of flash container"

  def flash_group(assigns) do
    ~H"""
    <div id={@id}>
      <.flash kind={:info} title={gettext("Success!")} flash={@flash} />
      <.flash kind={:error} title={gettext("Error!")} flash={@flash} />
      <.flash
        id="client-error"
        kind={:error}
        title={gettext("We can't find the internet")}
        phx-disconnected={show(".phx-client-error #client-error")}
        phx-connected={hide("#client-error")}
        hidden
      >
        <%= gettext("Attempting to reconnect") %>
        <.icon name="hero-arrow-path" class="tw-ml-1 tw-h-3 tw-w-3 tw-animate-spin" />
      </.flash>

      <.flash
        id="server-error"
        kind={:error}
        title={gettext("Something went wrong!")}
        phx-disconnected={show(".phx-server-error #server-error")}
        phx-connected={hide("#server-error")}
        hidden
      >
        <%= gettext("Hang in there while we get back on track") %>
        <.icon name="hero-arrow-path" class="tw-ml-1 tw-h-3 tw-w-3 tw-animate-spin" />
      </.flash>
    </div>
    """
  end

  @doc """
  Renders a simple form.

  ## Examples

      <.simple_form for={@form} phx-change="validate" phx-submit="save">
        <.input field={@form[:email]} label="Email"/>
        <.input field={@form[:username]} label="Username" />
        <:actions>
          <.button>Save</.button>
        </:actions>
      </.simple_form>
  """
  attr :for, :any, required: true, doc: "the data structure for the form"
  attr :as, :any, default: nil, doc: "the server side parameter to collect all input under"

  attr :rest, :global,
    include: ~w(autocomplete name rel action enctype method novalidate target multipart),
    doc: "the arbitrary HTML attributes to apply to the form tag"

  slot :inner_block, required: true
  slot :actions, doc: "the slot for form actions, such as a submit button"

  def simple_form(assigns) do
    ~H"""
    <.form :let={f} for={@for} as={@as} {@rest}>
      <div class="tw-mt-10 tw-space-y-8 tw-bg-white">
        <%= render_slot(@inner_block, f) %>
        <div
          :for={action <- @actions}
          class="tw-mt-2 tw-flex tw-items-center tw-justify-between tw-gap-6"
        >
          <%= render_slot(action, f) %>
        </div>
      </div>
    </.form>
    """
  end

  @doc """
  Renders a button.

  ## Examples

      <.button>Send!</.button>
      <.button phx-click="go" class="tw-ml-2">Send!</.button>
  """
  attr :type, :string, default: nil
  attr :class, :string, default: nil
  attr :rest, :global, include: ~w(disabled form name value)

  slot :inner_block, required: true

  def button(assigns) do
    ~H"""
    <button
      type={@type}
      class={[
        "tw-phx-submit-loading:opacity-75 tw-rounded-lg tw-bg-zinc-900 tw-hover:bg-zinc-700 tw-py-2 tw-px-3",
        "tw-text-sm tw-font-semibold tw-leading-6 tw-text-white tw-active:text-white/80",
        @class
      ]}
      {@rest}
    >
      <%= render_slot(@inner_block) %>
    </button>
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
    values: ~w(checkbox color date datetime-local email file month number password
               range search select tel text textarea time url week)

  attr :field, Phoenix.HTML.FormField,
    doc: "a form field struct retrieved from the form, for example: @form[:email]"

  attr :errors, :list, default: []
  attr :checked, :boolean, doc: "the checked flag for checkbox inputs"
  attr :prompt, :string, default: nil, doc: "the prompt for select inputs"
  attr :options, :list, doc: "the options to pass to Phoenix.HTML.Form.options_for_select/2"
  attr :multiple, :boolean, default: false, doc: "the multiple flag for select inputs"

  attr :rest, :global,
    include: ~w(accept autocomplete capture cols disabled form list max maxlength min minlength
                multiple pattern placeholder readonly required rows size step)

  def input(%{field: %Phoenix.HTML.FormField{} = field} = assigns) do
    errors = if Phoenix.Component.used_input?(field), do: field.errors, else: []

    assigns
    |> assign(field: nil, id: assigns.id || field.id)
    |> assign(:errors, Enum.map(errors, &translate_error(&1)))
    |> assign_new(:name, fn -> if assigns.multiple, do: field.name <> "[]", else: field.name end)
    |> assign_new(:value, fn -> field.value end)
    |> input()
  end

  def input(%{type: "checkbox"} = assigns) do
    assigns =
      assign_new(assigns, :checked, fn ->
        Phoenix.HTML.Form.normalize_value("checkbox", assigns[:value])
      end)

    ~H"""
    <div>
      <label class="tw-flex tw-items-center tw-gap-4 tw-text-sm tw-leading-6 tw-text-zinc-600">
        <input type="hidden" name={@name} value="false" disabled={@rest[:disabled]} />
        <input
          type="checkbox"
          id={@id}
          name={@name}
          value="true"
          checked={@checked}
          class="tw-rounded tw-border-zinc-300 tw-text-zinc-900 tw-focus:ring-0"
          {@rest}
        />
        <%= @label %>
      </label>
      <.error :for={msg <- @errors}><%= msg %></.error>
    </div>
    """
  end

  def input(%{type: "select"} = assigns) do
    ~H"""
    <div>
      <.label for={@id}><%= @label %></.label>
      <select
        id={@id}
        name={@name}
        class="tw-mt-2 tw-block tw-w-full tw-rounded-md tw-border tw-border-gray-300 tw-bg-white tw-shadow-sm tw-focus:border-zinc-400 tw-focus:ring-0 tw-sm:text-sm"
        multiple={@multiple}
        {@rest}
      >
        <option :if={@prompt} value=""><%= @prompt %></option>
        <%= Phoenix.HTML.Form.options_for_select(@options, @value) %>
      </select>
      <.error :for={msg <- @errors}><%= msg %></.error>
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
          "tw-mt-2 tw-block tw-w-full tw-rounded-lg tw-text-zinc-900 tw-focus:ring-0 tw-sm:text-sm tw-sm:leading-6 tw-min-h-[6rem]",
          @errors == [] && "tw-border-zinc-300 tw-focus:border-zinc-400",
          @errors != [] && "tw-border-rose-400 tw-focus:border-rose-400"
        ]}
        {@rest}
      ><%= Phoenix.HTML.Form.normalize_value("textarea", @value) %></textarea>
      <.error :for={msg <- @errors}><%= msg %></.error>
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
          "tw-mt-2 tw-block tw-w-full tw-rounded-lg tw-text-zinc-900 tw-focus:ring-0 tw-sm:text-sm tw-sm:leading-6",
          @errors == [] && "tw-border-zinc-300 tw-focus:border-zinc-400",
          @errors != [] && "tw-border-rose-400 tw-focus:border-rose-400"
        ]}
        {@rest}
      />
      <.error :for={msg <- @errors}><%= msg %></.error>
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
    <label for={@for} class="tw-block tw-text-sm tw-font-semibold tw-leading-6 tw-text-zinc-800">
      <%= render_slot(@inner_block) %>
    </label>
    """
  end

  @doc """
  Generates a generic error message.
  """
  slot :inner_block, required: true

  def error(assigns) do
    ~H"""
    <p class="tw-mt-3 tw-flex tw-gap-3 tw-text-sm tw-leading-6 tw-text-rose-600">
      <.icon name="hero-exclamation-circle-mini" class="tw-mt-0.5 tw-h-5 tw-w-5 tw-flex-none" />
      <%= render_slot(@inner_block) %>
    </p>
    """
  end

  @doc """
  Renders a header with title.
  """
  attr :class, :string, default: nil

  slot :inner_block, required: true
  slot :subtitle
  slot :actions

  def header(assigns) do
    ~H"""
    <header class={[@actions != [] && "tw-flex tw-items-center tw-justify-between tw-gap-6", @class]}>
      <div>
        <h1 class="tw-text-lg tw-font-semibold tw-leading-8 tw-text-zinc-800">
          <%= render_slot(@inner_block) %>
        </h1>
        <p :if={@subtitle != []} class="tw-mt-2 tw-text-sm tw-leading-6 tw-text-zinc-600">
          <%= render_slot(@subtitle) %>
        </p>
      </div>
      <div class="tw-flex-none"><%= render_slot(@actions) %></div>
    </header>
    """
  end

  @doc ~S"""
  Renders a table with generic styling.

  ## Examples

      <.table id="users" rows={@users}>
        <:col :let={user} label="id"><%= user.id %></:col>
        <:col :let={user} label="username"><%= user.username %></:col>
      </.table>
  """
  attr :id, :string, required: true
  attr :rows, :list, required: true
  attr :row_id, :any, default: nil, doc: "the function for generating the row id"
  attr :row_click, :any, default: nil, doc: "the function for handling phx-click on each row"

  attr :row_item, :any,
    default: &Function.identity/1,
    doc: "the function for mapping each row before calling the :col and :action slots"

  slot :col, required: true do
    attr :label, :string
  end

  slot :action, doc: "the slot for showing user actions in the last table column"

  def table(assigns) do
    assigns =
      with %{rows: %Phoenix.LiveView.LiveStream{}} <- assigns do
        assign(assigns, row_id: assigns.row_id || fn {id, _item} -> id end)
      end

    ~H"""
    <div class="tw-overflow-y-auto tw-px-4 tw-sm:overflow-visible tw-sm:px-0">
      <table class="tw-w-[40rem] tw-mt-11 tw-sm:w-full">
        <thead class="tw-text-sm tw-text-left tw-leading-6 tw-text-zinc-500">
          <tr>
            <th :for={col <- @col} class="tw-p-0 tw-pb-4 tw-pr-6 tw-font-normal">
              <%= col[:label] %>
            </th>
            <th :if={@action != []} class="tw-relative tw-p-0 tw-pb-4">
              <span class="tw-sr-only"><%= gettext("Actions") %></span>
            </th>
          </tr>
        </thead>
        <tbody
          id={@id}
          phx-update={match?(%Phoenix.LiveView.LiveStream{}, @rows) && "stream"}
          class="tw-relative tw-divide-y tw-divide-zinc-100 tw-border-t tw-border-zinc-200 tw-text-sm tw-leading-6 tw-text-zinc-700"
        >
          <tr :for={row <- @rows} id={@row_id && @row_id.(row)} class="tw-group tw-hover:bg-zinc-50">
            <td
              :for={{col, i} <- Enum.with_index(@col)}
              phx-click={@row_click && @row_click.(row)}
              class={["tw-relative tw-p-0", @row_click && "hover:cursor-pointer"]}
            >
              <div class="tw-block tw-py-4 tw-pr-6">
                <span class="tw-absolute tw--inset-y-px tw-right-0 tw--left-4 tw-group-hover:bg-zinc-50 tw-sm:rounded-l-xl" />
                <span class={["tw-relative", i == 0 && "tw-font-semibold tw-text-zinc-900"]}>
                  <%= render_slot(col, @row_item.(row)) %>
                </span>
              </div>
            </td>
            <td :if={@action != []} class="tw-relative tw-w-14 tw-p-0">
              <div class="tw-relative tw-whitespace-nowrap tw-py-4 tw-text-right tw-text-sm tw-font-medium">
                <span class="tw-absolute tw--inset-y-px tw--right-4 tw-left-0 tw-group-hover:bg-zinc-50 tw-sm:rounded-r-xl" />
                <span
                  :for={action <- @action}
                  class="tw-relative tw-ml-4 tw-font-semibold tw-leading-6 tw-text-zinc-900 tw-hover:text-zinc-700"
                >
                  <%= render_slot(action, @row_item.(row)) %>
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    """
  end

  @doc """
  Renders a data list.

  ## Examples

      <.list>
        <:item title="Title"><%= @post.title %></:item>
        <:item title="Views"><%= @post.views %></:item>
      </.list>
  """
  slot :item, required: true do
    attr :title, :string, required: true
  end

  def list(assigns) do
    ~H"""
    <div class="tw-mt-14">
      <dl class="tw--my-4 tw-divide-y tw-divide-zinc-100">
        <div :for={item <- @item} class="tw-flex tw-gap-4 tw-py-4 tw-text-sm tw-leading-6 tw-sm:gap-8">
          <dt class="tw-w-1/4 tw-flex-none tw-text-zinc-500"><%= item.title %></dt>
          <dd class="tw-text-zinc-700"><%= render_slot(item) %></dd>
        </div>
      </dl>
    </div>
    """
  end

  @doc """
  Renders a back navigation link.

  ## Examples

      <.back navigate={~p"/posts"}>Back to posts</.back>
  """
  attr :navigate, :any, required: true
  slot :inner_block, required: true

  def back(assigns) do
    ~H"""
    <div class="tw-mt-16">
      <.link
        navigate={@navigate}
        class="tw-text-sm tw-font-semibold tw-leading-6 tw-text-zinc-900 tw-hover:text-zinc-700"
      >
        <.icon name="hero-arrow-left-solid" class="tw-h-3 tw-w-3" />
        <%= render_slot(@inner_block) %>
      </.link>
    </div>
    """
  end

  @doc """
  Renders a [Heroicon](https://heroicons.com).

  Heroicons come in three styles – outline, solid, and mini.
  By default, the outline style is used, but solid and mini may
  be applied by using the `-solid` and `-mini` suffix.

  You can customize the size and colors of the icons by setting
  width, height, and background color classes.

  Icons are extracted from the `deps/heroicons` directory and bundled within
  your compiled app.css by the plugin in your `assets/tailwind.config.js`.

  ## Examples

      <.icon name="hero-x-mark-solid" />
      <.icon name="hero-arrow-path" class="tw-ml-1 tw-w-3 tw-h-3 tw-animate-spin" />
  """
  attr :name, :string, required: true
  attr :class, :string, default: nil

  def icon(%{name: "hero-" <> _} = assigns) do
    ~H"""
    <span class={[@name, @class]} />
    """
  end

  ## JS Commands

  def show(js \\ %JS{}, selector) do
    JS.show(js,
      to: selector,
      time: 300,
      transition:
        {"tw-transition-all tw-transform tw-ease-out tw-duration-300",
         "tw-opacity-0 tw-translate-y-4 tw-sm:translate-y-0 tw-sm:scale-95",
         "tw-opacity-100 tw-translate-y-0 tw-sm:scale-100"}
    )
  end

  def hide(js \\ %JS{}, selector) do
    JS.hide(js,
      to: selector,
      time: 200,
      transition:
        {"tw-transition-all tw-transform tw-ease-in tw-duration-200",
         "tw-opacity-100 tw-translate-y-0 tw-sm:scale-100",
         "tw-opacity-0 tw-translate-y-4 tw-sm:translate-y-0 tw-sm:scale-95"}
    )
  end

  def show_modal(js \\ %JS{}, id) when is_binary(id) do
    js
    |> JS.show(to: "##{id}")
    |> JS.show(
      to: "##{id}-bg",
      time: 300,
      transition:
        {"tw-transition-all tw-transform tw-ease-out tw-duration-300", "tw-opacity-0",
         "tw-opacity-100"}
    )
    |> show("##{id}-container")
    |> JS.add_class("tw-overflow-hidden", to: "body")
    |> JS.focus_first(to: "##{id}-content")
  end

  def hide_modal(js \\ %JS{}, id) do
    js
    |> JS.hide(
      to: "##{id}-bg",
      transition:
        {"tw-transition-all tw-transform tw-ease-in tw-duration-200", "tw-opacity-100",
         "tw-opacity-0"}
    )
    |> hide("##{id}-container")
    |> JS.hide(to: "##{id}", transition: {"tw-block", "tw-block", "tw-hidden"})
    |> JS.remove_class("tw-overflow-hidden", to: "body")
    |> JS.pop_focus()
  end

  @doc """
  Translates an error message using gettext.
  """
  def translate_error({msg, opts}) do
    # When using gettext, we typically pass the strings we want
    # to translate as a static argument:
    #
    #     # Translate the number of files with plural rules
    #     dngettext("errors", "1 file", "%{count} files", count)
    #
    # However the error messages in our forms and APIs are generated
    # dynamically, so we need to translate them by calling Gettext
    # with our gettext backend as first argument. Translations are
    # available in the errors.po file (as we use the "errors" domain).
    if count = opts[:count] do
      Gettext.dngettext(HelloWeb.Gettext, "errors", msg, msg, count, opts)
    else
      Gettext.dgettext(HelloWeb.Gettext, "errors", msg, opts)
    end
  end

  @doc """
  Translates the errors for a field from a keyword list of errors.
  """
  def translate_errors(errors, field) when is_list(errors) do
    for {^field, {msg, opts}} <- errors, do: translate_error({msg, opts})
  end
end
