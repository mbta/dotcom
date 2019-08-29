defmodule SiteWeb.TransitNearMeViewTest do
  use ExUnit.Case
  alias SiteWeb.TransitNearMeView

  test "render_react returns HTML" do
    assert {:safe, "<div class=\"m-tnm\"" <> _} =
             TransitNearMeView.render_react(%{
               conn: %{query_params: %{}},
               stops_json: [],
               map_data: %{markers: []}
             })
  end
end
