defmodule Test.Support.SearchServiceFactory do
  @moduledoc """
  Module for generating outputs to the functions in Dotcom.SearchService
  """
  use ExMachina

  def hit_factory do
    %{
      "objectID" => Faker.Internet.slug(),
      "content_title" => Faker.Cat.breed(),
      "category" => Faker.Util.pick(~w(routes stops drupal)),
      "url" => Faker.Internet.url()
    }
  end
end
