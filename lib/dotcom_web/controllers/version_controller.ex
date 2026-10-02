defmodule DotcomWeb.VersionController do
  @moduledoc """
  Simple controller to return the current running version (SENTRY_RELEASE).
  """
  use DotcomWeb, :controller

  def version(conn, _params) do
    version = Application.get_env(:dotcom, :version)

    conn
    |> put_resp_content_type("text/plain")
    |> send_resp(:ok, version)
  end
end
