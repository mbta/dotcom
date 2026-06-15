defmodule DotcomWeb.Components.DatePicker do
  @moduledoc """
  A live component that renders a date picker using Flatpickr.

  You must pass in the following assigns:

    * `:id`
    * `:field` - A form field struct retrieved from a form, for example: @form[:datetime].
    * `:label`

  You can optionally pass in a `:config` map:
    * `:default_date` - The default date that should be selected.
    * `:enable_time` - A boolean that determines if the time picker should be enabled.
    * `:locale` - A two letter localization code like "es" or "zh."
    * `:max_date` - The maximum date that can be selected.
    * `:min_date` - The minimum date that can be selected.
  """

  use Phoenix.LiveComponent

  import MbtaMetro.Components.Feedback
  import MbtaMetro.Components.Icon, only: [icon: 1]
  import MbtaMetro.Components.Input, only: [format_changeset_errors: 1, label: 1]

  def mount(_params, _session, socket) do
    config = Map.get(socket.assigns, :config, %{})
    {locale, new_config} = Map.pop(config, :locale, "en")
    new_socket = assign(socket, config: new_config, locale: locale)

    {:ok, new_socket}
  end

  @doc """
  Renders the date picker component.
  """
  def render(assigns) do
    assigns =
      assigns
      |> assign(:errors, format_changeset_errors(assigns.field.errors))
      |> assign_new(:value, fn ->
        assigns.field.value
      end)

    ~H"""
    <div class={["mbta-date-picker", @errors != [] && "mbta-date-picker--error"]}>
      <.label :if={@label} for={@field.id}><strong>{@label}</strong></.label>
      <div
        id={@id}
        class="mbta-date-picker--input"
        phx-hook="TripPlannerDatePicker"
        phx-update="ignore"
        data-config={Jason.encode!(@config)}
        data-locale={@locale}
      >
        <input
          type="datetime-local"
          name={@field.name}
          id={@field.id}
          value={Phoenix.HTML.Form.normalize_value("datetime-local", @value)}
          class="mbta-input"
          data-input
        />
        <a href="#" data-toggle>
          <.icon name="calendar" type="regular" class="mbta-date-picker--icon" />
        </a>
      </div>
    </div>
    """
  end

  @doc """
  When we get an event to set the dateime, we push the event to the socket.
  This will be picked up by the Hook.
  """
  def handle_event("set_datetime", %{"datetime" => datetime}, socket) do
    {:noreply, push_event(socket, "set-datetime", %{datetime: datetime})}
  end
end
