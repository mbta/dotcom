defmodule V3Api.Routes do
  @moduledoc """
  Responsible for fetching Route data from the V3 API.
  """
  @behaviour V3Api.RoutesApi

  import V3Api

  @impl V3Api.RoutesApi
  def all(opts \\ []) do
    get_json("/routes/", opts)
  end

  @impl V3Api.RoutesApi
  def get(id, opts \\ []) do
    get_json("/routes/#{id}", opts)
  end

  @impl V3Api.RoutesApi
  def by_type(type, opts \\ []) do
    opts = put_in(opts[:type], type)
    get_json("/routes/", opts)
  end

  @impl V3Api.RoutesApi
  def by_stop(stop_id, opts \\ []) do
    opts = put_in(opts[:stop], stop_id)
    get_json("/routes/", opts)
  end

  @impl V3Api.RoutesApi
  def by_stop_and_direction(stop_id, direction_id, opts \\ []) do
    opts = put_in(opts[:stop], stop_id)
    opts = put_in(opts[:direction_id], direction_id)

    get_json("/routes/", opts)
  end
end
