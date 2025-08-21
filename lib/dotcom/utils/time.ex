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
  def between?(t, start, ending, opts \\ @default_between_opts)

  def between?(t, start, ending, opts) do
    start = if(start, do: start, else: ~D[0000-01-01])
    ending = if(ending, do: ending, else: ~D[9999-12-31])
    Timex.between?(t, start, ending, Keyword.merge(@default_between_opts, opts))
  end
end
