defmodule SiteWeb.ReducedFaresControllerTest do
  use SiteWeb.ConnCase

  @youth_pass_url "https://example.com/TEST-YOUTH-PASS-FORM-URL"

  test "renders a wrapper page with the requested form embedded in an iframe", %{conn: conn} do
    original_env = Application.get_env(:site, SiteWeb.ReducedFaresView)

    on_exit(fn ->
      Application.put_env(
        :site,
        SiteWeb.ReducedFaresView,
        original_env
      )
    end)

    Application.put_env(
      :site,
      SiteWeb.ReducedFaresView,
      reduced_fares_urls: Poison.encode!(%{"youth-pass" => @youth_pass_url})
    )

    conn = get(conn, "/reduced-fares/youth-pass")
    rendered = html_response(conn, 200)

    assert rendered =~ "iframe"
  end

  test "a request for an unknown form returns a 404", %{conn: conn} do
    original_env = Application.get_env(:site, SiteWeb.ReducedFaresView)

    on_exit(fn ->
      Application.put_env(
        :site,
        SiteWeb.ReducedFaresView,
        original_env
      )
    end)

    Application.put_env(
      :site,
      SiteWeb.ReducedFaresView,
      reduced_fares_urls: Poison.encode!(%{"youth-pass" => @youth_pass_url})
    )

    conn = get(conn, "/reduced-fares/unknown-form")

    assert html_response(conn, 404)
  end
end
