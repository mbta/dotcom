defmodule Fares.CommuterFareGroup do
  @moduledoc false
  @typedoc """

  Represents the prices for commuter rail fares grouped by name.

  """

  @type t :: %__MODULE__{
          name: Fares.Fare.fare_name(),
          single_trip: non_neg_integer,
          single_trip_reduced: non_neg_integer,
          month: non_neg_integer,
          mticket: non_neg_integer
        }

  defstruct name: nil,
            single_trip: 0,
            single_trip_reduced: 0,
            month: 0,
            mticket: 0

  def sort_fares(%__MODULE__{name: {:zone, "1A"}}, _) do
    true
  end

  def sort_fares(_, %__MODULE__{name: {:zone, "1A"}}) do
    false
  end

  def sort_fares(%__MODULE__{name: {:zone, zone}}, %__MODULE__{name: {:interzone, zone}}) do
    true
  end

  def sort_fares(%__MODULE__{name: {:interzone, zone}}, %__MODULE__{name: {:zone, zone}}) do
    false
  end

  def sort_fares(%__MODULE__{name: {_, first_zone}}, %__MODULE__{name: {_, second_zone}}) do
    Integer.parse(first_zone) <= Integer.parse(second_zone)
  end
end
