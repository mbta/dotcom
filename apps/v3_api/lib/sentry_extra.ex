defmodule V3Api.SentryExtra do
  @moduledoc """
  log up to 50 messages of "extra context" when using the Sentry error message log service
  """

  @process_dictionary_count :sentry_count
  @process_dictionary_max 50

  @spec log_context(String.t(), String.t() | fun) :: :ok
  def log_context(entry_type, data_callback) when is_function(data_callback) do
    do_log_context(entry_type, data_callback.())
  end

  def log_context(entry_type, data) do
    do_log_context(entry_type, data)
  end

  @spec do_log_context(String.t(), String.t()) :: :ok
  defp do_log_context(entry_type, data) do
    count = set_dictionary_count(get_dictionary_count())
    Sentry.Context.set_extra_context(%{"#{entry_type}-#{count}" => data})
  end

  @spec get_dictionary_count :: integer
  defp get_dictionary_count do
    Process.get(@process_dictionary_count, 0)
  end

  @spec set_dictionary_count(integer) :: integer
  defp set_dictionary_count(count) do
    next_count =
      if count >= @process_dictionary_max do
        purge_dictionary()
      else
        count + 1
      end

    Process.put(@process_dictionary_count, next_count)
    next_count
  end

  @spec purge_dictionary :: integer
  defp purge_dictionary do
    Sentry.Context.clear_all()
    1
  end
end
