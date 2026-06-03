defmodule Dotcom.Timetables do
  @moduledoc """
  A module to construct a data structure that represents a timetable out of a list of schedules.
  See `from_schedules/1` for more details.
  """

  use Memoize

  alias __MODULE__.Timetable

  @doc """
  Given a list of structs of type `Schedules.Schedule`, returns a `Dotcom.Timetables.Timetable`
  that can be nicely slotted into a table. The `rows` attribute is a list of lists; the top-level
  lists are rows in the timetable, which means they correspond to visits to a particular stop.
  The entries in each list correspond to the trips that visit that stop, so, for instance, the
  second item in each list will all be visits from the same trip.

      iex> Dotcom.Timetables.from_schedules(
      ...>   [
      ...>     %Schedules.Schedule{
      ...>       departure_time: ~N[2026-05-27T12:05:00] |> Timex.Timezone.convert("America/New_York"),
      ...>       stop: %Stops.Stop{id: "first_stop"},
      ...>       trip: %Schedules.Trip{id: "first_trip"}
      ...>     },
      ...>     %Schedules.Schedule{
      ...>       departure_time: ~N[2026-05-27T12:25:00] |> Timex.Timezone.convert("America/New_York"),
      ...>       stop: %Stops.Stop{id: "second_stop"},
      ...>       trip: %Schedules.Trip{id: "first_trip"}
      ...>     },
      ...>     %Schedules.Schedule{
      ...>       departure_time: ~N[2026-05-27T13:05:00] |> Timex.Timezone.convert("America/New_York"),
      ...>       stop: %Stops.Stop{id: "first_stop"},
      ...>       trip: %Schedules.Trip{id: "second_trip"}
      ...>     },
      ...>     %Schedules.Schedule{
      ...>       departure_time: ~N[2026-05-27T13:25:00] |> Timex.Timezone.convert("America/New_York"),
      ...>       stop: %Stops.Stop{id: "second_stop"},
      ...>       trip: %Schedules.Trip{id: "second_trip"}
      ...>     }
      ...>   ]
      ...> )
      %Dotcom.Timetables.Timetable{
        rows: [
          # First row is the visits to `first_stop`. It has two cells, one for each trip.
          %Dotcom.Timetables.Timetable.Row{
            stop: %Stops.Stop{id: "first_stop"},
            cells: [
              %Dotcom.Timetables.Timetable.Cell{
                time: "12:05 PM",
                trip: %Schedules.Trip{id: "first_trip"}
              },
              %Dotcom.Timetables.Timetable.Cell{
                time: "1:05 PM",
                trip: %Schedules.Trip{id: "second_trip"}
              }
            ]
          },
          # Second row is the visits to `second_stop`. It has cells for all the same trips
          # as the first row.
          %Dotcom.Timetables.Timetable.Row{
            stop: %Stops.Stop{id: "second_stop"},
            cells: [
              %Dotcom.Timetables.Timetable.Cell{
                time: "12:25 PM",
                trip: %Schedules.Trip{id: "first_trip"}
              },
              %Dotcom.Timetables.Timetable.Cell{
                time: "1:25 PM",
                trip: %Schedules.Trip{id: "second_trip"}
              }
            ]
          }
        ],
        trips: [
          %Schedules.Trip{id: "first_trip"},
          %Schedules.Trip{id: "second_trip"}
        ]
      }

  For trips that don't visit all of the stops, `from_schedules/1` inserts empty cells (with
  `time = ""`) in order to make the rows and columns line up:

      iex> Dotcom.Timetables.from_schedules(
      ...>   [
      ...>     # First trip visits all of the stops
      ...>     %Schedules.Schedule{
      ...>       departure_time: ~N[2026-05-27T12:05:00] |> Timex.Timezone.convert("America/New_York"),
      ...>       stop: %Stops.Stop{id: "first_stop"},
      ...>       trip: %Schedules.Trip{id: "first_trip"}
      ...>     },
      ...>     %Schedules.Schedule{
      ...>       departure_time: ~N[2026-05-27T12:25:00] |> Timex.Timezone.convert("America/New_York"),
      ...>       stop: %Stops.Stop{id: "second_stop"},
      ...>       trip: %Schedules.Trip{id: "first_trip"}
      ...>     },
      ...>     %Schedules.Schedule{
      ...>       departure_time: ~N[2026-05-27T12:45:00] |> Timex.Timezone.convert("America/New_York"),
      ...>       stop: %Stops.Stop{id: "third_stop"},
      ...>       trip: %Schedules.Trip{id: "first_trip"}
      ...>     },
      ...>     # Second trip doesn't visit `second_stop`.
      ...>     %Schedules.Schedule{
      ...>       departure_time: ~N[2026-05-27T13:05:00] |> Timex.Timezone.convert("America/New_York"),
      ...>       stop: %Stops.Stop{id: "first_stop"},
      ...>       trip: %Schedules.Trip{id: "second_trip"}
      ...>     },
      ...>     %Schedules.Schedule{
      ...>       departure_time: ~N[2026-05-27T13:35:00] |> Timex.Timezone.convert("America/New_York"),
      ...>       stop: %Stops.Stop{id: "third_stop"},
      ...>       trip: %Schedules.Trip{id: "second_trip"}
      ...>     }
      ...>   ]
      ...> )
      %Dotcom.Timetables.Timetable{
        rows: [
          %Dotcom.Timetables.Timetable.Row{
            stop: %Stops.Stop{id: "first_stop"},
            cells: [
              %Dotcom.Timetables.Timetable.Cell{
                time: "12:05 PM",
                trip: %Schedules.Trip{id: "first_trip"}
              },
              %Dotcom.Timetables.Timetable.Cell{
                time: "1:05 PM",
                trip: %Schedules.Trip{id: "second_trip"}
              }
            ]
          },
          # Second cell in this row, where the missing `second_trip`/`second_stop`
          # would be, is blank
          %Dotcom.Timetables.Timetable.Row{
            stop: %Stops.Stop{id: "second_stop"},
            cells: [
              %Dotcom.Timetables.Timetable.Cell{
                time: "12:25 PM",
                trip: %Schedules.Trip{id: "first_trip"}
              },
              %Dotcom.Timetables.Timetable.Cell{
                time: "",
                trip: %{id: "second_trip", name: nil}
              }
            ]
          },
          %Dotcom.Timetables.Timetable.Row{
            stop: %Stops.Stop{id: "third_stop"},
            cells: [
              %Dotcom.Timetables.Timetable.Cell{
                time: "12:45 PM",
                trip: %Schedules.Trip{id: "first_trip"}
              },
              %Dotcom.Timetables.Timetable.Cell{
                time: "1:35 PM",
                trip: %Schedules.Trip{id: "second_trip"}
              }
            ]
          }
        ],
        trips: [
          %Schedules.Trip{id: "first_trip"},
          %Schedules.Trip{id: "second_trip"}
        ]
      }

  When different trips visit the same stops in a different order, or when a single trip visits the same stop
  multiple times, `from_schedules/1` add multiple rows for the same stop.

      iex> Dotcom.Timetables.from_schedules(
      ...>   [
      ...>     %Schedules.Schedule{
      ...>       departure_time: ~N[2026-05-27T12:05:00] |> Timex.Timezone.convert("America/New_York"),
      ...>       stop: %Stops.Stop{id: "first_and_last_stop"},
      ...>       trip: %Schedules.Trip{id: "loop_trip"}
      ...>     },
      ...>     %Schedules.Schedule{
      ...>       departure_time: ~N[2026-05-27T12:25:00] |> Timex.Timezone.convert("America/New_York"),
      ...>       stop: %Stops.Stop{id: "second_stop"},
      ...>       trip: %Schedules.Trip{id: "loop_trip"}
      ...>     },
      ...>     %Schedules.Schedule{
      ...>       departure_time: ~N[2026-05-27T12:45:00] |> Timex.Timezone.convert("America/New_York"),
      ...>       stop: %Stops.Stop{id: "first_and_last_stop"},
      ...>       trip: %Schedules.Trip{id: "loop_trip"}
      ...>     }
      ...>   ]
      ...> )
      %Dotcom.Timetables.Timetable{
        rows: [
          %Dotcom.Timetables.Timetable.Row{
            stop: %Stops.Stop{id: "first_and_last_stop"},
            cells: [
              %Dotcom.Timetables.Timetable.Cell{
                time: "12:05 PM",
                trip: %Schedules.Trip{id: "loop_trip"}
              }
            ]
          },
          %Dotcom.Timetables.Timetable.Row{
            stop: %Stops.Stop{id: "second_stop"},
            cells: [
              %Dotcom.Timetables.Timetable.Cell{
                time: "12:25 PM",
                trip: %Schedules.Trip{id: "loop_trip"}
              }
            ]
          },
          %Dotcom.Timetables.Timetable.Row{
            stop: %Stops.Stop{id: "first_and_last_stop"},
            cells: [
              %Dotcom.Timetables.Timetable.Cell{
                time: "12:45 PM",
                trip: %Schedules.Trip{id: "loop_trip"}
              }
            ]
          }
        ],
        trips: [
          %Schedules.Trip{id: "loop_trip"}
        ]
      }

      iex> Dotcom.Timetables.from_schedules(
      ...>   [
      ...>     # First trip visits `first_or_last_stop` last.
      ...>     %Schedules.Schedule{
      ...>       departure_time: ~N[2026-05-27T12:05:00] |> Timex.Timezone.convert("America/New_York"),
      ...>       stop: %Stops.Stop{id: "second_stop"},
      ...>       trip: %Schedules.Trip{id: "first_trip"}
      ...>     },
      ...>     %Schedules.Schedule{
      ...>       departure_time: ~N[2026-05-27T12:25:00] |> Timex.Timezone.convert("America/New_York"),
      ...>       stop: %Stops.Stop{id: "third_stop"},
      ...>       trip: %Schedules.Trip{id: "first_trip"}
      ...>     },
      ...>     %Schedules.Schedule{
      ...>       departure_time: ~N[2026-05-27T12:45:00] |> Timex.Timezone.convert("America/New_York"),
      ...>       stop: %Stops.Stop{id: "first_or_last_stop"},
      ...>       trip: %Schedules.Trip{id: "first_trip"}
      ...>     },
      ...>     %Schedules.Schedule{
      ...>       departure_time: ~N[2026-05-27T13:05:00] |> Timex.Timezone.convert("America/New_York"),
      ...>       stop: %Stops.Stop{id: "first_or_last_stop"},
      ...>       trip: %Schedules.Trip{id: "second_trip"}
      ...>     },
      ...>     %Schedules.Schedule{
      ...>       departure_time: ~N[2026-05-27T13:25:00] |> Timex.Timezone.convert("America/New_York"),
      ...>       stop: %Stops.Stop{id: "second_stop"},
      ...>       trip: %Schedules.Trip{id: "second_trip"}
      ...>     },
      ...>     %Schedules.Schedule{
      ...>       departure_time: ~N[2026-05-27T13:45:00] |> Timex.Timezone.convert("America/New_York"),
      ...>       stop: %Stops.Stop{id: "third_stop"},
      ...>       trip: %Schedules.Trip{id: "second_trip"}
      ...>     },
      ...>   ]
      ...> )
      %Dotcom.Timetables.Timetable{
        rows: [
          # First row has a blank cell because `first_trip` doesn't visit
          # `first_or_last_stop` before `second_stop`.
          %Dotcom.Timetables.Timetable.Row{
            stop: %Stops.Stop{id: "first_or_last_stop"},
            cells: [
              %Dotcom.Timetables.Timetable.Cell{
                time: "",
                trip: %{id: "first_trip", name: nil}
              },
              %Dotcom.Timetables.Timetable.Cell{
                time: "1:05 PM",
                trip: %Schedules.Trip{id: "second_trip"}
              }
            ]
          },
          %Dotcom.Timetables.Timetable.Row{
            stop: %Stops.Stop{id: "second_stop"},
            cells: [
              %Dotcom.Timetables.Timetable.Cell{
                time: "12:05 PM",
                trip: %Schedules.Trip{id: "first_trip"}
              },
              %Dotcom.Timetables.Timetable.Cell{
                time: "1:25 PM",
                trip: %Schedules.Trip{id: "second_trip"}
              }
            ]
          },
          %Dotcom.Timetables.Timetable.Row{
            stop: %Stops.Stop{id: "third_stop"},
            cells: [
              %Dotcom.Timetables.Timetable.Cell{
                time: "12:25 PM",
                trip: %Schedules.Trip{id: "first_trip"}
              },
              %Dotcom.Timetables.Timetable.Cell{
                time: "1:45 PM",
                trip: %Schedules.Trip{id: "second_trip"}
              }
            ]
          },
          # Last row has a blank cell because `second_trip` doesn't visit
          # `first_or_last_stop` after `third_stop`.
          %Dotcom.Timetables.Timetable.Row{
            stop: %Stops.Stop{id: "first_or_last_stop"},
            cells: [
              %Dotcom.Timetables.Timetable.Cell{
                time: "12:45 PM",
                trip: %Schedules.Trip{id: "first_trip"}
              },
              %Dotcom.Timetables.Timetable.Cell{
                time: "",
                trip: %{id: "second_trip", name: nil}
              }
            ]
          }
        ],
        trips: [
          %Schedules.Trip{id: "first_trip"},
          %Schedules.Trip{id: "second_trip"}
        ]
      }
  """

  # Implementation notes (not necessary for the doc):
  #
  # The algorithm works in two steps. First, it generates a list of
  # stops that go on the left of the timetable. It does this by taking
  # a list of the visited stop ID's from each trip, and then using
  # `combine_stop_lists/2` to combine them into a single list
  # containing all of the stop ID's.
  #
  # Second, it uses `build_timetable_rows/2` to map each trip onto the
  # combined stop list, inserting gaps where necessary.
  @spec from_schedules([Schedules.Schedule.t()]) :: Timetable.t()
  def from_schedules(schedules) do
    trips =
      schedules
      |> Enum.group_by(&%{id: &1.trip.id, name: &1.trip.name})
      |> Enum.map(fn {trip, schedules} ->
        {trip, schedules |> Enum.sort_by(&time/1, DateTime)}
      end)
      |> Enum.sort_by(
        fn {_trip, [first_schedule | _]} ->
          time(first_schedule)
        end,
        DateTime
      )

    header_trips =
      trips
      |> Enum.map(fn {_, [%Schedules.Schedule{trip: trip} | _]} -> trip end)

    stop_lists =
      trips
      |> Enum.map(fn {_trip, schedules} ->
        schedules
        |> Enum.map(& &1.stop)
      end)

    stops_by_id = stop_lists |> Enum.flat_map(& &1) |> Map.new(&{&1.id, &1})

    rows =
      stop_lists
      |> Enum.map(fn stop_list -> stop_list |> Enum.map(& &1.id) end)
      |> Enum.reduce([], &combine_stop_lists/2)
      |> Enum.map(&(stops_by_id |> Map.get(&1)))
      |> build_timetable_rows(trips)

    %Timetable{rows: rows, trips: header_trips}
  end

  # Given a list of stops (the list that goes on the left on the
  # timetable, constructed from `combine_stop_lists/2, and a list of
  # trips (where a trip is a list of `Schedule`'s), this function
  # builds the actual timetable rows, such that:
  #
  # - Each row corresponds to a particular stop, and is a list of
  #   visits to that stop, one per trip.
  #
  # - Each trip lines up with a column, so the n'th entry in each row
  #   comes from the same trip.
  #
  # - Empty cells are inserted for trips that don't visit a given stop.
  #
  # It works recursively - for each trip, we take the first stop if it
  # matches the first stop of the stop list, or insert a blank cell if
  # it doesn't.
  defp build_timetable_rows([first_stop | stop_ids], trips) do
    first_stop_id = first_stop.id

    cells_at_stop =
      trips
      |> Enum.map(fn
        {_trip, [%{stop: %{id: ^first_stop_id}} = first | _]} ->
          first

        {trip, _} ->
          %{
            departure_time: nil,
            arrival_time: nil,
            trip: trip
          }
      end)

    trips_after_stop =
      trips
      |> Enum.map(fn
        {trip, [%{stop: %{id: ^first_stop_id}} | rest]} -> {trip, rest}
        all -> all
      end)

    first_row =
      %Timetable.Row{
        stop: first_stop,
        cells:
          cells_at_stop
          |> Enum.map(
            &%Timetable.Cell{
              time: &1 |> time() |> format!(),
              trip: &1.trip
            }
          )
      }

    [first_row | build_timetable_rows(stop_ids, trips_after_stop)]
  end

  defp build_timetable_rows([], _), do: []

  defp time(schedule) do
    schedule.departure_time || schedule.arrival_time
  end

  defp format!(nil), do: ""
  defp format!(time), do: Dotcom.Utils.Time.format!(time, :hour_12_minutes)

  # This function combines two lists of stops into a single list that
  # has all of the stops for both lists in the right order, possibly
  # with additional entries in between. For instance, if the two input
  # lists are ["foo", "bar", "baz"], and ["foo", "quux", "bar"], then
  # the end result will be ["foo", "quux", "bar", "baz"].
  #
  # It works using recursion - if the first stops in each list are the
  # same, then that's the first stop of the resulting list -
  # otherwise, try each of: a) take the first item off of the first
  # list and keep going; b) take the first item off of the second list
  # and keep going; and then choose whichever result yields a shorter
  # list.
  #
  # It uses defmemop (def memo p[rivate]) to memoize intermediate
  # results because otherwise this re-runs intermediate calculations
  # for smaller lists over and over; the number of times it does this
  # scales exponentially with the number of stops.
  defmemop combine_stop_lists([], stop_list_2) do
    stop_list_2
  end

  defmemop combine_stop_lists(stop_list_1, []) do
    stop_list_1
  end

  defmemop combine_stop_lists(
             [stop_id_1 | remaining_1],
             [stop_id_2 | remaining_2]
           )
           when stop_id_1 == stop_id_2 do
    [stop_id_1 | combine_stop_lists(remaining_1, remaining_2)]
  end

  defmemop combine_stop_lists(
             [stop_id_1 | remaining_1] = stop_list_1,
             [stop_id_2 | remaining_2] = stop_list_2
           ) do
    result_1 = [stop_id_1 | combine_stop_lists(remaining_1, stop_list_2)]
    result_2 = [stop_id_2 | combine_stop_lists(stop_list_1, remaining_2)]

    [result_1, result_2] |> Enum.min_by(&Enum.count/1)
  end
end
