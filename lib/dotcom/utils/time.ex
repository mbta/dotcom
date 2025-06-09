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

  def between?(t, start, ending, opts) do
    inclusive_opt = opts |> Keyword.get(:inclusive, true)

    in_bounds_beginning? = after?(t, start, inclusive_start?(inclusive_opt))
    in_bounds_ending? = before?(t, ending, inclusive_end?(inclusive_opt))

    in_bounds_beginning? && in_bounds_ending?
  end

  # A slight modification to Timex.after?/2 that takes an additional
  # argument indicating whether the bound should be considered
  # inclusive. If the "inclusive" argument is true, then this returns
  # true if the given DateTime's are equal.
  #
  # Also, if the second argument is nil, then it's considered to be
  # the beginning of time, which means that after? will always be true
  # (everything is after the beginning of time, after all).
  defp after?(_dt1, nil, _inclusive), do: true
  defp after?(dt1, dt2, _inclusive = true) when dt1 == dt2, do: true
  defp after?(dt1, dt2, _inclusive), do: Timex.after?(dt1, dt2)

  # A slight modification to Timex.before?/2 that takes an additional
  # argument indicating whether the bound should be considered
  # inclusive. If the "inclusive" argument is true, then this returns
  # true if the given DateTime's are equal.
  #
  # Also, if the second argument is nil, then it's considered to be
  # the end of time, which means that before? will always be true
  # (everything is before the beginning of time, after all).
  defp before?(_dt1, nil, _inclusive), do: true
  defp before?(dt1, dt2, _inclusive = true) when dt1 == dt2, do: true
  defp before?(dt1, dt2, _inclusive), do: Timex.before?(dt1, dt2)

  # Given a keyword arg that could be true, false, :start, or :end,
  # returns a boolean indicating whether the start boundary should be
  # inclusive.
  defp inclusive_start?(opt) when opt in [true, :start], do: true
  defp inclusive_start?(_), do: false

  # Given a keyword arg that could be true, false, :start, or :end,
  # returns a boolean indicating whether the end boundary should be
  # inclusive.
  defp inclusive_end?(opt) when opt in [true, :end], do: true
  defp inclusive_end?(_), do: false
end
