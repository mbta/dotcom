defmodule SiteWeb.ScheduleController.Line.DiagramHelpersTest do
  use ExUnit.Case, async: true

  alias Routes.Route
  alias SiteWeb.ScheduleController.Line.{DiagramHelpers, Helpers}
  alias Stops.{RouteStop, RouteStops}

  @deps %SiteWeb.ScheduleController.Line.Dependencies{}
  @route_red %Route{
    id: "Red",
    name: "Red Line",
    type: 1
  }
  @route_1 %Route{
    id: "1",
    name: "1",
    type: 3
  }
  @route_green_b %Route{
    id: "Green-B",
    name: "",
    type: 0
  }
  @route_green_c %Route{
    id: "Green-C",
    name: "",
    type: 0
  }
  @route_green_d %Route{
    id: "Green-D",
    name: "",
    type: 0
  }
  @route_green_e %Route{
    id: "Green-E",
    name: "",
    type: 0
  }

  describe "build_stop_list/2" do
    test "builds a list of stops with bubble info for Red line (2 branches), direction 0" do
      branches = [
        %RouteStops{
          branch: nil,
          stops: [
            %RouteStop{
              branch: nil,
              id: "place-alfcl",
              is_beginning?: true,
              is_terminus?: true,
              name: "Alewife",
              route: @route_red
            },
            %RouteStop{
              branch: nil,
              id: "place-jfk",
              is_beginning?: false,
              is_terminus?: false,
              name: "JFK/UMass",
              route: @route_red
            }
          ]
        },
        %RouteStops{
          branch: "Alewife - Braintree",
          stops: [
            %RouteStop{
              branch: "Alewife - Braintree",
              id: "place-nqncy",
              is_beginning?: false,
              is_terminus?: false,
              name: "North Quincy",
              route: @route_red
            },
            %RouteStop{
              branch: "Alewife - Braintree",
              id: "place-brntn",
              is_beginning?: false,
              is_terminus?: true,
              name: "Braintree",
              route: @route_red
            }
          ]
        },
        %RouteStops{
          branch: "Alewife - Ashmont",
          stops: [
            %RouteStop{
              branch: "Alewife - Ashmont",
              id: "place-shmnl",
              is_beginning?: false,
              is_terminus?: false,
              name: "Savin Hill",
              route: @route_red
            },
            %RouteStop{
              branch: "Alewife - Ashmont",
              id: "place-asmnl",
              is_beginning?: false,
              is_terminus?: true,
              name: "Ashmont",
              route: @route_red
            }
          ]
        }
      ]

      assert [
               {
                 [nil: :terminus],
                 %RouteStop{id: "place-alfcl"}
               },
               {
                 [{"Alewife - Ashmont", :merge}, {"Alewife - Braintree", :merge}],
                 %RouteStop{id: "place-jfk"}
               },
               {
                 [{"Alewife - Ashmont", :line}, {"Alewife - Braintree", :stop}],
                 %RouteStop{id: "place-nqncy"}
               },
               {
                 [{"Alewife - Ashmont", :line}, {"Alewife - Braintree", :terminus}],
                 %RouteStop{id: "place-brntn"}
               },
               {
                 [{"Alewife - Ashmont", :stop}],
                 %RouteStop{id: "place-shmnl"}
               },
               {
                 [{"Alewife - Ashmont", :terminus}],
                 %RouteStop{id: "place-asmnl"}
               }
             ] = DiagramHelpers.build_stop_list(branches, 0)
    end

    test "builds a list of stops with bubble info for Red line (2 branches), direction 1" do
      branches = [
        %RouteStops{
          branch: "Ashmont - Alewife",
          stops: [
            %RouteStop{
              branch: "Ashmont - Alewife",
              id: "place-asmnl",
              is_beginning?: true,
              is_terminus?: true,
              name: "Ashmont",
              route: @route_red
            },
            %RouteStop{
              branch: "Ashmont - Alewife",
              id: "place-shmnl",
              is_beginning?: false,
              is_terminus?: false,
              name: "Savin Hill",
              route: @route_red
            }
          ]
        },
        %RouteStops{
          branch: "Braintree - Alewife",
          stops: [
            %RouteStop{
              branch: "Braintree - Alewife",
              id: "place-brntn",
              is_beginning?: true,
              is_terminus?: true,
              name: "Braintree",
              route: @route_red
            },
            %RouteStop{
              branch: "Braintree - Alewife",
              id: "place-nqncy",
              is_beginning?: false,
              is_terminus?: false,
              name: "North Quincy",
              route: @route_red
            }
          ]
        },
        %RouteStops{
          branch: nil,
          stops: [
            %RouteStop{
              branch: nil,
              id: "place-jfk",
              is_beginning?: false,
              is_terminus?: false,
              name: "JFK/UMass",
              route: @route_red
            },
            %RouteStop{
              branch: nil,
              id: "place-alfcl",
              is_beginning?: false,
              is_terminus?: true,
              name: "Alewife",
              route: @route_red
            }
          ]
        }
      ]

      assert [
               {
                 [{"Ashmont - Alewife", :terminus}],
                 %RouteStop{id: "place-asmnl"}
               },
               {
                 [{"Ashmont - Alewife", :stop}],
                 %RouteStop{id: "place-shmnl"}
               },
               {
                 [{"Ashmont - Alewife", :line}, {"Braintree - Alewife", :terminus}],
                 %RouteStop{id: "place-brntn"}
               },
               {
                 [{"Ashmont - Alewife", :line}, {"Braintree - Alewife", :stop}],
                 %RouteStop{id: "place-nqncy"}
               },
               {
                 [{"Ashmont - Alewife", :merge}, {"Braintree - Alewife", :merge}],
                 %RouteStop{id: "place-jfk"}
               },
               {
                 [nil: :terminus],
                 %RouteStop{id: "place-alfcl"}
               }
             ] = DiagramHelpers.build_stop_list(branches, 1)
    end

    test "builds a list of stops with bubble info for route 1 (1 branch, direction is ignored)" do
      branches = [
        %RouteStops{
          branch: "Harvard Square - Nubian Station",
          stops: [
            %RouteStop{
              branch: "Harvard Square - Nubian Station",
              id: "110",
              is_beginning?: true,
              is_terminus?: true,
              name: "Massachusetts Ave @ Holyoke St",
              route: @route_1
            },
            %RouteStop{
              branch: "Harvard Square - Nubian Station",
              id: "66",
              is_beginning?: false,
              is_terminus?: false,
              name: "Mt Auburn St @ DeWolfe St",
              route: @route_1
            },
            %RouteStop{
              branch: "Harvard Square - Nubian Station",
              id: "place-dudly",
              is_beginning?: false,
              is_terminus?: true,
              name: "Nubian",
              route: @route_1
            }
          ]
        }
      ]

      assert [
               {
                 [nil: :terminus],
                 %RouteStop{id: "110"}
               },
               {
                 [nil: :stop],
                 %RouteStop{id: "66"}
               },
               {
                 [nil: :terminus],
                 %RouteStop{id: "place-dudly"}
               }
             ] = DiagramHelpers.build_stop_list(branches, 0)
    end

    # FIXME: Update with new GLX data
    test "builds a list of stops with bubble info for Green line (4 branches), direction 0" do
      branches = [
        %RouteStops{
          branch: "Green-E",
          stops: [
            %RouteStop{
              branch: nil,
              id: "place-north",
              is_beginning?: true,
              is_terminus?: true,
              name: "North Station",
              route: @route_green_e,
              connections: []
            },
            %RouteStop{
              branch: nil,
              id: "place-haecl",
              is_beginning?: false,
              is_terminus?: false,
              name: "Haymarket",
              route: @route_green_e,
              connections: []
            },
            %RouteStop{
              branch: nil,
              id: "place-gover",
              is_beginning?: false,
              is_terminus?: false,
              name: "Government Center",
              route: @route_green_e,
              connections: []
            },
            %RouteStop{
              branch: nil,
              id: "place-pktrm",
              is_beginning?: false,
              is_terminus?: false,
              name: "Park Street",
              route: @route_green_e,
              connections: []
            },
            %RouteStop{
              branch: nil,
              id: "place-boyls",
              is_beginning?: false,
              is_terminus?: false,
              name: "Boylston",
              route: @route_green_e,
              connections: []
            },
            %RouteStop{
              branch: nil,
              id: "place-armnl",
              is_beginning?: false,
              is_terminus?: false,
              name: "Arlington",
              route: @route_green_e,
              connections: []
            },
            %RouteStop{
              branch: nil,
              id: "place-coecl",
              is_beginning?: false,
              is_terminus?: false,
              name: "Copley",
              route: @route_green_e,
              connections: []
            },
            %RouteStop{
              branch: "Green-E",
              id: "place-prmnl",
              is_beginning?: false,
              is_terminus?: false,
              name: "Prudential",
              route: @route_green_e,
              connections: []
            },
            %RouteStop{
              branch: "Green-E",
              id: "place-hsmnl",
              is_beginning?: false,
              is_terminus?: true,
              name: "Heath Street",
              route: @route_green_e,
              connections: []
            }
          ]
        },
        %RouteStops{
          branch: "Green-D",
          stops: [
            %RouteStop{
              branch: nil,
              id: "place-gover",
              is_beginning?: true,
              is_terminus?: true,
              name: "Government Center",
              route: @route_green_d,
              connections: []
            },
            %RouteStop{
              branch: nil,
              id: "place-pktrm",
              is_beginning?: false,
              is_terminus?: false,
              name: "Park Street",
              route: @route_green_d,
              connections: []
            },
            %RouteStop{
              branch: nil,
              id: "place-boyls",
              is_beginning?: false,
              is_terminus?: false,
              name: "Boylston",
              route: @route_green_d,
              connections: []
            },
            %RouteStop{
              branch: nil,
              id: "place-armnl",
              is_beginning?: false,
              is_terminus?: false,
              name: "Arlington",
              route: @route_green_d,
              connections: []
            },
            %RouteStop{
              branch: nil,
              id: "place-coecl",
              is_beginning?: false,
              is_terminus?: false,
              name: "Copley",
              route: @route_green_d,
              connections: []
            },
            %RouteStop{
              branch: nil,
              id: "place-hymnl",
              is_beginning?: false,
              is_terminus?: false,
              name: "Hynes Convention Center",
              route: @route_green_d,
              connections: []
            },
            %RouteStop{
              branch: nil,
              id: "place-kencl",
              is_beginning?: false,
              is_terminus?: false,
              name: "Kenmore",
              route: @route_green_d,
              connections: []
            },
            %RouteStop{
              branch: "Green-D",
              id: "place-fenwy",
              is_beginning?: false,
              is_terminus?: false,
              name: "Fenway",
              route: @route_green_d,
              connections: []
            },
            %RouteStop{
              branch: "Green-D",
              id: "place-river",
              is_beginning?: false,
              is_terminus?: true,
              name: "Riverside",
              route: @route_green_d,
              connections: []
            }
          ]
        },
        %RouteStops{
          branch: "Green-C",
          stops: [
            %RouteStop{
              branch: nil,
              id: "place-north",
              is_beginning?: true,
              is_terminus?: true,
              name: "North Station",
              route: @route_green_c,
              connections: []
            },
            %RouteStop{
              branch: nil,
              id: "place-haecl",
              is_beginning?: false,
              is_terminus?: false,
              name: "Haymarket",
              route: @route_green_c,
              connections: []
            },
            %RouteStop{
              branch: nil,
              id: "place-gover",
              is_beginning?: false,
              is_terminus?: false,
              name: "Government Center",
              route: @route_green_c,
              connections: []
            },
            %RouteStop{
              branch: nil,
              id: "place-pktrm",
              is_beginning?: false,
              is_terminus?: false,
              name: "Park Street",
              route: @route_green_c,
              connections: []
            },
            %RouteStop{
              branch: nil,
              id: "place-boyls",
              is_beginning?: false,
              is_terminus?: false,
              name: "Boylston",
              route: @route_green_c,
              connections: []
            },
            %RouteStop{
              branch: nil,
              id: "place-armnl",
              is_beginning?: false,
              is_terminus?: false,
              name: "Arlington",
              route: @route_green_c,
              connections: []
            },
            %RouteStop{
              branch: nil,
              id: "place-coecl",
              is_beginning?: false,
              is_terminus?: false,
              name: "Copley",
              route: @route_green_c,
              connections: []
            },
            %RouteStop{
              branch: nil,
              id: "place-hymnl",
              is_beginning?: false,
              is_terminus?: false,
              name: "Hynes Convention Center",
              route: @route_green_c,
              connections: []
            },
            %RouteStop{
              branch: nil,
              id: "place-kencl",
              is_beginning?: false,
              is_terminus?: false,
              name: "Kenmore",
              route: @route_green_c,
              connections: []
            },
            %RouteStop{
              branch: "Green-C",
              id: "place-smary",
              is_beginning?: false,
              is_terminus?: false,
              name: "Saint Marys Street",
              route: @route_green_c,
              connections: []
            },
            %RouteStop{
              branch: "Green-C",
              id: "place-clmnl",
              is_beginning?: false,
              is_terminus?: true,
              name: "Cleveland Circle",
              route: @route_green_c,
              connections: []
            }
          ]
        },
        %RouteStops{
          branch: "Green-B",
          stops: [
            %RouteStop{
              branch: nil,
              id: "place-pktrm",
              is_beginning?: true,
              is_terminus?: true,
              name: "Park Street",
              route: @route_green_b,
              connections: []
            },
            %RouteStop{
              branch: nil,
              id: "place-boyls",
              is_beginning?: false,
              is_terminus?: false,
              name: "Boylston",
              route: @route_green_b,
              connections: []
            },
            %RouteStop{
              branch: nil,
              id: "place-armnl",
              is_beginning?: false,
              is_terminus?: false,
              name: "Arlington",
              route: @route_green_b,
              connections: []
            },
            %RouteStop{
              branch: nil,
              id: "place-coecl",
              is_beginning?: false,
              is_terminus?: false,
              name: "Copley",
              route: @route_green_b,
              connections: []
            },
            %RouteStop{
              branch: nil,
              id: "place-hymnl",
              is_beginning?: false,
              is_terminus?: false,
              name: "Hynes Convention Center",
              route: @route_green_b,
              connections: []
            },
            %RouteStop{
              branch: nil,
              id: "place-kencl",
              is_beginning?: false,
              is_terminus?: false,
              name: "Kenmore",
              route: @route_green_b,
              connections: []
            },
            %RouteStop{
              branch: "Green-B",
              id: "place-bland",
              is_beginning?: false,
              is_terminus?: false,
              name: "Blandford Street",
              route: @route_green_b,
              connections: []
            },
            %RouteStop{
              branch: "Green-B",
              id: "place-lake",
              is_beginning?: false,
              is_terminus?: true,
              name: "Boston College",
              route: @route_green_b,
              connections: []
            }
          ]
        }
      ]

      assert [
               {
                 [nil: :stop],
                 %Stops.RouteStop{id: "place-gover"}
               },
               {
                 [nil: :stop],
                 %RouteStop{id: "place-north"}
               },
               {
                 [nil: :stop],
                 %RouteStop{id: "place-haecl"}
               },
               {
                 [nil: :stop],
                 %RouteStop{id: "place-pktrm"}
               },
               {
                 [nil: :stop],
                 %RouteStop{id: "place-boyls"}
               },
               {
                 [nil: :stop],
                 %RouteStop{id: "place-armnl"}
               },
               {
                 [{nil, :merge}, {"Green-E", :merge}],
                 %RouteStop{id: "place-coecl"}
               },
               {
                 [{nil, :line}, {"Green-E", :stop}],
                 %RouteStop{id: "place-prmnl"}
               },
               {
                 [{nil, :line}, {"Green-E", :terminus}],
                 %RouteStop{id: "place-hsmnl"}
               },
               {
                 [nil: :stop],
                 %RouteStop{id: "place-hymnl"}
               },
               {
                 [{"Green-B", :merge}, {"Green-C", :merge}, {"Green-D", :merge}],
                 %RouteStop{id: "place-kencl"}
               },
               {
                 [{"Green-B", :line}, {"Green-C", :line}, {"Green-D", :stop}],
                 %RouteStop{id: "place-fenwy"}
               },
               {
                 [{"Green-B", :line}, {"Green-C", :line}, {"Green-D", :terminus}],
                 %RouteStop{id: "place-river"}
               },
               {
                 [{"Green-B", :line}, {"Green-C", :stop}],
                 %RouteStop{id: "place-smary"}
               },
               {
                 [{"Green-B", :line}, {"Green-C", :terminus}],
                 %RouteStop{id: "place-clmnl"}
               },
               {
                 [{"Green-B", :stop}],
                 %RouteStop{id: "place-bland"}
               },
               {
                 [{"Green-B", :terminus}],
                 %RouteStop{id: "place-lake"}
               }
             ] = DiagramHelpers.build_stop_list(branches, 0)
    end

    # FIXME: Update with new GLX data
    test "builds a list of stops with bubble info for Green line (4 branches), direction 1" do
      branches = [
        %RouteStops{
          branch: "Green-E",
          stops: [
            %RouteStop{
              branch: "Green-E",
              id: "place-hsmnl",
              is_beginning?: true,
              is_terminus?: true,
              name: "Heath Street",
              route: @route_green_e,
              connections: []
            },
            %RouteStop{
              branch: "Green-E",
              id: "place-prmnl",
              is_beginning?: false,
              is_terminus?: false,
              name: "Prudential",
              route: @route_green_e,
              connections: []
            }
          ]
        },
        %RouteStops{
          branch: "Green-D",
          stops: [
            %RouteStop{
              branch: "Green-D",
              id: "place-river",
              is_beginning?: true,
              is_terminus?: true,
              name: "Riverside",
              route: @route_green_d,
              connections: []
            },
            %RouteStop{
              branch: "Green-D",
              id: "place-fenwy",
              is_beginning?: false,
              is_terminus?: false,
              name: "Fenway",
              route: @route_green_d,
              connections: []
            },
            %RouteStop{
              branch: nil,
              id: "place-kencl",
              is_beginning?: false,
              is_terminus?: false,
              name: "Kenmore",
              route: @route_green_d,
              connections: []
            },
            %RouteStop{
              branch: nil,
              id: "place-hymnl",
              is_beginning?: false,
              is_terminus?: false,
              name: "Hynes Convention Center",
              route: @route_green_d,
              connections: []
            },
            %RouteStop{
              branch: nil,
              id: "place-coecl",
              is_beginning?: false,
              is_terminus?: false,
              name: "Copley",
              route: @route_green_d,
              connections: []
            },
            %RouteStop{
              branch: nil,
              id: "place-armnl",
              is_beginning?: false,
              is_terminus?: false,
              name: "Arlington",
              route: @route_green_d,
              connections: []
            },
            %RouteStop{
              branch: nil,
              id: "place-boyls",
              is_beginning?: false,
              is_terminus?: false,
              name: "Boylston",
              route: @route_green_d,
              connections: []
            },
            %RouteStop{
              branch: nil,
              id: "place-pktrm",
              is_beginning?: false,
              is_terminus?: false,
              name: "Park Street",
              route: @route_green_d,
              connections: []
            },
            %RouteStop{
              branch: nil,
              id: "place-gover",
              is_beginning?: false,
              is_terminus?: true,
              name: "Government Center",
              route: @route_green_d,
              connections: []
            }
          ]
        },
        %RouteStops{
          branch: "Green-C",
          stops: [
            %RouteStop{
              branch: "Green-C",
              id: "place-clmnl",
              is_beginning?: true,
              is_terminus?: true,
              name: "Cleveland Circle",
              route: @route_green_c,
              connections: []
            },
            %RouteStop{
              branch: "Green-C",
              id: "place-smary",
              is_beginning?: false,
              is_terminus?: false,
              name: "Saint Marys Street",
              route: @route_green_c,
              connections: []
            },
            %RouteStop{
              branch: nil,
              id: "place-kencl",
              is_beginning?: false,
              is_terminus?: false,
              name: "Kenmore",
              route: @route_green_c,
              connections: []
            },
            %RouteStop{
              branch: nil,
              id: "place-hymnl",
              is_beginning?: false,
              is_terminus?: false,
              name: "Hynes Convention Center",
              route: @route_green_c,
              connections: []
            }
          ]
        },
        %RouteStops{
          branch: "Green-B",
          stops: [
            %RouteStop{
              branch: "Green-B",
              id: "place-lake",
              is_beginning?: true,
              is_terminus?: true,
              name: "Boston College",
              route: @route_green_b,
              connections: []
            },
            %RouteStop{
              branch: "Green-B",
              id: "place-bland",
              is_beginning?: false,
              is_terminus?: false,
              name: "Blandford Street",
              route: @route_green_b,
              connections: []
            },
            %RouteStop{
              branch: nil,
              id: "place-kencl",
              is_beginning?: false,
              is_terminus?: false,
              name: "Kenmore",
              route: @route_green_b,
              connections: []
            },
            %RouteStop{
              branch: nil,
              id: "place-hymnl",
              is_beginning?: false,
              is_terminus?: false,
              name: "Hynes Convention Center",
              route: @route_green_b,
              connections: []
            },
            %RouteStop{
              branch: nil,
              id: "place-coecl",
              is_beginning?: false,
              is_terminus?: false,
              name: "Copley",
              route: @route_green_b,
              connections: []
            },
            %RouteStop{
              branch: nil,
              id: "place-armnl",
              is_beginning?: false,
              is_terminus?: false,
              name: "Arlington",
              route: @route_green_b,
              connections: []
            },
            %RouteStop{
              branch: nil,
              id: "place-boyls",
              is_beginning?: false,
              is_terminus?: false,
              name: "Boylston",
              route: @route_green_b,
              connections: []
            },
            %RouteStop{
              branch: nil,
              id: "place-pktrm",
              is_beginning?: false,
              is_terminus?: true,
              name: "Park Street",
              route: @route_green_b,
              connections: []
            }
          ]
        }
      ]

      assert [
               {
                 [{"Green-B", :terminus}],
                 %RouteStop{id: "place-lake"}
               },
               {
                 [{"Green-B", :stop}],
                 %RouteStop{id: "place-bland"}
               },
               {
                 [{"Green-B", :line}, {"Green-C", :terminus}],
                 %RouteStop{id: "place-clmnl"}
               },
               {
                 [{"Green-B", :line}, {"Green-C", :stop}],
                 %RouteStop{id: "place-smary"}
               },
               {
                 [{"Green-B", :line}, {"Green-C", :line}, {"Green-D", :terminus}],
                 %RouteStop{id: "place-river"}
               },
               {
                 [{"Green-B", :line}, {"Green-C", :line}, {"Green-D", :stop}],
                 %RouteStop{id: "place-fenwy"}
               },
               {
                 [{"Green-B", :merge}, {"Green-C", :merge}, {"Green-D", :merge}],
                 %RouteStop{id: "place-kencl"}
               },
               {
                 [nil: :stop],
                 %RouteStop{id: "place-hymnl"}
               },
               {
                 [{nil, :line}, {"Green-E", :terminus}],
                 %RouteStop{id: "place-hsmnl"}
               },
               {
                 [{nil, :line}, {"Green-E", :stop}],
                 %RouteStop{id: "place-prmnl"}
               },
               {
                 [{nil, :merge}, {"Green-E", :merge}],
                 %RouteStop{id: "place-coecl"}
               },
               {
                 [nil: :stop],
                 %RouteStop{id: "place-armnl"}
               },
               {
                 [nil: :stop],
                 %RouteStop{id: "place-boyls"}
               },
               {
                 [nil: :stop],
                 %RouteStop{id: "place-pktrm"}
               },
               {
                 [nil: :stop],
                 %Stops.RouteStop{id: "place-gover"}
               }
             ] = DiagramHelpers.build_stop_list(branches, 1)
    end
  end

  describe "build_stop_list/2 for Green Line" do
    defp stop_id({_branches, stop_id}), do: stop_id
    defp branches({branches, _stop_id}), do: branches

    test "direction 0 returns a list of all stops in order from east to west" do
      route_stops = Helpers.get_route_stops("Green", 0, @deps.stops_by_route_fn)

      stops =
        "Green"
        |> Helpers.get_shapes_by_direction(0, 0)
        |> Helpers.get_branches(route_stops, %Routes.Route{id: "Green"}, 0)
        |> DiagramHelpers.build_stop_list(0)
        |> Enum.map(fn {branches, stop} -> {branches, stop.id} end)

      for {id, idx} <- [
            {"place-unsqu", 0},
            {"place-north", 3},
            {"place-gover", 5},
            {"place-pktrm", 6},
            {"place-coecl", 9},
            {"place-hsmnl", 20},
            {"place-river", 35},
            {"place-clmnl", 48},
            {"place-lake", 64}
          ] do
        assert stops |> Enum.at(idx) |> elem(1) == id
      end
    end

    test "direction 0 returns the correct number of bubbles for each stop" do
      route_stops = Helpers.get_route_stops("Green", 0, @deps.stops_by_route_fn)

      stops =
        "Green"
        |> Helpers.get_shapes_by_direction(0, 0)
        |> Helpers.get_branches(route_stops, %Routes.Route{id: "Green"}, 0)
        |> DiagramHelpers.build_stop_list(0)
        |> Enum.map(fn {branches, stop} -> {branches, stop.id} end)

      [trunk, e, hynes, bcd_combined, bc_combined, b] =
        Enum.chunk_by(stops, fn {branches, _stop} -> Enum.count(branches) end)

      assert Enum.all?(trunk, &(&1 |> branches() |> length() == 1))
      assert trunk |> List.first() |> stop_id() == "place-unsqu"
      assert trunk |> List.last() |> stop_id() == "place-armnl"

      # E branch + merge
      assert Enum.all?(e, &(&1 |> branches() |> length() == 2))
      assert e |> List.first() |> stop_id() == "place-coecl"
      assert e |> List.last() |> stop_id() == "place-hsmnl"

      assert Enum.all?(hynes, &(&1 |> branches() |> length() == 1))
      assert length(hynes) == 1
      assert hynes |> List.first() |> stop_id() == "place-hymnl"

      assert Enum.all?(bcd_combined, &(&1 |> branches() |> length() == 3))
      assert bcd_combined |> List.first() |> stop_id() == "place-kencl"
      assert bcd_combined |> List.last() |> stop_id() == "place-river"

      assert Enum.all?(bc_combined, &(&1 |> branches() |> length() == 2))
      assert bc_combined |> List.first() |> stop_id() == "place-smary"
      assert bc_combined |> List.last() |> stop_id() == "place-clmnl"

      assert Enum.all?(b, &(&1 |> branches() |> length() == 1))
      assert b |> List.first() |> stop_id() == "place-bland"
      assert b |> List.last() |> stop_id() == "place-lake"
    end

    test "direction 0 handles an empty list of stops" do
      stops =
        [
          %Stops.RouteStops{branch: "Green-E", stops: []},
          %Stops.RouteStops{branch: "Green-D", stops: []},
          %Stops.RouteStops{branch: "Green-C", stops: []},
          %Stops.RouteStops{branch: "Green-B", stops: []}
        ]
        |> DiagramHelpers.build_stop_list(0)

      assert stops == []
    end

    test "direction 1 returns a list of all stops in order from west to east" do
      direction_id = 1

      route_stops = Helpers.get_route_stops("Green", direction_id, @deps.stops_by_route_fn)

      stops =
        "Green"
        |> Helpers.get_shapes_by_direction(0, direction_id)
        |> Helpers.get_branches(route_stops, %Routes.Route{id: "Green"}, direction_id)
        |> DiagramHelpers.build_stop_list(direction_id)
        |> Enum.map(fn {branches, stop} -> {branches, stop.id} end)

      # As of June 2020, Lechmere has been closed so the commented line will make the test fail.
      # We are temporarily adding the fix but this will need to be undone later on.
      for {id, idx} <- [
            # {"place-lech", 64},
            # As of Aug 2022, the Green Line past Government Center is temporarily suspended.
            # {"place-north", 61},
            {"place-gover", 59},
            {"place-pktrm", 58},
            {"place-coecl", 55},
            {"place-hsmnl", 44},
            {"place-river", 29},
            {"place-clmnl", 16},
            {"place-lake", 0}
          ] do
        assert stops |> Enum.at(idx) |> elem(1) == id
      end
    end

    @tag skip: "Will soon be refactored away with new line diagram code"
    test "direction 1 returns the correct number of bubbles for each stop" do
      route_stops = Helpers.get_route_stops("Green", 0, @deps.stops_by_route_fn)

      stops =
        "Green"
        |> Helpers.get_shapes_by_direction(0, 1)
        |> Helpers.get_branches(route_stops, %Routes.Route{id: "Green"}, 1)
        |> DiagramHelpers.build_stop_list(1)
        |> Enum.map(fn {branches, stop} -> {branches, stop.id} end)

      chunked = Enum.chunk_by(stops, fn {branches, _stop} -> Enum.count(branches) end)

      assert [b, bc_combined, bcd_combined, hynes, e, trunk] = chunked

      assert Enum.all?(b, &(&1 |> branches() |> length() == 1))
      assert b |> List.first() |> stop_id() == "place-lake"
      assert b |> List.last() |> stop_id() == "place-bland"

      assert Enum.all?(bc_combined, &(&1 |> branches() |> length() == 2))
      assert bc_combined |> List.first() |> stop_id() == "place-clmnl"
      assert bc_combined |> List.last() |> stop_id() == "place-smary"

      assert Enum.all?(bcd_combined, &(&1 |> branches() |> length() == 3))
      assert bcd_combined |> List.first() |> stop_id() == "place-river"
      assert bcd_combined |> List.last() |> stop_id() == "place-kencl"

      assert Enum.all?(hynes, &(&1 |> branches() |> length() == 1))
      assert length(hynes) == 1
      assert hynes |> List.first() |> stop_id() == "place-hymnl"

      # E branch + merge
      assert Enum.all?(e, &(&1 |> branches() |> length() == 2))
      assert e |> List.first() |> stop_id() == "place-hsmnl"
      assert e |> List.last() |> stop_id() == "place-coecl"

      assert Enum.all?(trunk, &(&1 |> branches() |> length() == 1))
      assert trunk |> List.first() |> stop_id() == "place-armnl"
      assert trunk |> List.last() |> stop_id() == "place-unsqu"
    end
  end

  describe "build_stop_list/2 for branched non-Green routes" do
    test "Red direction 0" do
      direction_id = 0
      route_stops = Helpers.get_route_stops("Red", direction_id, @deps.stops_by_route_fn)

      stops =
        "Red"
        |> Helpers.get_shapes_by_direction(1, direction_id)
        |> Helpers.get_branches(route_stops, %Routes.Route{id: "Red"}, direction_id)
        |> DiagramHelpers.build_stop_list(direction_id)
        |> Enum.map(fn {branches, stop} -> {branches, stop.id} end)

      for {id, idx} <- [
            {"place-alfcl", 0},
            {"place-jfk", 12},
            {"place-brntn", -5},
            {"place-asmnl", -1}
          ] do
        assert stops |> Enum.at(idx) |> elem(1) == id
      end
    end

    test "direction 0 returns the correct number of bubbles for each stop" do
      direction_id = 0
      route_stops = Helpers.get_route_stops("Red", direction_id, @deps.stops_by_route_fn)

      stops =
        "Red"
        |> Helpers.get_shapes_by_direction(1, direction_id)
        |> Helpers.get_branches(route_stops, %Routes.Route{id: "Red"}, direction_id)
        |> DiagramHelpers.build_stop_list(direction_id)
        |> Enum.map(fn {branches, stop} -> {branches, stop.id} end)

      [one, two, another_one] =
        Enum.chunk_by(stops, fn {branches, _stop} -> Enum.count(branches) end)

      assert Enum.each(one, &(Enum.count(branches(&1)) == 1))
      assert stop_id(List.first(one)) == "place-alfcl"
      assert stop_id(List.last(one)) == "place-andrw"

      assert Enum.each(two, &(Enum.count(branches(&1)) == 2))
      assert stop_id(List.first(two)) == "place-jfk"
      assert stop_id(List.last(two)) == "place-brntn"

      assert Enum.each(another_one, &(Enum.count(branches(&1)) == 1))
      assert stop_id(List.first(another_one)) == "place-shmnl"
      assert stop_id(List.last(another_one)) == "place-asmnl"
    end

    test "Red direction 1" do
      direction_id = 1
      route_stops = Helpers.get_route_stops("Red", direction_id, @deps.stops_by_route_fn)

      stops =
        "Red"
        |> Helpers.get_shapes_by_direction(1, direction_id)
        |> Helpers.get_branches(route_stops, %Routes.Route{id: "Red"}, direction_id)
        |> DiagramHelpers.build_stop_list(direction_id)
        |> Enum.map(fn {branches, stop} -> {branches, stop.id} end)

      for {id, idx} <- [
            {"place-alfcl", -1},
            {"place-jfk", -13},
            {"place-brntn", 4},
            {"place-asmnl", 0}
          ] do
        assert stops |> Enum.at(idx) |> elem(1) == id
      end
    end

    test "direction 1 returns the correct number of bubbles for each stop" do
      direction_id = 1
      route_stops = Helpers.get_route_stops("Red", direction_id, @deps.stops_by_route_fn)

      stops =
        "Red"
        |> Helpers.get_shapes_by_direction(1, 1)
        |> Helpers.get_branches(route_stops, %Routes.Route{id: "Red"}, direction_id)
        |> DiagramHelpers.build_stop_list(direction_id)
        |> Enum.map(fn {branches, stop} -> {branches, stop.id} end)

      [another_one, two, one] =
        Enum.chunk_by(stops, fn {branches, _stop} -> Enum.count(branches) end)

      assert Enum.each(another_one, &(Enum.count(branches(&1)) == 1))
      assert stop_id(List.first(another_one)) == "place-asmnl"
      assert stop_id(List.last(another_one)) == "place-shmnl"

      assert Enum.each(two, &(Enum.count(branches(&1)) == 2))
      assert stop_id(List.first(two)) == "place-brntn"
      assert stop_id(List.last(two)) == "place-jfk"

      assert Enum.each(one, &(Enum.count(branches(&1)) == 1))
      assert stop_id(List.first(one)) == "place-andrw"
      assert stop_id(List.last(one)) == "place-alfcl"
    end

    @tag skip: "FIXME: Failing due to missing Forest Hills stop"
    test "CR-Providence outbound" do
      route_stops = Helpers.get_route_stops("CR-Providence", 0, @deps.stops_by_route_fn)

      stops =
        "CR-Providence"
        |> Helpers.get_shapes_by_direction(2, 0)
        |> Helpers.get_branches(route_stops, %Routes.Route{id: "CR-Providence"}, 0)
        |> DiagramHelpers.build_stop_list(0)
        |> Enum.map(fn {branches, stop} -> {branches, stop.id} end)

      for {id, idx} <- [
            {"place-sstat", 0},
            {"place-NEC-2173", 5},
            {"place-SB-0156", 7},
            {"place-NEC-2108", 9}
          ] do
        assert stops |> Enum.at(idx) |> elem(1) == id
      end
    end
  end

  describe "stop_bubble_type/2" do
    test "copley" do
      stop = %RouteStop{id: "place-coecl"}
      assert DiagramHelpers.stop_bubble_type("Green-B", stop) == {"Green-B", :stop}
      assert DiagramHelpers.stop_bubble_type("Green-C", stop) == {"Green-C", :stop}
      assert DiagramHelpers.stop_bubble_type("Green-D", stop) == {"Green-D", :stop}
      assert DiagramHelpers.stop_bubble_type("Green-E", stop) == {"Green-E", :stop}
    end
  end

  describe "build_branched_stop" do
    test "unbranched stops that aren't first or last in list are just :stop" do
      stop = %RouteStop{id: "mock"}
      branches = {nil, []}
      branch_length = 3

      bubbles = [{nil, :stop}]

      assert DiagramHelpers.build_branched_stop({stop, false}, [], branches, branch_length) ==
               [{bubbles, stop}]
    end

    test "builds stop bubble information for a merge stop (merge stops are hard-coded)" do
      stop = %RouteStop{id: "place-coecl"}
      branches = {nil, GreenLine.branch_ids()}

      bubbles = [
        {nil, :merge},
        {"Green-E", :merge}
      ]

      assert DiagramHelpers.build_branched_stop(stop, [], branches) == [{bubbles, stop}]
    end

    test "builds stop bubble information for a stop marked as a terminus" do
      stop = %RouteStop{id: "mock", is_terminus?: true}
      branches = {nil, []}
      branch_length = 3

      bubbles = [{nil, :terminus}]

      assert DiagramHelpers.build_branched_stop({stop, false}, [], branches, branch_length) ==
               [{bubbles, stop}]
    end

    test "a terminus on a one-stop trunk is a merge" do
      stop = %RouteStop{id: "new", branch: nil, is_terminus?: true}
      branch_length = 1

      assert DiagramHelpers.build_branched_stop(
               {stop, true},
               [],
               {nil, ["branch 1", "branch 2"]},
               branch_length
             ) ==
               [
                 {[{"branch 1", :merge}, {"branch 2", :merge}], stop}
               ]

      assert DiagramHelpers.build_branched_stop(
               {stop, false},
               [],
               {nil, ["branch 1", "branch 2"]},
               branch_length
             ) == [
               {[{"branch 1", :merge}, {"branch 2", :merge}], stop}
             ]
    end

    test "a terminus not on a branch (but also not the ONLY stop on a branch) is always a terminus" do
      stop = %RouteStop{id: "new", branch: nil, is_terminus?: true}
      branch_length = 3

      assert DiagramHelpers.build_branched_stop({stop, true}, [], {nil, []}, branch_length) == [
               {[{nil, :terminus}], stop}
             ]

      assert DiagramHelpers.build_branched_stop({stop, false}, [], {nil, []}, branch_length) == [
               {[{nil, :terminus}], stop}
             ]
    end

    test "non-terminus in unbranched stops is a merge stop when it's first or last in list" do
      new_stop = %RouteStop{id: "new"}
      branch_length = 3

      result =
        DiagramHelpers.build_branched_stop(
          {new_stop, true},
          [],
          {nil, ["branch 1", "branch 2"]},
          branch_length
        )

      assert result == [{[{"branch 1", :merge}, {"branch 2", :merge}], new_stop}]
    end

    test "branched terminus includes :terminus in stop bubbles" do
      new_stop = %RouteStop{id: "new", branch: "branch 1", is_terminus?: true}
      branch_length = 3

      result =
        DiagramHelpers.build_branched_stop(
          {new_stop, false},
          [],
          {"branch 1", ["branch 1", "branch 2"]},
          branch_length
        )

      assert result == [{[{"branch 1", :terminus}, {"branch 2", :line}], new_stop}]
    end

    test "builds stop bubble information for several hard-coded Green line stops" do
      unsqu = %RouteStop{id: "place-unsqu"}
      lech = %RouteStop{id: "place-lech"}
      spmnl = %RouteStop{id: "place-spmnl"}
      north = %RouteStop{id: "place-north"}
      coecl = %RouteStop{id: "place-coecl"}
      kencl = %RouteStop{id: "place-kencl"}

      branches = {nil, GreenLine.branch_ids()}

      assert DiagramHelpers.build_branched_stop(unsqu, [], branches) == [
               {[{"Green-D", :terminus}], unsqu}
             ]

      assert DiagramHelpers.build_branched_stop(lech, [], branches) == [
               {[{"Green-E", :terminus}], lech}
             ]

      assert DiagramHelpers.build_branched_stop(spmnl, [], branches) == [
               {[{"Green-E", :stop}], spmnl}
             ]

      assert DiagramHelpers.build_branched_stop(north, [], branches) == [{[{nil, :stop}], north}]

      assert DiagramHelpers.build_branched_stop(coecl, [], branches) == [
               {[{nil, :merge}, {"Green-E", :merge}], coecl}
             ]

      assert DiagramHelpers.build_branched_stop(kencl, [], branches) == [
               {[{"Green-B", :merge}, {"Green-C", :merge}, {"Green-D", :merge}], kencl}
             ]
    end

    test "builds 'stop' stop bubbles for Green line stops" do
      stop = %RouteStop{id: "place-bland", branch: "Green-B"}
      branches = {nil, GreenLine.branch_ids()}

      bubbles = [{"Green-B", :stop}]

      assert DiagramHelpers.build_branched_stop(stop, [], branches) ==
               [{bubbles, stop}]
    end

    test "builds 'terminus' stop bubbles for Green line termini" do
      assert GreenLine.terminus?("place-hsmnl", "Green-E")
      stop = %RouteStop{id: "place-hsmnl", branch: "Green-E", is_terminus?: true}
      branches = {nil, GreenLine.branch_ids()}

      bubbles = [
        {nil, :line},
        {"Green-E", :terminus}
      ]

      assert DiagramHelpers.build_branched_stop(stop, [], branches) == [{bubbles, stop}]
    end
  end

  describe "build_branched_stop_list" do
    test "returns stops in reverse order for both directions when branch is nil" do
      stops =
        ["first", "middle", "last"]
        |> Util.EnumHelpers.with_first_last()
        |> Enum.map(fn {stop_id, is_terminus?} ->
          %RouteStop{id: stop_id, is_terminus?: is_terminus?}
        end)

      outbound =
        DiagramHelpers.build_branched_stop_list(%RouteStops{branch: nil, stops: stops}, {[], []})

      inbound =
        DiagramHelpers.build_branched_stop_list(%RouteStops{branch: nil, stops: stops}, {[], []})

      assert outbound == inbound
      assert {[last, middle, first], []} = outbound
      assert last == {[{nil, :terminus}], %RouteStop{id: "last", is_terminus?: true}}
      assert middle == {[{nil, :stop}], %RouteStop{id: "middle", is_terminus?: false}}
      assert first == {[{nil, :terminus}], %RouteStop{id: "first", is_terminus?: true}}
    end
  end
end
