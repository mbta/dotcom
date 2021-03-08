defmodule SiteWeb.Plugs.YearMonthTest do
  @moduledoc false
  use SiteWeb.ConnCase, async: true
  import SiteWeb.Plugs.YearMonth

  @assigned_date ~D[2020-07-17]

  describe "call/2" do
    setup %{conn: conn} do
      conn = conn |> assign(:date, @assigned_date)
      {:ok, conn: conn}
    end

    test "basic assigns", %{conn: conn} do
      conn =
        conn
        |> with_query_params(%{
          "year" => "2019",
          "month" => "4"
        })
        |> call([])

      assert %{year: 2019, month: 4} = conn.assigns
    end

    test "defaults to current", %{conn: conn} do
      conn = conn |> call([])
      %{year: year, month: month} = conn.assigns
      assert ^year = @assigned_date.year
      assert ^month = @assigned_date.month
    end

    test "defaults if invalid params", %{conn: conn} do
      conn =
        conn
        |> with_query_params(%{
          "year" => "2019",
          "month" => "40"
        })
        |> call([])

      %{year: year, month: month} = conn.assigns
      assert 2019 = year
      assert ^month = @assigned_date.month

      conn =
        conn
        |> with_query_params(%{
          "year" => "20330201",
          "month" => "8"
        })
        |> call([])

      %{year: year, month: month} = conn.assigns
      assert ^year = @assigned_date.year
      assert 8 = month
    end
  end

  defp with_query_params(conn, map) do
    %{conn | query_params: map}
  end
end
