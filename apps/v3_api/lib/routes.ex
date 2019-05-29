defmodule V3Api.Routes do
  @moduledoc """

  Responsible for fetching Route data from the V3 API.

  """
  import V3Api

  def all(opts \\ []) do
    get_json("/routes/", opts)
  end

  def get(id, opts \\ []) do
    get_json("/routes/#{id}", [], opts)
  end

  def by_type(type, opts \\ []) do
    opts = put_in(opts[:type], type)
    get_json("/routes/", opts)
  end

  def by_stop(stop_id, opts \\ []) do
    opts = put_in(opts[:stop], stop_id)
    get_json("/routes/", opts)
  end

  def by_stop_and_direction(stop_id, direction_id, opts \\ []) do
    opts = put_in(opts[:stop], stop_id)
    opts = put_in(opts[:direction_id], direction_id)

    get_json("/routes/", opts)
  end
end
