defmodule SiteWeb.Plugs.GlxNowOpenTest do
  use SiteWeb.ConnCase, async: true

  import SiteWeb.Plugs.GlxNowOpen

  defp now_before_fn do
    DateTime.from_naive!(~N[2022-03-21 00:00:00], "Etc/UTC")
  end

  defp now_between_fn do
    DateTime.from_naive!(~N[2022-03-21 04:55:00], "Etc/UTC")
  end

  defp now_after_fn do
    DateTime.from_naive!(~N[2022-06-21 04:55:00], "Etc/UTC")
  end

  describe "init/1" do
    test "defaults to Util.now/0" do
      assert init([]) == [now_fn: &Util.now/0]
    end
  end

  describe "call/2" do
    test "assigns glx_now_open? with false if current date is before opening date", %{conn: conn} do
      updated_conn = call(conn, now_fn: &now_before_fn/0)

      assert updated_conn.assigns.glx_now_open? == false
    end

    test "assigns glx_now_open? with true if current date is between opening date and 3 months post opening",
         %{conn: conn} do
      updated_conn = call(conn, now_fn: &now_between_fn/0)

      assert updated_conn.assigns.glx_now_open? == true
    end

    test "assigns glx_now_open? with false if current date is after 3 months post opening date",
         %{conn: conn} do
      updated_conn = call(conn, now_fn: &now_after_fn/0)

      assert updated_conn.assigns.glx_now_open? == false
    end
  end
end
