defmodule DotcomWeb.Components.LiveComponents.TripPlannerForm do
  @moduledoc """
  A form to plan trips.
  """
  use DotcomWeb, :live_component

  import DotcomWeb.ViewHelpers, only: [svg: 1]
  import MbtaMetro.Components.Feedback
  import MbtaMetro.Components.InputGroup
  import Phoenix.HTML.Form, only: [input_name: 2, input_value: 2, input_id: 2]

  alias Dotcom.TripPlan.{InputForm, OpenTripPlanner}

  @all_modes [:RAIL, :SUBWAY, :BUS, :FERRY]
  @form_defaults %{
    "datetime_type" => :now,
    "datetime" => NaiveDateTime.local_now(),
    "modes" => @all_modes,
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
          <.input_group
            id={input_id(@form, :datetime_type)}
            field={f[:datetime_type]}
            type="radio"
            phx-click="toggle_datepicker"
            phx-target={@myself}
          >
            <:inputs
              :for={type <- Ecto.Enum.values(InputForm, :datetime_type)}
              id={input_name(@form, :datetime_type) <> "_#{type}"}
              value={type}
              checked={input_value(@form, :datetime_type) == type}
            />
          </.input_group>

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
            <.accordion>
              <:heading>
                <%= selected_modes(input_value(@form, :modes)) %>
              </:heading>
              <:content>
                <div class="flex flex-col gap-1">
                  <input
                    :if={input_value(@form, :modes) == []}
                    type="hidden"
                    name={input_name(@form, :modes)}
                    value=""
                    checked="true"
                  />
                  <label
                    :for={
                      {mode_name, mode_value} <- [
                        {"Commuter Rail", :RAIL},
                        {"Subway", :SUBWAY},
                        {"Bus", :BUS},
                        {"Ferry", :FERRY}
                      ]
                    }
                    for={@id <> "_#{mode_value}"}
                    class="rounded border-solid border-2 border-transparent has-[:checked]:bg-slate-100 has-[:checked]:font-semibold has-[:focus-within]:border-slate-400
                py-1 px-2 mb-0 inline-flex items-center gap-2"
                  >
                    <div class="relative">
                      <input
                        id={input_id(@form, :modes)  <> "_#{mode_value}"}
                        type="checkbox"
                        class="peer sr-only"
                        name={input_name(@form, :modes) <> "[]"}
                        value={mode_value}
                        checked={
                          if(input_value(@form, :modes),
                            do:
                              mode_value in input_value(@form, :modes) ||
                                "#{mode_value}" in input_value(@form, :modes)
                          )
                        }
                      />
                      <div class="h-8 overflow-hidden rounded-full border-2 border-solid border-slate-200 bg-slate-100 w-14 peer-checked:border-slate-400 peer-checked:bg-slate-300">
                      </div>
                      <div class="absolute w-6 h-6 rounded-full shadow-lg shadow-indigo-500/40 left-1 top-1 transition opacity-50 peer-checked:translate-x-full peer-checked:opacity-100">
                        <%= mode_icon(mode_value) %>
                      </div>
                    </div>
                    <%= mode_name %>
                  </label>
                </div>
              </:content>
              <:extra :if={used_input?(f[:modes])}>
                <.feedback :for={{msg, _} <- f[:modes].errors} kind={:error}>
                  <%= msg %>
                </.feedback>
              </:extra>
            </.accordion>
          </.fieldset>
          <div class="inline-flex items-center">
            <.input type="checkbox" field={f[:wheelchair]} label="Prefer accessible routes" />
            <%= svg("icon-accessible-small.svg") %>
          </div>
        </div>
        <div class="col-start-2 justify-self-end">
          <.button type="submit" phx-disable-with="Planning your trip...">
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
        %{on_submit: on_submit} = socket.assigns
        {:noreply, assign(socket, :plan, plan(data, on_submit))}

      {:error, changeset} ->
        form =
          changeset
          |> Phoenix.Component.to_form()

        {:noreply, assign(socket, %{form: form})}
    end
  end

  defp plan(data, on_submit) do
    _ = on_submit.(data)
    result = OpenTripPlanner.plan(data)
    _ = on_submit.(result)
    result
  end

  defp mode_atom(mode) do
    case mode do
      :RAIL -> :commuter_rail
      :SUBWAY -> :subway
      :BUS -> :bus
      :FERRY -> :ferry
      other when is_binary(other) and other != "" -> String.to_atom(other)
      _ -> :unknown
    end
  end

  defp mode_name(mode) do
    case mode_atom(mode) do
      :unknown ->
        ""

      other ->
        DotcomWeb.ViewHelpers.mode_name(other)
    end
  end

  defp selected_modes(modes) when modes == @all_modes do
    "All modes"
  end

  defp selected_modes([]), do: "No transit modes selected"

  defp selected_modes([mode]), do: mode_name(mode) <> " Only"
  defp selected_modes([mode1, mode2]), do: mode_name(mode1) <> " and " <> mode_name(mode2)

  defp selected_modes(modes) do
    modes
    |> Enum.map(&mode_name/1)
    |> Enum.reject(&(&1 == ""))
    |> Enum.intersperse(", ")
    |> List.insert_at(-2, "and ")
    |> Enum.join("")
  end

  defp mode_icon(:RAIL),
    do: get_mode_icon("icon-mode-commuter-rail.svg")

  defp mode_icon(:SUBWAY),
    do: get_mode_icon("icon-mode-subway.svg")

  defp mode_icon(:BUS),
    do: get_mode_icon("icon-mode-bus.svg")

  defp mode_icon(:FERRY),
    do: get_mode_icon("icon-mode-ferry.svg")

  defp get_mode_icon(path) do
    :mbta_metro
    |> Application.app_dir("priv/static/images")
    |> Path.join(path)
    |> File.read!()
    |> Phoenix.HTML.raw()
  end
end
