defmodule Dotcom.StopAmenity do
  @moduledoc """
  An amenity for a stop or station such as elevators, escalators, parking lots, and bike storage. These are derived from GTFS facilities, and a given amenity can encompass several facilities.
  """

  defstruct [:parent_stop_id, :type, :facilities]

  @type type :: :accessibility | :bike | :escalator | :elevator | :fare | :parking

  @type t :: %__MODULE__{
          parent_stop_id: Stops.Stop.id_t(),
          type: type(),
          facilities: [Facilities.Facility.t()]
        }

  def alerts_for_amenity(%__MODULE__{type: type}, alerts) do
    effects = alert_effects(type)
    Enum.filter(alerts, &(&1.effect in effects))
  end

  def alerts_for_amenity(_, _), do: []

  def amenity_types do
    ~w(fare parking bike escalators elevators accessibility)a
  end

  def from_stop_facilities(facilities, stop_id) do
    facilities
    |> Enum.group_by(&amenity_for_facility_type(&1.type))
    |> Enum.map(fn {amenity_type, facilities} ->
      if amenity_type do
        %__MODULE__{
          parent_stop_id: stop_id,
          type: amenity_type,
          facilities: facilities
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
  Checks if the alerts affect the given amenity now.
  """
  def affected_by_alerts?(%__MODULE__{facilities: facilities}, alerts) do
    Enum.any?(facilities, &Facilities.Facility.affected_by_alerts?(&1, alerts))
  end

  def num_working_facilities(%__MODULE__{facilities: facilities}, alerts) do
    Enum.reject(facilities, &Facilities.Facility.affected_by_alerts?(&1, alerts))
    |> Enum.count()
  end
end
