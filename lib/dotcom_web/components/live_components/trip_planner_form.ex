defmodule DotcomWeb.Components.LiveComponents.TripPlannerForm do
  @moduledoc """
  A form to plan trips.
  """
  use DotcomWeb, :live_component

  import DotcomWeb.ViewHelpers, only: [svg: 1]
  import MbtaMetro.Components.Feedback
  import MbtaMetro.Components.InputGroup
  import Phoenix.HTML.Form, only: [input_name: 2, input_value: 2, input_id: 2]

  alias Dotcom.TripPlan.{InputForm, InputForm.Modes}

  @form_defaults %{
    "datetime_type" => :now,
    "datetime" => NaiveDateTime.local_now(),
    "modes" => InputForm.initial_modes(),
    "wheelchair" => true
  }

  @impl true
  def mount(socket) do
    form =
      %InputForm{}
      |> InputForm.changeset(@form_defaults)
      |> to_form()

    {:ok,
     assign(socket, %{
       form: form,
       location_keys: InputForm.Location.fields(),
       show_datepicker: input_value(form, :datetime_type) != :now
     })}
  end

  @impl true
  def render(assigns) do
    ~H"""
    <section class="px-10 py-8 lg:px-20 lg:py-12 mb-4 bg-gray-100">
      <.form
        :let={f}
        class="md:grid md:grid-cols-2 gap-x-8 gap-y-2"
        id={@id}
        for={@form}
        method="get"
        phx-change="validate"
        phx-submit="save_form"
        phx-target={@myself}
      >
        <div :for={field <- [:from, :to]} class="mb-1">
          <.algolia_autocomplete
            config_type="trip-planner"
            placeholder="Enter a location"
            id={"#{@form_name}--#{field}"}
          >
            <.inputs_for :let={location_f} field={f[field]} skip_hidden={true}>
              <input
                :for={subfield <- @location_keys}
                type="hidden"
                class="location-input"
                id={location_f[subfield].id}
                value={location_f[subfield].value}
                name={location_f[subfield].name}
              />
            </.inputs_for>
            <.feedback :for={{msg, _} <- f[field].errors} :if={used_input?(f[field])} kind={:error}>
              <%= msg %>
            </.feedback>
          </.algolia_autocomplete>
        </div>
        <.fieldset legend="When">
          <ul class="m-0 p-0 flex flex-col sm:flex-row list-none">
            <li
              :for={type <- Ecto.Enum.values(InputForm, :datetime_type)}
              class={[
                "py-0 px-4",
                "border border-solid border-slate-300 bg-white",
                "has-[:checked]:bg-blue-50 has-[:checked]:border-blue-600",
                "first:max-sm:rounded-t-lg last:max-sm:rounded-b-lg",
                "sm:first:rounded-l-lg sm:last:rounded-r-lg"
              ]}
            >
              <.input
                id={input_id(@form, :datetime_type) <> "_#{type}"}
                type="radio"
                field={f[:datetime_type]}
                value={type}
                checked={input_value(@form, :datetime_type) == type}
                phx-click="toggle_datepicker"
                phx-target={@myself}
              />
            </li>
          </ul>

          <.feedback
            :for={{msg, _} <- f[:datetime_type].errors}
            :if={used_input?(f[:datetime_type])}
            kind={:error}
          >
            <%= msg %>
          </.feedback>
          <.label :if={@show_datepicker} for="timepick">
            <input
              id="timepick"
              type="datetime-local"
              step="any"
              name={input_name(@form, :datetime)}
              value={input_value(@form, :datetime)}
            />
            <span class="sr-only">Date and time to leave at or arrive by</span>
          </.label>
          <.feedback
            :for={{msg, _} <- f[:datetime_type].errors}
            :if={used_input?(f[:datetime_type])}
            kind={:error}
          >
            <%= msg %>
          </.feedback>
          <.feedback
            :for={{msg, _} <- f[:datetime].errors}
            :if={used_input?(f[:datetime])}
            kind={:error}
          >
            <%= msg %>
          </.feedback>
        </.fieldset>
        <div>
          <.fieldset legend="Modes">
            <.accordion id="input_modes">
              <:heading>
                <%= Modes.selected_modes(input_value(f, :modes)) %>
              </:heading>
              <:content>
                <div class="flex flex-col gap-05 px-2">
                  <.inputs_for :let={f} field={f[:modes]}>
                    <.input
                      :for={subfield <- Modes.fields()}
                      type="checkbox"
                      field={f[subfield]}
                      label={Modes.mode_label(subfield)}
                    />
                  </.inputs_for>
                </div>
              </:content>
              <:extra :if={used_input?(f[:modes])}>
                <.feedback :for={{msg, _} <- f[:modes].errors} kind={:error}>
                  <%= msg %>
                </.feedback>
              </:extra>
            </.accordion>
          </.fieldset>
          <div class="inline-flex items-center gap-2">
            <.input type="checkbox" field={f[:wheelchair]} label="Prefer accessible routes" />
            <span class="mt-[.365em]" aria-hidden="true">
              <%= svg("icon-accessible-small.svg") %>
            </span>
          </div>
        </div>
        <div class="col-start-2 justify-self-end">
          <.button color="green" type="submit" phx-disable-with="Planning your trip...">
            Get trip suggestions
          </.button>
        </div>
      </.form>
    </section>
    """
  end

  @impl true
  def handle_event("toggle_datepicker", %{"value" => datetime_value}, socket) do
    {:noreply, assign(socket, :show_datepicker, datetime_value !== "now")}
  end

  def handle_event("validate", %{"input_form" => params}, socket) do
    form =
      params
      |> InputForm.validate_params()
      |> Phoenix.Component.to_form()

    {:noreply, assign(socket, %{form: form})}
  end

  def handle_event("save_form", %{"input_form" => params}, socket) do
    params
    |> InputForm.validate_params()
    |> Ecto.Changeset.apply_action(:update)
    |> case do
      {:ok, data} ->
        send(self(), {:updated_form, data})
        {:noreply, socket}

      {:error, changeset} ->
        form =
          changeset
          |> Phoenix.Component.to_form()

        {:noreply, assign(socket, %{form: form})}
    end
  end
end
