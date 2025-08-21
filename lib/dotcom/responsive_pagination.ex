defmodule Dotcom.ResponsivePagination do
  @moduledoc """
  Represents all the contextual information necessary to render the responsive pagination component.
  """
  @desktop_max_length 5
  @mobile_max_length 3
  @type stats :: %{
          offset: integer,
          per_page: integer,
          total: integer,
          showing_from: integer,
          showing_to: integer
        }

  defstruct range: [],
            mobile_range: [],
            current: nil,
            previous: nil,
            next: nil,
            prefix: [],
            suffix: []

  @type t :: %__MODULE__{
          range: [integer],
          mobile_range: [integer],
          current: integer | nil,
          previous: integer | nil,
          next: integer | nil,
          prefix: [integer | String.t()],
          suffix: [integer | String.t()]
        }

  def build(stats) do
    last_page = calculate_last_page(stats.total, stats.per_page)
    current = calculate_current(last_page, stats.offset)
    range = modify_range([current], last_page, current, @desktop_max_length, &expand_range/3)
    first_in_range = List.first(range)
    last_in_range = List.last(range)

    %__MODULE__{
      range: range,
      mobile_range: modify_range(range, last_page, current, @mobile_max_length, &shrink_range/3),
      current: current,
      previous: previous(current),
      next: next(current, last_page),
      prefix: prefix(first_in_range),
      suffix: suffix(last_in_range, last_page)
    }
  end

  defp calculate_current(0, _), do: nil
  defp calculate_current(_, offset) when offset < 1, do: 1
  defp calculate_current(last_page, offset) when offset >= last_page, do: last_page
  defp calculate_current(_, offset), do: offset + 1

  defp calculate_last_page(0, _), do: 0
  defp calculate_last_page(_, 0), do: 0

  defp calculate_last_page(total, per_page) do
    total
    |> Kernel./(per_page)
    |> Float.ceil()
    |> round()
    |> max(1)
  end

  defp prefix(nil), do: []
  defp prefix(1), do: []
  defp prefix(page), do: [1 | ellipsis(page, 2)]

  defp suffix(nil, _), do: []
  defp suffix(page, last_page) when page == last_page, do: []
  defp suffix(page, last_page), do: ellipsis(page, last_page - 1) ++ [last_page]

  defp ellipsis(first, second) when first == second, do: []
  defp ellipsis(_, _), do: ["…"]

  defp previous(nil), do: nil
  defp previous(1), do: nil
  defp previous(current), do: current - 1

  defp next(nil, _), do: nil
  defp next(current, last_page) when current == last_page, do: nil
  defp next(current, _), do: current + 1

  defp modify_range([nil], _, _, _, _), do: []

  defp modify_range(range, last_page, current, maximum, operation) do
    range = operation.(range, last_page, current)
    done? = length(range) == min(last_page, maximum)
    if done?, do: range, else: modify_range(range, last_page, current, maximum, operation)
  end

  defp expand_range(range, last_page, _current) do
    first = List.first(range)
    last = List.last(range)

    range
    |> add(first - 1, first > 1, 1)
    |> add(last + 1, last < last_page, -1)
  end

  defp add(range, _, false, _), do: range

  defp add(range, page, true, side) do
    if length(range) < @desktop_max_length, do: do_add(range, page, side), else: range
  end

  defp do_add(list, value, 1), do: [value] ++ list
  defp do_add(list, value, -1), do: list ++ [value]

  defp shrink_range(range, _last_page, current) do
    range
    |> drop(List.first(range) < current, 1)
    |> drop(List.last(range) > current, -1)
  end

  defp drop(range, false, _), do: range

  defp drop(range, true, side),
    do: if(length(range) > @mobile_max_length, do: Enum.drop(range, side), else: range)
end
