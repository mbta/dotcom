defmodule Dotcom.Departure do
  @moduledoc """
  A descriptor of a moment to go! Data-wise, it's a prediction and/or schedule at heart, with some added context around routes and modes.
  """

  alias Predictions.Prediction
  alias Routes.Route

  @date_time_module Application.compile_env!(:dotcom, :date_time_module)

  @spec display(Prediction.t()) :: String.t() | nil
  def display(%Prediction{schedule_relationship: sr}) when sr in [:skipped, :cancelled] do
    nil
  end

  def display(%Prediction{} = prediction) do
    bs = boarding_status(prediction)

    if bs do
      bs
    else
      countdown(prediction)
    end
  end

  defp boarding_status(prediction) do
    rail_status = rail_status(prediction)
    boarding_time = boarding_time(prediction)

    if rail_status && boarding_time do
      boarding_time <> " " <> rail_status
    else
      if rail_status, do: rail_status, else: boarding_time
    end
  end

  defp rail_status(%Prediction{route: %Route{type: type}}) when type != 2, do: nil
  defp rail_status(%Prediction{status: nil, track: track}), do: if(track, do: track(track))
  defp rail_status(%Prediction{status: status, track: nil}), do: status(status)

  defp rail_status(%Prediction{status: status, track: track}) do
    status(status) <> " " <> track(track)
  end

  defp status("All aboard"), do: "Last call"
  defp status(status), do: status
  defp track(track), do: "Track #{track}"

  def boarding_time(%Prediction{route: %Route{type: type}, time: time}) when type in [0, 1, 3] do
    if DateTime.diff(time, @date_time_module.now(), :second) <= 30 do
      if(type == 3, do: "Now", else: "Arriving")
    end
  end

  def boarding_time(%Prediction{route: %Route{type: 2}, time: time}) do
    DotcomWeb.Components.TripPlanner.Helpers.formatted_time(time)
  end

  def boarding_time(_), do: nil

  def countdown(%Prediction{time: time}) do
    diff = DateTime.diff(time, @date_time_module.now(), :second)

    if diff <= 0 do
      nil
    else
      Dotcom.Utils.Diff.seconds_to_localized_minutes(diff)
    end
  end
end
