defmodule SiteWeb.FareController.OriginDestinationTest do
  use SiteWeb.ConnCase, async: true

  alias SiteWeb.FareController.OriginDestinationFareBehavior, as: ODFB

  describe "before_render/2" do
    test "assigns relevant information", %{conn: conn} do
      module = SiteWeb.FareController.Ferry
      conn = ODFB.before_render(conn, module)

      for key <- ~w(mode route_type origin_stops destination_stops key_stops origin destination)a do
        assert Map.has_key?(conn.assigns, key)
      end
    end
  end

  describe "guess_destination/2" do
    @origin %Stops.Stop{id: 0, name: "Initial Stop"}
    @dest %Stops.Stop{id: 1, name: "Final Stop"}

    test "Destination returned if only one possibility" do
      assert ODFB.guess_destination(nil, [@origin, @dest]) == @dest
    end

    test "Destination not altered if one is given" do
      alternative_dest = %Stops.Stop{id: 2, name: "Alt"}
      assert ODFB.guess_destination(alternative_dest, [@origin, @dest]) == alternative_dest
    end

    test "destination is not guessed if there is not a single possibility" do
      existing_dest = %Stops.Stop{id: 3, name: "Existing"}
      additional_dest = %Stops.Stop{id: 4, name: "Additional"}
      assert ODFB.guess_destination(nil, [@origin, @dest, additional_dest]) == nil
      assert ODFB.guess_destination(nil, []) == nil
      assert ODFB.guess_destination(existing_dest, []) == existing_dest
    end
  end
end
