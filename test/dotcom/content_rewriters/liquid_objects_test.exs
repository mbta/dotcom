defmodule Dotcom.ContentRewriters.LiquidObjectsTest do
  use ExUnit.Case, async: true

  import Dotcom.ContentRewriters.LiquidObjects
  import DotcomWeb.PartialView.SvgIconWithCircle, only: [svg_icon_with_circle: 1]
  import DotcomWeb.ViewHelpers, only: [fa: 1, svg: 1]
  import Mox
  import Phoenix.HTML, only: [safe_to_string: 1]

  alias DotcomWeb.PartialView.SvgIconWithCircle
  alias Fares.Format
  alias Fares.Repo

  setup :verify_on_exit!

  describe "replace/1" do
    test "it replaces fa- prefixed objects" do
      assert replace(~s(fa "xyz")) == safe_to_string(fa("xyz"))
      assert replace(~s(fa "abc")) == safe_to_string(fa("abc"))
    end

    test "it replaces an mbta icon" do
      assert replace(~s(mbta-circle-icon "subway")) == make_svg(:subway)
      assert replace(~s(mbta-circle-icon "commuter-rail")) == make_svg(:commuter_rail)
      assert replace(~s(mbta-circle-icon "bus")) == make_svg(:bus)
      assert replace(~s(mbta-circle-icon "ferry")) == make_svg(:ferry)
      assert replace(~s(mbta-circle-icon "t-logo")) == make_t_logo()
      assert replace(~s(mbta-circle-icon "subway-red")) == make_svg(:red_line)
      assert replace(~s(icon:subway-mattapan)) == make_svg(:mattapan_line)
      assert replace(~s(mbta-circle-icon "subway-orange")) == make_svg(:orange_line)
      assert replace(~s(mbta-circle-icon "subway-blue")) == make_svg(:blue_line)
      assert replace(~s(mbta-circle-icon "subway-green")) == make_svg(:green_line)
      assert replace(~s(mbta-circle-icon "subway-green-b")) == make_svg(:green_line_b)
      assert replace(~s(mbta-circle-icon "subway-green-c")) == make_svg(:green_line_c)
      assert replace(~s(mbta-circle-icon "subway-green-d")) == make_svg(:green_line_d)
      assert replace(~s(mbta-circle-icon "subway-green-e")) == make_svg(:green_line_e)
      assert replace(~s(mbta-circle-icon "silver-line")) == make_svg(:silver_line)
      assert replace(~s(mbta-circle-icon "the-ride")) == make_svg(:the_ride)
      assert replace(~s(icon:accessible)) == make_svg(:access)
      assert replace(~s(icon:parking)) == make_svg(:parking_lot)
      assert replace(~s(icon:service-regular)) == make_svg(:service_regular)
      assert replace(~s(icon:service-storm)) == make_svg(:service_storm)
      assert replace(~s(icon:service-none)) == make_svg(:service_none)
    end

    test "it handles unknown mbta icons" do
      assert replace(~s(mbta-circle-icon "foobar")) == ~s({{ unknown icon "foobar" }})
    end

    test "it replaces an app badge" do
      assert replace(~s(app-badge "apple")) == safe_to_string(svg("badge-apple-store.svg"))
      assert replace(~s(app-badge "google")) == safe_to_string(svg("badge-google-play.svg"))
    end

    test "it handles unknown badges" do
      assert replace(~s(app-badge "foobar")) == ~s({{ unknown app badge "foobar" }})
    end

    test "it handles good fare requests" do
      results =
        Repo.all(name: :local_bus, includes_media: :cash, reduced: nil, duration: :single_trip)

      assert replace(~s(fare:local_bus:cash)) == results |> List.first() |> Format.price()
    end

    test "it handles reduced fare requests for the RIDE" do
      ada = replace(~s(fare:ada_ride))
      ada_reduced = replace(~s(fare:ada_ride:reduced))
      assert ada
      assert ada_reduced
      assert ada != ada_reduced
    end

    test "it handles bad fare requests" do
      assert replace(~s(fare:spaceship)) ==
               ~s({{ fare:<span class="text-danger">spaceship</span> }})

      assert replace(~s(fare:cash)) ==
               ~s({{ <span class="text-danger">missing mode/name</span> fare:cash }})
    end

    test "it handles route requests" do
      route_id = Faker.Internet.slug()
      route_name = Faker.App.name()
      expect(Routes.Repo.Mock, :get, fn ^route_id -> %Routes.Route{long_name: route_name} end)
      assert replace(~s(route:#{route_id})) == route_name
    end

    test "it returns a liquid object when not otherwise handled" do
      assert replace("something-else") == "{{ something-else }}"
    end
  end

  defp make_svg(mode) do
    %SvgIconWithCircle{icon: mode}
    |> svg_icon_with_circle()
    |> safe_to_string()
  end

  defp make_t_logo do
    %SvgIconWithCircle{icon: :t_logo}
    |> svg_icon_with_circle()
    |> safe_to_string()
  end
end
