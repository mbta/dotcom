defmodule Dotcom.SearchService do
  @moduledoc """
  Find stuff!
  Don't review me yet! I'll be refined in a future PR that handles implementing an interface with our existing Algolia data store.
  """

  use Nebulex.Caching.Decorators

  @callback query(String.t(), Keyword.t()) :: {:ok, list()}
  @behaviour __MODULE__

  @cache Application.compile_env!(:dotcom, :cache)
  # Same as ol' Algolia.Api
  @ttl :timer.hours(12)

  @impl __MODULE__
  @decorate cacheable(
              cache: @cache,
              on_error: :nothing,
              opts: [ttl: @ttl]
            )
  def query(text, opts) do
    random_fn =
      [
        &Faker.Cat.breed/0,
        &Faker.Company.catch_phrase/0,
        &Faker.Internet.url/0,
        &Faker.Pokemon.name/0,
        &Faker.Pokemon.location/0,
        &Faker.Person.name/0,
        &Faker.StarWars.quote/0,
        &Faker.Superhero.power/0,
        &Faker.Superhero.name/0,
        &Faker.Team.name/0,
        &Faker.Vehicle.make_and_model/0
      ]
      |> Faker.Util.pick()

    hits =
      case Faker.random_between(0, 10) do
        0 ->
          []

        n ->
          Faker.Util.sample_uniq(n, fn ->
            random_fn.() <> " " <> text
          end)
      end

    # IO.inspect({opts, hits}, label: "Query for #{text}")
    {:ok, hits}
  end
end
