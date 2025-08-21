defmodule PredictedSchedule.Display do
  import DotcomWeb.ViewHelpers, only: [format_schedule_time: 1]

  @doc """
  Returns the HTML to display a time as a differece from
  the given time

  Times with a difference under a threshold are shown as a difference in minutes,
  a difference over a threshold will show the time.
  """
  @type time_formatter_t :: (DateTime.t() -> [String.t()] | String.t())
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

  defp format_time_difference(0, _, _, _), do: ["1", " ", "min"]

  defp format_time_difference(diff, _, _, _),
    do: [Integer.to_string(diff), " ", "min"]
end
