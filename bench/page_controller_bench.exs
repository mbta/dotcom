defmodule PageControllerBench do
  use Benchfella
  import Plug.Conn
  import Phoenix.ConnTest

  @endpoint DotcomWeb.Endpoint

  setup_all do
    Application.ensure_all_started(:dotcom)
    conn = get(build_conn(), "/")
    200 = conn.status
    {:ok, nil}
  end

  bench "load homepage", conn: build_conn() do
    conn = get(conn, "/")
    200 = conn.status
    :ok
  end
end
