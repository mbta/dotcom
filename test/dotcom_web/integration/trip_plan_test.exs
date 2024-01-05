defmodule TripPlanIntegrationTest do
  use DotcomWeb.IntegrationCase
  import Wallaby.Query

  @depart css("label[for=\"depart\"]")
  @arrive css("label[for=\"arrive\"]")
  @title css("#trip-plan-departure-title")
  @datepicker css("#trip-plan-datepicker")
  @to css("#to")
  @from css("#from")
  @reverse_button css("#trip-plan-reverse-control")

  describe "trip plan form" do
    @tag :wallaby
    test "datepicker starts hidden and shows when tab title is clicked", %{session: session} do
      session =
        session
        |> visit("/trip-planner")

      refute visible?(session, @datepicker)

      click(session, @title)
      assert visible?(session, @datepicker)
      click(session, @depart)
      assert visible?(session, @datepicker)
      click(session, @arrive)
      assert visible?(session, @datepicker)
    end

    @tag :wallaby
    test "reverse button swaps to and from", %{session: session} do
      session =
        session
        |> visit("/trip-planner")
        |> fill_in(@from, with: "A")
        |> fill_in(@to, with: "B")

      assert Browser.has_value?(session, @from, "A")
      assert Browser.has_value?(session, @to, "B")

      click(session, @reverse_button)

      assert Browser.has_value?(session, @from, "B")
      assert Browser.has_value?(session, @to, "A")
    end

    @tag :wallaby
    test "departure options update tab title", %{session: session} do
      session =
        session
        |> visit("/trip-planner")

      click(session, @title)
      assert Browser.text(session, @title) =~ "Depart at"
      click(session, @depart)
      assert Browser.text(session, @title) =~ "Depart at"
      click(session, @arrive)
      assert Browser.text(session, @title) =~ "Arrive by"
    end
  end
end
