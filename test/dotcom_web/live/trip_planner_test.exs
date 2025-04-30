defmodule DotcomWeb.Live.TripPlannerTest do
  use DotcomWeb.ConnCase, async: true

  import DotcomWeb.Router.Helpers, only: [live_path: 2]
  import Mox
  import Phoenix.LiveViewTest
  import OpenTripPlannerClient.Test.Support.Factory

  alias Dotcom.TripPlan.AntiCorruptionLayer

  setup :verify_on_exit!

  @valid_params %{
    "from" => %{
      "latitude" => Faker.Address.latitude() |> Float.to_string(),
      "longitude" => Faker.Address.longitude() |> Float.to_string(),
      "name" => Faker.Address.street_name(),
      "stop_id" => ""
    },
    "to" => %{
      "latitude" => Faker.Address.latitude() |> Float.to_string(),
      "longitude" => Faker.Address.longitude() |> Float.to_string(),
      "name" => Faker.Address.street_name(),
      "stop_id" => ""
    }
  }

  describe "mount" do
    test "setting no params redirects to a plan of defaults", %{conn: conn} do
      # Setup
      path = live_path(conn, DotcomWeb.Live.TripPlanner)

      # Exercise
      {:error, {:live_redirect, %{to: url}}} = live(conn, path)

      new_params =
        url
        |> decode_params()
        |> MapSet.new()

      default_params = AntiCorruptionLayer.default_params() |> MapSet.new()

      # Verify
      assert MapSet.intersection(new_params, default_params) == default_params
    end

    test "setting old params redirects to a plan of matching new params", %{conn: conn} do
      # Setup
      query =
        %{
          "plan[from]" => Kernel.get_in(@valid_params, ["from", "name"]),
          "plan[from_latitude]" => Kernel.get_in(@valid_params, ["from", "latitude"]),
          "plan[from_longitude]" => Kernel.get_in(@valid_params, ["from", "longitude"]),
          "plan[to]" => Kernel.get_in(@valid_params, ["to", "name"]),
          "plan[to_latitude]" => Kernel.get_in(@valid_params, ["to", "latitude"]),
          "plan[to_longitude]" => Kernel.get_in(@valid_params, ["to", "longitude"])
        }
        |> URI.encode_query()

      path = live_path(conn, DotcomWeb.Live.TripPlanner) <> "?#{query}"

      # Exercise
      {:error, {:live_redirect, %{to: url}}} = live(conn, path)

      new_params =
        url
        |> decode_params()
        |> MapSet.new()

      valid_params = MapSet.new(@valid_params)

      # Verify
      assert MapSet.intersection(new_params, valid_params) == valid_params
    end
  end

  describe "inputs" do
    setup %{conn: conn} do
      stub(MBTA.Api.Mock, :get_json, fn "/schedules/", _ ->
        %JsonApi{}
      end)

      {:error, {:live_redirect, %{to: url}}} =
        live(conn, live_path(conn, DotcomWeb.Live.TripPlanner))

      {:ok, view, _} = live(conn, url)

      %{view: view}
    end

    test "setting 'from' places a pin on the map", %{view: view} do
      # Setup
      params = Map.take(@valid_params, ["from"])

      # Exercise
      view |> element("form") |> render_change(%{"input_form" => params})

      # Verify
      document = render(view) |> Floki.parse_document!()

      assert Floki.get_by_id(document, "mbta-metro-pin-0")
    end

    test "setting 'to' places a pin on the map", %{view: view} do
      # Setup
      params = Map.take(@valid_params, ["to"])

      # Exercise
      view |> element("form") |> render_change(%{"input_form" => params})

      # Verify
      document = render(view) |> Floki.parse_document!()

      assert Floki.get_by_id(document, "mbta-metro-pin-1")
    end

    test "swapping from/to swaps pins on the map", %{view: view} do
      # Setup
      stub(OpenTripPlannerClient.Mock, :plan, fn _ -> {:ok, []} end)

      # Exercise
      view |> element("form") |> render_change(%{"input_form" => @valid_params})

      view
      |> element("button[phx-click='swap_direction']")
      |> render_click()

      # Verify
      document = render(view) |> Floki.parse_document!()

      pins =
        Enum.map(["mbta-metro-pin-0", "mbta-metro-pin-1"], fn id ->
          Floki.get_by_id(document, id)
          |> Floki.attribute("data-coordinates")
          |> List.first()
          |> parse_coordinates()
        end)

      assert pins == [
               [@valid_params["to"]["longitude"], @valid_params["to"]["latitude"]],
               [@valid_params["from"]["longitude"], @valid_params["from"]["latitude"]]
             ]
    end

    test "disabled swap with invalid from/to", %{view: view} do
      # Setup
      stub(OpenTripPlannerClient.Mock, :plan, fn _ -> {:ok, []} end)

      params = Map.take(@valid_params, ["from"]) |> Map.put("to", %{"name" => Faker.Cat.breed()})

      # Exercise
      view |> element("form") |> render_change(%{"input_form" => params})

      swap_button = element(view, "button[phx-click='swap_direction']") |> render()

      # Verify
      assert swap_button =~ "disabled=\"disabled\""
    end

    test "selecting a time other than 'now' shows the datepicker", %{view: view} do
      # Setup
      params = %{
        "datetime_type" => "depart_at"
      }

      # Exercise
      view |> element("form") |> render_change(%{"input_form" => params})

      # Verify
      document = render(view) |> Floki.parse_document!()

      assert Floki.get_by_id(document, "date-picker")
    end

    test "selecting 'now' after selecting another time hides the datepicker", %{view: view} do
      # Setup
      open_params = %{
        "datetime_type" => "depart_at"
      }

      closed_params = %{
        "datetime_type" => "now"
      }

      # Exercise
      view |> element("form") |> render_change(%{"input_form" => open_params})
      view |> element("form") |> render_change(%{"input_form" => closed_params})

      # Verify
      document = render(view) |> Floki.parse_document!()

      refute Floki.get_by_id(document, "date-picker")
    end

    test "setting 'from' and 'to' to the same location shows an error message", %{view: view} do
      # Setup
      params = Map.put(@valid_params, "to", Map.get(@valid_params, "from"))

      # Exercise
      view |> element("form") |> render_change(%{"input_form" => params})

      # Verify
      document = render(view)

      assert document =~ "Please select a destination at a different location from the origin."
    end

    test "an OTP connection error shows up as an error message", %{view: view} do
      # Setup
      expect(OpenTripPlannerClient.Mock, :plan, fn _ ->
        {:error, %Req.TransportError{reason: :econnrefused}}
      end)

      # Exercise
      view |> element("form") |> render_change(%{"input_form" => @valid_params})

      document = render_async(view)

      assert document =~
               Application.get_env(
                 :open_trip_planner_client,
                 :fallback_error_message
               )
    end

    test "an OTP error shows up as an error message", %{view: view} do
      # Setup
      error = Faker.Company.bullshit()

      expect(OpenTripPlannerClient.Mock, :plan, fn _ ->
        {:error, [%{message: error}]}
      end)

      # Exercise
      view |> element("form") |> render_change(%{"input_form" => @valid_params})

      # Verify
      document = render_async(view)
      text = document |> Floki.find("span[data-test='results-summary:error']") |> Floki.text()

      assert text == error
    end
  end

  describe "results" do
    setup %{conn: conn} do
      stub(Alerts.Repo.Mock, :all, fn _ ->
        []
      end)

      {:error, {:live_redirect, %{to: url}}} =
        live(conn, live_path(conn, DotcomWeb.Live.TripPlanner))

      {:ok, view, _} = live(conn, url)

      %{view: view}
    end

    test "using valid params shows results", %{view: view} do
      # Setup
      expect(OpenTripPlannerClient.Mock, :plan, fn _ ->
        {:ok, build_list(1, :itinerary_group)}
      end)

      # Exercise
      view |> element("form") |> render_change(%{"input_form" => @valid_params})

      # Verify
      document = render_async(view) |> Floki.parse_document!()

      assert Floki.get_by_id(document, "trip-planner-results")
    end

    test "toggling wheelchair checkbox displays groupings", %{view: view} do
      # Setup
      num_inaccessible = Faker.random_between(2, 5)
      num_accessible = Faker.random_between(2, 5)

      inaccessible_itinerary_groups =
        build_list(num_inaccessible, :itinerary_group,
          itineraries: build_list(1, :itinerary, accessibility_score: nil)
        )

      accessible_itinerary_groups =
        build_list(num_accessible, :itinerary_group,
          itineraries: build_list(1, :itinerary, accessibility_score: 1.0)
        )

      expect(OpenTripPlannerClient.Mock, :plan, 2, fn _ ->
        {:ok, accessible_itinerary_groups ++ inaccessible_itinerary_groups}
      end)

      # Exercise
      view
      |> element("form")
      |> render_change(%{"input_form" => Map.put(@valid_params, "wheelchair", "true")})

      # Verify
      rendered =
        render_async(view)
        |> Floki.parse_document!()
        |> Floki.text()

      assert rendered =~ "#{num_inaccessible} Inaccessible Routes"
      assert rendered =~ "#{num_accessible} Accessible Routes"

      # Exercise again
      view
      |> element("form")
      |> render_change(%{"input_form" => Map.put(@valid_params, "wheelchair", "false")})

      # Verify again
      rerendered =
        render_async(view)
        |> Floki.parse_document!()
        |> Floki.text()

      refute rerendered =~ "Inaccessible Route"
      refute rerendered =~ "Accessible Route"
    end

    test "groupable results show up in groups", %{view: view} do
      # Setup
      group_count = :rand.uniform(5)

      expect(OpenTripPlannerClient.Mock, :plan, fn _ ->
        {:ok, build_list(group_count, :itinerary_group)}
      end)

      # Exercise
      view |> element("form") |> render_change(%{"input_form" => @valid_params})

      # Verify
      document = render_async(view) |> Floki.parse_document!()

      Enum.each(0..(group_count - 1), fn i ->
        assert Floki.find(document, "div[data-test='results:itinerary_group:#{i}']") != []
      end)
    end

    test "selecting a group shows the group's itineraries", %{view: view} do
      # Setup
      group_count = :rand.uniform(5)

      expect(OpenTripPlannerClient.Mock, :plan, fn _ ->
        {:ok, build_list(group_count, :itinerary_group)}
      end)

      selected_group = Faker.Util.pick(0..(group_count - 1))

      # Exercise
      view |> element("form") |> render_change(%{"input_form" => @valid_params})
      render_async(view)
      view |> element("button[phx-value-index='#{selected_group}']", "Details") |> render_click()

      # Verify
      document = render(view) |> Floki.parse_document!()

      assert Floki.find(
               document,
               "div[data-test='results:itinerary_group:selected:#{selected_group}']"
             ) != []
    end

    test "unselecting a group shows all groups", %{view: view} do
      group_count = :rand.uniform(5)

      # Setup
      expect(OpenTripPlannerClient.Mock, :plan, fn _ ->
        {:ok, build_list(group_count, :itinerary_group)}
      end)

      selected_group = Faker.Util.pick(0..(group_count - 1))

      # Exercise
      view |> element("form") |> render_change(%{"input_form" => @valid_params})
      render_async(view)
      view |> element("button[phx-value-index='#{selected_group}']", "Details") |> render_click()

      view
      |> element("button[phx-click='reset_itinerary_group']", "View All Options")
      |> render_click()

      # Verify
      document = render(view) |> Floki.parse_document!()

      assert Floki.find(
               document,
               "div[data-test='results:itinerary_group:selected:#{selected_group}']"
             ) == []
    end

    test "selecting an itinerary displays it", %{view: view} do
      # Setup
      expect(OpenTripPlannerClient.Mock, :plan, fn _ ->
        {:ok, build_list(1, :itinerary_group)}
      end)

      # Exercise
      view |> element("form") |> render_change(%{"input_form" => @valid_params})
      render_async(view)
      view |> element("button[phx-value-index='0']", "Details") |> render_click()
      view |> element("button[data-test='itinerary_detail:1']") |> render_click()

      # Verify
      document = render(view) |> Floki.parse_document!()

      assert Floki.find(document, "div[data-test='itinerary_detail:selected:1']") != []
    end
  end

  # Parse coordinates from data-coordinates.
  defp parse_coordinates(string) do
    string
    |> String.replace(~r/\[|\]/, "")
    |> String.split(",")
  end

  # Parse the query string from a URL and decode them into a plan.
  defp decode_params(url) do
    url
    |> URI.parse()
    |> Map.get(:query)
    |> URI.decode_query()
    |> Map.get("plan")
    |> AntiCorruptionLayer.decode()
  end
end
