defmodule DotcomWeb.RedirectController do
  use DotcomWeb, :controller

  def show(conn, %{"path" => path}) do
    redirect(conn, to: Path.join(["/" | path]))
  end
end
