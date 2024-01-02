defmodule SiteWeb.Plugs.LineSuspensionsTest do
  use SiteWeb.ConnCase
  import SiteWeb.Plugs.LineSuspensions

  defp mock_suspensions_fn do
    %{
      "route1" => [~N[2016-01-01T00:00:00], ~N[2016-02-01T00:00:00]],
      "route2" => [~N[2019-01-01T00:00:00], ~N[2019-02-01T00:00:00]],
      "route3" => [~N[2023-01-01T00:00:00], ~N[2023-02-01T00:00:00]]
    }
  end

  describe "call/2" do
    test "with no date_time, raises error", %{conn: conn} do
      assert_raise RuntimeError, "Please use this Plug after assigning :date_time", fn ->
        _updated_conn = call(conn, suspensions_fn: &mock_suspensions_fn/0)
      end
    end

    test "with a valid date_time assigned, uses that to assign line suspensions", %{conn: conn} do
      updated_conn =
        conn
        |> assign(:date_time, ~N[2016-01-22T00:00:00])
        |> call(suspensions_fn: &mock_suspensions_fn/0)

      assert updated_conn.assigns.line_suspensions
      assert Enum.count(updated_conn.assigns.line_suspensions) == 1
    end
  end
end
