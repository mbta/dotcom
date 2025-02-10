defmodule Test.Support.Factories.Utils.DateTime do
  @moduledoc """
  Factories to help generate/evaluate date_times for testing.
  """

  import Dotcom.Utils.DateTime

  @timezone timezone()

  @doc "Generate a random date_time between 10 years ago and 10 years from now."
  def date_time_generator() do
    now = now()
    beginning_of_time = Timex.shift(now, years: -10) |> coerce_ambiguous_time()
    end_of_time = Timex.shift(now, years: 10) |> coerce_ambiguous_time()

    time_range_date_time_generator({beginning_of_time, end_of_time})
  end

  @doc "Generate a random date_time between 10 years ago and 10 years from now."
  def random_date_time() do
    date_time_generator() |> Enum.take(1) |> List.first()
  end

  @doc "Get a random date_time between the beginning and end of the time range."
  def random_time_range_date_time({start, stop}) do
    time_range_date_time_generator({start, stop}) |> Enum.take(1) |> List.first()
  end

  @doc "Do the two date_times share the same date information?"
  def same_wall_date?(date_time1, date_time2) do
    Timex.to_date(date_time1) == Timex.to_date(date_time2)
  end

  @doc "Do the two date_times share the same time information (to second granularity)?"
  def same_wall_time?(date_time1, date_time2) do
    Map.take(date_time1, [:hour, :minute, :second]) ==
      Map.take(date_time2, [:hour, :minute, :second])
  end

  @doc "Generate a random date_time between the beginning and end of the time range."
  def time_range_date_time_generator({start, nil}) do
    StreamData.repeatedly(fn ->
      stop = Timex.shift(start, years: 10)

      Faker.DateTime.between(start, stop)
      |> Timex.to_datetime(@timezone)
      |> coerce_ambiguous_time()
    end)
  end

  def time_range_date_time_generator({start, stop}) do
    StreamData.repeatedly(fn ->
      Faker.DateTime.between(start, stop)
      |> Timex.to_datetime(@timezone)
      |> coerce_ambiguous_time()
    end)
  end
end
