defmodule Dotcom.LoggerFilters do
  @moduledoc """
  Sheds low-priority logs when the default console handler is overloaded.
  """

  @doc """
  Drops info/notice events above the handler queue threshold, except ehmon reports.
  """
  @spec drop_low_priority_on_load(:logger.log_event(), non_neg_integer()) :: :stop | :ignore
  def drop_low_priority_on_load(
        %{msg: {:report, %{format: ~c"ehmon_report " ++ _}}},
        _threshold
      ),
      do: :ignore

  def drop_low_priority_on_load(%{level: level}, threshold)
      when level in [:debug, :info, :notice] do
    with {:ok, pid} <- logger_handler_pid(),
         {:message_queue_len, len} when len > threshold <- Process.info(pid, :message_queue_len) do
      :stop
    else
      _ -> :ignore
    end
  end

  def drop_low_priority_on_load(_log_event, _threshold), do: :ignore

  defp logger_handler_pid do
    case Process.whereis(:logger_std_h_default) do
      pid when is_pid(pid) -> {:ok, pid}
      _ -> nil
    end
  end
end
