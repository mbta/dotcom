defmodule Schedules.FrequencyList do
  defstruct frequencies: [],
            departures: :no_service

  @type t :: %Schedules.FrequencyList{
          frequencies: [Schedules.Frequency.t()],
          departures: Schedules.Departures.t() | :no_service
        }

  @spec build_frequency_list([Schedules.Schedule.t()]) :: Schedules.FrequencyList.t()
  def build_frequency_list(schedules)

  def build_frequency_list([]) do
    %Schedules.FrequencyList{}
  end

  def build_frequency_list(schedules) do
    %Schedules.FrequencyList{
      frequencies: TimeGroup.frequency_by_time_block(schedules),
      departures: %Schedules.Departures{
        first_departure: List.first(schedules).time,
        last_departure: List.last(schedules).time
      }
    }
  end
end

defimpl Enumerable, for: Schedules.FrequencyList do
  def count(_journey_list) do
    {:error, __MODULE__}
  end

  def member?(_journey_list, %Schedules.FrequencyList{}) do
    {:error, __MODULE__}
  end

  def member?(_journey_list, _other) do
    {:ok, false}
  end

  def reduce(%{frequencies: frequencies}, acc, fun) do
    Enumerable.reduce(frequencies, acc, fun)
  end

  def slice(_journey_list) do
    {:error, __MODULE__}
  end
end
