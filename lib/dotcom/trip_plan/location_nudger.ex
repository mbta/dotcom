defmodule Dotcom.TripPlan.LocationNudger do
  @moduledoc """
  There are some locations that are fairly close to transit stops, but
  for which all of the OpenStreetMap paths are not public. The
  Massachusetts State House is a good example of this. The building
  isn't publicly accessible according to OpenStreetMaps data, and
  that's correct, because all of the entries into it are gated with
  security guards. That said, plenty of people need to plan trips to
  the State House.

  This location nudger is responsible for nudging locations that
  aren't publicly accessible, but that should still be possible to
  plan trips to and from, to a sensible lat/long that can be used in
  trip plans, e.g. the public side of a security entrance.
  """

  @state_house_address_string "24 Beacon St"
  @state_house_zip_codes ["02108", "02133"]
  @state_house_location %{latitude: 42.35861, longitude: -71.06297}

  def nudge(%{from: from, to: to} = data) do
    %{data | from: nudge_location(from), to: nudge_location(to)}
  end

  def state_house_location, do: @state_house_location
  def state_house_zip_codes(), do: @state_house_zip_codes

  def nudge_location(location) do
    if state_house?(location) do
      location |> Map.merge(@state_house_location)
    else
      location
    end
  end

  defp state_house?(%{name: name}) do
    state_house_zip_code_and_city?(name) &&
      state_house_street_address?(name)
  end

  defp state_house_zip_code_and_city?(name) do
    @state_house_zip_codes
    |> Enum.any?(fn zip_code -> name |> String.contains?("Boston, MA, #{zip_code}") end)
  end

  defp state_house_street_address?(name) do
    name |> String.contains?(@state_house_address_string)
  end
end
