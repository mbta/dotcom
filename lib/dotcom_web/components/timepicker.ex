defmodule DotcomWeb.Components.TimePicker do
  @moduledoc """
  A time picker live component, 12h hh:mmAM format, every 5 minutes

  assigns:
  :form - the form this component is in
  :errors - the errors to render

  """
  use DotcomWeb, :component
  import MbtaMetro.Components.Feedback
  import MbtaMetro.Components.Input, only: [format_changeset_errors: 1]
  import DotcomWeb.TripPlannerLive, only: [nearest_5_minutes: 0]

  @date_time_module Application.compile_env!(:dotcom, :date_time_module)

  @doc """
  Renders the time picker component.
  """
  def timepicker(assigns) do
    assigns =
      assigns
      |> assign(:errors, format_changeset_errors(assigns.errors))

    ~H"""
    <div class={error_class?(@errors)}>
      <select
        class="c-select timepicker-select"
        id="timepicker_hour"
        name={@form[:timepicker_hour].name}
      >
        <option
          :for={hour <- 1..12}
          value={hour}
          selected={option_selected?(@form, hour, :timepicker_hour)}
        >
          {hour}
        </option>
      </select>
      <select
        class="c-select timepicker-select"
        id="timepicker_minute"
        name={@form[:timepicker_minute].name}
      >
        <option
          :for={minute <- 0..55//5}
          value={minute_pad(minute)}
          selected={
            option_selected?(
              @form,
              minute_pad(minute),
              :timepicker_minute
            )
          }
        >
          {minute_pad(minute)}
        </option>
      </select>
      <select
        class="c-select timepicker-select"
        id="timepicker_ampm"
        name={@form[:timepicker_ampm].name}
      >
        <option value="AM" selected={option_selected?(@form, "AM", :timepicker_ampm)}>
          AM
        </option>
        <option value="PM" selected={option_selected?(@form, "PM", :timepicker_ampm)}>
          PM
        </option>
      </select>
      <.feedback :for={msg <- @errors} kind={:error}>{msg}</.feedback>
    </div>
    """
  end

  def minute_pad(minute) do
    minute |> Integer.to_string() |> String.pad_leading(2, "0")
  end

  def error_class?([]) do
    nil
  end

  def error_class?(_) do
    "trip-plan-time--error"
  end

  def option_selected?(form, option, :timepicker_hour = field) do
    if is_nil(form[field].value) do
      nearest_5_minutes().hour |> hour_24_to_12() == option
    else
      form[field].value == option |> Integer.to_string()
    end
  end

  def option_selected?(form, option, :timepicker_minute = field) do
    if is_nil(form[field].value) do
      nearest_5_minutes().minute ==
        option |> Integer.parse() |> elem(0)
    else
      form[field].value == option
    end
  end

  def option_selected?(form, option, :timepicker_ampm = field) do
    if is_nil(form[field].value) do
      (nearest_5_minutes().hour < 12 and "AM" == option) or
        (nearest_5_minutes().hour >= 12 and "PM" == option)
    else
      form[field].value == option
    end
  end

  def hour_24_to_12(hour24) do
    cond do
      hour24 > 12 ->
        hour24 - 12

      hour24 == 0 ->
        12

      true ->
        hour24
    end
  end
end
