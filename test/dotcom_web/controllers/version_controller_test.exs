defmodule DotcomWeb.VersionControllerTest do
  @moduledoc false
  use DotcomWeb.ConnCase

  @version Application.compile_env(:dotcom, :version)

  describe "version/2" do
    test "returns 200 with the configured version", %{conn: conn} do
      response = get(conn, version_path(conn, :version))
      assert response.status == 200
      assert response.resp_body == @version
      assert get_resp_header(response, "content-type") == ["text/plain; charset=utf-8"]
    end
  end
end
