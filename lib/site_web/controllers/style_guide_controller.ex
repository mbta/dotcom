defmodule SiteWeb.StyleGuideController do
  @moduledoc """
  Defines the behavior of style guide requests.
  """
  use SiteWeb, :controller

  def index(conn, %{"section" => "content"}) do
    conn
    |> put_status(301)
    |> redirect(external: "https://zeroheight.com/2fedee66c/p/43fa10")
  end

  def index(conn, %{"section" => "components"}) do
    conn
    |> put_status(301)
    |> redirect(external: "https://zeroheight.com/2fedee66c/p/36e5cc")
  end

  def index(conn, params) when params == %{} do
    conn
    |> put_status(301)
    |> redirect(external: "https://zeroheight.com/2fedee66c")
  end

  def index(conn, _params) do
    SiteWeb.ControllerHelpers.render_404(conn)
  end

  def show(conn, %{"section" => "content"}), do: index(conn, %{"section" => "content"})
  def show(conn, %{"section" => "components"}), do: index(conn, %{"section" => "components"})
end
