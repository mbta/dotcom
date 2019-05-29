defmodule TripPlan do
  @moduledoc """
  Plan transit trips from one place to another.
  """
  alias Util.Position

  # Default options for the plans
  @default_opts [
    # ~0.5 miles
    max_walk_distance: 805
  ]

  @doc """
  Tries to describe how to get between two places.
  """
  @spec plan(Position.t(), Position.t(), TripPlan.Api.plan_opts(), pid()) :: TripPlan.Api.t()
  def plan(from, to, opts, parent \\ self()) do
    apply(module(Api), :plan, [from, to, Keyword.merge(@default_opts, opts), parent])
  end

  @doc """
  Fetches all stops within 1km of a given point
  """
  @spec stops_nearby(Position.t()) :: [Position.t()]
  def stops_nearby(location) do
    apply(module(Api), :stops_nearby, [location])
  end

  @doc """
  Finds the latitude/longitude for a given address.
  """
  @spec geocode(String.t()) :: TripPlan.Geocode.t()
  def geocode(address)

  def geocode("") do
    {:error, :required}
  end

  def geocode(address) when is_binary(address) do
    apply(module(Geocode), :geocode, [address])
  end

  defp module(sub_module), do: Application.fetch_env!(:trip_plan, sub_module)[:module]
end
