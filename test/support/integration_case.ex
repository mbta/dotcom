defmodule SiteWeb.IntegrationCase do
  use ExUnit.CaseTemplate
  alias Plug.Conn
  import Test.Support.EnvHelpers

  @autocomplete_results Poison.encode!([
                          %{
                            "description" => "Airport, Boston, MA, USA",
                            "id" => "9849ec38162852d3f21227b1162a70d5e37105da",
                            "matched_substrings" => [%{"length" => 4, "offset" => 0}],
                            "place_id" => "ChIJoYG_ryJw44kRhs8nIHc2Roo",
                            "reference" => "ChIJoYG_ryJw44kRhs8nIHc2Roo",
                            "structured_formatting" => %{
                              "main_text" => "Airport",
                              "main_text_matched_substrings" => [%{"length" => 4, "offset" => 0}],
                              "secondary_text" => "Boston, MA, USA"
                            },
                            "terms" => [
                              %{"offset" => 0, "value" => "Airport"},
                              %{"offset" => 9, "value" => "Boston"},
                              %{"offset" => 17, "value" => "MA"},
                              %{"offset" => 21, "value" => "USA"}
                            ],
                            "types" => ["neighborhood", "political", "geocode"]
                          }
                        ])

  using do
    quote do
      use Wallaby.DSL

      import SiteWeb.Router.Helpers
    end
  end

  setup do
    {:ok, session} = Wallaby.start_session()
    # Walllaby defaults to mobile screen size
    session_with_screen_size = Wallaby.Browser.resize_window(session, 1024, 768)

    # Setup Bypass to avoid Google Maps calls
    bypass = Bypass.open()
    reassign_env(:dotcom, :domain, "http://localhost:#{bypass.port}")

    Bypass.stub(bypass, "GET", "/maps/api/place/autocomplete/json", fn conn ->
      Conn.resp(conn, 200, ~s({"status": "OK", "predictions": #{@autocomplete_results}}))
    end)

    Bypass.stub(bypass, "GET", "/maps/api/place/details/json", fn conn ->
      Conn.resp(conn, 200, ~s({"status": "OK", "result": []}}))
    end)

    Bypass.stub(bypass, "GET", "/maps/api/geocode/json", fn conn ->
      Conn.resp(conn, 200, ~s({"status": "OK", "results": []}))
    end)

    Bypass.stub(bypass, "GET", "/maps/api/staticmap", fn conn ->
      Conn.resp(conn, 200, ~s({"status": "OK"}))
    end)

    {:ok, session: session_with_screen_size, bypass: bypass}
  end
end
