defmodule Dotcom.Alerts.StartTime do
  @moduledoc """
  A little utility module for determining the next time alert becomes
  active. See `next_active_time/2` for more info.
  """

  alias Alerts.Alert

  @date_time_module Application.compile_env!(:dotcom, :date_time_module)

  @doc """
  Gets the next active time of a single alert or group of alerts.
  """
  @spec next_active_time([Alert.t()] | Alert.t(), DateTime.t()) ::
          :past | {:current, DateTime.t()} | {:future, DateTime.t()}
  def next_active_time(alerts, time \\ @date_time_module.now())

  def next_active_time(alerts, time) when is_list(alerts) do
    alerts
    |> Enum.map(fn alert -> next_active_time(alert, time) end)
    |> List.flatten()
    |> Enum.sort_by(fn next_active ->
      case next_active do
        :past -> 0
        {_, date_time} -> DateTime.to_unix(date_time)
      end
    end)
    |> List.last()
  end

  def next_active_time(alert, time) do
    next_active_period_active_time(alert.active_period, time)
  end

  @spec next_active_period_active_time([Alert.period_pair()], DateTime.t()) ::
          :past | {:current, DateTime.t()} | {:future, DateTime.t()}
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
