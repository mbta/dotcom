defmodule DotcomWeb.HealthController do
  @moduledoc """
  Simple controller to return 200 OK when the website is healthy.
  """
  use DotcomWeb, :controller

  def index(conn, _params) do
    send_resp(conn, 200, "")
  end
end
