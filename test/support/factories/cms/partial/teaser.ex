defmodule Test.Support.Factories.CMS.Partial.Teaser do
  @moduledoc """
  Generated fake data for %CMS.Partial.Teaser{}
  """

  use ExMachina

  alias CMS.Partial.Teaser
  alias Test.Support.FactoryHelpers
  alias Test.Support.Generators

  @types [:diversion, :event, :news_entry, :page, :project, :project_update]

  def event_teaser_factory do
    build(:teaser, type: :event)
  end

  def teaser_factory do
    %Teaser{
      id: FactoryHelpers.build(:id),
      date: Generators.Date.random_date(),
      type: type(),
      path: Faker.Internet.url(),
      title: Faker.Company.catch_phrase()
    }
  end

  defp type() do
    Faker.Util.pick(@types)
  end
end
