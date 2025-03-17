defmodule DotcomWeb.RedirectorTest do
  use DotcomWeb.ConnCase, async: true

  import Phoenix.ConnTest, only: [redirected_to: 2]

  alias DotcomWeb.Redirector
  alias DotcomWeb.Router.Helpers

  test "passes along the redirect path when 'to' is defined" do
    opts = [to: "my-path"]
    assert Redirector.init(opts) |> Map.get(:to) == "my-path"
  end

  test "an exception is raised when 'to' is not defined" do
    assert_raise RuntimeError, ~r(Missing required to: option in redirect), fn ->
      Redirector.init([])
    end
  end

  test "route redirected to internal route", %{conn: conn} do
    conn = call(conn, to: "/miami")

    assert redirected_to(conn, :moved_permanently) == "/miami"
  end

  test "route redirected to internal route drops path params by default", %{conn: conn} do
    conn = %{conn | path_params: %{"path_params" => ["food", "tapas"]}}

    conn = call(conn, to: "/miami")

    assert redirected_to(conn, :moved_permanently) == "/miami"
  end

  test "route redirected to internal route keeps path params if desired", %{
    conn: conn
  } do
    conn = %{conn | path_params: %{"path_params" => ["food", "tapas"]}}

    conn = call(conn, to: "/miami", keep_path_params: true)

    assert redirected_to(conn, :moved_permanently) == "/miami/food/tapas"
  end

  test "route redirected to internal route works if keep_path_params is true even when there are no path params",
       %{
         conn: conn
       } do
    conn = call(conn, to: "/miami", keep_path_params: true)

    assert redirected_to(conn, :moved_permanently) == "/miami"
  end

  test "route redirected to internal route with query string", %{conn: conn} do
    conn = %{conn | query_string: "food=tapas"}

    conn = call(conn, to: "/miami")
    assert redirected_to(conn, :moved_permanently) == "/miami?food=tapas"
  end

  test "route redirected to /events with a valid id in the params", %{conn: conn} do
    valid_fixture_id = "1"
    conn = %{conn | params: %{"id" => valid_fixture_id}}

    conn = call(conn, to: "/events")

    assert conn.halted == true

    assert redirected_to(conn, :moved_permanently) ==
             Helpers.event_path(conn, :show, ["3268"])
  end

  test "route redirected to /news with a valid id in the params", %{conn: conn} do
    valid_fixture_id = "1234"
    conn = %{conn | params: %{"id" => valid_fixture_id}}

    conn = call(conn, to: "/news")

    assert conn.halted == true

    assert redirected_to(conn, :moved_permanently) ==
             Helpers.news_entry_path(conn, :show, ["3519"])
  end

  test "route redirected with an invalid id renders a 404", %{conn: conn} do
    conn =
      conn
      |> Map.merge(%{params: %{"id" => "invalid"}})
      |> put_private(:phoenix_endpoint, DotcomWeb.Endpoint)

    conn = call(conn, to: "/news")

    assert conn.halted == true
    assert conn.status == 404
  end

  test "/projects are redirected even if they have an id", %{conn: conn} do
    conn =
      conn
      |> Map.merge(%{params: %{"id" => "12345"}})
      |> put_private(:phoenix_endpoint, DotcomWeb.Endpoint)

    conn = call(conn, to: "/projects")

    assert conn.halted == true
    assert redirected_to(conn, :moved_permanently) == "/projects"
  end

  defp call(conn, opts) do
    Redirector.call(
      conn,
      Redirector.init(opts)
    )
  end
end
