defmodule SiteWeb.Plugs.CanonicalHostname do
  @moduledoc """
  Plug to ensure that the site is only accessed via the canonical hostname.
  In particular, this will prevent users going to www.mbtace.com.

  There is an exception for the hostname that the mTicket app uses, since
  we detect that elsewhere in the code to produce some mTicket-specific
  effects when the site is loaded in mTicket's webview.
  """

  @mticket_hostname "mticket.mbtace.com"

  import Plug.Conn
  import Phoenix.Controller, only: [redirect: 2]

  def init(_) do
  end

  def call(%Plug.Conn{host: @mticket_hostname} = conn, _) do
    conn
  end

  def call(%Plug.Conn{host: requested_hostname} = conn, _) do
    canonical_hostname = SiteWeb.Endpoint.config(:url)[:host]

    if requested_hostname != canonical_hostname do
      rewritten_url =
        Plug.Conn.request_url(conn)
        |> String.replace(requested_hostname, canonical_hostname, global: false)

      conn
      |> put_status(:moved_permanently)
      |> redirect(external: rewritten_url)
      |> halt()
    else
      conn
    end
  end
end
