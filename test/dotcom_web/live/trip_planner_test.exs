defmodule DotcomWeb.Live.TripPlannerTest do
  use DotcomWeb.ConnCase, async: true

  import DotcomWeb.Router.Helpers, only: [live_path: 2]
  import Mox
  import Phoenix.LiveViewTest

  alias Test.Support.Factories.{MBTA.Api, Stops.Stop, TripPlanner.TripPlanner}

  setup :verify_on_exit!

  @valid_params %{
    "from" => %{
      "latitude" => Faker.Address.latitude(),
      "longitude" => Faker.Address.longitude()
    },
    "to" => %{
      "latitude" => Faker.Address.latitude(),
      "longitude" => Faker.Address.longitude()
    }
  }

  describe "loading" do
  end

  describe "inputs" do
    setup %{conn: conn} do
      stub(MBTA.Api.Mock, :get_json, fn "/schedules/", _ ->
        %JsonApi{}
      end)

      {:error, {:live_redirect, %{to: url}}} = live(conn, live_path(conn, DotcomWeb.Live.TripPlanner))
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

      assert document =~ "Cannot connect to OpenTripPlanner. Please try again later."
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
      stub(MBTA.Api.Mock, :get_json, fn "/trips/" <> id, [] ->
        %JsonApi{data: [Api.build(:trip_item, %{id: id})]}
      end)

      stub(Stops.Repo.Mock, :get, fn _ ->
        Stop.build(:stop)
      end)

      {:error, {:live_redirect, %{to: url}}} = live(conn, live_path(conn, DotcomWeb.Live.TripPlanner))
      {:ok, view, _} = live(conn, url)

      %{view: view}
    end

    test "using valid params shows results", %{view: view} do
      # Setup
      expect(OpenTripPlannerClient.Mock, :plan, fn _ ->
        itineraries = TripPlanner.build_list(1, :otp_itinerary)

        {:ok, %OpenTripPlannerClient.Plan{itineraries: itineraries}}
      end)

      # Exercise
      view |> element("form") |> render_change(%{"input_form" => @valid_params})

      # Verify
      document = render_async(view) |> Floki.parse_document!()

      assert Floki.get_by_id(document, "trip-planner-results")
    end

    test "groupable results show up in groups", %{view: view} do
      # Setup
      group_count = :rand.uniform(5)

      expect(OpenTripPlannerClient.Mock, :plan, fn _ ->
        itineraries = TripPlanner.groupable_otp_itineraries(group_count)

        {:ok, %OpenTripPlannerClient.Plan{itineraries: itineraries}}
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
        itineraries = TripPlanner.groupable_otp_itineraries(group_count)

        {:ok, %OpenTripPlannerClient.Plan{itineraries: itineraries}}
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

    test "selecting/unselecting a group shows all groups", %{view: view} do
      group_count = :rand.uniform(5)

      # Setup
      expect(OpenTripPlannerClient.Mock, :plan, fn _ ->
        itineraries = TripPlanner.groupable_otp_itineraries(group_count)

        {:ok, %OpenTripPlannerClient.Plan{itineraries: itineraries}}
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
        itineraries = TripPlanner.groupable_otp_itineraries(2, 2)

        {:ok, %OpenTripPlannerClient.Plan{itineraries: itineraries}}
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
end
