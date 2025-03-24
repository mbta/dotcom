defmodule Dotcom.TripPlan.OpenStreetMapReconciler do
  @moduledoc """
  There are some locations that are fairly close to transit stops, but
  for which all of the OpenStreetMap paths are not public. The
  Massachusetts State House is a good example of this. The building
  isn't publicly accessible according to OpenStreetMaps data, and
  that's correct, because all of the entries into it are gated with
  security guards. That said, plenty of people need to plan trips to
  the State House.

  This module is responsible for reconcilinglocations that
  aren't publicly accessible, but that should still be possible to
  plan trips to and from, to a sensible lat/long that can be used in
  trip plans, e.g. the public side of a security entrance.
  """
  alias Dotcom.TripPlan.InputForm

  @state_house_location %{latitude: 42.35861, longitude: -71.06297}

  @state_house_geofence %Geo.Polygon{
    coordinates: [
      [
        {-71.06428959524202, 42.35929686684236},
        {-71.0640102056953, 42.35934168159116},
        {-71.0638435090483, 42.35935638344125},
        {-71.06373398735568, 42.35933415293894},
        {-71.06357143893216, 42.35934882673254},
        {-71.06300837541752, 42.359395765982015},
        {-71.06302567689937, 42.35872585179979},
        {-71.06278742951945, 42.35798745918419},
        {-71.06333062981243, 42.35775602228787},
        {-71.06344255099854, 42.35778172596372},
        {-71.06363682355679, 42.357752480045974},
        {-71.06370471324934, 42.35772488805381},
        {-71.06375223603419, 42.357685381316344},
        {-71.06378108915396, 42.3576527725626},
        {-71.0637912726078, 42.357608876136},
        {-71.06438581693322, 42.35742659604685},
        {-71.06442414468506, 42.35744075730992},
        {-71.06449532479537, 42.35741445781912},
        {-71.0646677996782, 42.358316726362006},
        {-71.06424348848178, 42.35837183296019},
        {-71.06429405017091, 42.358542399797955},
        {-71.06426767015877, 42.35885266781085},
        {-71.06429569709945, 42.358885673427494},
        {-71.06429084506699, 42.35929640740869}
      ]
    ]
  }

  @spec reconcile(InputForm.t()) :: InputForm.t()
  def reconcile(%{from: from, to: to} = data) do
    %InputForm{data | from: reconcile_location(from), to: reconcile_location(to)}
  end

  # @spec reconcile_location(InputForm.Location.t()) :: InputForm.Location.t()
  def reconcile_location(location) do
    if state_house?(location) do
      %InputForm.Location{
        location
        | latitude: @state_house_location.latitude,
          longitude: @state_house_location.longitude
      }
    else
      location
    end
  end

  # @spec state_house?(InputForm.Location.t()) :: boolean()
  defp state_house?(%{latitude: latitude, longitude: longitude}) do
    Topo.intersects?(@state_house_geofence, %Geo.Point{coordinates: {longitude, latitude}})
  end

  # @spec state_house_location() :: %{latitude: float(), longitude: float()}
  def state_house_location(), do: @state_house_location
end
