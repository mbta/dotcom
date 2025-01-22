defmodule DotcomWeb.Plugs.CacheControl do
  @moduledoc """
  If a `max_age` option is specified in number of seconds,
  adds a `cache-control header` to the response.
  """
  @behaviour Plug

  @impl true
  def init(opts) do
    opts
  end

  @impl true
  def call(conn, opts) do
    do_cache_control(conn, Keyword.get(opts, :max_age))
  end

  defp do_cache_control(conn, max_age) when is_number(max_age) do
    Plug.Conn.put_resp_header(conn, "cache-control", "max-age=#{max_age}, private, must-revalidate")
  end

  defp do_cache_control(conn, _), do: conn
end
