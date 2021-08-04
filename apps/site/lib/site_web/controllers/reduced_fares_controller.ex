defmodule SiteWeb.ReducedFaresController do
  @moduledoc """
  Embed a Reduced Fares form served by SimpliGov in an iframe that fills the entire viewport.
  """
  use SiteWeb, :controller

  plug(:put_layout, "wrapper.html")

  def show(conn, %{"form" => "youth-pass"}) do
    render(conn, "show.html")
  end

  def show(conn, _params) do
    SiteWeb.ControllerHelpers.render_404(conn)
  end
end
