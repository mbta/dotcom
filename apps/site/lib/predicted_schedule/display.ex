defmodule PredictedSchedule.Display do
  import SiteWeb.ViewHelpers, only: [format_schedule_time: 1]

  @doc """
  Returns the HTML to display a time as a differece from
  the given time

  Times with a difference under a threshold are shown as a difference in minutes,
  a difference over a threshold will show the time.
  """
  @type time_formatter_t :: (DateTime.t() -> [String.t()] | String.t())
  @spec do_time_difference(DateTime.t(), DateTime.t(), time_formatter_t, integer) ::
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

  defp format_time_difference(0, _, _, _), do: ["1", " ", "min"]

  defp format_time_difference(diff, _, _, _),
    do: [Integer.to_string(diff), " ", "min"]

  @doc """

  Returns the headsign for the PredictedSchedule.  The headsign is generally
  the destination of the train: what's displayed on the front of the
  bus/train.

  """
  @spec headsign(PredictedSchedule.t()) :: String.t()
  def headsign(%PredictedSchedule{schedule: nil, prediction: nil}) do
    ""
  end

  def headsign(%PredictedSchedule{} = ps) do
    case PredictedSchedule.trip(ps) do
      nil -> ps |> PredictedSchedule.route() |> do_route_headsign(ps.prediction.direction_id)
      trip -> trip.headsign
    end
  end

  defp do_route_headsign(%Routes.Route{id: "Green-B"}, 0) do
    "Boston College"
  end

  defp do_route_headsign(%Routes.Route{id: "Green-C"}, 0) do
    "Cleveland Circle"
  end

  defp do_route_headsign(%Routes.Route{id: "Green-D"}, 0) do
    "Riverside"
  end

  defp do_route_headsign(%Routes.Route{id: "Green-E"}, 0) do
    "Heath Street"
  end

  defp do_route_headsign(_, _) do
    ""
  end
end
