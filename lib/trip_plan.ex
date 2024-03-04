defmodule TripPlan do
  @moduledoc """
  Plan transit trips from one place to another.
  """
  @doc """
  Finds the latitude/longitude for a given address.
  """
  @spec geocode(String.t()) :: TripPlan.Geocode.t()
  def geocode(address)

  def geocode("") do
    {:error, :required}
  end

  def geocode(address) when is_binary(address) do
    apply(module(TripPlanGeocode), :geocode, [address])
  end

  defp module(sub_module), do: Application.fetch_env!(:dotcom, sub_module)[:module]
end
