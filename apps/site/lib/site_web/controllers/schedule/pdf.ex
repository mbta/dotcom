defmodule SiteWeb.ScheduleController.Pdf do
  @moduledoc """
  For getting all the pdfs associated with a route from the CMS.

  The pdf action redirects to the first up-to-date pdf if one exists,
  or the first upcoming pdf if necessary.
  """

  use SiteWeb, :controller

  alias CMS.Partial.RoutePdf

  plug(SiteWeb.ScheduleController.RoutePdfs)

  def pdf(%Plug.Conn{assigns: %{route_pdfs: pdfs}} = conn, _params) do
    case pdfs do
      [] ->
        render_404(conn)

      [%RoutePdf{path: path} | _] ->
        redirect(conn, external: static_url(SiteWeb.Endpoint, path))
    end
  end
end
