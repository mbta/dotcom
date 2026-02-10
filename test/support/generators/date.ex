defmodule Test.Support.Generators.Date do
  @moduledoc """
  Factories to help generate/evaluate dates for testing.
  """

  @date_time_module Application.compile_env!(:dotcom, :date_time_module)

  @doc "Generate a random date this decade"
  def random_date() do
    now = @date_time_module.now()

    beginning_of_year = Date.new!(now.year, 1, 1)
    end_of_year = Date.new!(now.year + 1, 1, 1)

    date_generator_between({beginning_of_year, end_of_year}) |> Enum.take(1) |> List.first()
  end

  def date_generator_between({start, stop}) do
    StreamData.repeatedly(fn ->
      Faker.Date.between(start, stop)
    end)
  end
end
