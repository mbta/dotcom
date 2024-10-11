defmodule DotcomWeb.Components.LiveComponents.TripPlannerForm do
  @moduledoc """
  A form to plan trips.
  """
  use DotcomWeb, :live_component

  import DotcomWeb.ViewHelpers, only: [svg: 1]
  import Phoenix.HTML.Form, only: [input_name: 2, input_value: 2, input_id: 2]

  import MbtaMetro.Components.{Feedback, InputGroup}

  alias Dotcom.TripPlan.{InputForm, OpenTripPlanner}
  alias MbtaMetro.Live.DatePicker

  @form_defaults %{
    "datetime_type" => "now",
    "datetime" => NaiveDateTime.utc_now(),
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
       show_datepicker: false
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
        <div>
          <.input_group
            legend="When"
            form={f}
            field={:datetime_type}
            id="datetime_type"
            options={[{"Now", "now"}, {"Leave At", "leave_at"}, {"Arrive By", "arrive_by"}]}
            type="radio-button"
            phx-change="toggle_datepicker"
          />
          <.feedback
            :for={{msg, _} <- f[:datetime_type].errors}
            :if={used_input?(f[:datetime_type])}
            kind={:error}
          >
            <%= msg %>
          </.feedback>
          <.live_component
            :if={@show_datepicker}
            module={DatePicker}
            config={datepicker_config()}
            field={f[:datetime]}
            id={:datepicker}
          />
          <.feedback
            :for={{msg, _} <- f[:datetime].errors}
            :if={used_input?(f[:datetime])}
            kind={:error}
          >
            <%= msg %>
          </.feedback>
        </div>
        <div>
          <.fieldset id="modes" legend="Modes">
            <.accordion id="accordion">
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
  @doc """
  If the user selects "now" for the date and time, hide the datepicker.
  This will destroy the flatpickr instance.

  If the user selects arrivey by or leave at, then we show the datepicker and set the time to the nearest 5 minutes.
  """
  def handle_event("toggle_datepicker", %{"input_form" => %{"datetime_type" => "now"}}, socket) do
    {:noreply, assign(socket, show_datepicker: false)}
  end

  def handle_event("toggle_datepicker", _, socket) do
    new_socket =
      socket
      |> assign(show_datepicker: true)
      |> push_event("set-datetime", %{datetime: nearest_5_minutes()})

    {:noreply, new_socket}
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

  defp datepicker_config do
    %{
      default_date: Timex.now("America/New_York"),
      enable_time: true,
      max_date: Schedules.Repo.end_of_rating(),
      min_date: Timex.now()
    }
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

  defp nearest_5_minutes do
    datetime = Timex.now("America/New_York")
    minutes = datetime.minute
    rounded_minutes = Float.ceil(minutes / 5) * 5
    added_minutes = Kernel.trunc(rounded_minutes - minutes)

    Timex.shift(datetime, minutes: added_minutes)
  end

  defp plan(data, on_submit) do
    _ = on_submit.(data)
    result = OpenTripPlanner.plan(data)
    _ = on_submit.(result)
    result
  end

  defp selected_modes(modes) when modes == @all_modes do
    "All modes"
  end

  defp selected_modes([]), do: "No transit modes selected"
  defp selected_modes(nil), do: "No transit modes selected"

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
end
