defmodule DotcomWeb.Components.LiveComponents.TripPlannerForm do
  @moduledoc """
  A form to plan trips.
  """
  use DotcomWeb, :live_component

  import DotcomWeb.ViewHelpers, only: [mode_name: 1, svg: 1]
  import Phoenix.HTML.Form, only: [input_name: 2, input_value: 2, input_id: 2]

  alias Dotcom.TripPlan.InputForm

  @form_defaults %{
    "datetime_type" => :now,
    "datetime" => NaiveDateTime.local_now(),
    "modes" => [:commuter_rail, :subway, :bus, :ferry],
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
       show_datepicker: false
     })}
  end

  @impl true
  def render(assigns) do
    ~H"""
    <section>
      <.form
        :let={f}
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
            <.form_error :for={{msg, _} <- f[field].errors} :if={used_input?(f[field])}>
              <%= msg %>
            </.form_error>
          </.algolia_autocomplete>
        </div>
        <.fieldset legend="When">
          <.input_group
            id={input_id(@form, :datetime_type)}
            field={f[:datetime_type]}
            type="radio"
            phx-click="toggle_datepicker"
            phx-target={@myself}
            phx-update="ignore"
          >
            <:input_item
              :for={type <- Ecto.Enum.values(InputForm, :datetime_type)}
              id={input_name(@form, :datetime_type) <> "_#{type}"}
              value={type}
              checked={input_value(@form, :datetime_type) == type}
            />
          </.input_group>

          <.form_error
            :for={{msg, _} <- f[:datetime_type].errors}
            :if={used_input?(f[:datetime_type])}
          >
            <%= msg %>
          </.form_error>
          <.form_label :if={@show_datepicker} for="timepick">
            <input
              id="timepick"
              type="datetime-local"
              step="any"
              name={input_name(@form, :datetime)}
              value={input_value(@form, :datetime)}
            />
            <span class="sr-only">Date and time to leave at or arrive by</span>
          </.form_label>
          <.form_error
            :for={{msg, _} <- f[:datetime_type].errors}
            :if={used_input?(f[:datetime_type])}
          >
            <%= msg %>
          </.form_error>
          <.form_error :for={{msg, _} <- f[:datetime].errors} :if={used_input?(f[:datetime])}>
            <%= msg %>
          </.form_error>
        </.fieldset>
        <.fieldset legend="Modes">
          <.accordion open>
            <:heading>
              <%= input_value(@form, :modes) |> selected_modes() %>
            </:heading>
            <:content>
              <.mode_selector field={f[:modes]} modes={modes()} />
            </:content>
            <:extra :if={used_input?(f[:modes])}>
              <.form_error :for={{msg, _} <- f[:modes].errors}>
                <%= msg %>
              </.form_error>
            </:extra>
          </.accordion>
        </.fieldset>
        <div class="inline-flex items-center">
          <.form_input type="checkbox" field={f[:wheelchair]} label="Prefer accessible routes" />
          <%= svg("icon-accessible-small.svg") %>
        </div>
        <.button type="submit" phx-disable-with="Planning your trip...">
          Get trip suggestions
        </.button>
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
        _ = socket.assigns.on_submit.(data)

        data
        |> Ecto.Changeset.change()
        |> Phoenix.Component.to_form()

      {:error, changeset} ->
        changeset
        |> Phoenix.Component.to_form()
    end
    |> then(fn form ->
      {:noreply, assign(socket, %{form: form})}
    end)
  end

  defp modes do
    InputForm
    |> Ecto.Enum.values(:modes)
    |> Enum.map(&{mode_name(&1), &1})
  end

  defp selected_modes([:commuter_rail, :subway, :bus, :ferry]) do
    "All modes"
  end

  defp selected_modes([]), do: "No transit modes selected"

  defp selected_modes([mode]), do: mode_name(mode) <> " Only"
  defp selected_modes([mode1, mode2]), do: mode_name(mode1) <> " and " <> mode_name(mode2)

  defp selected_modes(modes) do
    modes
    |> Enum.map(&mode_name/1)
    |> Enum.intersperse(", ")
    |> List.insert_at(-2, "and ")
    |> Enum.join("")
  end
end
