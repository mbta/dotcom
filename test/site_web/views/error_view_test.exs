defmodule SiteWeb.ErrorViewTest do
  use SiteWeb.ConnCase, async: false

  import Phoenix.View, only: [render_to_string: 3]
  import Phoenix.Controller

  test "adds 'not-found' to body class on 404 pages" do
    conn = get(default_conn(), "/not-found")
    assert html_response(conn, 404) =~ "not-found"
  end

  test "renders 404.html", %{conn: conn} do
    assert render_to_string(SiteWeb.ErrorView, "404.html", conn: conn) =~
             "Sorry! We missed your stop."
  end

  test "render 500.html", %{conn: conn} do
    assert render_to_string(SiteWeb.ErrorView, "500.html", conn: conn) =~
             "Something went wrong on our end."
  end

  test "render any other", %{conn: conn} do
    assert render_to_string(SiteWeb.ErrorView, "505.html", conn: conn) =~
             "Something went wrong on our end."
  end

  test "render 500.html with a layout", %{conn: conn} do
    # mimick the pipeline RenderErrors
    conn =
      conn
      |> accepts(["html"])
      |> put_private(:phoenix_endpoint, SiteWeb.Endpoint)
      |> put_layout({SiteWeb.LayoutView, "app.html"})
      |> put_view(SiteWeb.ErrorView)
      |> put_status(500)

    conn = render(conn, :"500", conn: conn)

    assert html_response(conn, 500) =~ "Something went wrong on our end."
  end
end
