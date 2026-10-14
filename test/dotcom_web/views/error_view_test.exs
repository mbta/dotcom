defmodule DotcomWeb.ErrorViewTest do
  use DotcomWeb.ConnCase, async: false

  import Phoenix.View, only: [render_to_string: 3]
  import Phoenix.Controller

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

  test "root layout renders when locale has not been assigned", %{conn: conn} do
    conn =
      conn
      |> put_private(:phoenix_endpoint, DotcomWeb.Endpoint)
      |> put_private(:phoenix_view, %{_: DotcomWeb.ErrorView})
      |> put_private(:phoenix_template, "500.html")

    assert render_to_string(DotcomWeb.LayoutView, "root.html",
             conn: conn,
             inner_content: "Something went wrong on our end."
           ) =~ ~s(<html lang="en">)
  end
end
