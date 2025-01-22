defmodule Alerts.InformedEntity do
  @moduledoc false

  @fields activities: MapSet.new(),
          direction_id: nil,
          facility: nil,
          route: nil,
          route_type: nil,
          stop: nil,
          trip: nil

  defstruct @fields

  @type t :: %__MODULE__{
          activities: MapSet.t(activity),
          direction_id: 0 | 1 | nil,
          facility: String.t() | nil,
          route: String.t() | nil,
          route_type: String.t() | nil,
          stop: String.t() | nil,
          trip: String.t() | nil
        }

  @type activity ::
          :board
          | :bringing_bike
          | :exit
          | :park_car
          | :ride
          | :store_bike
          | :using_escalator
          | :using_wheelchair

  @activities [
    :board,
    :bringing_bike,
    :exit,
    :park_car,
    :ride,
    :store_bike,
    :using_escalator,
    :using_wheelchair
  ]

  @spec activities() :: list(activity)
  def activities, do: @activities

  @doc """
  Given a keyword list (with keys matching our fields), returns a new
  InformedEntity. Additional keys are ignored.
  """
  @spec from_keywords(list) :: __MODULE__.t()
  def from_keywords(options) do
    options
    |> Enum.map(&ensure_value_type/1)
    |> then(&struct(__MODULE__, &1))
  end

  defp ensure_value_type({:activities, enum}) do
    {:activities, MapSet.new(enum)}
  end

  defp ensure_value_type(item) do
    item
  end

  @doc """

  Returns true if the two InformedEntities match.

  If a route/route_type/stop is specified (non-nil), it needs to equal the other.
  Otherwise the nil can match any value in the other InformedEntity.

  """
  @spec match?(__MODULE__.t(), __MODULE__.t()) :: boolean
  def match?(%__MODULE__{} = first, %__MODULE__{} = second) do
    share_a_key?(first, second) && do_match?(first, second)
  end

  @spec mapsets_match?(MapSet.t(), MapSet.t()) :: boolean()
  def mapsets_match?(%MapSet{} = a, %MapSet{} = b) when a == %MapSet{} or b == %MapSet{}, do: true

  def mapsets_match?(%MapSet{} = a, %MapSet{} = b), do: has_intersect?(a, b)

  defp has_intersect?(a, b), do: Enum.any?(a, &(&1 in b))

  defp do_match?(f, s) do
    @fields
    |> Keyword.keys()
    |> Enum.all?(&key_match(Map.get(f, &1), Map.get(s, &1)))
  end

  defp key_match(nil, _), do: true
  defp key_match(_, nil), do: true
  defp key_match(%MapSet{} = a, %MapSet{} = b), do: mapsets_match?(a, b)
  defp key_match(eql, eql), do: true
  defp key_match(_, _), do: false

  defp share_a_key?(first, second) do
    @fields
    |> Keyword.keys()
    |> Enum.any?(&shared_key(Map.get(first, &1), Map.get(second, &1)))
  end

  defp shared_key(nil, nil), do: false
  defp shared_key(%MapSet{} = a, %MapSet{} = b), do: has_intersect?(a, b)
  defp shared_key(eql, eql), do: true
  defp shared_key(_, _), do: false
end
