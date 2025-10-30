defmodule Dotcom.Utils.Unit do
  @moduledoc """
  Functions for working with units
  """

  @doc """
  Constrain a zero'ed unit to a designated minimum

  ## Examples
   		iex> Cldr.Unit.new!(:second, 0) |> at_least(5) |> Cldr.Unit.to_string!()
   		"5 seconds"

      iex> Cldr.Unit.new!(:hour, 0) |> at_least(1) |> Cldr.Unit.to_string!()
      "1 hour"
  """
  def at_least(unit, min_value) do
    if Cldr.Unit.zero?(unit) do
      %{unit | value: min_value}
    else
      unit
    end
  end
end
