defmodule Dotcom.TripPlan.OpenStreetMapReconciler do
  @moduledoc """
  There are some locations that are fairly close to transit stops, but
  for which all of the OpenStreetMap paths are not public. The
  Massachusetts State House is a good example of this. The building
  isn't publicly accessible according to OpenStreetMaps data, and
  that's correct, because all of the entries into it are gated with
  security guards. That said, plenty of people need to plan trips to
  the State House.

  This module is responsible for reconciling locations that aren't
  publicly accessible, but that should still be possible to plan trips
  to and from, to a sensible lat/long that can be used in trip plans,
  e.g. the public side of a security entrance.
  """

  alias Dotcom.TripPlan.InputForm

  @state_house_location %{latitude: 42.35861, longitude: -71.06297}

  @state_house_geofence %Geo.Polygon{
    coordinates: [
      [
        {-71.064289, 42.359296},
        {-71.064010, 42.359341},
        {-71.063843, 42.359356},
        {-71.063733, 42.359334},
        {-71.063571, 42.359348},
        {-71.063008, 42.359395},
        {-71.063025, 42.358725},
        {-71.062787, 42.357987},
        {-71.063330, 42.357756},
        {-71.063442, 42.357781},
        {-71.063636, 42.357752},
        {-71.063704, 42.357724},
        {-71.063752, 42.357685},
        {-71.063781, 42.357652},
        {-71.063791, 42.357608},
        {-71.064385, 42.357426},
        {-71.064424, 42.357440},
        {-71.064495, 42.357414},
        {-71.064667, 42.358316},
        {-71.064243, 42.358371},
        {-71.064294, 42.358542},
        {-71.064267, 42.358852},
        {-71.064295, 42.358885},
        {-71.064290, 42.359296}
      ]
    ]
  }

  @doc """
  Given a `Dotcom.TripPlan.InputForm`, checks the `to` and `from`
  fields and reconciles them to a publicly-accessible location if
  necessary.

  See `reconcile_location/1` for more info.
  """
  @spec reconcile(InputForm.t()) :: InputForm.t()
  @spec reconcile(arg) :: arg when arg: var
  def reconcile(%{from: from, to: to} = form) do
    %InputForm{form | from: reconcile_location(from), to: reconcile_location(to)}
  end

  def reconcile(form), do: form

  @doc """
  Given a `Dotcom.TripPlan.InputForm.Location`, reconciles it by
  nudging it to a publicly-accessible location if necessary.

  Currently, we're using this to reconcile locations in the
  Massachusetts State House to instead have trips planned to or from
  the publicly-accessible security booth just outside. We determine
  that a location is in the State House by building a polygon around
  the State House, and checking whether the lat/long pair is inside
  that polygon.
  """
  @spec reconcile_location(InputForm.Location.t()) :: InputForm.Location.t()
  @spec reconcile_location(nil) :: nil
  def reconcile_location(nil), do: nil

  def reconcile_location(location) do
    if state_house?(location) do
      location |> Map.merge(@state_house_location)
    else
      location
    end
  end

  @spec state_house?(InputForm.Location.t()) :: boolean()
  defp state_house?(%{latitude: latitude, longitude: longitude}) do
    Topo.intersects?(@state_house_geofence, %Geo.Point{coordinates: {longitude, latitude}})
  end

  @spec state_house_location() :: %{latitude: float(), longitude: float()}
  def state_house_location(), do: @state_house_location
end
