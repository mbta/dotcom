defmodule DotcomWeb.StaticFileControllerTest do
  use DotcomWeb.ConnCase, async: false

  import Mox
  import Test.Support.EnvHelpers, only: [reassign_env: 3]

  setup :set_mox_global
  setup :verify_on_exit!

  describe "index/2" do
    @tag :skip
    test "forwards files from config:cms:drupal:cms_root" do
      expect(Req.Mock, :new, fn _ ->
        %Req.Request{}
      end)

      expect(Req.Mock, :get, fn _, [url: url] ->
        assert url == Application.get_env(:dotcom, :cms_api)[:base_url] <> "/path"

        {:ok, %Req.Response{status: 200, body: "file from drupal"}}
      end)

      conn = %{build_conn() | request_path: "/path"}
      response = DotcomWeb.StaticFileController.index(conn, [])
      assert response.status == 200
      assert response.resp_body == "file from drupal"
    end
  end

  describe "redirect_through_cdn/1" do
    test "redirects to the CDN rather than going to Drupal" do
      reassign_env(:dotcom, :is_prod_env?, true)

      path = "/path"
      conn = %{build_conn() | request_path: path}
      expected_url = static_url(DotcomWeb.Endpoint, path)
      response = DotcomWeb.StaticFileController.redirect_through_cdn(conn)
      assert redirected_to(response, 301) =~ expected_url
    end
  end
end
