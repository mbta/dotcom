defmodule SiteWeb.RedirectController do
  use SiteWeb, :controller

  def show(conn, %{"path" => path}) do
    redirect(conn, to: Path.join(["/" | path]))
  end
end
