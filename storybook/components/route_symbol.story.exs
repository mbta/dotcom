defmodule DotcomWeb.Storybook.RouteSymbol do
  use PhoenixStorybook.Story, :component

  alias Routes.Route

  def function do
    &DotcomWeb.Components.RouteSymbols.route_symbol/1
  end

  def variations do
    [
      %Variation{
        id: :blue_line,
        description: "Subway Blue Line",
        attributes: %{
          route: %Route{type: 1, id: "Blue"}
        }
      },
      %Variation{
        id: :green_line,
        description: "Subway Green Line",
        attributes: %{
          route: %Route{type: 1, id: "Green"}
        }
      },
      %Variation{
        id: :green_line_b,
        description: "Subway Green Line B Branch",
        attributes: %{
          route: %Route{type: 1, id: "Green-B"}
        }
      },
      %Variation{
        id: :green_line_c,
        description: "Subway Green Line C Branch",
        attributes: %{
          route: %Route{type: 1, id: "Green-C"}
        }
      },
      %Variation{
        id: :green_line_d,
        description: "Subway Green Line D Branch",
        attributes: %{
          route: %Route{type: 1, id: "Green-D"}
        }
      },
      %Variation{
        id: :green_line_e,
        description: "Subway Green Line E Branch",
        attributes: %{
          route: %Route{type: 1, id: "Green-E"}
        }
      },
      %Variation{
        id: :orange_line,
        description: "Subway Orange Line",
        attributes: %{
          route: %Route{type: 1, id: "Orange"}
        }
      },
      %Variation{
        id: :red_line,
        description: "Subway Red Line",
        attributes: %{
          route: %Route{type: 1, id: "Red"}
        }
      },
      %Variation{
        id: :mattapan_line,
        description: "Subway Mattapan Line",
        attributes: %{
          route: %Route{type: 1, id: "Mattapan"}
        }
      },
      %Variation{
        id: :bus,
        description: "Bus route icon",
        attributes: %{
          route: %Route{type: 3, name: "39"}
        }
      },
      %Variation{
        id: :silver_line,
        description: "Silver Line route icon",
        attributes: %{
          route: %Route{type: 3, id: "741", name: "SL1"}
        }
      },
      %Variation{
        id: :commuter_rail,
        description: "Commuter Rail route icon",
        attributes: %{
          route: %Route{type: 2}
        }
      },
      %Variation{
        id: :ferry,
        description: "Ferry route icon",
        attributes: %{
          route: %Route{type: 4}
        }
      },
      %Variation{
        id: :massport_shuttle,
        description: "Massport shuttle route icon",
        attributes: %{
          route: %Route{external_agency_name: "Massport", name: "33"}
        }
      },
      %Variation{
        id: :logan_express_bb,
        description: "Logan Express - Back Bay",
        attributes: %{
          route: %Route{external_agency_name: "Logan Express", name: "BB"}
        }
      },
      %Variation{
        id: :logan_express_bt,
        description: "Logan Express - Braintree",
        attributes: %{
          route: %Route{external_agency_name: "Logan Express", name: "BT"}
        }
      },
      %Variation{
        id: :logan_express_dv,
        description: "Logan Express - Danvers",
        attributes: %{
          route: %Route{external_agency_name: "Logan Express", name: "DV"}
        }
      },
      %Variation{
        id: :logan_express_wo,
        description: "Logan Express - Worcester",
        attributes: %{
          route: %Route{external_agency_name: "Logan Express", name: "WO"}
        }
      }
    ]
  end
end
