defmodule V3Api.MockRoutes do
  @moduledoc """
  A mock Routes API client for testing purposes.
  """

  @behaviour V3Api.RoutesApi

  @impl V3Api.RoutesApi
  def all(opts \\ [])
  def all(_), do: %JsonApi{data: []}

  @impl V3Api.RoutesApi
  def get(id, opts \\ [])
  def get(_, _), do: %JsonApi{data: []}

  @impl V3Api.RoutesApi
  def by_type(type, opts \\ [])
  def by_type(_, _), do: %JsonApi{data: []}

  @impl V3Api.RoutesApi
  def by_stop(stop_id, opts \\ [])
  def by_stop(_, _), do: %JsonApi{data: []}

  @impl V3Api.RoutesApi
  def by_stop_and_direction(stop_id, direction_id, opts \\ [])
  def by_stop_and_direction(_, _, _), do: %JsonApi{data: []}
end
