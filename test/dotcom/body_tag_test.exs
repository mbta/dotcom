defmodule Dotcom.BodyTagTest do
  use ExUnit.Case, async: true

  import Dotcom.BodyTag
  import Phoenix.ConnTest, only: [build_conn: 0]
  import Phoenix.HTML, only: [safe_to_string: 1]
  import Plug.Conn, only: [put_req_header: 3]

  describe "render/1" do
    test "returns mticket if the requisite header is present" do
      conn = put_req_header(build_conn(), Application.get_env(:dotcom, Dotcom.BodyTag)[:mticket_header], "")

      assert safe_to_string(render(conn)) =~ "no-js mticket"
    end

    test "returns mticket if the site is called as mticket.mbtace.com" do
      conn = %{build_conn() | host: "mticket.mbtace.com"}

      assert safe_to_string(render(conn)) =~ "no-js mticket"
    end

    test "returns 'cms-preview' if page is loaded with CMS ?preview params" do
      conn = %{build_conn() | query_params: %{"preview" => nil, "vid" => "latest", "nid" => "6"}}

      assert safe_to_string(render(conn)) =~ "no-js cms-preview"
    end

    test "does not set 'cms-preview' class if page is loaded with missing CMS &nid param" do
      conn = %{build_conn() | query_params: %{"preview" => nil, "vid" => "latest"}}

      refute safe_to_string(render(conn)) =~ "no-js cms-preview"
    end
  end
end
