defmodule Facilities.Facility do
  @moduledoc """
  A single amenity for a stop or station such as elevators, escalators, parking lots, and bike storage.
  """

  @date_time_module Application.compile_env!(:dotcom, :date_time_module)

  defstruct [:id, :type, :short_name, :long_name, :latitude, :longitude, :properties]

  @type id_t :: String.t()
  @type facility_property :: %{value: String.t(), name: String.t()}

  @type t :: %__MODULE__{
          id: id_t(),
          type: Stops.Api.gtfs_facility_type(),
          short_name: String.t() | nil,
          long_name: String.t() | nil,
          latitude: float | nil,
          longitude: float | nil,
          properties: [facility_property()]
        }

  defimpl Util.Position do
    def latitude(facility), do: facility.latitude
    def longitude(facility), do: facility.longitude
  end

  def parse_v3_response(%JsonApi.Item{} = item) do
    %__MODULE__{
      id: item.id,
      type: Stops.Api.facility_atom_from_string(item.attributes["type"]),
      short_name: item.attributes["short_name"],
      long_name: item.attributes["long_name"],
      latitude: item.attributes["latitude"],
      longitude: item.attributes["longitude"],
      properties: item.attributes["properties"]
    }
  end

  @doc """
  Returns true if any of the given alerts impacts the given facility
  """
  def affected_by_alerts?(%__MODULE__{id: facility_id}, alerts) do
    alerts
    |> Enum.filter(&Alerts.Match.any_time_match?(&1, @date_time_module.now()))
    |> Enum.any?(&(facility_id in &1.informed_entity.facility))
  end
end
