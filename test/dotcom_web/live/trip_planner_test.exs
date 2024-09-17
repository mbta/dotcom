defmodule DotcomWeb.Live.TripPlannerTest do
  use DotcomWeb.ConnCase, async: true

  import Phoenix.LiveViewTest

  test "Preview version behind basic auth", %{conn: conn} do
    conn = get(conn, ~p"/preview/trip-planner")

    {_header_name, header_value} = List.keyfind(conn.resp_headers, "www-authenticate", 0)
    assert conn.status == 401
    assert header_value =~ "Basic"
  end

  describe "Trip Planner" do
    setup %{conn: conn} do
      [username: username, password: password] =
        Application.get_env(:dotcom, DotcomWeb.Router)[:basic_auth]

      {:ok, view, html} =
        conn
        |> put_req_header("authorization", "Basic " <> Base.encode64("#{username}:#{password}"))
        |> live(~p"/preview/trip-planner")

      %{html: html, view: view}
    end

    test "toggles the date input when changing from 'now'", %{html: html, view: view} do
      date_input = ~s(name="input_form[datetime]")
      refute html =~ date_input

      html =
        view
        |> element("input[value=arrive_by]")
        |> render_click()

      assert html =~ date_input

      html =
        view
        |> element("input[value=now]")
        |> render_click()

      refute html =~ date_input
    end

    test "summarizes the selected modes", %{view: view, html: html} do
      assert html =~ "All modes"

      html =
        view
        |> element("form")
        |> render_change(%{
          _target: ["input_form", "modes"],
          input_form: %{modes: [:commuter_rail, :subway, :ferry]}
        })

      assert html =~ "Commuter Rail, Subway, and Ferry"

      html =
        view
        |> element("form")
        |> render_change(%{_target: ["input_form", "modes"], input_form: %{modes: [:subway]}})

      assert html =~ "Subway Only"

      html =
        view
        |> element("form")
        |> render_change(%{
          _target: ["input_form", "modes"],
          input_form: %{modes: [:subway, :bus]}
        })

      assert html =~ "Subway and Bus"
    end

    test "shows errors on form submit", %{view: view} do
      html =
        view
        |> element("form")
        |> render_submit()

      assert html =~ "Please add a destination."
    end

    test "pushes updated location to the map", %{view: view} do
      updated_location = %{
        "latitude" => Faker.Address.latitude(),
        "longitude" => Faker.Address.longitude(),
        "name" => Faker.Company.name()
      }

      id = Faker.Internet.slug()

      view
      |> render_hook(:map_change, Map.put_new(updated_location, "id", id))

      assert_push_event(view, ^id, ^updated_location)
    end
  end
end
