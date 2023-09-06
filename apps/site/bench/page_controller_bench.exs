defmodule PageControllerBench do
  use Benchfella
  use Phoenix.ConnTest

  @endpoint SiteWeb.Endpoint

  setup_all do
    Application.ensure_all_started(:site)
    conn = get build_conn(), "/"
    200 = conn.status
    {:ok, nil}
  end

  bench "load homepage", conn: build_conn() do
    conn = get conn, "/"
    200 = conn.status
    :ok
  end
end
