defmodule Test.Support.Factories.Alerts.InformedEntitySet do
  @moduledoc """
  Generated fake data for %Alerts.InformedEntitySet{}
  """

  use ExMachina

  alias Alerts.InformedEntitySet
  alias Test.Support.Factories.Alerts.InformedEntity

  def informed_entity_set_factory do
    InformedEntity.build_list(3, :informed_entity)
    |> InformedEntitySet.new()
  end
end
