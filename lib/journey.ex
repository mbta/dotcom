defmodule Journey do
  @moduledoc """
  Represents a schedule at a stop (origin or destination) or a pair of stops (origin and destination)
  """

  use Dotcom.Gettext.Sigils

  alias PhoenixHTMLHelpers.Tag
  alias Predictions.Prediction
  alias Schedules.{Schedule, Trip}

  defstruct [:departure, :arrival, :trip]

  @type t :: %__MODULE__{
          departure: PredictedSchedule.t() | nil,
          arrival: PredictedSchedule.t() | nil,
          trip: Trip.t() | nil
        }

  @spec has_departure_schedule?(__MODULE__.t()) :: boolean
  def has_departure_schedule?(%__MODULE__{departure: departure}),
    do: PredictedSchedule.has_schedule?(departure)

  def has_departure_schedule?(%__MODULE__{}), do: false

  @spec has_departure_prediction?(__MODULE__.t()) :: boolean
  def has_departure_prediction?(%__MODULE__{departure: departure}) when not is_nil(departure) do
    PredictedSchedule.has_prediction?(departure)
  end

  def has_departure_prediction?(%__MODULE__{}), do: false

  @spec has_arrival_prediction?(__MODULE__.t()) :: boolean
  def has_arrival_prediction?(%__MODULE__{arrival: arrival}) when not is_nil(arrival) do
    PredictedSchedule.has_prediction?(arrival)
  end

  def has_arrival_prediction?(%__MODULE__{}), do: false

  @spec has_prediction?(__MODULE__.t()) :: boolean
  def has_prediction?(journey),
    do: has_departure_prediction?(journey) or has_arrival_prediction?(journey)

  @spec prediction(__MODULE__.t()) :: Prediction.t() | nil
  def prediction(journey) do
    cond do
      has_departure_prediction?(journey) ->
        journey.departure.prediction

      has_arrival_prediction?(journey) ->
        journey.arrival.prediction

      true ->
        nil
    end
  end

  @spec time(t) :: DateTime.t() | nil
  def time(journey), do: departure_time(journey)

  @spec departure_time(__MODULE__.t()) :: DateTime.t() | nil
  def departure_time(%__MODULE__{departure: nil}), do: nil
  def departure_time(%__MODULE__{departure: departure}), do: PredictedSchedule.time(departure)

  @spec arrival_time(__MODULE__.t()) :: DateTime.t() | nil
  def arrival_time(%__MODULE__{arrival: nil}), do: nil
  def arrival_time(%__MODULE__{arrival: arrival}), do: PredictedSchedule.time(arrival)

  @spec departure_prediction_time(__MODULE__.t() | nil) :: DateTime.t() | nil
  def departure_prediction_time(%__MODULE__{
        departure: %PredictedSchedule{prediction: %Prediction{time: time}}
      }),
      do: time

  def departure_prediction_time(%__MODULE__{}), do: nil
  def departure_prediction_time(nil), do: nil

  @spec departure_schedule_time(__MODULE__.t() | nil) :: DateTime.t() | nil
  def departure_schedule_time(%__MODULE__{
        departure: %PredictedSchedule{schedule: %Schedule{time: time}}
      }),
      do: time

  def departure_schedule_time(%__MODULE__{}), do: nil
  def departure_schedule_time(nil), do: nil

  def departure_schedule_before?(
        %__MODULE__{departure: %PredictedSchedule{schedule: %Schedule{time: time}}},
        cmp_time
      )
      when not is_nil(time) do
    Timex.before?(time, cmp_time)
  end

  def departure_schedule_before?(%__MODULE__{}), do: false

  def departure_schedule_after?(
        %__MODULE__{departure: %PredictedSchedule{schedule: %Schedule{time: time}}},
        cmp_time
      )
      when not is_nil(time) do
    Timex.after?(time, cmp_time)
  end

  def departure_schedule_after?(%__MODULE__{}, _cmp_time), do: false

  @doc """

  Compares two Journeys and returns true if the first one (left) is before the second (right).

  * If both have departure times, compares those
  * If both have arrival times, compares those
  * If neither have times, compares the status text fields

  """
  @spec before?(t, t) :: boolean
  def before?(left, right) do
    left_departure_time = departure_prediction_time(left) || departure_time(left)
    right_departure_time = departure_prediction_time(right) || departure_time(right)

    cmp_departure = safe_time_compare(left_departure_time, right_departure_time)

    cond do
      cmp_departure == -1 ->
        true

      cmp_departure == 1 ->
        false

      true ->
        arrival_before?(left, right)
    end
  end

  defp safe_time_compare(left, right) when is_nil(left) or is_nil(right) do
    0
  end

  defp safe_time_compare(left, right) do
    Timex.compare(left, right)
  end

  defp arrival_before?(left, right) do
    left_arrival_time = arrival_time(left)
    right_arrival_time = arrival_time(right)

    cmp_arrival = safe_time_compare(left_arrival_time, right_arrival_time)

    cond do
      is_nil(left_arrival_time) && is_nil(right_arrival_time) ->
        # both are nil, sort the statuses (if we have predictions)
        prediction_before?(left, right)

      cmp_arrival == -1 ->
        true

      cmp_arrival == 1 ->
        false

      true ->
        is_nil(left_arrival_time)
    end
  end

  defp prediction_before?(left, right) do
    left_prediction = prediction(left)
    right_prediction = prediction(right)

    cond do
      is_nil(left_prediction) ->
        true

      is_nil(right_prediction) ->
        false

      true ->
        status_before?(left_prediction.status, right_prediction.status)
    end
  end

  defp status_before?(left, right) when is_binary(left) and is_binary(right) do
    case {Integer.parse(left), Integer.parse(right)} do
      {{left_int, _}, {right_int, _}} ->
        # both stops away, the lower one is before: "1 stop away" <= "2 stops away"
        left_int <= right_int

      {{_left_int, _}, _} ->
        # right int isn't stops away, so it's before: "1 stop away" >= "Boarding"
        false

      {_, {_right_int, _}} ->
        # left int isn't stops away, so it's before: "Boarding" <= "1 stop away"
        true

      _ ->
        # fallback: sort them in reverse order: "Boarding" <= "Approaching"
        left >= right
    end
  end

  defp status_before?(nil, _) do
    false
  end

  defp status_before?(_, nil) do
    true
  end

  @doc """
  Returns a message containing the maximum delay between scheduled and predicted times for an arrival
  and departure, or the empty string if there's no delay.
  """
  @spec display_status(PredictedSchedule.t() | nil, PredictedSchedule.t() | nil) ::
          Phoenix.HTML.Safe.t()
  def display_status(departure, arrival \\ nil)

  def display_status(
        %PredictedSchedule{schedule: _, prediction: %Prediction{status: status, track: track}},
        _
      )
      when not is_nil(status) do
    status = String.capitalize(status)

    case track do
      nil ->
        Tag.content_tag(:span, status)

      track ->
        Tag.content_tag(
          :span,
          [
            status,
            ~t" on ",
            Tag.content_tag(:span, [~t"track ", track], class: "no-wrap")
          ]
        )
    end
  end

  def display_status(departure, arrival) do
    case Enum.max([PredictedSchedule.delay(departure), PredictedSchedule.delay(arrival)]) do
      delay when delay > 0 ->
        minutes =
          delay
          |> Cldr.Unit.new!(:minute)
          |> Cldr.Unit.localize()
          |> Cldr.Unit.to_string!()

        Tag.content_tag(
          :span,
          gettext(
            "Delayed %{minutes}",
            minutes: minutes
          )
        )

      _ ->
        ""
    end
  end
end
