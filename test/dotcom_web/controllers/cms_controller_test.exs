defmodule DotcomWeb.CMSControllerTest do
  use DotcomWeb.ConnCase, async: false
  import Mox

  alias Plug.Conn

  setup :verify_on_exit!

  setup do
    stub(Alerts.Repo.Mock, :all, fn _ ->
      []
    end)

    :ok
  end

  describe "GET - page" do
    test "renders a basic page when the CMS returns a CMS.Page.Basic", %{conn: conn} do
      conn = get(conn, "/basic_page_no_sidebar")
      rendered = html_response(conn, 200)
      assert rendered =~ "Arts on the T"
    end

    test "renders a project page when the CMS returns a CMS.Page.Project", %{conn: conn} do
      conn = get(conn, "/projects/project-with-paragraphs")
      rendered = html_response(conn, 200)
      assert rendered =~ "page-section project-hero-image"
    end

    @tag :external
    test "renders an update page when the CMS returns a CMS.Page.ProjectUpdate with paragraphs",
         %{conn: conn} do
      conn = get(conn, "/projects/project-name/update/update-with-paragraphs")
      rendered = html_response(conn, 200)
      assert rendered =~ "<p>Here is a custom HTML para.</p>"
    end

    @tag :external
    test "renders an update page even when host project is redirected (update with paragraphs)",
         %{conn: conn} do
      conn = get(conn, "/projects/redirected-project/update/update-with-paragraphs")
      rendered = html_response(conn, 200)
      assert rendered =~ "<p>Here is a custom HTML para.</p>"
    end

    test "redirects with correct status code when CMS returns a native redirect for an update",
         %{conn: conn} do
      conn = get(conn, "/projects/project-name/update/redirected-update-with-paragraphs")
      assert conn.status == 301

      assert Conn.get_resp_header(conn, "location") == [
               "/projects/project-name/update/update-with-paragraphs"
             ]
    end

    test "renders a 404 when project update exists but project does not exist", %{conn: conn} do
      path = "/projects/DNE/update/update-no-project-with-paragraphs"

      conn = get(conn, path)
      assert conn.status == 404
    end

    test "given special preview query params, return certain revision of node", %{conn: conn} do
      conn = get(conn, "/basic_page_no_sidebar?preview&vid=112&nid=6")
      assert html_response(conn, 200) =~ "Arts on the T 112"
    end

    test "returns a 404 if the given node is missing", %{conn: conn} do
      conn =
        get(
          conn,
          "/basic_page_no_sidebar?preview&vid=112&nid=#{Faker.random_between(9000, 9999)}"
        )

      assert html_response(conn, 404)
    end

    test "renders a basic page without sidebar", %{conn: conn} do
      conn = get(conn, "/basic_page_no_sidebar")
      rendered = html_response(conn, 200)

      assert rendered =~
               "The MBTA permits musical performances at a number of subway stations in metro Boston"

      assert rendered =~ ~s(c-cms--no-sidebar)
    end

    test "renders and does not redirect an unaliased basic page response", %{conn: conn} do
      conn = get(conn, "/node/3183")
      rendered = html_response(conn, 200)

      assert rendered =~
               "The MBTA works with local communities and leaders to ensure that all MBTA waste is managed"
    end

    test "renders a basic page with sidebar", %{conn: conn} do
      conn = get(conn, "/basic_page_with_sidebar")
      rendered = html_response(conn, 200)

      assert rendered =~ "Fenway Park"
      refute rendered =~ ~s(class="page-narrow")
    end

    test "renders a landing page with all its paragraphs", %{conn: conn} do
      conn = get(conn, "/landing_page_with_all_paragraphs")
      rendered = html_response(conn, 200)

      assert rendered =~ ~s(<h1 class="landing-page-title">Paragraphs Guide</h1>)

      assert rendered =~
               ~s(<div class="c-title-card__title c-title-card--link__title">Example Card 1</div>)
    end

    test "renders a person page", %{conn: conn} do
      conn = get(conn, "/person")
      assert html_response(conn, 200) =~ "<h1>Joseph Aiello</h1>"
    end

    test "redirects a raw, ID-based news entry path when it has a CMS alias", %{conn: conn} do
      conn = get(conn, "/node/3518")
      assert conn.status == 301
    end

    test "renders and does not redirect an unaliased news entry response", %{conn: conn} do
      conn = get(conn, "/node/3519")
      assert html_response(conn, 200) =~ "New Early Morning Bus Routes Begin April 1"
    end

    test "redirects a raw, ID-based event path when it has a CMS alias", %{conn: conn} do
      conn = get(conn, "/node/3458")
      assert conn.status == 301
    end

    test "renders and does not redirect an unaliased event response", %{conn: conn} do
      conn = get(conn, "/node/3268")

      assert html_response(conn, 200) =~
               "https://livestream.com/accounts/20617794/events/8130069/"
    end

    test "redirects a raw, ID-based project path when it has a CMS alias", %{conn: conn} do
      conn = get(conn, "/node/3480")
      assert conn.status == 301
    end

    test "renders and does not redirect an unaliased project response", %{conn: conn} do
      conn = get(conn, "/node/3004")

      assert html_response(conn, 200) =~
               "<title>Wollaston Station Improvements | Projects | MBTA</title>"
    end

    test "redirects a raw, ID-based project update path when it has a CMS alias", %{conn: conn} do
      conn = get(conn, "/node/3174")
      assert conn.status == 301
    end

    test "renders and does not redirect an unaliased project update response", %{conn: conn} do
      conn = get(conn, "/node/3005")
      assert html_response(conn, 200) =~ "What's the bus shuttle schedule?</h2>"
    end

    test "renders the page even though alias does not match expected route", %{conn: conn} do
      conn = get(conn, "/porjects/project-name")

      assert html_response(conn, 200) =~
               "<p>Travel between Boston and Chelsea will be easier and faster"
    end

    test "redirects when content type is a redirect", %{conn: conn} do
      conn = get(conn, "/redirect_node")
      assert html_response(conn, 302) =~ "www.google.com"
    end

    test "redirects when content type is redirect & has query param that needs encoding", %{
      conn: conn
    } do
      conn = get(conn, "/redirect_node_with_query?id=5")
      assert html_response(conn, 302) =~ "google.com"
    end

    test "redirects when content type is redirect & has query param that doesn't need encoding",
         %{conn: conn} do
      conn = get(conn, "/redirect_node_with_query?id=6")
      assert html_response(conn, 302) =~ "google.com"
    end

    test "retains params (except _format) and redirects when CMS returns a native redirect", %{
      conn: conn
    } do
      conn = get(conn, "/redirected-url?preview&vid=latest")
      assert conn.status == 302
      assert Conn.get_resp_header(conn, "location") == ["/different-url?preview=&vid="]
    end

    test "renders a 404 when the CMS does not return any content", %{conn: conn} do
      conn = get(conn, "/unknown-path-for-content")
      assert html_response(conn, 404)
    end

    test "renders 500 page with status code 503 when Drupal times out", %{conn: conn} do
      conn = get(conn, "/timeout")
      assert conn.status == 500

      assert html_response(conn, 500) =~ "Something went wrong on our end."
    end
  end
end
