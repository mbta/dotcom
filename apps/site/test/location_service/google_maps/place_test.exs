defmodule GoogleMaps.PlaceTest do
  use ExUnit.Case
  alias GoogleMaps.Place
  alias GoogleMaps.Place.{AutocompleteQuery, Prediction}
  alias Plug.Conn

  @prediction_results Poison.encode!([
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
                        },
                        %{
                          "description" =>
                            "Bradley International Airport (BDL), Schoephoester Road, Windsor Locks, CT, USA",
                          "id" => "52c0bd48bde3ed582ada49ae49942e345ea90ec6",
                          "matched_substrings" => [%{"length" => 4, "offset" => 22}],
                          "place_id" => "ChIJucyQYcL95okRZafxtdR6Wyc",
                          "reference" => "ChIJucyQYcL95okRZafxtdR6Wyc",
                          "structured_formatting" => %{
                            "main_text" => "Bradley International Airport (BDL)",
                            "main_text_matched_substrings" => [%{"length" => 4, "offset" => 22}],
                            "secondary_text" => "Schoephoester Road, Windsor Locks, CT, USA"
                          },
                          "terms" => [
                            %{"offset" => 0, "value" => "Bradley International Airport (BDL)"},
                            %{"offset" => 37, "value" => "Schoephoester Road"},
                            %{"offset" => 57, "value" => "Windsor Locks"},
                            %{"offset" => 72, "value" => "CT"},
                            %{"offset" => 76, "value" => "USA"}
                          ],
                          "types" => ["establishment"]
                        },
                        %{
                          "description" =>
                            "T. F. Green Airport (PVD), Post Road, Warwick, RI, USA",
                          "id" => "dd17811781a3db5e1e0a1720ae6c5040405a838c",
                          "matched_substrings" => [%{"length" => 4, "offset" => 12}],
                          "place_id" => "ChIJN0na1RRw44kRRFEtH8OUkww",
                          "reference" => "ChIJN0na1RRw44kRRFEtH8OUkww",
                          "structured_formatting" => %{
                            "main_text" => "T. F. Green Airport (PVD)",
                            "main_text_matched_substrings" => [%{"length" => 4, "offset" => 12}],
                            "secondary_text" => "Post Road, Warwick, RI, USA"
                          },
                          "terms" => [
                            %{"offset" => 0, "value" => "T. F. Green Airport (PVD)"},
                            %{"offset" => 27, "value" => "Post Road"},
                            %{"offset" => 38, "value" => "Warwick"},
                            %{"offset" => 47, "value" => "RI"},
                            %{"offset" => 51, "value" => "USA"}
                          ],
                          "types" => ["establishment"]
                        },
                        %{
                          "description" => "Airport Road, Manchester, NH, USA",
                          "id" => "e9810364342959dfb86a739124606291c58bc55b",
                          "matched_substrings" => [%{"length" => 4, "offset" => 0}],
                          "place_id" =>
                            "EiFBaXJwb3J0IFJvYWQsIE1hbmNoZXN0ZXIsIE5ILCBVU0EiLiosChQKEgkngCJ5R0ziiRGPkUEYQl3a-BIUChIJo2xmaNZO4okReXE1H0YyBGs",
                          "reference" =>
                            "EiFBaXJwb3J0IFJvYWQsIE1hbmNoZXN0ZXIsIE5ILCBVU0EiLiosChQKEgkngCJ5R0ziiRGPkUEYQl3a-BIUChIJo2xmaNZO4okReXE1H0YyBGs",
                          "structured_formatting" => %{
                            "main_text" => "Airport Road",
                            "main_text_matched_substrings" => [%{"length" => 4, "offset" => 0}],
                            "secondary_text" => "Manchester, NH, USA"
                          },
                          "terms" => [
                            %{"offset" => 0, "value" => "Airport Road"},
                            %{"offset" => 14, "value" => "Manchester"},
                            %{"offset" => 26, "value" => "NH"},
                            %{"offset" => 30, "value" => "USA"}
                          ],
                          "types" => ["route", "geocode"]
                        },
                        %{
                          "description" =>
                            "John F. Kennedy International Airport (JFK), Queens, NY, USA",
                          "id" => "87586c86ef1c53323d31eba8260ca7f0ea7cb094",
                          "matched_substrings" => [%{"length" => 4, "offset" => 30}],
                          "place_id" => "ChIJR0lA1VBmwokR8BGfSBOyT-w",
                          "reference" => "ChIJR0lA1VBmwokR8BGfSBOyT-w",
                          "structured_formatting" => %{
                            "main_text" => "John F. Kennedy International Airport (JFK)",
                            "main_text_matched_substrings" => [%{"length" => 4, "offset" => 30}],
                            "secondary_text" => "Queens, NY, USA"
                          },
                          "terms" => [
                            %{
                              "offset" => 0,
                              "value" => "John F. Kennedy International Airport (JFK)"
                            },
                            %{"offset" => 45, "value" => "Queens"},
                            %{"offset" => 53, "value" => "NY"},
                            %{"offset" => 57, "value" => "USA"}
                          ],
                          "types" => ["establishment"]
                        }
                      ])

  describe "autocomplete/4" do
    test "parses results from Google" do
      bypass = Bypass.open()
      set_domain("http://localhost:#{bypass.port}")

      query = %AutocompleteQuery{
        input: "airp",
        hit_limit: 3,
        session_token: "123"
      }

      Bypass.expect(bypass, fn conn ->
        assert "/maps/api/place/autocomplete/json" == conn.request_path
        conn = Conn.fetch_query_params(conn)
        assert conn.params["input"] == "airp"

        Conn.resp(conn, 200, ~s({"status": "OK", "predictions": #{@prediction_results}}))
      end)

      actual = Place.autocomplete(query)

      assert {:ok, results} = actual
      assert is_list(results)
      assert Enum.all?(results, fn result -> %Prediction{} = result end)
    end

    test "returns an empty list for no results" do
      bypass = Bypass.open()
      set_domain("http://localhost:#{bypass.port}")

      query = %AutocompleteQuery{
        input: "snuffleupagus",
        hit_limit: 3,
        session_token: "123"
      }

      Bypass.expect(bypass, fn conn ->
        assert "/maps/api/place/autocomplete/json" == conn.request_path
        conn = Conn.fetch_query_params(conn)
        assert conn.params["input"] == "snuffleupagus"

        Conn.resp(conn, 200, ~s({"status": "ZERO_RESULTS", "predictions": []}))
      end)

      actual = Place.autocomplete(query)

      assert actual == {:ok, []}
    end

    test "rejects banned places" do
      bypass = Bypass.open()
      set_domain("http://localhost:#{bypass.port}")

      query = %AutocompleteQuery{
        input: "airp",
        hit_limit: 3,
        session_token: "456"
      }

      Bypass.expect(bypass, fn conn ->
        assert "/maps/api/place/autocomplete/json" == conn.request_path
        conn = Conn.fetch_query_params(conn)
        assert conn.params["input"] == "airp"

        Conn.resp(conn, 200, ~s({"status": "OK", "predictions": #{@prediction_results}}))
      end)

      assert {:ok, results} = Place.autocomplete(query)
      refute(Enum.find(results, &(&1.place_id == "ChIJN0na1RRw44kRRFEtH8OUkww")))
    end

    test "uses cache" do
      bypass = Bypass.open()
      set_domain("http://localhost:#{bypass.port}")

      query = %AutocompleteQuery{
        input: "cached",
        hit_limit: 3,
        session_token: "123"
      }

      Bypass.expect_once(bypass, fn conn ->
        assert "/maps/api/place/autocomplete/json" == conn.request_path
        conn = Conn.fetch_query_params(conn)
        assert conn.params["input"] == "cached"

        Conn.resp(conn, 200, ~s({"status": "OK", "predictions": #{@prediction_results}}))
      end)

      cache_miss = Place.autocomplete(query)
      assert {:ok, cache_miss_results} = cache_miss
      assert is_list(cache_miss_results)

      cache_hit = Place.autocomplete(query)
      assert {:ok, cache_hit_results} = cache_hit
      assert is_list(cache_hit_results)
    end
  end

  defp set_domain(new_domain) do
    old_domain = Application.get_env(:site, :domain)
    Application.put_env(:site, :domain, new_domain)

    on_exit(fn ->
      Application.put_env(:site, :domain, old_domain)
    end)
  end
end
