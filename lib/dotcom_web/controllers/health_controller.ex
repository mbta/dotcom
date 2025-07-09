defmodule DotcomWeb.HealthController do
  @moduledoc """
  Simple controller to return 200 OK when the website is healthy.
  """

  use DotcomWeb, :controller

  def index(conn, _params) do
    status = ~i(1 error | %{count} errors | #{:rand.uniform(99)})p

    conn
    |> send_resp(200, status)
  end
end
