defmodule Test.Support.Factory.MbtaApi do
  @moduledoc """
  Generated fake data for MBTA.Api
  """
  use ExMachina

  alias JsonApi.Item

  def item_factory(attrs) do
    merge_attributes(%Item{}, attrs)
  end

  @doc """
  MBTA V3 API route patterns return a subset of canonical, direction_id, name,
  sort_order, time_desc, and typicality attributes, with representative_trip and
  route relationships.
  """
  def route_pattern_item_factory(attrs) do
    build(
      :item,
      Map.merge(
        %{
          attributes: %{
            "canonical" => false,
            "direction_id" => 0,
            "name" => Faker.App.name(),
            "sort_order" => 0,
            "time_desc" => nil,
            "typicality" => 1
          },
          relationships: %{
            "representative_trip" => [build(:item)],
            "route" => [build(:item)]
          }
        },
        attrs
      )
    )
  end
end
