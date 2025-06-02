defmodule Dotcom.Utils.Time do
  @moduledoc """
  Functions for working with dates, datetimes, times, or any combination thereof.
  """

  @default_between_opts [inclusive: true]

  @doc """
  Nearly identical to [`Timex.between?/4`](https://hexdocs.pm/timex/Timex.html#between?/4),
  with these caveats:

  * Defaults to inclusive bounds
  * Supports `nil` values for the start, ending, or both. These are treated as infinitely
  past or future, respectively.
  """
  @spec between?(
          Timex.Types.valid_datetime(),
          Timex.Types.valid_datetime() | nil,
          Timex.Types.valid_datetime() | nil,
          Timex.between_options()
        ) ::
          boolean()
  def between?(t, start, ending, opts \\ @default_between_opts)

  def between?(t, start, nil, _) when not is_nil(start) do
    t == start or Timex.after?(t, start)
  end

  def between?(t, nil, ending, _) when not is_nil(ending) do
    t == ending or Timex.before?(t, ending)
  end

  def between?(t, start, ending, opts),
    do: Timex.between?(t, start, ending, Keyword.merge(@default_between_opts, opts))
end
