defmodule Test.Support.Factories.Alerts.InformedEntitySet do
  @moduledoc """
  Generated fake data for %Alerts.InformedEntitySet{}
  """

  use ExMachina

  alias Alerts.InformedEntitySet
  alias Test.Support.Factories.Alerts.InformedEntity

  def informed_entity_set_factory do
    informed_entity = InformedEntity.build(:informed_entity)

    InformedEntitySet.new([informed_entity])
  end
end
