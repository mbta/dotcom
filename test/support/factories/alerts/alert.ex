defmodule Test.Support.Factories.Alerts.Alert do
  @moduledoc """
  Generated fake data for %Alerts.Alert{}
  """

  use ExMachina

  alias Alerts.{Alert, Priority}
  alias Test.Support.Factories.Alerts.InformedEntitySet

  def alert_factory do
    %Alert{
      id: :rand.uniform(999) |> Integer.to_string(),
      active_period: [{Faker.DateTime.forward(1), Faker.DateTime.forward(2)}],
      banner: Faker.Lorem.Shakespeare.king_richard_iii(),
      cause: Faker.Lorem.Shakespeare.king_richard_iii(),
      created_at: Timex.now(),
      description: Faker.Lorem.Shakespeare.king_richard_iii(),
      effect: Alert.all_types() |> Faker.Util.pick(),
      header: Faker.Lorem.Shakespeare.king_richard_iii(),
      image_alt_text: Faker.Lorem.Shakespeare.king_richard_iii(),
      image_url: Faker.Internet.image_url(),
      informed_entity: InformedEntitySet.build(:informed_entity_set),
      lifecycle: Alert.lifecycles() |> Faker.Util.pick(),
      priority: Priority.priority_levels() |> Faker.Util.pick(),
      severity: :rand.uniform(10),
      updated_at: Timex.now(),
      url: Faker.Internet.url()
    }
  end
end
