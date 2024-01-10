defmodule DotcomWeb.HealthControllerTest do
  @moduledoc false
  use DotcomWeb.ConnCase

  describe "index/2" do
    test "returns 200 with no content", %{conn: conn} do
      response = get(conn, health_path(conn, :index))
      assert response.status == 200
      assert response.resp_body == ""
    end
  end
end
