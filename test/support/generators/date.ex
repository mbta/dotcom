defmodule Test.Support.Generators.Date do
  @moduledoc """
  Factories to help generate/evaluate dates for testing.
  """

  @doc "Generate a random date this decade"
  def random_date() do
    beginning_of_time = ~N[2020-01-01 00:00:00]
    end_of_time = ~N[2029-12-31 23:59:59]

    date_generator_between({beginning_of_time, end_of_time}) |> Enum.take(1) |> List.first()
  end

  def date_generator_between({start, stop}) do
    StreamData.repeatedly(fn ->
      Faker.Date.between(start, stop)
    end)
  end
end
