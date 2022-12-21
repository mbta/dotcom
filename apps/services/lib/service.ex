defmodule Services.Service do
  @moduledoc "Processes Services, including dates and notes"
  alias JsonApi.Item

  defstruct added_dates: [],
            added_dates_notes: [],
            description: "",
            end_date: nil,
            name: "",
            id: nil,
            removed_dates: [],
            removed_dates_notes: [],
            start_date: nil,
            type: nil,
            typicality: :unknown,
            valid_days: [],
            rating_start_date: nil,
            rating_end_date: nil,
            rating_description: ""

  @type typicality ::
          :unknown
          # Typical service with perhaps minor modifications
          | :typical_service
          # Extra service supplements typical schedules
          | :extra_service
          # Reduced holiday service is provided by typical Saturday or Sunday schedule
          | :holiday_service
          # Major changes in service due to a planned disruption, such as construction
          | :planned_disruption
          # Major reductions in service for weather events or other atypical situations
          | :unplanned_disruption

  @type type :: :weekday | :saturday | :sunday | :other

  @type date_notes :: %{String.t() => String.t() | nil}

  @type special_service :: %{date: Date.t(), name: String.t()}

  # 1 = Monday, 7 = Sunday
  @type valid_day :: 1 | 2 | 3 | 4 | 5 | 6 | 7

  @type t :: %__MODULE__{
          added_dates: [String.t()],
          added_dates_notes: date_notes,
          description: String.t(),
          end_date: Date.t() | nil,
          name: String.t(),
          id: String.t(),
          removed_dates: [String.t()],
          removed_dates_notes: date_notes,
          start_date: Date.t() | nil,
          type: type,
          typicality: typicality,
          valid_days: [valid_day],
          rating_start_date: Date.t() | nil,
          rating_end_date: Date.t() | nil,
          rating_description: String.t()
        }

  def new(%Item{id: id, attributes: attributes, type: "service"}) do
    %__MODULE__{}
    |> dates(attributes)
    |> rating_dates(attributes)
    |> date_notes(attributes)
    |> Map.put(:description, Map.get(attributes, "description", ""))
    |> Map.put(:name, Map.get(attributes, "schedule_name", ""))
    |> Map.put(:id, id)
    |> Map.put(:type, attributes |> Map.get("schedule_type") |> type())
    |> Map.put(:typicality, attributes |> Map.get("schedule_typicality") |> typicality())
    |> Map.put(:valid_days, Map.get(attributes, "valid_days", []))
    |> Map.put(:rating_description, Map.get(attributes, "rating_description", ""))
  end

  defp dates(service, attributes) do
    service =
      Enum.reduce(["added", "removed"], service, fn date_type, acc ->
        %{acc | "#{date_type}_dates": Map.get(attributes, date_type <> "_dates", [])}
      end)

    Enum.reduce(["start", "end"], service, fn date_type, acc ->
      date =
        case Map.get(attributes, date_type <> "_date") do
          nil -> nil
          date_string -> Date.from_iso8601!(date_string)
        end

      %{acc | "#{date_type}_date": date}
    end)
  end

  defp rating_dates(service, attributes) do
    Enum.reduce(["rating_start", "rating_end"], service, fn date_type, acc ->
      date =
        case Map.get(attributes, date_type <> "_date") do
          nil -> nil
          date_string -> Date.from_iso8601!(date_string)
        end

      %{acc | "#{date_type}_date": date}
    end)
  end

  defp date_notes(service, attributes) do
    Enum.reduce(["added", "removed"], service, fn date_type, acc ->
      dates = Map.get(acc, :"#{date_type}_dates", [])
      notes = Map.get(attributes, date_type <> "_dates_notes", [])

      note_map =
        dates
        |> Enum.zip(notes)
        |> Enum.reduce(%{}, &Map.put(&2, elem(&1, 0), elem(&1, 1)))

      %{acc | "#{date_type}_dates_notes": note_map}
    end)
  end

  @spec special_service_map(Routes.Route.id_t() | [Routes.Route.id_t()]) :: [special_service()]
  def special_service_map(route_id_or_ids) do
    # TODO rename to special_service_dates
    # Every 1 response is for a single route
    route_id_or_ids
    |> List.wrap()
    |> Services.Repo.by_route_id()
    |> Enum.flat_map(&get_date_and_name_map(&1))
  end

  defp get_date_and_name_map(service) do
    Enum.map(service.added_dates_notes, fn {date, name} ->
      %{
        date: Date.from_iso8601!(date),
        name: name
      }
    end)
  end

  defp type("Weekday"), do: :weekday
  defp type("Saturday"), do: :saturday
  defp type("Sunday"), do: :sunday
  defp type("Other"), do: :other

  defp typicality(nil), do: :unknown
  defp typicality(0), do: :unknown
  defp typicality(1), do: :typical_service
  defp typicality(2), do: :extra_service
  defp typicality(3), do: :holiday_service
  defp typicality(4), do: :planned_disruption
  defp typicality(5), do: :unplanned_disruption
end
