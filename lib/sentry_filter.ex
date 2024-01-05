defmodule Dotcom.SentryFilter do
  @moduledoc """
  Implement the Sentry.EventFilter behaviour, which allows for preventing
  arbitrary errors to be sent to Sentry.
  """

  @behaviour Sentry.EventFilter

  def exclude_exception?(%Phoenix.NotAcceptableError{}, _source) do
    true
  end

  def exclude_exception?(_exception, _source) do
    false
  end
end
