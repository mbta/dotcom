defmodule SiteWeb.StaticFileControllerTest do
  use SiteWeb.ConnCase

  describe "index/2" do
    test "forwards files from config:cms:drupal:cms_root" do
      bypass = Bypass.open()
      set_drupal_root("http://localhost:#{bypass.port}")

      Bypass.expect(bypass, fn conn ->
        assert "/path" == conn.request_path
        Plug.Conn.resp(conn, 200, "file from drupal")
      end)

      conn = %{build_conn() | request_path: "/path"}
      response = SiteWeb.StaticFileController.index(conn, [])
      assert response.status == 200
      assert response.resp_body == "file from drupal"
    end
  end

  describe "redirect_through_cdn/1" do
    test "redirects to the CDN rather than going to Drupal" do
      path = "/path"
      conn = %{build_conn() | request_path: path}
      expected_url = static_url(SiteWeb.Endpoint, path)
      response = SiteWeb.StaticFileController.redirect_through_cdn(conn)
      assert redirected_to(response, 301) =~ expected_url
    end
  end

  defp set_drupal_root(new_domain) do
    old_config = Application.get_env(:dotcom, :drupal)

    new_config =
      case old_config do
        nil -> [cms_root: new_domain]
        keywordlist -> Keyword.put(keywordlist, :cms_root, new_domain)
      end

    Application.put_env(:dotcom, :drupal, new_config)

    on_exit(fn ->
      Application.put_env(:dotcom, :drupal, old_config)
    end)
  end
end
