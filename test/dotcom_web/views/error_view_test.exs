defmodule DotcomWeb.ErrorViewTest do
  use DotcomWeb.ConnCase, async: false

  import Phoenix.Controller
  import Phoenix.View, only: [render_to_string: 3]

  test "renders 404.html", %{conn: conn} do
    assert render_to_string(DotcomWeb.ErrorView, "404.html", conn: conn) =~
             "Sorry! We missed your stop."
  end

  test "render 500.html", %{conn: conn} do
    assert render_to_string(DotcomWeb.ErrorView, "500.html", conn: conn) =~
             "Something went wrong on our end."
  end

  test "render any other", %{conn: conn} do
    assert render_to_string(DotcomWeb.ErrorView, "505.html", conn: conn) =~
             "Something went wrong on our end."
  end

  test "render 500.html with a layout", %{conn: conn} do
    # mimick the pipeline RenderErrors
    conn =
      conn
      |> accepts(["html"])
      |> put_private(:phoenix_endpoint, DotcomWeb.Endpoint)
      |> put_view(DotcomWeb.ErrorView)
      |> put_status(500)

    conn = render(conn, :"500", conn: conn)

    assert html_response(conn, 500) =~ "Something went wrong on our end."
  end
end
