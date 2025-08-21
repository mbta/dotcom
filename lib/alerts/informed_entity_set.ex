defmodule Alerts.InformedEntitySet do
  @moduledoc """
  Represents the superset of all InformedEntities for an Alert.

  Simplifies matching, since we can compare a single InformedEntity to see if
  it's present in the InformedEntitySet.  If it's not, there's no way for it
  to match any of the InformedEntities inside.
  """

  alias Alerts.InformedEntity

  defstruct activities: MapSet.new(),
            direction_id: MapSet.new(),
            entities: [],
            facility: MapSet.new(),
            route: MapSet.new(),
            route_type: MapSet.new(),
            stop: MapSet.new(),
            trip: MapSet.new()

  @type t :: %__MODULE__{
          activities: MapSet.t(),
          direction_id: MapSet.t(),
          entities: [InformedEntity.t()],
          facility: MapSet.t(),
          route: MapSet.t(),
          route_type: MapSet.t(),
          stop: MapSet.t(),
          trip: MapSet.t()
        }

  @doc "Create a new InformedEntitySet from a list of InformedEntitys"
  def new(%__MODULE__{} = entity_set) do
    entity_set
  end

  def new(informed_entities) when is_list(informed_entities) do
    struct = %__MODULE__{entities: informed_entities}
    Enum.reduce(informed_entities, struct, &add_entity_to_set/2)
  end

  @doc "Returns whether the given entity matches the set"
  def match?(%__MODULE__{} = set, %InformedEntity{} = entity) do
    entity
    |> Map.from_struct()
    |> Enum.all?(&field_in_set?(set, &1))
    |> try_all_entity_match(set, entity)
  end

  defp add_entity_to_set(entity, set) do
    entity
    |> Map.from_struct()
    |> Enum.reduce(set, &add_entity_field_to_set/2)
  end

  defp add_entity_field_to_set({:activities, %MapSet{} = value}, set) do
    map_set = MapSet.union(set.activities, MapSet.new(value))
    Map.put(set, :activities, map_set)
  end

  defp add_entity_field_to_set({key, value}, set) do
    map_set = Map.get(set, key)
    map_set = MapSet.put(map_set, value)
    Map.put(set, key, map_set)
  end

  defp field_in_set?(set, key_value_pair)

  defp field_in_set?(_set, {_, nil}) do
    # nil values match everything
    true
  end

  defp field_in_set?(set, {:activities, %MapSet{} = value}) do
    InformedEntity.mapsets_match?(set.activities, value)
  end

  defp field_in_set?(set, {key, value}) do
    map_set = Map.get(set, key)
    # either the value is in the map, or there's an entity that matches
    # everything (nil)
    MapSet.member?(map_set, value) or MapSet.member?(map_set, nil)
  end

  defp try_all_entity_match(false, _set, _entity) do
    false
  end

  defp try_all_entity_match(true, set, entity) do
    # we only try matching against the whole set when the MapSets overlapped
    Enum.any?(set, &InformedEntity.match?(&1, entity))
  end
end

defimpl Enumerable, for: Alerts.InformedEntitySet do
  def count(_set) do
    {:error, __MODULE__}
  end

  def member?(_set, %Alerts.InformedEntitySet{}) do
    {:error, __MODULE__}
  end

  def member?(_set, _other) do
    {:ok, false}
  end

  def reduce(%{entities: entities}, acc, fun) do
    Enumerable.reduce(entities, acc, fun)
  end

  def slice(_set) do
    {:error, __MODULE__}
  end
end
