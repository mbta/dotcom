defmodule DotcomWeb.MbtaGoDeepLinkTestController do
  @moduledoc false

  use DotcomWeb, :controller

  def redir_dotcom(conn, _params) do
    redirect(conn, to: "/go")
  end

  def redir_backend(conn, _params) do
    redirect(conn, external: "https://mobile-app-backend-dev-orange.mbtace.com")
  end

  def link_dotcom(conn, _params) do
    html(conn, "<a href=\"/go\">Open MBTA Go</a>")
  end

  def link_backend(conn, _params) do
    html(conn, "<a href=\"https://mobile-app-backend-dev-orange.mbtace.com\">Open MBTA Go</a>")
  end
end
