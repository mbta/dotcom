defmodule DotcomWeb.Plug.PutFlagsInSessionPlug do
  @moduledoc """
    Reads in Laboratory flags and makes them available on live view sessions.
    Necessary because cookies are hard to access from LiveView.
  """
  import Plug.Conn

  def init(_) do
    %{}
  end

  def call(conn, _opts) do
    conn = fetch_cookies(conn)
    flags = Application.get_env(:laboratory, :features) |> Enum.map(fn {key, _, _} -> key end)

    Enum.reduce(flags, conn, fn flag, conn ->
      value =
        case conn.cookies[Atom.to_string(flag)] do
          nil -> false
          "true" -> true
        end

      conn
      # Makes it available in LiveView
      |> put_session(flag, value)
      # Makes it available in traditional controllers
      |> assign(flag, value)
    end)
  end
end
