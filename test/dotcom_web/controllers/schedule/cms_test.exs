defmodule DotcomWeb.ScheduleController.CMSTest do
  use DotcomWeb.ConnCase

  alias CMS.Partial.Teaser
  alias DotcomWeb.ScheduleController.CMS
  alias Plug.Conn
  alias Routes.Route
  alias DotcomWeb.Utils.AsyncAssign

  describe "call/1" do
    test "assigns CMS content to conn", %{conn: conn} do
      conn =
        conn
        |> Conn.assign(:route, %Route{id: "Red", type: 1})
        |> CMS.call([])
        |> AsyncAssign.await_assign_all_default(__MODULE__)

      assert [%Teaser{} = teaser] = conn.assigns.featured_content
      assert %URI{query: query} = URI.parse(teaser.path)

      assert URI.decode_query(query) == %{
               "utm_campaign" => "curated-content",
               "utm_content" => "Green Line D Track and Signal Replacement",
               "utm_medium" => "project",
               "utm_source" => "schedule",
               "utm_term" => "subway"
             }

      assert [news | _] = conn.assigns.news
      assert %Teaser{} = news
      assert %URI{query: query} = URI.parse(news.path)

      assert URI.decode_query(query) == %{
               "utm_campaign" => "curated-content",
               "utm_content" => "MBTA Awards Signal Upgrade Contract for Red and Orange Lines",
               "utm_medium" => "news",
               "utm_source" => "schedule",
               "utm_term" => "subway"
             }

      assert Enum.count(conn.assigns.news) <= 5
    end
  end
end
