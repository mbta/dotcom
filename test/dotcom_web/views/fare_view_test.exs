defmodule DotcomWeb.FareViewTest do
  @moduledoc false
  use ExUnit.Case, async: true

  import DotcomWeb.FareView
  alias Fares.Summary

  describe "summary_url/1" do
    test "links to :mode-fares for bus/subway summaries" do
      expected = DotcomWeb.Router.Helpers.fare_path(DotcomWeb.Endpoint, :show, "bus-fares")
      assert summary_url(%Summary{modes: [:bus]}) == expected
      expected = DotcomWeb.Router.Helpers.fare_path(DotcomWeb.Endpoint, :show, "subway-fares")
      assert summary_url(%Summary{modes: [:subway]}) == expected
    end

    test "if the summary has a duration, link to the correct anchor" do
      expected = DotcomWeb.Router.Helpers.fare_path(DotcomWeb.Endpoint, :show, "subway-fares")

      assert summary_url(%Summary{modes: [:subway, :bus], duration: :week}) ==
               expected <> "#7-day"

      assert summary_url(%Summary{modes: [:subway, :bus], duration: :month}) ==
               expected <> "#monthly"
    end

    test "links directly for commuter rail/ferry" do
      for mode <- [:commuter_rail, :ferry] do
        expected =
          DotcomWeb.Router.Helpers.fare_path(
            DotcomWeb.Endpoint,
            :show,
            DotcomWeb.StaticPage.convert_path(mode)
          )

        assert summary_url(%Summary{modes: [mode, :bus]}) == expected <> "-fares"
      end
    end

    test "defers to the summary's provided URL if present" do
      assert summary_url(%Summary{modes: [:bus], url: "/expected_url"}) == "/expected_url"
    end
  end
end
