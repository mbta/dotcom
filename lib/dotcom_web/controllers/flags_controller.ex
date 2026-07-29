defmodule DotcomWeb.FlagsController do
  use DotcomWeb, :controller

  use Phoenix.VerifiedRoutes,
    endpoint: DotcomWeb.Endpoint,
    router: DotcomWeb.Router,
    statics: DotcomWeb.static_paths()

  def index(conn, _) do
    conn
    |> assign(:features, Laboratory.features(conn))
    |> render("index.html")
  end

  def disable(conn, %{"flag_id" => flag_id}) do
    conn
    |> Laboratory.disable_flag!(flag_id)
    |> redirect(to: ~p"/_flags")
  end

  def enable(conn, %{"flag_id" => flag_id}) do
    conn
    |> Laboratory.enable_flag!(flag_id)
    |> redirect(to: ~p"/_flags")
  end
end
