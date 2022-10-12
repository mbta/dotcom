defmodule Site.SentryFilter do
  @moduledoc """
  Implement the Sentry.EventFilter behaviour, which allows for preventing
  arbitrary errors to be sent to Sentry.
  """

  @behaviour Sentry.EventFilter

  def exclude_exception?(%Phoenix.NotAcceptableError{}, _source) do
    true
  end

  # Ignore Phoenix route not found exception
  def exclude_exception?(%x{}, :plug) when x in [Phoenix.Router.NoRouteError] do
    true
  end

  # Ignore Plug route not found exception
  def exclude_exception?(%FunctionClauseError{function: :do_match, arity: 4}, :plug), do: true

  def exclude_exception?(_exception, _source) do
    false
  end
end
