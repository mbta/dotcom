defmodule SiteWeb.ScheduleController.Line.DiagramHelpersTest do
  use ExUnit.Case, async: true

  alias Routes.Route
  alias SiteWeb.ScheduleController.Line.DiagramHelpers
  alias Stops.{RouteStop, RouteStops}

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
                 %RouteStop{id: "place-north"}
               },
               {
                 [nil: :stop],
                 %Stops.RouteStop{id: "place-haecl"}
               },
               {
                 [nil: :stop],
                 %Stops.RouteStop{id: "place-gover"}
               },
               {
                 [nil: :stop],
                 %Stops.RouteStop{id: "place-pktrm"}
               },
               {
                 [nil: :stop],
                 %Stops.RouteStop{id: "place-boyls"}
               },
               {
                 [nil: :stop],
                 %Stops.RouteStop{id: "place-armnl"}
               },
               {
                 [{nil, :merge}, {"Green-E", :merge}],
                 %Stops.RouteStop{id: "place-coecl"}
               },
               {
                 [{nil, :line}, {"Green-E", :stop}],
                 %Stops.RouteStop{id: "place-prmnl"}
               },
               {
                 [{nil, :line}, {"Green-E", :terminus}],
                 %Stops.RouteStop{id: "place-hsmnl"}
               },
               {
                 [nil: :stop],
                 %Stops.RouteStop{id: "place-hymnl"}
               },
               {
                 [{"Green-B", :merge}, {"Green-C", :merge}, {"Green-D", :merge}],
                 %Stops.RouteStop{id: "place-kencl"}
               },
               {
                 [{"Green-B", :line}, {"Green-C", :line}, {"Green-D", :stop}],
                 %Stops.RouteStop{id: "place-fenwy"}
               },
               {
                 [{"Green-B", :line}, {"Green-C", :line}, {"Green-D", :terminus}],
                 %Stops.RouteStop{id: "place-river"}
               },
               {
                 [{"Green-B", :line}, {"Green-C", :stop}],
                 %Stops.RouteStop{id: "place-smary"}
               },
               {
                 [{"Green-B", :line}, {"Green-C", :terminus}],
                 %Stops.RouteStop{id: "place-clmnl"}
               },
               {
                 [{"Green-B", :stop}],
                 %Stops.RouteStop{id: "place-bland"}
               },
               {
                 [{"Green-B", :terminus}],
                 %Stops.RouteStop{id: "place-lake"}
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
                 %Stops.RouteStop{id: "place-lake"}
               },
               {
                 [{"Green-B", :stop}],
                 %Stops.RouteStop{id: "place-bland"}
               },
               {
                 [{"Green-B", :line}, {"Green-C", :terminus}],
                 %Stops.RouteStop{id: "place-clmnl"}
               },
               {
                 [{"Green-B", :line}, {"Green-C", :stop}],
                 %Stops.RouteStop{id: "place-smary"}
               },
               {
                 [{"Green-B", :line}, {"Green-C", :line}, {"Green-D", :terminus}],
                 %Stops.RouteStop{id: "place-river"}
               },
               {
                 [{"Green-B", :line}, {"Green-C", :line}, {"Green-D", :stop}],
                 %Stops.RouteStop{id: "place-fenwy"}
               },
               {
                 [{"Green-B", :merge}, {"Green-C", :merge}, {"Green-D", :merge}],
                 %Stops.RouteStop{id: "place-kencl"}
               },
               {
                 [nil: :stop],
                 %Stops.RouteStop{id: "place-hymnl"}
               },
               {
                 [{nil, :line}, {"Green-E", :terminus}],
                 %Stops.RouteStop{id: "place-hsmnl"}
               },
               {
                 [{nil, :line}, {"Green-E", :stop}],
                 %Stops.RouteStop{id: "place-prmnl"}
               },
               {
                 [{nil, :merge}, {"Green-E", :merge}],
                 %Stops.RouteStop{id: "place-coecl"}
               },
               {
                 [nil: :stop],
                 %Stops.RouteStop{id: "place-armnl"}
               },
               {
                 [nil: :stop],
                 %Stops.RouteStop{id: "place-boyls"}
               },
               {
                 [nil: :stop],
                 %Stops.RouteStop{id: "place-pktrm"}
               },
               {
                 [nil: :stop],
                 %Stops.RouteStop{id: "place-gover"}
               }
             ] = DiagramHelpers.build_stop_list(branches, 1)
    end
  end
end
