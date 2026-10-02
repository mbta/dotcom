defmodule DotcomWeb.VersionControllerTest do
  @moduledoc false
  use DotcomWeb.ConnCase

  describe "version/2" do
    test "returns 200 with the configured version", %{conn: conn} do
      version = Application.get_env(:dotcom, :version)

      response = get(conn, version_path(conn, :version))
      assert response.status == 200
      assert response.resp_body == version
      assert get_resp_header(response, "content-type") == ["text/plain; charset=utf-8"]
    end
  end
end
