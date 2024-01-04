defmodule SiteWeb.Plugs.UriChecker do
  @moduledoc """
  Checks for a malformed URI and if it exists, redirects with a 404
  (and renders the 404 bus page)
  """

  @behaviour Plug

  @impl true
  def init(opts) do
    opts
  end

  @impl true
  def call(conn, _) do
    try do
      # credo:disable-for-next-line Credo.Check.Warning.UnusedEnumOperation
      Enum.map(conn.path_info, &URI.decode/1)
      conn
    catch
      _kind, %ArgumentError{message: "malformed URI " <> _uri} ->
        SiteWeb.ControllerHelpers.render_not_found(conn)
    end
  end
end
