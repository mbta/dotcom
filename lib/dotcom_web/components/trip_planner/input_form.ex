defmodule DotcomWeb.Components.TripPlanner.InputForm do
  @moduledoc """
  A form to plan trips.
  """

  use DotcomWeb, :component

  import MbtaMetro.Components.InputGroup
  import Phoenix.HTML.Form, only: [input_value: 2]

  alias Dotcom.TripPlan.{InputForm, InputForm.Modes}
  alias Dotcom.Utils.ServiceDateTime
  alias MbtaMetro.Live.DatePicker

  @schedules_repo Application.compile_env!(:dotcom, :repo_modules)[:schedules]

  @doc """
  If form values are passed in, we merge them with the defaults and submit the form.

  Otherwise, we just render the form.
  """

  attr :class, :string, default: ""
  attr :changeset, :any, required: true

  def input_form(assigns) do
    ~H"""
    <section class={["rounded px-2 py-3 sm:px-8 sm:py-6 lg:px-12 lg:py-8 bg-charcoal-90", @class]}>
      <.form
        :let={f}
        class="flex flex-col md:grid md:grid-cols-[1fr_max-content_1fr] md:gap-x-lg gap-y-sm pt-md"
        id="trip-planner-input-form"
        for={@changeset}
        method="get"
        phx-change="input_form_change"
        phx-submit="input_form_submit"
      >
        <.location_search_box
          name="trip-planner-input-form--from"
          field={f[:from]}
          placeholder="Enter an origin location"
        />
        <div class="-mb-[20px] md:-mt-md md:mb-0 self-end md:self-auto">
          <div class="hidden md:block md:py-sm md:mb-[10px]">
            &nbsp; <%!-- helps align the swap button on desktop--%>
          </div>
          <button
            type="button"
            disabled={disable_swap?(f)}
            phx-click="swap_direction"
            class="px-xs bg-transparent fill-brand-primary disabled:fill-gray-light hover:fill-black"
          >
            <span class="sr-only">Swap origin and destination locations</span>
            <.icon class="h-6 w-6 rotate-90 md:rotate-0" name="right-left" />
          </button>
        </div>
        <.location_search_box
          name="trip-planner-input-form--to"
          field={f[:to]}
          placeholder="Enter a destination location"
        />
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
        <div class="col-start-3">
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
      </.form>
    </section>
    """
  end

  attr :field, Phoenix.HTML.FormField,
    required: true,
    doc: "A form field for a `Dotcom.TripPlan.InputForm.Location`"

  attr :name, :string, required: true, doc: "Needed for the underlying autocomplete ID"

  attr :placeholder, :string,
    doc: "Placeholder text for empty search box",
    default: "Enter a location"

  def location_search_box(assigns) do
    assigns =
      assigns
      |> assign(%{
        has_error?: used_input?(assigns.field) && length(assigns.field.errors) > 0,
        location_keys: InputForm.Location.fields()
      })

    ~H"""
    <fieldset class={"mb-sm -mt-md #{if(@has_error?, do: "text-danger")}"} id={"#{@name}-wrapper"}>
      <legend class="text-charcoal-40 m-0 py-sm">{Phoenix.Naming.humanize(@field.field)}</legend>
      <.algolia_autocomplete config_type="trip-planner" placeholder={@placeholder} id={@name}>
        <.inputs_for :let={location_f} field={@field} skip_hidden={true}>
          <input
            :for={subfield <- @location_keys}
            type="hidden"
            id={location_f[subfield].id}
            value={location_f[subfield].value}
            name={location_f[subfield].name}
          />
        </.inputs_for>
        <.feedback :for={{msg, _} <- @field.errors} :if={@has_error?} kind={:error}>
          {msg}
        </.feedback>
      </.algolia_autocomplete>
    </fieldset>
    """
  end

  defp datepicker_config do
    %{
      default_date: ServiceDateTime.beginning_of_service_day(),
      enable_time: true,
      max_date: @schedules_repo.end_of_rating() |> Timex.shift(days: 1),
      min_date: ServiceDateTime.beginning_of_service_day()
    }
  end

  defp disable_swap?(%{errors: [_ | _] = errors}) do
    :from in Keyword.keys(errors) or :to in Keyword.keys(errors)
  end

  defp disable_swap?(_), do: false

  defp show_datepicker?(f) do
    input_value(f, :datetime_type) != "now"
  end
end
