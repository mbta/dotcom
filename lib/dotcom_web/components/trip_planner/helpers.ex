defmodule DotcomWeb.Components.TripPlanner.Helpers do
  @moduledoc """
  Functions for rendering in the trip planner.
  """

  use Dotcom.Gettext.Sigils

  import Dotcom.Utils.Diff, only: [seconds_to_localized_minutes: 1]

  alias OpenTripPlannerClient.ItineraryGroup
  alias OpenTripPlannerClient.{Plan, Plan.RoutingError}
  alias OpenTripPlannerClient.Schema.{Leg, Step}

  @doc """
  Custom error message based on OpenTripPlanner result.
  """
  @spec error_message(Plan.t() | binary()) :: String.t()
  def error_message(%Plan{
        search_date_time: search_date_time,
        routing_errors: [
          %RoutingError{} = routing_error | _
        ]
      }) do
    routing_error_message(routing_error, search_date_time)
  end

  def error_message(other), do: other

  @doc """
  Custom message based on RoutingError codes.
  """
  @spec routing_error_message(RoutingError.t()) :: String.t()
  def routing_error_message(%RoutingError{code: :NO_TRANSIT_CONNECTION}, _) do
    ~t"No transit connection was found between the origin and destination on this date and time"
  end

  def routing_error_message(
        %RoutingError{
          code: :NO_TRANSIT_CONNECTION_IN_SEARCH_WINDOW,
          input_field: :DATE_TIME
        },
        datetime
      ) do
    gettext(
      "No transit routes found within 2 hours of %{time_on_date}. Routes may be available at other times.",
      time_on_date: formatted_time_on_date(datetime)
    )
  end

  def routing_error_message(
        %RoutingError{code: :OUTSIDE_BOUNDS, input_field: input_field},
        _
      ) do
    case input_field do
      :FROM ->
        ~t"Origin location is outside of our service area"

      :TO ->
        ~t"Destination location is outside of our service area"

      _ ->
        ~t"Origin or destination location is outside of our service area"
    end
  end

  def routing_error_message(%RoutingError{code: code, input_field: input_field}, _)
      when code in [:LOCATION_NOT_FOUND, :NO_STOPS_IN_RANGE] do
    case input_field do
      :FROM ->
        ~t"Origin location is not close enough to any transit stops"

      :TO ->
        ~t"Destination location is not close enough to any transit stops"

      _ ->
        ~t"Location is not close enough to any transit stops"
    end
  end

  def routing_error_message(_), do: fallback_error_message()

  @doc "Generic error message for trip planning."
  @spec fallback_error_message :: String.t()
  def fallback_error_message do
    ~t"Please try again or send us feedback at mbta.com/customer-support"
  end

  @doc """
  Formatted list of times arriving or departing.
  """
  @spec group_alternatives_text(ItineraryGroup.t()) :: String.t() | nil
  @spec group_alternatives_text([DateTime.t()], :start | :end) :: String.t() | nil
  def group_alternatives_text(
        %ItineraryGroup{representative_index: representative_index, time_key: time_key} =
          itinerary_group
      ) do
    itinerary_group
    |> ItineraryGroup.all_times()
    |> List.delete_at(representative_index)
    |> group_alternatives_text(time_key)
  end

  @doc """
  Formatted list of times arriving or departing.
  """
  @spec group_alternatives_text([DateTime.t()], :start | :end) :: String.t() | nil
  def group_alternatives_text([], _), do: nil

  def group_alternatives_text([time], :start),
    do: gettext("Similar trip departs at %{time}", time: formatted_time(time))

  def group_alternatives_text([time], :end),
    do: gettext("Similar trip arrives at %{time}", time: formatted_time(time))

  def group_alternatives_text(times, :start),
    do: gettext("Similar trips depart at %{times}", times: formatted_times(times))

  def group_alternatives_text(times, :end),
    do: gettext("Similar trips arrive at %{times}", times: formatted_times(times))

  def formatted_currency(cents) do
    Cldr.Number.to_string!(cents, format: :currency, currency: "USD")
  end

  @doc """
  Localized, formatted time.

  ## Examples
      iex> formatted_time(~T[16:56:05.0])
      "4:56 pm"

      iex> Dotcom.Cldr.put_locale("es")
      ...> formatted_time(~T[16:56:05.0])
      "16:56"
  """
  def formatted_time(time) do
    Cldr.Time.to_string!(time, format: :short, period: :variant)
  end

  @doc """
  Localized, formatted time range.

  ## Examples
      iex> formatted_time_range(~U[2025-08-15 09:41:17.283999Z], ~U[2025-08-15 09:58:47.283999Z])
      "9:41\u2009–\u20099:58 am"

      iex> Dotcom.Cldr.put_locale("es")
      ...> formatted_time_range(~U[2025-08-15 09:41:17.283999Z], ~U[2025-08-15 09:58:47.283999Z])
      "9:41–9:58"
  """
  def formatted_time_range(time1, time2) do
    Dotcom.Cldr.Time.Interval.to_string!(time1, time2, format: :medium, period: :variant)
  end

  def formatted_times(times) do
    times
    |> Enum.map(&formatted_time/1)
    |> Cldr.List.to_string!(format: :unit_short)
  end

  @doc """
  Localized, formatted date.

  ## Examples
      iex> formatted_date(~U[2025-08-14 17:41:17.283999Z])
      "Thursday, August 14th"

      iex> Dotcom.Cldr.put_locale("es")
      ...> formatted_date(~U[2025-08-14 17:41:17.283999Z])
      "jueves, agosto 14.º"
  """
  def formatted_date(datetime) do
    datetime
    |> Cldr.DateTime.to_string!(format: "EEEE, MMMM ddd")
  end

  def formatted_time_on_date(datetime) do
    gettext("%{time} on %{date}", time: formatted_time(datetime), date: formatted_date(datetime))
  end

  @doc """
  Generate a friendly description of the walking step or walking leg.

  ## Examples
      iex> walk_summary(%OpenTripPlannerClient.Schema.Step{relative_direction: :DEPART, street_name: "Transfer"})
      "Transfer"

      iex> walk_summary(%OpenTripPlannerClient.Schema.Step{relative_direction: :FOLLOW_SIGNS, street_name: "Rainbow Road"})
      "Follow signs for Rainbow Road"

      iex> walk_summary(%OpenTripPlannerClient.Schema.Step{relative_direction: :CONTINUE, street_name: "Rainbow Road"})
      "Continue onto Rainbow Road"

      iex> walk_summary(%OpenTripPlannerClient.Schema.Step{street_name: "Rainbow Road"})
      "Go onto Rainbow Road"
  """
  @spec walk_summary(Step.t() | Leg.t()) :: String.t()
  def walk_summary(%Step{relative_direction: :DEPART, street_name: "Transfer"}),
    do: ~t"Transfer"

  def walk_summary(%Step{
        relative_direction: relative_direction,
        street_name: street_name
      }) do
    "#{human_relative_direction(relative_direction)} #{human_relative_preposition(relative_direction)} #{street_name}"
  end

  def walk_summary(%Leg{distance: meters, duration: seconds, transit_leg: false}) do
    "#{seconds_to_localized_minutes(seconds)}, #{meters_to_localized_miles(meters)}"
  end

  defp human_relative_direction(:DEPART), do: ~t"Depart"
  defp human_relative_direction(:SLIGHTLY_LEFT), do: ~t"Slightly left"
  defp human_relative_direction(:LEFT), do: ~t"Left"
  defp human_relative_direction(:HARD_LEFT), do: ~t"Hard left"
  defp human_relative_direction(:SLIGHTLY_RIGHT), do: ~t"Slightly right"
  defp human_relative_direction(:RIGHT), do: ~t"Right"
  defp human_relative_direction(:HARD_RIGHT), do: ~t"Hard right"
  defp human_relative_direction(:CONTINUE), do: ~t"Continue"
  defp human_relative_direction(:CIRCLE_CLOCKWISE), do: ~t"Enter the traffic circle"
  defp human_relative_direction(:CIRCLE_COUNTERCLOCKWISE), do: ~t"Enter the traffic circle"
  defp human_relative_direction(:ELEVATOR), do: ~t"Take the elevator"
  defp human_relative_direction(:UTURN_LEFT), do: ~t"Make a U-turn"
  defp human_relative_direction(:UTURN_RIGHT), do: ~t"Make a U-turn"
  defp human_relative_direction(:ENTER_STATION), do: ~t"Enter the station"
  defp human_relative_direction(:EXIT_STATION), do: ~t"Exit the station"
  defp human_relative_direction(:FOLLOW_SIGNS), do: ~t"Follow signs"
  defp human_relative_direction(_), do: ~t"Go"

  defp human_relative_preposition(:FOLLOW_SIGNS), do: ~t"for"
  defp human_relative_preposition(:ENTER_STATION), do: ~t"through"
  defp human_relative_preposition(:EXIT_STATION), do: ~t"towards"
  defp human_relative_preposition(_), do: ~t"onto"

  @doc """
  Render meters into miles, with localized formatting.
  Avoids displaying 0 when under 0.1 mile.

  ## Examples
   		iex> meters_to_localized_miles(1)
   		"0.1 mi"

   		iex> meters_to_localized_miles(3452364)
   		"2,145.2 mi"
  """
  def meters_to_localized_miles(meters) do
    with {:ok, unit} <- Cldr.Unit.new(:meter, meters),
         {:ok, converted_unit} <- Cldr.Unit.convert(unit, :mile) do
      converted_unit
      |> Cldr.Unit.round(1)
      |> Dotcom.Utils.Unit.at_least(0.1)
      |> Cldr.Unit.to_string!(style: :short)
    end
  end

  def tag_name(:earliest_arrival), do: ~t(Earliest Arrival)
  def tag_name(:least_walking), do: ~t(Least Walking)
  def tag_name(:most_direct), do: ~t(Most Direct)
  def tag_name(:shortest_trip), do: ~t(Shortest Trip)
end
