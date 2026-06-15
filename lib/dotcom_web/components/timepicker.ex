defmodule DotcomWeb.Components.TimePicker do
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
  Renders the time picker component.
  """
  def render(assigns) do
    assigns =
      assigns
      |> assign(:errors, format_changeset_errors(assigns.field.errors))
      |> assign_new(:value, fn -> assigns.field.value end)

    ~H"""
    <div>
      <select id="timepicker_hour" name={@form[:timepicker_hour].name}>
        <option
          :for={hour <- 1..12}
          value={hour}
          selected={@form[:timepicker_hour].value == hour |> Integer.to_string()}
        >
          {hour}
        </option>
      </select>:
      <select id="timepicker_minute" name={@form[:timepicker_minute].name}>
        <option
          :for={minute <- 0..55//5}
          value={minute |> Integer.to_string() |> String.pad_leading(2, "0")}
          selected={
            minute |> Integer.to_string() |> String.pad_leading(2, "0") ==
              @form[:timepicker_minute].value
          }
        >
          {minute |> Integer.to_string() |> String.pad_leading(2, "0")}
        </option>
      </select>
      <select id="timepicker_ampm" name={@form[:timepicker_ampm].name}>
        <option value="AM" selected={@form[:timepicker_ampm].value == "AM"}>
          AM
        </option>
        <option value="PM" selected={@form[:timepicker_ampm].value == "PM"}>
          PM
        </option>
      </select>
    </div>
    """
  end

  def time_hour(value) when is_binary(value) do
    value |> String.split(":") |> Enum.at(0)
  end

  def time_hour(_), do: "12"

  def time_minute(value) when is_binary(value) do
    value |> String.split(":") |> Enum.at(1) |> String.slice(0..1)
  end

  def time_minute(_), do: "00"

  def time_ampm(value) when is_binary(value) do
    value |> String.split(":") |> Enum.at(1) |> String.slice(2..3)
  end

  def time_ampm(_), do: "AM"

  def datetime_hour(value) when not is_nil(value) do
    {:ok, datetime} = value |> DateTime.shift_zone("America/New_York")
    hour_24 = datetime.hour

    cond do
      hour_24 > 12 ->
        hour_24 - 12

      hour_24 == 0 ->
        12

      true ->
        hour_24
    end
  end

  def datetime_hour(_) do
    12
  end
end
