defmodule DotcomWeb.MapConfigController do
  @moduledoc """
  Endpoints for getting map config details.
  """
  use DotcomWeb, :controller

  @spec get(Conn.t(), map) :: Conn.t()
  def get(conn, _opts) do
    json(conn, %{
      tile_server_url: Application.fetch_env!(:dotcom, :tile_server_url)
    })
  end
end
