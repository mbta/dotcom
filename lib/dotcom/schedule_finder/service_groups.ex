defmodule Dotcom.ScheduleFinder.ServiceGroup do
  @moduledoc """
  A group of services sharing a similar timeframe or trait, such as future,
  current, holiday, planned work.
  """

  alias Dotcom.ServicePatterns

  defstruct [:services, :group_label]

  @type t :: %__MODULE__{
          group_label: String.t(),
          services: [
            %{
              label: String.t(),
              next_date: Date.t() | nil,
              now_date: Date.t() | nil,
              last_service_date: Date.t()
            }
          ]
        }

  @spec for_route(Routes.Route.id_t(), Date.t()) :: [__MODULE__.t()]
  def for_route(route_id, current_date) do
    route_id
    |> ServicePatterns.for_route()
    |> Enum.map(fn sp ->
      %{
        now_date: if(current_date in sp.dates, do: current_date),
        next_date: nil,
        service_pattern: sp
      }
    end)
    |> tag_next_available(current_date)
    |> Enum.group_by(& &1.service_pattern.group_label)
    |> Enum.sort_by(fn {{group_key, _}, _} ->
      [:current, :future, :extra, :holiday, :planned]
      |> Enum.find_index(&(&1 == group_key))
    end)
    |> Enum.map(fn {{_, group_label}, patterns} ->
      %__MODULE__{
        group_label: group_label,
        services:
          patterns
          |> Enum.sort_by(&sort_services(&1.service_pattern.service_label))
          |> Enum.map(fn pattern ->
            Map.take(pattern, [:next_date, :now_date])
            |> Map.put(:label, pattern.service_pattern.service_label |> elem(2))
            |> Map.put(:last_service_date, pattern.service_pattern.dates |> List.last())
          end)
      }
    end)
  end

  defp tag_next_available([], _), do: []

  defp tag_next_available(service_patterns, current_date) do
    if Enum.any?(service_patterns, &(&1.now_date || &1.next_date)) do
      service_patterns
    else
      next_date =
        service_patterns
        |> Enum.flat_map(& &1.service_pattern.dates)
        |> Enum.sort(Date)
        |> Enum.find(&Date.after?(&1, current_date))

      if next_date do
        Enum.map(
          service_patterns,
          &Map.put(&1, :next_date, if(next_date in &1.service_pattern.dates, do: next_date))
        )
      else
        service_patterns
      end
    end
  end

  defp sort_services({:typical, typical_key, label}) do
    index =
      [:monday_thursday, :friday, :weekday, :saturday, :sunday, :weekend]
      |> Enum.find_index(&(&1 == typical_key))

    {index, label}
  end

  defp sort_services({typicality, key, label}) do
    {typicality, to_string(key), label}
  end
end
