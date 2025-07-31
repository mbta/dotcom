defmodule Test.Support.Generators.DateTime do
  @moduledoc """
  Factories to help generate/evaluate date_times for testing.
  """

  import Dotcom.Utils.DateTime, only: [coerce_ambiguous_date_time: 1]

  @date_time_module Application.compile_env!(:dotcom, :date_time_module)
  @timezone Application.compile_env!(:dotcom, :timezone)

  @doc "Generate a random date_time between 10 years ago and 10 years from now."
  def date_time_generator() do
    now = @date_time_module.now()

    beginning_of_time =
      Timex.shift(now, years: -10) |> coerce_ambiguous_date_time()

    end_of_time =
      Timex.shift(now, years: 10) |> coerce_ambiguous_date_time()

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

  @doc "Get a random date_time after the date_time provided"
  def random_date_time_after(date_time) do
    random_time_range_date_time({date_time, nil})
  end

  @doc "Get a random date_time before the date_time provided"
  def random_date_time_before(date_time) do
    random_time_range_date_time({nil, date_time})
  end

  @doc "Generate a random date_time between the beginning and end of the time range."
  def time_range_date_time_generator({start, nil}) do
    stop = Timex.shift(start, years: 10) |> coerce_ambiguous_date_time()
    time_range_date_time_generator({start, stop})
  end

  def time_range_date_time_generator({nil, stop}) do
    start = Timex.shift(stop, years: -10) |> coerce_ambiguous_date_time()
    time_range_date_time_generator({start, stop})
  end

  def time_range_date_time_generator({start, stop}) do
    StreamData.repeatedly(fn ->
      Faker.DateTime.between(start, stop)
      |> Timex.to_datetime(@timezone)
      |> coerce_ambiguous_date_time()
    end)
  end
end
