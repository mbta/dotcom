defmodule Dotcom.SystemStatus.StartTime do
  @moduledoc """
  A little utility module for determining the next time alert becomes
  active. See `next_active_time/2` for more info.
  """

  alias Alerts.Alert

  @date_time_module Application.compile_env!(:dotcom, :date_time_module)

  @doc """
  Checks an active period (which is actually a list of start/end pairs) for
  the next one that will become active.
   - If the active period is in the future, returns its start_time.
   - If the active period indicates that the alert is currently active, returns nil.
   - Raises an error if the alert is completely in the past.
  """
  @spec next_active_time(Alert.t(), DateTime.t()) ::
          :past | :current | {:future, DateTime.t()}
  def next_active_time(alert, time \\ @date_time_module.now()) do
    next_active_period_active_time(alert.active_period, time)
  end

  @spec next_active_period_active_time([Alert.period_pair()], DateTime.t()) ::
          :past | :current | {:future, DateTime.t()}
  def next_active_period_active_time([], _time), do: :past

  def next_active_period_active_time(
        [{start_time, end_time} | rest_of_active_periods],
        time
      ) do
    cond do
      ends_before?(end_time, time) ->
        next_active_period_active_time(rest_of_active_periods, time)

      DateTime.before?(start_time, time) ->
        {:current, start_time}

      true ->
        {:future, start_time}
    end
  end

  # A little utility for checking whether an active period has already
  # ended. If the end_time given is nil, then it's treated as the end
  # of time, which means the active period has not ended.
  defp ends_before?(nil = _end_time, _time), do: false
  defp ends_before?(end_time, time), do: DateTime.before?(end_time, time)
end
