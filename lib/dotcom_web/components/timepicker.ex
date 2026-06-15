defmodule DotcomWeb.Components.TimePicker do
  use Phoenix.LiveComponent
  import MbtaMetro.Components.Feedback
  import MbtaMetro.Components.Input, only: [format_changeset_errors: 1]
  import DotcomWeb.TripPlannerLive, only: [nearest_5_minutes: 0]

  @date_time_module Application.compile_env!(:dotcom, :date_time_module)

  def mount(_params, _session, socket) do
    config = Map.get(socket.assigns, :config, %{})
    {locale, new_config} = Map.pop(config, :locale, "en")
    new_socket = assign(socket, config: new_config, locale: locale)

    {:ok, new_socket}
  end

  @doc """
  Renders the time picker component.
  """
  def render(assigns) do
    assigns =
      assigns
      |> assign(:errors, format_changeset_errors(assigns.errors))

    ~H"""
    <div class={error_class?(@errors)}>
      <select
        class="c-select trip-plan-time  .mbta-input"
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
        class="c-select trip-plan-time"
        id="timepicker_minute"
        name={@form[:timepicker_minute].name}
      >
        <option
          :for={minute <- 0..55//5}
          value={minute |> Integer.to_string() |> String.pad_leading(2, "0")}
          selected={
            option_selected?(
              @form,
              minute |> Integer.to_string() |> String.pad_leading(2, "0"),
              :timepicker_minute
            )
          }
        >
          {minute |> Integer.to_string() |> String.pad_leading(2, "0")}
        </option>
      </select>
      <select class="c-select trip-plan-time" id="timepicker_ampm" name={@form[:timepicker_ampm].name}>
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

  def error_class?([]) do
    nil
  end

  def error_class?(_) do
    "trip-plan-time--error"
  end

  def option_selected?(form, option, field = :timepicker_hour) do
    dbg(form[field].value)

    if is_nil(form[field].value) do
      @date_time_module.now().hour |> hour_24_to_12() == option
    else
      form[field].value == option |> Integer.to_string()
    end
  end

  def option_selected?(form, option, field = :timepicker_minute) do
    dbg(form[field].value)

    if is_nil(form[field].value) do
      nearest_5_minutes().minute ==
        option |> Integer.parse() |> elem(0)
    else
      form[field].value == option
    end
  end

  def option_selected?(form, option, field = :timepicker_ampm) do
    dbg(form[field].value)

    if is_nil(form[field].value) do
      (@date_time_module.now().hour < 12 and "AM" == option) or
        (@date_time_module.now().hour >= 12 and "PM" == option)
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
