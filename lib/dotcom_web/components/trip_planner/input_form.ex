defmodule DotcomWeb.Components.TripPlanner.InputForm do
  @moduledoc """
  A form to plan trips.
  """

  use DotcomWeb, :component

  import MbtaMetro.Components.InputGroup
  import Phoenix.HTML.Form, only: [input_value: 2]

  alias Dotcom.TripPlan.{InputForm, InputForm.Modes}
  alias MbtaMetro.Live.DatePicker

  @doc """
  If form values are passed in, we merge them with the defaults and submit the form.

  Otherwise, we just render the form.
  """
  def input_form(assigns) do
    ~H"""
    <section class="px-10 py-8 lg:px-20 lg:py-12 mb-4 bg-gray-100">
      <.form
        :let={f}
        class="md:grid md:grid-cols-2 gap-x-8 gap-y-2"
        id="trip-planner-input-form"
        for={@changeset}
        method="get"
        phx-change="input_form_change"
        phx-submit="input_form_submit"
      >
        <div :for={field <- [:from, :to]} class="mb-1" id={"trip-planner-locations-#{field}"}>
          <.algolia_autocomplete
            config_type="trip-planner"
            placeholder="Enter a location"
            id={"trip-planner-input-form--#{field}"}
          >
            <.inputs_for :let={location_f} field={f[field]} skip_hidden={true}>
              <input
                :for={subfield <- InputForm.Location.fields()}
                type="hidden"
                class="location-input"
                id={location_f[subfield].id}
                value={location_f[subfield].value}
                name={location_f[subfield].name}
              />
            </.inputs_for>
            <.error_container :for={{msg, _} <- f[field].errors}>
              {msg}
            </.error_container>
          </.algolia_autocomplete>
        </div>
        <div>
          <.input_group
            legend="When"
            form={f}
            field={:datetime_type}
            id="datetime_type"
            options={[{"Now", "now"}, {"Leave at", "leave_at"}, {"Arrive by", "arrive_by"}]}
            type="radio-button"
            class="mb-0"
          />
          <.error_container :for={{msg, _} <- f[:datetime_type].errors}>
            {msg}
          </.error_container>
          <.live_component
            :if={show_datepicker?(f)}
            module={DatePicker}
            config={datepicker_config()}
            field={f[:datetime]}
            id={:datepicker}
          />
          <.error_container :for={{msg, _} <- f[:datetime].errors}>
            {msg}
          </.error_container>
        </div>
        <div>
          <.fieldset id="modes" legend="Modes">
            <.accordion variant="contained">
              <:heading>
                {Modes.selected_modes(input_value(f, :modes))}
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
            </.accordion>
            <.error_container :for={{msg, _} <- f[:modes].errors}>
              {msg}
            </.error_container>
          </.fieldset>
          <div class="inline-flex items-center gap-1">
            <.input type="checkbox" field={f[:wheelchair]} label="Prefer accessible routes" />
            <.icon type="icon-svg" name="icon-accessible-small" class="h-5 w-5" />
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

  defp datepicker_config do
    %{
      default_date: Timex.now("America/New_York"),
      enable_time: true,
      max_date: Schedules.Repo.end_of_rating(),
      min_date: Timex.today("America/New_York")
    }
  end

  defp show_datepicker?(f) do
    input_value(f, :datetime_type) != "now"
  end
end
