defmodule DotcomWeb.ModeViewTest do
  @moduledoc false

  use ExUnit.Case, async: true

  import Mox
  import Phoenix.HTML, only: [safe_to_string: 1]

  alias DotcomWeb.ModeView
  alias Routes.Route

  setup :verify_on_exit!

  describe "mode_group_header/3" do
    test "renders an h2 if is_homepage? == false" do
      assert [{tag, _, _}] =
               :commuter_rail
               |> ModeView.mode_group_header("/schedules/commuter-rail", false)
               |> safe_to_string()
               |> Floki.parse_fragment!()
               |> Floki.find(".m-mode__name")

      assert tag == "h2"
    end

    test "renders an h3 if is_homepage? == true" do
      assert [{tag, _, _}] =
               :commuter_rail
               |> ModeView.mode_group_header("/schedules/commuter-rail", true)
               |> safe_to_string()
               |> Floki.parse_fragment!()
               |> Floki.find(".m-mode__name")

      assert tag == "h3"
    end

    test "sets name and link for mode" do
      modes = [
        {:bus, "Bus", "/schedules/bus"},
        {:commuter_rail, "Commuter Rail", "/schedules/commuter-rail"},
        {:subway, "Subway", "/schedules/subway"},
        {:ferry, "Ferry", "/schedules/ferry"},
        {:the_ride, "The RIDE", "/accessibility/the-ride"}
      ]

      for {mode, text, href} <- modes do
        document =
          mode
          |> ModeView.mode_group_header(href, false)
          |> safe_to_string()
          |> Floki.parse_document!()

        assert document
               |> Floki.find(".m-mode__header")
               |> Floki.find(".m-mode__name")
               |> Floki.text(deep: false)
               |> String.trim() == text

        assert document
               |> Floki.find(".m-mode__header #mode-header-link")
               |> Floki.attribute("href") ==
                 [href]

        view_all = Floki.find(document, ".m-mode__view-all")

        if mode === :bus do
          assert Floki.attribute(view_all, "href") == [href]
          assert Floki.text(view_all) == "View all bus routes"
        else
          assert view_all == []
        end
      end
    end
  end

  describe "has_alert?/1" do
    setup _ do
      stub_with(Dotcom.Utils.DateTime.Mock, Dotcom.Utils.DateTime)
      :ok
    end

    test "returns true if route has a current high-priority alert" do
      route_id = Faker.Internet.slug()

      expect(Alerts.Repo.Mock, :by_route_id_and_priority, fn ^route_id, :high ->
        Test.Support.Factories.Alerts.Alert.build_list(1, :alert_for_route,
          route_id: route_id,
          priority: :high
        )
        |> Enum.map(&Test.Support.Factories.Alerts.Alert.active_now/1)
      end)

      assert ModeView.has_alert?(route_id)
    end

    test "returns false if route has a future high-priority alert" do
      route_id = Faker.Internet.slug()

      expect(Alerts.Repo.Mock, :by_route_id_and_priority, fn ^route_id, :high ->
        Test.Support.Factories.Alerts.Alert.build_list(1, :alert_for_route,
          route_id: route_id,
          priority: :high
        )
        |> Enum.map(&Test.Support.Factories.Alerts.Alert.active_upcoming/1)
      end)

      refute ModeView.has_alert?(route_id)
    end

    test "returns false if route does not have such alert" do
      route_id = Faker.Internet.slug()

      expect(Alerts.Repo.Mock, :by_route_id_and_priority, fn ^route_id, :high ->
        []
      end)

      refute ModeView.has_alert?(route_id)
    end
  end

  describe "bus_filter_atom/1 and bus_filter_range/2" do
    @bus_routes [%Route{name: "SL1", id: "741"}, %Route{name: "CT1"}, %Route{name: "99"}]

    test "Silver Line and Cross Town" do
      assert [%Route{name: "SL1", id: "741"}] ==
               Enum.filter(@bus_routes, ModeView.bus_filter_atom(:sl))

      assert [%Route{name: "CT1"}] == Enum.filter(@bus_routes, ModeView.bus_filter_atom(:ct))
    end

    test "Numeric bus route" do
      assert [%Route{name: "99"}] == Enum.filter(@bus_routes, ModeView.bus_filter_range(1, 100))
      assert [] == Enum.filter(@bus_routes, ModeView.bus_filter_range(200, 299))
    end
  end
end
