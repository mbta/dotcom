defmodule Dotcom.TimetableLoader do
  @moduledoc """
  Gets timetable data from CSV files. 

  The CSVs are expected to be generated from a timetable PDF file, and placed into the 
  `"/priv/timetables/"` directory under the following naming convention:
  `"{route_id}-{direction_id}.csv"`. At minimum, the `route_id` must be included as a key
  in the `Dotcom.Timetable` `@metadata` module attribute, with a value of a map containing
  an `:effective_dates` key indicating the timetable's start and end dates as a tuple.
  """

  @metadata %{
    "Boat-F6" => %{
      effective_dates: {~D[2025-04-28], ~D[2025-11-26]},
      weekend: "Boat-F8"
    },
    "Boat-F7" => %{
      effective_dates: {~D[2025-04-28], ~D[2025-11-26]},
      weekend: "Boat-F8"
    },
    "Boat-F8" => %{
      effective_dates: {~D[2025-05-17], ~D[2025-10-12]}
    }
  }
  @available_route_ids Map.keys(@metadata)
  @timetable_directory Application.app_dir(:dotcom) <> "/priv/timetables/"

  @doc """
  Routes supported by `Dotcom.Timetable`, listed by ID.
  """
  @spec available_route_ids :: [String.t()]
  def available_route_ids, do: @available_route_ids

  @doc """
  Retrieves timetable data for a given route, direction, and date. Returns nil if unavailable.
  """
  @spec from_csv(Routes.Route.id_t(), 0 | 1, Date.t()) :: list() | nil
  def from_csv(route_id, direction_id, date) when route_id in @available_route_ids do
    route_id = maybe_use_weekend_route(route_id, date)

    if in_timetable_date_range?(route_id, date) do
      get_csv("#{route_id}-#{direction_id}.csv")
      |> Enum.map(fn stop_row ->
        {stop_id, trips} = Map.pop!(stop_row, "Stop")

        Enum.map(trips, fn {trip_key, time} ->
          Map.new(stop_id: stop_id, trip: %{name: "", id: trip_key}, time: time)
        end)
        # another hack.
        |> Enum.sort_by(& &1.trip.name)
      end)
    end
  end

  def from_csv(_, _, _), do: nil

  defp maybe_use_weekend_route(route_id, date) do
    with true <- date_in_weekend?(date),
         new_route_id when is_binary(new_route_id) <- get_in(@metadata, [route_id, :weekend]) do
      new_route_id
    else
      _ ->
        route_id
    end
  end

  defp date_in_weekend?(date), do: Date.day_of_week(date) in [6, 7]

  @doc """
  Checks the `Dotcom.Timetable` metadata for whether the given date is effective on the given route.
  """
  @spec in_timetable_date_range?(Routes.Route.id_t(), Date.t()) :: boolean()
  def in_timetable_date_range?(route_id, date) do
    case get_in(@metadata, [route_id, :effective_dates]) do
      {start, ending} ->
        Dotcom.Utils.Time.between?(date, start, ending)

      _ ->
        false
    end
  end

  defp get_csv(filename) do
    path = @timetable_directory <> filename

    if File.exists?(path) do
      path
      |> File.stream!()
      |> CSV.decode!(headers: true)
      |> Enum.to_list()
    end
  end
end
