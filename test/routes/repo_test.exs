defmodule Routes.RepoTest do
  use ExUnit.Case, async: false
  import Mock
  alias Routes.{Repo, Route}

  @routes_repo_api Application.get_env(:site, :routes_repo_api)

  describe "all/0" do
    test "returns something" do
      assert @routes_repo_api.all() != []
    end

    test "parses the data into Route structs" do
      assert @routes_repo_api.all() |> List.first() == %Route{
               id: "Red",
               type: 1,
               name: "Red Line",
               long_name: "Red Line",
               color: "DA291C",
               direction_names: %{0 => "Southbound", 1 => "Northbound"},
               direction_destinations: %{0 => "Ashmont/Braintree", 1 => "Alewife"},
               description: :rapid_transit,
               sort_order: 10_010
             }
    end

    test "parses a long name for the Green Line" do
      [route] =
        @routes_repo_api.all()
        |> Enum.filter(&(&1.id == "Green-B"))

      assert route == %Route{
               id: "Green-B",
               type: 0,
               name: "Green Line B",
               long_name: "Green Line B",
               color: "00843D",
               direction_names: %{0 => "Westbound", 1 => "Eastbound"},
               direction_destinations: %{0 => "Boston College", 1 => "Government Center"},
               description: :rapid_transit,
               sort_order: 10_032
             }
    end

    test "parses a short name instead of a long one" do
      [route] =
        @routes_repo_api.all()
        |> Enum.filter(&(&1.name == "SL1"))

      assert route == %Route{
               id: "741",
               type: 3,
               name: "SL1",
               long_name: "Logan Airport Terminals - South Station",
               color: "7C878E",
               direction_destinations: %{0 => "Logan Airport Terminals", 1 => "South Station"},
               description: :key_bus_route,
               sort_order: 10_051
             }
    end

    test "parses a short_name if there's no long name" do
      [route] =
        @routes_repo_api.all()
        |> Enum.filter(&(&1.name == "23"))

      assert route == %Route{
               id: "23",
               type: 3,
               name: "23",
               long_name: "Ashmont Station - Ruggles Station via Washington Street",
               color: "FFC72C",
               direction_destinations: %{0 => "Ashmont Station", 1 => "Ruggles Station"},
               description: :key_bus_route,
               sort_order: 50_230
             }
    end

    test "filters out 'hidden' routes'" do
      all = @routes_repo_api.all()
      assert all |> Enum.filter(fn route -> route.name == "24/27" end) == []
    end
  end

  describe "by_type/1" do
    test "only returns routes of a given type" do
      one = @routes_repo_api.by_type(1)
      assert one |> Enum.all?(fn route -> route.type == 1 end)
      assert one != []
      assert one == @routes_repo_api.by_type([1])
    end

    test "filtering by a list keeps the routes in their global order" do
      assert @routes_repo_api.by_type([0, 1, 2, 3, 4]) == @routes_repo_api.all()
    end
  end

  describe "get/1" do
    test "returns a single route" do
      assert %Route{
               id: "Red",
               name: "Red Line",
               type: 1
             } = @routes_repo_api.get("Red")
    end

    test "should return a generated route for Massport Routes" do
      assert %Route{
               description: "Massport Generated Route",
               id: "Massport-TEST",
               long_name: "Massport-TEST",
               name: "Massport-TEST",
               type: "Massport-TEST",
               custom_route?: true,
               color: "000000"
             } = @routes_repo_api.get("Massport-TEST")
    end

    test "returns nil for an unknown route" do
      refute @routes_repo_api.get("_unknown_route")
    end
  end

  test "key bus routes are tagged" do
    assert %Route{description: :key_bus_route} = @routes_repo_api.get("1")
    assert %Route{description: :key_bus_route} = @routes_repo_api.get("741")
    assert %Route{description: :local_bus} = @routes_repo_api.get("47")
  end

  describe "by_stop/1" do
    test "returns stops from different lines" do
      # Kenmore Square
      route_ids = @routes_repo_api.by_stop("place-kencl") |> Enum.map(& &1.id)
      assert "Green-B" in route_ids
      assert "19" in route_ids
    end

    test "can specify type as param" do
      # Kenmore Square
      assert "19" in (@routes_repo_api.by_stop("place-kencl", type: 3) |> Enum.map(& &1.id))
    end

    test "returns empty list if no routes of that type serve that stop" do
      assert [] = @routes_repo_api.by_stop("place-bmmnl", type: 0)
    end

    test "returns no routes on nonexistant station" do
      assert [] = @routes_repo_api.by_stop("thisstopdoesntexist")
    end

    test "can include additional routes via stop connections" do
      with_mock V3Api.Routes, [],
        by_stop: &mock_routes_by_stop/1,
        by_stop: &mock_routes_by_stop/2 do
        routes = Routes.Repo.by_stop("initial-stop-id")
        more_routes = Routes.Repo.by_stop("initial-stop-id", include: "stop.connecting_stops")
        assert ["initial-route-id"] = Enum.map(routes, & &1.id)

        assert ["connecting-route-id-1", "connecting-route-id-2", "initial-route-id"] =
                 Enum.map(more_routes, & &1.id)
      end
    end
  end

  describe "by_stop_and_direction/2" do
    test "fetching routes for the same stop, but different direction" do
      winship_union_outbound_routes = @routes_repo_api.by_stop_and_direction("1994", 0)
      winship_union_inbound_routes = @routes_repo_api.by_stop_and_direction("1994", 1)

      assert Enum.any?(winship_union_outbound_routes, &(&1.id == "65"))
      refute Enum.any?(winship_union_inbound_routes, &(&1.id == "65"))
    end
  end

  describe "handle_response/1" do
    test "parses routes" do
      response = %JsonApi{
        data: [
          %JsonApi.Item{
            attributes: %{
              "description" => "Local Bus",
              "direction_names" => ["Outbound", "Inbound"],
              "direction_destinations" => ["Start", "End"],
              "long_name" => "",
              "short_name" => "16",
              "sort_order" => 1600,
              "type" => 3
            },
            id: "16",
            relationships: %{},
            type: "route"
          },
          %JsonApi.Item{
            attributes: %{
              "description" => "Local Bus",
              "direction_names" => ["Outbound", "Inbound"],
              "direction_destinations" => ["Start", "End"],
              "long_name" => "",
              "short_name" => "36",
              "sort_order" => 3600,
              "type" => 3
            },
            id: "36",
            relationships: %{},
            type: "route"
          }
        ],
        links: %{}
      }

      assert {:ok, [%Route{id: "16"}, %Route{id: "36"}]} = Repo.handle_response(response)
    end

    test "removes hidden routes" do
      response = %JsonApi{
        data: [
          %JsonApi.Item{
            attributes: %{
              "description" => "Local Bus",
              "direction_names" => ["Outbound", "Inbound"],
              "direction_destinations" => ["Start", "End"],
              "long_name" => "",
              "short_name" => "36",
              "sort_order" => 3600,
              "type" => 3
            },
            id: "36",
            relationships: %{},
            type: "route"
          },
          %JsonApi.Item{
            attributes: %{
              "description" => "Limited Service",
              "direction_names" => ["Outbound", "Inbound"],
              "direction_destinations" => ["Start", "End"],
              "long_name" => "",
              "short_name" => "9701",
              "sort_order" => 970_100,
              "type" => 3
            },
            id: "9701",
            relationships: %{},
            type: "route"
          }
        ],
        links: %{}
      }

      assert {:ok, [%Route{id: "36"}]} = Repo.handle_response(response)
    end

    test "passes errors through" do
      error = {:error, %HTTPoison.Error{id: nil, reason: :timeout}}
      assert Repo.handle_response(error) == error
    end
  end

  describe "get_shapes/2" do
    test "Get valid response for bus route" do
      shapes = @routes_repo_api.get_shapes("36", direction_id: 1)
      shape = List.first(shapes)

      assert Enum.count(shapes) >= 2
      assert is_binary(shape.id)
      assert Enum.count(shape.stop_ids) >= 26
    end

    test "get different number of shapes from same route depending on filtering" do
      all_shapes = @routes_repo_api.get_shapes("100", [direction_id: 1], false)
      priority_shapes = @routes_repo_api.get_shapes("100", direction_id: 1)

      refute Enum.count(all_shapes) == Enum.count(priority_shapes)
    end
  end

  describe "get_shape/1" do
    shape =
      "903_0018"
      |> @routes_repo_api.get_shape()
      |> List.first()

    assert shape.id == "903_0018"
  end

  describe "green_line" do
    green_line = @routes_repo_api.green_line()
    assert green_line.id == "Green"
    assert green_line.name == "Green Line"
  end

  defp mock_routes_by_stop("connecting-stop-id") do
    %JsonApi{
      data: [
        %JsonApi.Item{
          id: "connecting-route-id-1",
          attributes: %{
            "direction_names" => ["Outbound", "Inbound"],
            "direction_destinations" => ["Start", "End"],
            "long_name" => "Connecting route at this stop"
          }
        },
        %JsonApi.Item{
          id: "connecting-route-id-2",
          attributes: %{
            "direction_names" => ["Outbound", "Inbound"],
            "direction_destinations" => ["Start", "End"],
            "long_name" => "Another connecting route at this stop"
          }
        }
      ]
    }
  end

  defp mock_routes_by_stop("initial-stop-id", include: "stop.connecting_stops") do
    %JsonApi{
      data: [
        %JsonApi.Item{
          id: "initial-route-id",
          attributes: %{
            "direction_names" => ["Outbound", "Inbound"],
            "direction_destinations" => ["Start", "End"],
            "long_name" => "Route with stops and connections"
          },
          relationships: %{
            "stop" => [
              %JsonApi.Item{
                id: "initial-stop-id",
                relationships: %{
                  "connecting_stops" => [%JsonApi.Item{id: "connecting-stop-id"}]
                }
              }
            ]
          }
        }
      ]
    }
  end

  defp mock_routes_by_stop("initial-stop-id", _opts) do
    %JsonApi{
      data: [
        %JsonApi.Item{
          id: "initial-route-id",
          attributes: %{
            "direction_names" => ["Outbound", "Inbound"],
            "direction_destinations" => ["Start", "End"],
            "long_name" => "Route with stops and connections"
          },
          relationships: %{}
        }
      ]
    }
  end
end
