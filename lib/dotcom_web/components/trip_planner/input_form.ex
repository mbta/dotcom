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

  attr :class, :string, default: ""
  attr :changeset, :any, required: true

  def input_form(assigns) do
    ~H"""
    <section class={["rounded px-xl py-lg lg:px-2xl lg:py-xl bg-charcoal-90", @class]}>
      <.form
        :let={f}
        class="md:grid md:grid-cols-2 gap-x-8 gap-y-2"
        id="trip-planner-input-form"
        for={@changeset}
        method="get"
        phx-change="input_form_change"
        phx-submit="input_form_submit"
      >
        <fieldset :for={field <- [:from, :to]} id={"trip-planner-locations-#{field}"} class="mb-sm">
          <legend class="text-charcoal-40 m-0 py-sm">{Phoenix.Naming.humanize(field)}</legend>
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
        </fieldset>
        <fieldset class="mb-sm">
          <legend class="text-charcoal-40 m-0 py-sm">When</legend>
          <.input_group
            form={f}
            field={:datetime_type}
            options={[{"Now", "now"}, {"Leave at", "leave_at"}, {"Arrive by", "arrive_by"}]}
            type="radio-button"
            class="w-full mb-xs"
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
        </fieldset>
        <div>
          <fieldset class="mb-sm">
            <legend class="text-charcoal-40 m-0 py-sm">Modes</legend>
            <.accordion variant="multiselect">
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
          </fieldset>
          <div class="inline-flex items-center gap-sm mb-sm">
            <.input type="checkbox" field={f[:wheelchair]} label="Prefer accessible routes" />
            <.icon type="icon-svg" name="icon-accessible-small" class="h-5 w-5" />
          </div>
        </div>
        <div class="col-start-2 justify-self-end my-sm">
          <.button
            type="submit"
            phx-disable-with="Planning your trip..."
            class="w-full justify-center md:w-fit"
          >
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
