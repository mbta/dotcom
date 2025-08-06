defmodule Test.Support.Factories.Alerts.Banner do
  @moduledoc """
  Generated fake data for %Alerts.Alert{}
  """

  use ExMachina

  alias Alerts.{Alert, Banner}
  alias Test.Support.Factories

  def banner_factory do
    %Banner{
      id: :rand.uniform(999) |> Integer.to_string(),
      title: Faker.Lorem.Shakespeare.king_richard_iii(),
      url: Faker.Internet.url(),
      url_parsed_out_of_title: Faker.Util.pick([true, false]),
      effect: Alert.all_types() |> Faker.Util.pick(),
      severity: :rand.uniform(10),
      informed_entity_set: Factories.Alerts.InformedEntitySet.build(:informed_entity_set)
    }
  end
end
