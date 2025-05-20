defmodule DotcomWeb.MbtaGoDeepLinkTestController do
  @moduledoc false

  use DotcomWeb, :controller

  def redir(conn, _params) do
    redirect(conn, to: "/go")
  end

  def link(conn, _params) do
    html(conn, "<a href=\"/go\">Open MBTA Go</a>")
  end
end
