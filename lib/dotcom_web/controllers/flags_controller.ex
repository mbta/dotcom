defmodule DotcomWeb.FlagsController do
  @moduledoc """
  A view for the `/_flags` page. It supports three endpoints:
  - `/_flags`, which loads the existing feature flags
  - `/_flags/disable/:flag_id`, a POST that disables a feature flag and redirects back to `/_flags`
  - `/_flags/enable/:flag_id`, a POST that enables a feature flag and redirects back to `/_flags`
  """

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
