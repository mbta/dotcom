defmodule DotcomWeb.Live.TripPlannerTest do
  use DotcomWeb.ConnCase, async: true

  import Mox
  import Phoenix.LiveViewTest

  alias OpenTripPlannerClient.Test.Support.Factory
  alias Test.Support.Factories.TripPlanner.TripPlanner, as: TripPlannerFactory

  setup :verify_on_exit!

  setup %{conn: conn} do
    {:ok, view, html} = live(conn, ~p"/preview/trip-planner")

    %{html: html, view: view}
  end

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

  # MOUNT

  # INPUTS
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
    expect(MBTA.Api.Mock, :get_json, fn _, _ -> {:ok, %{}} end)

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
    expect(MBTA.Api.Mock, :get_json, fn _, _ -> {:ok, %{}} end)

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
    html = render(view)

    assert html =~ "Please select a destination at a different location from the origin."
  end

  test "using valid params shows results", %{view: view} do
    # Setup
    expect(OpenTripPlannerClient.Mock, :plan, fn _ ->
      itineraries = TripPlannerFactory.build_list(1, :otp_itinerary)

      {:ok, %OpenTripPlannerClient.Plan{itineraries: itineraries}}
    end)

    # Exercise
    view |> element("form") |> render_change(%{"input_form" => @valid_params})

    # Verify
    document = render(view) |> Floki.parse_document!()

    assert Floki.get_by_id(document, "trip-planner-results")
  end

  test "an OTP connection error shows up as an error message", %{view: view} do
    # Setup
    expect(OpenTripPlannerClient.Mock, :plan, fn _ ->
      {:error, %Req.TransportError{reason: :econnrefused}}
    end)

    # Exercise
    view |> element("form") |> render_change(%{"input_form" => @valid_params})

    html = render(view)

    assert html =~ "Cannot connect to OpenTripPlanner. Please try again later."
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
    html = render(view)

    open_browser(view)

    assert html =~ error
  end
end
