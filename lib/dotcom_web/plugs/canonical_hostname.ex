defmodule DotcomWeb.Plugs.CanonicalHostname do
  @moduledoc """
  Plug to ensure that the site is only accessed via the canonical hostname.
  In particular, this will prevent users going to www.mbtace.com.
  """

  import Plug.Conn
  import Phoenix.Controller, only: [redirect: 2]

  def init(_) do
  end

  def call(%Plug.Conn{host: requested_hostname} = conn, _) do
    canonical_hostname = System.get_env("HOST") || "localhost"

    if requested_hostname == canonical_hostname or private_ip?(requested_hostname) do
      conn
    else
      rewritten_url = Plug.Conn.request_url(%Plug.Conn{conn | host: canonical_hostname})

      conn
      |> put_status(:moved_permanently)
      |> redirect(external: rewritten_url)
      |> halt()
    end
  end

  # The health checker uses a private IP for a hostname
  defp private_ip?(hostname) do
    case hostname |> String.to_charlist() |> :inet.parse_ipv4_address() do
      {:ok, {byte0, byte1, _, _}} ->
        byte0 == 10 or (byte0 == 172 and byte1 >= 16 and byte1 <= 31) or
          (byte0 == 192 and byte1 == 168)

      _ ->
        false
    end
  end
end
