defmodule DotcomWeb.Plugs.BannerMessageTest do
  @moduledoc false
  use DotcomWeb.ConnCase, async: true

  import DotcomWeb.Plugs.BannerMessage

  test "init" do
    assert %{} == init(%{})
  end

  describe "call" do
    test "assigns a test message in `call`", %{conn: conn} do
      conn =
        conn
        |> assign(:route, %{id: "Red"})
        |> call(message_key: :test_message, message: %{header: ["Header"], body: ["Body"]})

      assert %{header: ["Header"], body: ["Body"]} == conn.assigns.test_message
    end

    test "does not assign a test message in `call`", %{conn: conn} do
      conn = assign(conn, :route, %{id: "Red"})

      assigns = conn.assigns

      conn = call(conn, %{})

      assert conn.assigns == assigns
    end
  end
end
