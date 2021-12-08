defmodule SiteWeb.TimeHelpers do
  @moduledoc """
  Functions to manipulate and format times.
  """
  use Timex

  @doc "Returns a string with the full month, day and year."
  @spec format_date(DateTime.t() | Date.t()) :: String.t()
  def format_date(date) do
    Timex.format!(date, "{Mfull} {D}, {YYYY}")
  end

  @doc """
  Returns a string representing the predicted arrival time. This can vary by mode of transit.
  """
  @spec format_prediction_time(
          Timex.Types.valid_datetime(),
          Routes.Route.type_atom(),
          Timex.Types.valid_datetime()
        ) :: String.t()
  def format_prediction_time(time, mode, now_time \\ Util.now())

  def format_prediction_time(time, :commuter_rail, _now_time) do
    format_time(time)
  end

  def format_prediction_time(time, mode, now_time) do
    time_diff = Timex.diff(time, now_time, :seconds)

    if time_diff <= 30 or (mode == :subway and time_diff <= 60) do
      "arriving"
    else
      do_time_difference(time, now_time, &format_time/1, 120)
    end
  end

  @spec format_time(Timex.Types.valid_datetime()) :: String.t()
  def format_time(%{minute: 0} = time), do: Timex.format!(time, "{h12} {AM}")
  def format_time(time), do: Timex.format!(time, "{h12}:{m} {AM}")

  @doc """
  Returns the HTML to display a time as a differece from
  the given time

  Times with a difference under a threshold are shown as a difference in minutes,
  a difference over a threshold will show the time.
  """
  @type time_formatter_t :: (Timex.Types.valid_datetime() -> String.t())
  @spec do_time_difference(
          Timex.Types.valid_datetime(),
          Timex.Types.valid_datetime(),
          time_formatter_t,
          integer
        ) ::
          [String.t()] | String.t()
  def do_time_difference(
        time,
        current_time,
        not_soon_formatter_fn \\ &format_schedule_time/1,
        estimate_threshold_mins \\ 60
      ) do
    time
    |> Timex.diff(current_time, :minutes)
    |> format_time_difference(time, not_soon_formatter_fn, estimate_threshold_mins)
  end

  defp format_time_difference(diff, time, not_soon_formatter_fn, estimate_threshold_mins)
       when diff > estimate_threshold_mins or diff < 0,
       do: not_soon_formatter_fn.(time)

  defp format_time_difference(0, _, _, _), do: "1 min"

  defp format_time_difference(diff, _, _, _),
    do: "#{Integer.to_string(diff)} min"

  @spec format_schedule_time(Timex.Types.valid_datetime()) :: String.t()
  def format_schedule_time(time) do
    time
    |> Timex.format!("{h12}:{m} {AM}")
  end

  @doc """
  Compute a display value for a time. This can be the scheduled time, predicted time, or a difference between the two, depending on the associated route.
  """
  @spec displayed_time(
          Timex.Types.valid_datetime(),
          Timex.Types.valid_datetime(),
          Routes.Route.gtfs_route_type()
        ) :: String.t() | nil
  def displayed_time(predicted_time, _scheduled_time, mode) when not is_nil(predicted_time),
    do: format_prediction_time(predicted_time, mode)

  def displayed_time(_predicted_time, scheduled_time, _mode) when not is_nil(scheduled_time),
    do: format_schedule_time(scheduled_time)

  def displayed_time(_predicted_time, _scheduled_time, _mode), do: ""
end
