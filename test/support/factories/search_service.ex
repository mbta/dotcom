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

  def result_factory do
    number = Faker.random_between(1, 50)
    %{hits: build_list(5, :hit), page: 1, total_pages: div(number, 5), total_hits: number}
  end
end
