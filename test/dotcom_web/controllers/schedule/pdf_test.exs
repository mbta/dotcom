defmodule DotcomWeb.ScheduleController.PdfTest do
  use DotcomWeb.ConnCase, async: true

  describe "pdf/2" do
    test "redirects to PDF for route when present", %{conn: conn} do
      expected_path = "/sites/default/files/route_pdfs/route087.pdf"

      conn = get(conn, route_pdf_path(conn, :pdf, "87"), date: Date.to_iso8601(~D[2018-01-01]))

      assert redirected_to(conn, 302) == static_url(DotcomWeb.Endpoint, expected_path)
    end

    test "renders 404 if we have no pdfs for the route", %{conn: conn} do
      conn = get(conn, route_pdf_path(conn, :pdf, "nonexistent"))

      assert html_response(conn, 404)
    end

    test "cleanly handles errors from the api", %{conn: conn} do
      conn = get(conn, route_pdf_path(conn, :pdf, "error"))

      assert html_response(conn, 404)
    end
  end
end
