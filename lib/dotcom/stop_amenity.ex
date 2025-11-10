defmodule Dotcom.StopAmenity do
  @moduledoc """
  An amenity for a stop or station such as elevators, escalators, parking lots, and bike storage. These are derived from GTFS facilities, and a given amenity can encompass several facilities.
  """

  alias Facilities.Facility

  defstruct [:type, :facilities]

  @type t :: %__MODULE__{
          type: :accessibility | :bike | :escalator | :elevator | :fare | :parking,
          facilities: [Facility.t()]
        }

  @doc """
  Filter a list of alerts to those relevant to the given amenity.
  """
  def alerts_for_amenity(%__MODULE__{type: type}, alerts) do
    effects = alert_effects(type)
    Enum.filter(alerts, &(&1.effect in effects))
  end

  def alerts_for_amenity(_, _), do: []

  @doc """
  Derive a list of amenities from a list of facilities, where many facilities
  may be associated with a single amenity. Additionally, trim the name of the
  facility to avoid repetition, e.g. "Braintree elevator 123 (Platform to
  lobby)" is simplified to "123 (Platform to lobby)"
  """
  def from_stop_facilities(facilities, stop_name) do
    facilities
    |> Enum.group_by(&amenity_for_facility_type(&1.type))
    |> Enum.map(fn {amenity_type, facilities} ->
      if amenity_type do
        stop_facility_name = stop_name <> " " <> String.capitalize("#{amenity_type}")

        %__MODULE__{
          type: amenity_type,
          facilities:
            Enum.map(facilities, fn facility ->
              Map.update!(facility, :long_name, &String.trim_leading(&1, stop_facility_name))
            end)
        }
      end
    end)
    |> Enum.reject(&is_nil/1)
  end

  defp alert_effects(:bike), do: [:bike_issue]
  defp alert_effects(:elevator), do: [:elevator_closure]
  defp alert_effects(:escalator), do: [:escalator_closure]
  defp alert_effects(:parking), do: [:parking_closure, :parking_issue]
  defp alert_effects(_), do: []

  defp amenity_for_facility_type(:bike_storage), do: :bike
  defp amenity_for_facility_type(type) when type in [:elevator, :escalator], do: type
  defp amenity_for_facility_type(:parking_area), do: :parking

  defp amenity_for_facility_type(type)
       when type in [
              :ramp,
              :portable_boarding_lift,
              :fully_elevated_platform,
              :elevated_subplatform,
              :elevator,
              :escalator,
              :tty_phone
            ],
       do: :accessibility

  defp amenity_for_facility_type(type)
       when type in [
              :fare_vending_retailer,
              :fare_vending_machine,
              :fare_media_assistant,
              :fare_media_assistance_facility,
              :ticket_window
            ],
       do: :fare

  defp amenity_for_facility_type(_), do: nil

  @doc """
  Counts number of facilities not impacted by current alerts.
  """
  def num_working_facilities(%__MODULE__{facilities: facilities}, alerts) do
    facilities
    |> Enum.reject(&Facility.affected_by_alerts?(&1, alerts))
    |> Enum.count()
  end
end
