defmodule Test.Support.Factories.Alerts.Alert do
  @moduledoc """
  Generated fake data for %Alerts.Alert{}
  """

  use ExMachina

  alias Alerts.Alert
  alias Alerts.Priority
  alias Faker.Lorem.Shakespeare
  alias Test.Support.Factories.Alerts.InformedEntitySet

  def alert_factory do
    %Alert{
      id: 999 |> :rand.uniform() |> Integer.to_string(),
      active_period: [{Faker.DateTime.forward(1), Faker.DateTime.forward(2)}],
      banner: Shakespeare.king_richard_iii(),
      cause: Shakespeare.king_richard_iii(),
      created_at: DateTime.utc_now(),
      description: Shakespeare.king_richard_iii(),
      effect: Faker.Util.pick(Alert.all_types()),
      header: Shakespeare.king_richard_iii(),
      image: Faker.Internet.image_url(),
      image_alternative_text: Shakespeare.king_richard_iii(),
      informed_entity: InformedEntitySet.build(:informed_entity_set),
      lifecycle: Faker.Util.pick(Alert.lifecycles()),
      priority: Faker.Util.pick(Priority.priority_levels()),
      severity: :rand.uniform(10),
      updated_at: DateTime.utc_now(),
      url: Faker.Internet.url()
    }
  end
end
