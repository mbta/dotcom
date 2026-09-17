defmodule DotcomWeb.VersionController do
  @moduledoc """
  Simple controller to return the current running version (SENTRY_RELEASE).
  """
  use DotcomWeb, :controller

  @version Application.compile_env(:dotcom, :version)

  def version(conn, _params) do
    conn
    |> put_resp_content_type("text/plain")
    |> send_resp(:ok, @version)
  end
end
