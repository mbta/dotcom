defmodule SiteWeb.StyleGuideController do
  use SiteWeb, :controller

  def index(conn, %{"section" => "content"}) do
    redirect(conn, to: "/cms/content-style-guide")
  end

  def index(conn, %{"section" => "components"}) do
    conn
    |> put_status(301)
    |> redirect(
      external:
        "https://projects.invisionapp.com/dsm/mbta-customer-technology/digital-style-guide"
    )
  end

  def index(conn, params) when params == %{} do
    conn
    |> put_layout("style_guide.html")
    |> render("index.html")
  end

  def index(conn, _params) do
    SiteWeb.ControllerHelpers.render_404(conn)
  end

  def show(conn, %{"section" => "content"}), do: index(conn, %{"section" => "content"})
  def show(conn, %{"section" => "components"}), do: index(conn, %{"section" => "components"})
end
