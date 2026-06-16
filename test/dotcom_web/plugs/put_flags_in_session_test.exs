defmodule DotcomWeb.Plugs.PutFlagsInSessionTest do
  use DotcomWeb.ConnCase, async: true

  import DotcomWeb.Plugs.PutFlagsInSession

  describe "Put Flags in Session Plug" do
    test "flag is false if it has not been set", %{conn: conn} do
      conn =
        conn
        |> Plug.Test.init_test_session(%{})
        |> fetch_session()
        |> bypass_through(DotcomWeb.Router, :get_flags)
        |> get("/")

      assert conn.assigns.test_flag == false
      assert conn.private.plug_session["test_flag"] == false
    end

    test "flag is true if it has been set", %{conn: conn} do
      conn =
        conn
        |> put_resp_cookie("test_flag", "true")
        |> Plug.Test.init_test_session(%{})
        |> fetch_session()
        |> bypass_through(DotcomWeb.Router, :get_flags)
        |> get("/")

      assert conn.assigns.test_flag == true
      assert conn.private.plug_session["test_flag"] == true
    end
  end
end
