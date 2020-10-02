defmodule V3Api.MockRoutes do
  @moduledoc """
  A mock Routes API client for testing purposes.
  """

  @behaviour V3Api.RoutesApi

  alias JsonApi.Item

  @red %Item{
    attributes: %{
      "color" => "DA291C",
      "description" => "Rapid Transit",
      "direction_destinations" => ["Ashmont/Braintree", "Alewife"],
      "direction_names" => ["South", "North"],
      "fare_class" => "Rapid Transit",
      "long_name" => "Red Line",
      "short_name" => "",
      "sort_order" => 10_010,
      "text_color" => "FFFFFF",
      "type" => 1
    },
    id: "Red",
    relationships: %{
      "line" => [
        %JsonApi.Item{
          attributes: nil,
          id: "line-Red",
          relationships: nil,
          type: "line"
        }
      ],
      "route_patterns" => []
    },
    type: "route"
  }

  @mattapan %Item{
    attributes: %{
      "color" => "DA291C",
      "description" => "Rapid Transit",
      "direction_destinations" => ["Mattapan", "Ashmont"],
      "direction_names" => ["Outbound", "Inbound"],
      "fare_class" => "Rapid Transit",
      "long_name" => "Mattapan Trolley",
      "short_name" => "",
      "sort_order" => 10_011,
      "text_color" => "FFFFFF",
      "type" => 0
    },
    id: "Mattapan",
    relationships: %{
      "line" => [
        %JsonApi.Item{
          attributes: nil,
          id: "line-Mattapan",
          relationships: nil,
          type: "line"
        }
      ],
      "route_patterns" => []
    },
    type: "route"
  }

  @orange %Item{
    attributes: %{
      "color" => "ED8B00",
      "description" => "Rapid Transit",
      "direction_destinations" => ["Forest Hills", "Oak Grove"],
      "direction_names" => ["South", "North"],
      "fare_class" => "Rapid Transit",
      "long_name" => "Orange Line",
      "short_name" => "",
      "sort_order" => 10_020,
      "text_color" => "FFFFFF",
      "type" => 1
    },
    id: "Orange",
    relationships: %{
      "line" => [
        %JsonApi.Item{
          attributes: nil,
          id: "line-Orange",
          relationships: nil,
          type: "line"
        }
      ],
      "route_patterns" => []
    },
    type: "route"
  }

  @green_b %Item{
    attributes: %{
      "color" => "00843D",
      "description" => "Rapid Transit",
      "direction_destinations" => ["Boston College", "Park Street"],
      "direction_names" => ["West", "East"],
      "fare_class" => "Rapid Transit",
      "long_name" => "Green Line B",
      "short_name" => "B",
      "sort_order" => 10_032,
      "text_color" => "FFFFFF",
      "type" => 0
    },
    id: "Green-B",
    relationships: %{
      "line" => [
        %JsonApi.Item{
          attributes: nil,
          id: "line-Green",
          relationships: nil,
          type: "line"
        }
      ],
      "route_patterns" => []
    },
    type: "route"
  }

  @green_c %Item{
    attributes: %{
      "color" => "00843D",
      "description" => "Rapid Transit",
      "direction_destinations" => ["Cleveland Circle", "North Station"],
      "direction_names" => ["West", "East"],
      "fare_class" => "Rapid Transit",
      "long_name" => "Green Line C",
      "short_name" => "C",
      "sort_order" => 10_033,
      "text_color" => "FFFFFF",
      "type" => 0
    },
    id: "Green-C",
    relationships: %{
      "line" => [
        %JsonApi.Item{
          attributes: nil,
          id: "line-Green",
          relationships: nil,
          type: "line"
        }
      ],
      "route_patterns" => []
    },
    type: "route"
  }

  @green_d %Item{
    attributes: %{
      "color" => "00843D",
      "description" => "Rapid Transit",
      "direction_destinations" => ["Riverside", "Government Center"],
      "direction_names" => ["West", "East"],
      "fare_class" => "Rapid Transit",
      "long_name" => "Green Line D",
      "short_name" => "D",
      "sort_order" => 10_034,
      "text_color" => "FFFFFF",
      "type" => 0
    },
    id: "Green-D",
    relationships: %{
      "line" => [
        %JsonApi.Item{
          attributes: nil,
          id: "line-Green",
          relationships: nil,
          type: "line"
        }
      ],
      "route_patterns" => []
    },
    type: "route"
  }

  @green_e %Item{
    attributes: %{
      "color" => "00843D",
      "description" => "Rapid Transit",
      "direction_destinations" => ["Heath Street", "North Station"],
      "direction_names" => ["West", "East"],
      "fare_class" => "Rapid Transit",
      "long_name" => "Green Line E",
      "short_name" => "E",
      "sort_order" => 10_035,
      "text_color" => "FFFFFF",
      "type" => 0
    },
    id: "Green-E",
    relationships: %{
      "line" => [
        %JsonApi.Item{
          attributes: nil,
          id: "line-Green",
          relationships: nil,
          type: "line"
        }
      ],
      "route_patterns" => []
    },
    type: "route"
  }

  @blue %Item{
    attributes: %{
      "color" => "003DA5",
      "description" => "Rapid Transit",
      "direction_destinations" => ["Bowdoin", "Wonderland"],
      "direction_names" => ["West", "East"],
      "fare_class" => "Rapid Transit",
      "long_name" => "Blue Line",
      "short_name" => "",
      "sort_order" => 10_040,
      "text_color" => "FFFFFF",
      "type" => 1
    },
    id: "Blue",
    relationships: %{
      "line" => [
        %JsonApi.Item{
          attributes: nil,
          id: "line-Blue",
          relationships: nil,
          type: "line"
        }
      ],
      "route_patterns" => []
    },
    type: "route"
  }

  @fairmount %Item{
    attributes: %{
      "color" => "80276C",
      "description" => "Commuter Rail",
      "direction_destinations" => ["Fairmount", "South Station"],
      "direction_names" => ["Outbound", "Inbound"],
      "fare_class" => "Commuter Rail",
      "long_name" => "Fairmount Line",
      "short_name" => "",
      "sort_order" => 20_001,
      "text_color" => "FFFFFF",
      "type" => 2
    },
    id: "CR-Fairmount",
    relationships: %{
      "line" => [
        %JsonApi.Item{
          attributes: nil,
          id: "line-Fairmount",
          relationships: nil,
          type: "line"
        }
      ],
      "route_patterns" => []
    },
    type: "route"
  }

  @fitchburg %Item{
    attributes: %{
      "color" => "80276C",
      "description" => "Commuter Rail",
      "direction_destinations" => ["Wachusett", "North Station"],
      "direction_names" => ["Outbound", "Inbound"],
      "fare_class" => "Commuter Rail",
      "long_name" => "Fitchburg Line",
      "short_name" => "",
      "sort_order" => 20_002,
      "text_color" => "FFFFFF",
      "type" => 2
    },
    id: "CR-Fitchburg",
    relationships: %{
      "line" => [
        %JsonApi.Item{
          attributes: nil,
          id: "line-Fitchburg",
          relationships: nil,
          type: "line"
        }
      ],
      "route_patterns" => []
    },
    type: "route"
  }

  @foxboro %Item{
    attributes: %{
      "color" => "80276C",
      "description" => "Commuter Rail",
      "direction_destinations" => ["Foxboro or Providence", "South Station or Foxboro"],
      "direction_names" => ["Outbound", "Inbound"],
      "fare_class" => "Commuter Rail",
      "long_name" => "Foxboro Event Service",
      "short_name" => "",
      "sort_order" => 20_013,
      "text_color" => "FFFFFF",
      "type" => 2
    },
    id: "CR-Foxboro",
    relationships: %{
      "line" => [
        %JsonApi.Item{
          attributes: nil,
          id: "line-Foxboro",
          relationships: nil,
          type: "line"
        }
      ],
      "route_patterns" => []
    },
    type: "route"
  }

  @franklin %Item{
    attributes: %{
      "color" => "80276C",
      "description" => "Commuter Rail",
      "direction_destinations" => ["Forge Park/495 or Foxboro", "South Station"],
      "direction_names" => ["Outbound", "Inbound"],
      "fare_class" => "Commuter Rail",
      "long_name" => "Franklin Line/Foxboro Pilot",
      "short_name" => "",
      "sort_order" => 20_004,
      "text_color" => "FFFFFF",
      "type" => 2
    },
    id: "CR-Franklin",
    relationships: %{
      "line" => [
        %JsonApi.Item{
          attributes: nil,
          id: "line-Franklin",
          relationships: nil,
          type: "line"
        }
      ],
      "route_patterns" => []
    },
    type: "route"
  }

  @greenbush %Item{
    attributes: %{
      "color" => "80276C",
      "description" => "Commuter Rail",
      "direction_destinations" => ["Greenbush", "South Station"],
      "direction_names" => ["Outbound", "Inbound"],
      "fare_class" => "Commuter Rail",
      "long_name" => "Greenbush Line",
      "short_name" => "",
      "sort_order" => 20_005,
      "text_color" => "FFFFFF",
      "type" => 2
    },
    id: "CR-Greenbush",
    relationships: %{
      "line" => [
        %JsonApi.Item{
          attributes: nil,
          id: "line-Greenbush",
          relationships: nil,
          type: "line"
        }
      ],
      "route_patterns" => []
    },
    type: "route"
  }

  @haverhill %Item{
    attributes: %{
      "color" => "80276C",
      "description" => "Commuter Rail",
      "direction_destinations" => ["Haverhill", "North Station"],
      "direction_names" => ["Outbound", "Inbound"],
      "fare_class" => "Commuter Rail",
      "long_name" => "Haverhill Line",
      "short_name" => "",
      "sort_order" => 20_006,
      "text_color" => "FFFFFF",
      "type" => 2
    },
    id: "CR-Haverhill",
    relationships: %{
      "line" => [
        %JsonApi.Item{
          attributes: nil,
          id: "line-Haverhill",
          relationships: nil,
          type: "line"
        }
      ],
      "route_patterns" => []
    },
    type: "route"
  }

  @kingston %Item{
    attributes: %{
      "color" => "80276C",
      "description" => "Commuter Rail",
      "direction_destinations" => ["Kingston or Plymouth", "South Station"],
      "direction_names" => ["Outbound", "Inbound"],
      "fare_class" => "Commuter Rail",
      "long_name" => "Kingston/Plymouth Line",
      "short_name" => "",
      "sort_order" => 20_007,
      "text_color" => "FFFFFF",
      "type" => 2
    },
    id: "CR-Kingston",
    relationships: %{
      "line" => [
        %JsonApi.Item{
          attributes: nil,
          id: "line-Kingston",
          relationships: nil,
          type: "line"
        }
      ],
      "route_patterns" => []
    },
    type: "route"
  }

  @lowell %Item{
    attributes: %{
      "color" => "80276C",
      "description" => "Commuter Rail",
      "direction_destinations" => ["Lowell", "North Station"],
      "direction_names" => ["Outbound", "Inbound"],
      "fare_class" => "Commuter Rail",
      "long_name" => "Lowell Line",
      "short_name" => "",
      "sort_order" => 20_008,
      "text_color" => "FFFFFF",
      "type" => 2
    },
    id: "CR-Lowell",
    relationships: %{
      "line" => [
        %JsonApi.Item{
          attributes: nil,
          id: "line-Lowell",
          relationships: nil,
          type: "line"
        }
      ],
      "route_patterns" => []
    },
    type: "route"
  }

  @middleborough %Item{
    attributes: %{
      "color" => "80276C",
      "description" => "Commuter Rail",
      "direction_destinations" => ["Middleborough/Lakeville", "South Station"],
      "direction_names" => ["Outbound", "Inbound"],
      "fare_class" => "Commuter Rail",
      "long_name" => "Middleborough/Lakeville Line",
      "short_name" => "",
      "sort_order" => 20_009,
      "text_color" => "FFFFFF",
      "type" => 2
    },
    id: "CR-Middleborough",
    relationships: %{
      "line" => [
        %JsonApi.Item{
          attributes: nil,
          id: "line-Middleborough",
          relationships: nil,
          type: "line"
        }
      ],
      "route_patterns" => []
    },
    type: "route"
  }

  @needham %Item{
    attributes: %{
      "color" => "80276C",
      "description" => "Commuter Rail",
      "direction_destinations" => ["Needham Heights", "South Station"],
      "direction_names" => ["Outbound", "Inbound"],
      "fare_class" => "Commuter Rail",
      "long_name" => "Needham Line",
      "short_name" => "",
      "sort_order" => 20_010,
      "text_color" => "FFFFFF",
      "type" => 2
    },
    id: "CR-Needham",
    relationships: %{
      "line" => [
        %JsonApi.Item{
          attributes: nil,
          id: "line-Needham",
          relationships: nil,
          type: "line"
        }
      ],
      "route_patterns" => []
    },
    type: "route"
  }

  @newburyport %Item{
    attributes: %{
      "color" => "80276C",
      "description" => "Commuter Rail",
      "direction_destinations" => ["Newburyport or Rockport", "North Station"],
      "direction_names" => ["Outbound", "Inbound"],
      "fare_class" => "Commuter Rail",
      "long_name" => "Newburyport/Rockport Line",
      "short_name" => "",
      "sort_order" => 20_011,
      "text_color" => "FFFFFF",
      "type" => 2
    },
    id: "CR-Newburyport",
    relationships: %{
      "line" => [
        %JsonApi.Item{
          attributes: nil,
          id: "line-Newburyport",
          relationships: nil,
          type: "line"
        }
      ],
      "route_patterns" => []
    },
    type: "route"
  }

  @providence %Item{
    attributes: %{
      "color" => "80276C",
      "description" => "Commuter Rail",
      "direction_destinations" => ["Stoughton or Wickford Junction", "South Station"],
      "direction_names" => ["Outbound", "Inbound"],
      "fare_class" => "Commuter Rail",
      "long_name" => "Providence/Stoughton Line",
      "short_name" => "",
      "sort_order" => 20_012,
      "text_color" => "FFFFFF",
      "type" => 2
    },
    id: "CR-Providence",
    relationships: %{
      "line" => [
        %JsonApi.Item{
          attributes: nil,
          id: "line-Providence",
          relationships: nil,
          type: "line"
        }
      ],
      "route_patterns" => []
    },
    type: "route"
  }

  @worcester %Item{
    attributes: %{
      "color" => "80276C",
      "description" => "Commuter Rail",
      "direction_destinations" => ["Worcester", "South Station"],
      "direction_names" => ["Outbound", "Inbound"],
      "fare_class" => "Commuter Rail",
      "long_name" => "Framingham/Worcester Line",
      "short_name" => "",
      "sort_order" => 20_003,
      "text_color" => "FFFFFF",
      "type" => 2
    },
    id: "CR-Worcester",
    relationships: %{
      "line" => [
        %JsonApi.Item{
          attributes: nil,
          id: "line-Worcester",
          relationships: nil,
          type: "line"
        }
      ],
      "route_patterns" => []
    },
    type: "route"
  }

  @bus1 %Item{
    attributes: %{
      "color" => "FFC72C",
      "description" => "Key Bus",
      "direction_destinations" => ["Harvard Square", "Nubian Station"],
      "direction_names" => ["Outbound", "Inbound"],
      "fare_class" => "Local Bus",
      "long_name" => "Harvard Square - Nubian Station",
      "short_name" => "1",
      "sort_order" => 50_010,
      "text_color" => "000000",
      "type" => 3
    },
    id: "1",
    relationships: %{
      "line" => [
        %JsonApi.Item{
          attributes: nil,
          id: "line-1",
          relationships: nil,
          type: "line"
        }
      ],
      "route_patterns" => []
    },
    type: "route"
  }

  @bus8 %Item{
    attributes: %{
      "color" => "FFC72C",
      "description" => "Local Bus",
      "direction_destinations" => ["Harbor Point", "Kenmore Station"],
      "direction_names" => ["Outbound", "Inbound"],
      "fare_class" => "Local Bus",
      "long_name" => "Harbor Point - Kenmore Station",
      "short_name" => "8",
      "sort_order" => 50_080,
      "text_color" => "000000",
      "type" => 3
    },
    id: "8",
    relationships: %{
      "line" => [
        %JsonApi.Item{
          attributes: nil,
          id: "line-8",
          relationships: nil,
          type: "line"
        }
      ],
      "route_patterns" => []
    },
    type: "route"
  }

  @bus9 %Item{
    attributes: %{
      "color" => "FFC72C",
      "description" => "Local Bus",
      "direction_destinations" => ["City Point", "Copley Station"],
      "direction_names" => ["Outbound", "Inbound"],
      "fare_class" => "Local Bus",
      "long_name" => "City Point - Copley Station",
      "short_name" => "9",
      "sort_order" => 50_090,
      "text_color" => "000000",
      "type" => 3
    },
    id: "9",
    relationships: %{
      "line" => [
        %JsonApi.Item{
          attributes: nil,
          id: "line-9",
          relationships: nil,
          type: "line"
        }
      ],
      "route_patterns" => []
    },
    type: "route"
  }

  @bus10 %Item{
    attributes: %{
      "color" => "FFC72C",
      "description" => "Local Bus",
      "direction_destinations" => ["City Point", "Copley Square"],
      "direction_names" => ["Outbound", "Inbound"],
      "fare_class" => "Local Bus",
      "long_name" => "City Point - Copley Square",
      "short_name" => "10",
      "sort_order" => 50_100,
      "text_color" => "000000",
      "type" => 3
    },
    id: "10",
    relationships: %{
      "line" => [
        %JsonApi.Item{
          attributes: nil,
          id: "line-10",
          relationships: nil,
          type: "line"
        }
      ],
      "route_patterns" => []
    },
    type: "route"
  }

  @bus19 %Item{
    attributes: %{
      "color" => "FFC72C",
      "description" => "Local Bus",
      "direction_destinations" => ["Fields Corner Station", "Kenmore or Ruggles Station"],
      "direction_names" => ["Outbound", "Inbound"],
      "fare_class" => "Local Bus",
      "long_name" => "Fields Corner Station - Kenmore or Ruggles Station",
      "short_name" => "19",
      "sort_order" => 50_190,
      "text_color" => "000000",
      "type" => 3
    },
    id: "19",
    relationships: %{
      "line" => [
        %JsonApi.Item{
          attributes: nil,
          id: "line-1719",
          relationships: nil,
          type: "line"
        }
      ],
      "route_patterns" => []
    },
    type: "route"
  }

  @bus23 %Item{
    attributes: %{
      "color" => "FFC72C",
      "description" => "Key Bus",
      "direction_destinations" => ["Ashmont Station", "Ruggles Station"],
      "direction_names" => ["Outbound", "Inbound"],
      "fare_class" => "Local Bus",
      "long_name" => "Ashmont Station - Ruggles Station via Washington Street",
      "short_name" => "23",
      "sort_order" => 50_230,
      "text_color" => "000000",
      "type" => 3
    },
    id: "23",
    relationships: %{
      "line" => [
        %JsonApi.Item{
          attributes: nil,
          id: "line-23",
          relationships: nil,
          type: "line"
        }
      ],
      "route_patterns" => []
    },
    type: "route"
  }

  @bus2427 %Item{
    attributes: %{
      "color" => "FFC72C",
      "description" => "Local Bus",
      "direction_destinations" => ["Wakefield Avenue & Truman Parkway", "Mattapan Station"],
      "direction_names" => ["Outbound", "Inbound"],
      "fare_class" => "Local Bus",
      "long_name" => "Wakefield Avenue & Truman Parkway - Mattapan Station",
      "short_name" => "24/27",
      "sort_order" => 50_241,
      "text_color" => "000000",
      "type" => 3
    },
    id: "2427",
    relationships: %{
      "line" => [
        %JsonApi.Item{
          attributes: nil,
          id: "line-242733",
          relationships: nil,
          type: "line"
        }
      ],
      "route_patterns" => []
    },
    type: "route"
  }

  @bus28 %Item{
    attributes: %{
      "color" => "FFC72C",
      "description" => "Key Bus",
      "direction_destinations" => ["Mattapan Station", "Ruggles Station"],
      "direction_names" => ["Outbound", "Inbound"],
      "fare_class" => "Local Bus",
      "long_name" => "Mattapan Station - Ruggles Station",
      "short_name" => "28",
      "sort_order" => 50_280,
      "text_color" => "000000",
      "type" => 3
    },
    id: "28",
    relationships: %{
      "line" => [
        %JsonApi.Item{
          attributes: nil,
          id: "line-28",
          relationships: nil,
          type: "line"
        }
      ],
      "route_patterns" => []
    },
    type: "route"
  }

  @bus39 %Item{
    attributes: %{
      "color" => "FFC72C",
      "description" => "Key Bus",
      "direction_destinations" => ["Forest Hills Station", "Back Bay Station"],
      "direction_names" => ["Outbound", "Inbound"],
      "fare_class" => "Local Bus",
      "long_name" => "Forest Hills Station - Back Bay Station",
      "short_name" => "39",
      "sort_order" => 50_390,
      "text_color" => "000000",
      "type" => 3
    },
    id: "39",
    relationships: %{
      "line" => [
        %JsonApi.Item{
          attributes: nil,
          id: "line-39",
          relationships: nil,
          type: "line"
        }
      ],
      "route_patterns" => []
    },
    type: "route"
  }

  @bus43 %Item{
    attributes: %{
      "color" => "FFC72C",
      "description" => "Local Bus",
      "direction_destinations" => ["Ruggles  Station", "Park Street Station"],
      "direction_names" => ["Outbound", "Inbound"],
      "fare_class" => "Local Bus",
      "long_name" => "Ruggles  Station - Park Street Station",
      "short_name" => "43",
      "sort_order" => 50_430,
      "text_color" => "000000",
      "type" => 3
    },
    id: "43",
    relationships: %{
      "line" => [
        %JsonApi.Item{
          attributes: nil,
          id: "line-43",
          relationships: nil,
          type: "line"
        }
      ],
      "route_patterns" => []
    },
    type: "route"
  }

  @bus47 %Item{
    attributes: %{
      "color" => "FFC72C",
      "description" => "Local Bus",
      "direction_destinations" => ["Central Square, Cambridge", "Broadway Station"],
      "direction_names" => ["Outbound", "Inbound"],
      "fare_class" => "Local Bus",
      "long_name" => "Central Square, Cambridge - Broadway Station",
      "short_name" => "47",
      "sort_order" => 50_470,
      "text_color" => "000000",
      "type" => 3
    },
    id: "47",
    relationships: %{
      "line" => [
        %JsonApi.Item{
          attributes: nil,
          id: "line-47",
          relationships: nil,
          type: "line"
        }
      ],
      "route_patterns" => []
    },
    type: "route"
  }

  @bus57 %Item{
    attributes: %{
      "color" => "FFC72C",
      "description" => "Key Bus",
      "direction_destinations" => ["Watertown Yard", "Kenmore Station"],
      "direction_names" => ["Outbound", "Inbound"],
      "fare_class" => "Local Bus",
      "long_name" => "Watertown Yard - Kenmore Station",
      "short_name" => "57",
      "sort_order" => 50_570,
      "text_color" => "000000",
      "type" => 3
    },
    id: "57",
    relationships: %{
      "line" => [
        %JsonApi.Item{
          attributes: nil,
          id: "line-5757A",
          relationships: nil,
          type: "line"
        }
      ],
      "route_patterns" => []
    },
    type: "route"
  }

  @bus57a %Item{
    attributes: %{
      "color" => "FFC72C",
      "description" => "Local Bus",
      "direction_destinations" => ["Oak Square", "Kenmore Station"],
      "direction_names" => ["Outbound", "Inbound"],
      "fare_class" => "Local Bus",
      "long_name" => "Oak Square - Kenmore Station",
      "short_name" => "57A",
      "sort_order" => 50_571,
      "text_color" => "000000",
      "type" => 3
    },
    id: "57A",
    relationships: %{
      "line" => [
        %JsonApi.Item{
          attributes: nil,
          id: "line-5757A",
          relationships: nil,
          type: "line"
        }
      ],
      "route_patterns" => []
    },
    type: "route"
  }

  @bus60 %Item{
    attributes: %{
      "color" => "FFC72C",
      "description" => "Local Bus",
      "direction_destinations" => ["Chestnut Hill", "Kenmore Station"],
      "direction_names" => ["Outbound", "Inbound"],
      "fare_class" => "Local Bus",
      "long_name" => "Chestnut Hill - Kenmore Station",
      "short_name" => "60",
      "sort_order" => 50_600,
      "text_color" => "000000",
      "type" => 3
    },
    id: "60",
    relationships: %{
      "line" => [
        %JsonApi.Item{
          attributes: nil,
          id: "line-6065",
          relationships: nil,
          type: "line"
        }
      ],
      "route_patterns" => []
    },
    type: "route"
  }

  @bus65 %Item{
    attributes: %{
      "color" => "FFC72C",
      "description" => "Local Bus",
      "direction_destinations" => ["Brighton Center", "Kenmore Station"],
      "direction_names" => ["Outbound", "Inbound"],
      "fare_class" => "Local Bus",
      "long_name" => "Brighton Center - Kenmore Station",
      "short_name" => "65",
      "sort_order" => 50_650,
      "text_color" => "000000",
      "type" => 3
    },
    id: "65",
    relationships: %{
      "line" => [
        %JsonApi.Item{
          attributes: nil,
          id: "line-6065",
          relationships: nil,
          type: "line"
        }
      ],
      "route_patterns" => []
    },
    type: "route"
  }

  @bus66 %Item{
    attributes: %{
      "color" => "FFC72C",
      "description" => "Key Bus",
      "direction_destinations" => ["Harvard Square", "Nubian Station"],
      "direction_names" => ["Outbound", "Inbound"],
      "fare_class" => "Local Bus",
      "long_name" => "Harvard Square - Nubian Station",
      "short_name" => "66",
      "sort_order" => 50_660,
      "text_color" => "000000",
      "type" => 3
    },
    id: "66",
    relationships: %{
      "line" => [
        %JsonApi.Item{
          attributes: nil,
          id: "line-66",
          relationships: nil,
          type: "line"
        }
      ],
      "route_patterns" => []
    },
    type: "route"
  }

  @bus67 %Item{
    attributes: %{
      "color" => "FFC72C",
      "description" => "Local Bus",
      "direction_destinations" => ["Turkey Hill", "Alewife Station"],
      "direction_names" => ["Outbound", "Inbound"],
      "fare_class" => "Local Bus",
      "long_name" => "Turkey Hill - Alewife Station",
      "short_name" => "67",
      "sort_order" => 50_670,
      "text_color" => "000000",
      "type" => 3
    },
    id: "67",
    relationships: %{
      "line" => [
        %JsonApi.Item{
          attributes: nil,
          id: "line-6779",
          relationships: nil,
          type: "line"
        }
      ],
      "route_patterns" => []
    },
    type: "route"
  }

  @bus77 %Item{
    attributes: %{
      "color" => "FFC72C",
      "description" => "Key Bus",
      "direction_destinations" => ["Arlington Heights", "Harvard Station"],
      "direction_names" => ["Outbound", "Inbound"],
      "fare_class" => "Local Bus",
      "long_name" => "Arlington Heights - Harvard Station",
      "short_name" => "77",
      "sort_order" => 50_770,
      "text_color" => "000000",
      "type" => 3
    },
    id: "77",
    relationships: %{
      "line" => [
        %JsonApi.Item{
          attributes: nil,
          id: "line-77",
          relationships: nil,
          type: "line"
        }
      ],
      "route_patterns" => []
    },
    type: "route"
  }

  @bus83 %Item{
    attributes: %{
      "color" => "FFC72C",
      "description" => "Local Bus",
      "direction_destinations" => ["Rindge Avenue", "Central Square, Cambridge"],
      "direction_names" => ["Outbound", "Inbound"],
      "fare_class" => "Local Bus",
      "long_name" => "Rindge Avenue - Central Square, Cambridge",
      "short_name" => "83",
      "sort_order" => 50_830,
      "text_color" => "000000",
      "type" => 3
    },
    id: "83",
    relationships: %{
      "line" => [
        %JsonApi.Item{
          attributes: nil,
          id: "line-83",
          relationships: nil,
          type: "line"
        }
      ],
      "route_patterns" => []
    },
    type: "route"
  }

  @bus195 %Item{
    attributes: %{
      "color" => "FFC72C",
      "description" => "Supplemental Bus",
      "direction_destinations" => ["Lemuel Shattuck Hospital", "Park Street & Tremont Street"],
      "direction_names" => ["Outbound", "Inbound"],
      "fare_class" => "Local Bus",
      "long_name" => "Lemuel Shattuck Hospital - Park Street & Tremont Street",
      "short_name" => "195",
      "sort_order" => 51_950,
      "text_color" => "000000",
      "type" => 3
    },
    id: "195",
    relationships: %{
      "line" => [
        %JsonApi.Item{
          attributes: nil,
          id: "line-195",
          relationships: nil,
          type: "line"
        }
      ],
      "route_patterns" => []
    },
    type: "route"
  }

  @bus210 %Item{
    attributes: %{
      "color" => "FFC72C",
      "description" => "Local Bus",
      "direction_destinations" => ["Quincy Center Station", "Fields Corner Station"],
      "direction_names" => ["Outbound", "Inbound"],
      "fare_class" => "Local Bus",
      "long_name" => "Quincy Center Station - Fields Corner Station",
      "short_name" => "210",
      "sort_order" => 52_100,
      "text_color" => "000000",
      "type" => 3
    },
    id: "210",
    relationships: %{
      "line" => [
        %JsonApi.Item{
          attributes: nil,
          id: "line-210211212",
          relationships: nil,
          type: "line"
        }
      ],
      "route_patterns" => []
    },
    type: "route"
  }

  @bus326 %Item{
    attributes: %{
      "color" => "FFC72C",
      "description" => "Commuter Bus",
      "direction_destinations" => ["West Medford", "Haymarket Station"],
      "direction_names" => ["Outbound", "Inbound"],
      "fare_class" => "Inner Express",
      "long_name" => "West Medford - Haymarket Station",
      "short_name" => "326",
      "sort_order" => 53_260,
      "text_color" => "000000",
      "type" => 3
    },
    id: "326",
    relationships: %{
      "line" => [
        %JsonApi.Item{
          attributes: nil,
          id: "line-325326",
          relationships: nil,
          type: "line"
        }
      ],
      "route_patterns" => []
    },
    type: "route"
  }

  @bus352 %Item{
    attributes: %{
      "color" => "FFC72C",
      "description" => "Commuter Bus",
      "direction_destinations" => ["North Burlington", "State Street, Boston"],
      "direction_names" => ["Outbound", "Inbound"],
      "fare_class" => "Outer Express",
      "long_name" => "North Burlington - State Street, Boston",
      "short_name" => "352",
      "sort_order" => 53_520,
      "text_color" => "000000",
      "type" => 3
    },
    id: "352",
    relationships: %{
      "line" => [
        %JsonApi.Item{
          attributes: nil,
          id: "line-352",
          relationships: nil,
          type: "line"
        }
      ],
      "route_patterns" => []
    },
    type: "route"
  }

  @bus424 %Item{
    attributes: %{
      "color" => "FFC72C",
      "description" => "Commuter Bus",
      "direction_destinations" => ["Eastern Avenue & Essex Street", "Wonderland Station"],
      "direction_names" => ["Outbound", "Inbound"],
      "fare_class" => "Local Bus",
      "long_name" => "Eastern Avenue & Essex Street - Wonderland Station",
      "short_name" => "424",
      "sort_order" => 54_240,
      "text_color" => "000000",
      "type" => 3
    },
    id: "424",
    relationships: %{
      "line" => [
        %JsonApi.Item{
          attributes: nil,
          id: "line-424450456",
          relationships: nil,
          type: "line"
        }
      ],
      "route_patterns" => []
    },
    type: "route"
  }

  @bus501 %Item{
    attributes: %{
      "color" => "FFC72C",
      "description" => "Commuter Bus",
      "direction_destinations" => ["Brighton Center", "Federal Street & Franklin Street"],
      "direction_names" => ["Outbound", "Inbound"],
      "fare_class" => "Inner Express",
      "long_name" => "Brighton Center - Federal Street & Franklin Street",
      "short_name" => "501",
      "sort_order" => 55_010,
      "text_color" => "000000",
      "type" => 3
    },
    id: "501",
    relationships: %{
      "line" => [
        %JsonApi.Item{
          attributes: nil,
          id: "line-501503",
          relationships: nil,
          type: "line"
        }
      ],
      "route_patterns" => []
    },
    type: "route"
  }

  @bus504 %Item{
    attributes: %{
      "color" => "FFC72C",
      "description" => "Commuter Bus",
      "direction_destinations" => ["Watertown Yard", "Federal Street & Franklin Street"],
      "direction_names" => ["Outbound", "Inbound"],
      "fare_class" => "Inner Express",
      "long_name" => "Watertown Yard - Federal Street & Franklin Street",
      "short_name" => "504",
      "sort_order" => 55_040,
      "text_color" => "000000",
      "type" => 3
    },
    id: "504",
    relationships: %{
      "line" => [
        %JsonApi.Item{
          attributes: nil,
          id: "line-502504",
          relationships: nil,
          type: "line"
        }
      ],
      "route_patterns" => []
    },
    type: "route"
  }

  @bus505 %Item{
    attributes: %{
      "color" => "FFC72C",
      "description" => "Commuter Bus",
      "direction_destinations" => ["Waltham Center", "Federal Street & Franklin Street"],
      "direction_names" => ["Outbound", "Inbound"],
      "fare_class" => "Outer Express",
      "long_name" => "Waltham Center - Federal Street & Franklin Street",
      "short_name" => "505",
      "sort_order" => 55_050,
      "text_color" => "000000",
      "type" => 3
    },
    id: "505",
    relationships: %{
      "line" => [
        %JsonApi.Item{
          attributes: nil,
          id: "line-505553554",
          relationships: nil,
          type: "line"
        }
      ],
      "route_patterns" => []
    },
    type: "route"
  }

  @sl1 %Item{
    attributes: %{
      "color" => "7C878E",
      "description" => "Key Bus",
      "direction_destinations" => ["Logan Airport Terminals", "South Station"],
      "direction_names" => ["Outbound", "Inbound"],
      "fare_class" => "Rapid Transit",
      "long_name" => "Logan Airport Terminals - South Station",
      "short_name" => "SL1",
      "sort_order" => 10_051,
      "text_color" => "FFFFFF",
      "type" => 3
    },
    id: "741",
    relationships: %{
      "line" => [
        %JsonApi.Item{
          attributes: nil,
          id: "line-SLWaterfront",
          relationships: nil,
          type: "line"
        }
      ],
      "route_patterns" => []
    },
    type: "route"
  }

  @sl2 %Item{
    attributes: %{
      "color" => "7C878E",
      "description" => "Key Bus",
      "direction_destinations" => ["Drydock Avenue", "South Station"],
      "direction_names" => ["Outbound", "Inbound"],
      "fare_class" => "Rapid Transit",
      "long_name" => "Drydock Avenue - South Station",
      "short_name" => "SL2",
      "sort_order" => 10_052,
      "text_color" => "FFFFFF",
      "type" => 3
    },
    id: "742",
    relationships: %{
      "line" => [
        %JsonApi.Item{
          attributes: nil,
          id: "line-SLWaterfront",
          relationships: nil,
          type: "line"
        }
      ],
      "route_patterns" => []
    },
    type: "route"
  }

  @sl3 %Item{
    attributes: %{
      "color" => "7C878E",
      "description" => "Key Bus",
      "direction_destinations" => ["Chelsea Station", "South Station"],
      "direction_names" => ["Outbound", "Inbound"],
      "fare_class" => "Rapid Transit",
      "long_name" => "Chelsea Station - South Station",
      "short_name" => "SL3",
      "sort_order" => 10_053,
      "text_color" => "FFFFFF",
      "type" => 3
    },
    id: "743",
    relationships: %{
      "line" => [
        %JsonApi.Item{
          attributes: nil,
          id: "line-SLWaterfront",
          relationships: nil,
          type: "line"
        }
      ],
      "route_patterns" => []
    },
    type: "route"
  }

  @slw %Item{
    attributes: %{
      "color" => "7C878E",
      "description" => "Key Bus",
      "direction_destinations" => ["Silver Line Way", "South Station"],
      "direction_names" => ["Outbound", "Inbound"],
      "fare_class" => "Rapid Transit",
      "long_name" => "Silver Line Way - South Station",
      "short_name" => "SLW",
      "sort_order" => 10_057,
      "text_color" => "FFFFFF",
      "type" => 3
    },
    id: "746",
    relationships: %{
      "line" => [
        %JsonApi.Item{
          attributes: nil,
          id: "line-SLWaterfront",
          relationships: nil,
          type: "line"
        }
      ],
      "route_patterns" => []
    },
    type: "route"
  }

  @sl5 %Item{
    attributes: %{
      "color" => "7C878E",
      "description" => "Key Bus",
      "direction_destinations" => ["Nubian Station", "Temple Place"],
      "direction_names" => ["Outbound", "Inbound"],
      "fare_class" => "Local Bus",
      "long_name" => "Nubian Station - Temple Place",
      "short_name" => "SL5",
      "sort_order" => 10_056,
      "text_color" => "FFFFFF",
      "type" => 3
    },
    id: "749",
    relationships: %{
      "line" => [
        %JsonApi.Item{
          attributes: nil,
          id: "line-SLWashington",
          relationships: nil,
          type: "line"
        }
      ],
      "route_patterns" => []
    },
    type: "route"
  }

  @sl4 %Item{
    attributes: %{
      "color" => "7C878E",
      "description" => "Key Bus",
      "direction_destinations" => ["Nubian Station", "South Station"],
      "direction_names" => ["Outbound", "Inbound"],
      "fare_class" => "Local Bus",
      "long_name" => "Nubian Station - South Station",
      "short_name" => "SL4",
      "sort_order" => 10_055,
      "text_color" => "FFFFFF",
      "type" => 3
    },
    id: "751",
    relationships: %{
      "line" => [
        %JsonApi.Item{
          attributes: nil,
          id: "line-SLWashington",
          relationships: nil,
          type: "line"
        }
      ],
      "route_patterns" => []
    },
    type: "route"
  }

  @impl V3Api.RoutesApi
  def all(opts \\ [])

  def all(_) do
    %JsonApi{
      data: [
        @red,
        @mattapan,
        @orange,
        @green_b,
        @green_c,
        @green_d,
        @green_e,
        @blue,
        @fairmount,
        @fitchburg,
        @foxboro,
        @franklin,
        @greenbush,
        @haverhill,
        @kingston,
        @lowell,
        @middleborough,
        @needham,
        @newburyport,
        @providence,
        @worcester,
        @bus1,
        @bus8,
        @bus9,
        @bus10,
        @bus19,
        @bus23,
        @bus2427,
        @bus28,
        @bus39,
        @bus43,
        @bus47,
        @bus57,
        @bus57a,
        @bus60,
        @bus65,
        @bus66,
        @bus67,
        @bus77,
        @bus83,
        @bus195,
        @bus210,
        @bus326,
        @bus352,
        @bus424,
        @bus501,
        @bus504,
        @bus505,
        @sl1,
        @sl2,
        @sl3,
        @slw,
        @sl5,
        @sl4
      ]
    }
  end

  @impl V3Api.RoutesApi
  def get(id, opts \\ [])
  def get("Red", _), do: %JsonApi{data: [@red]}
  def get("Orange", _), do: %JsonApi{data: [@orange]}
  def get("Green-B", _), do: %JsonApi{data: [@green_b]}
  def get("Green-C", _), do: %JsonApi{data: [@green_c]}
  def get("Green-D", _), do: %JsonApi{data: [@green_d]}
  def get("Green-E", _), do: %JsonApi{data: [@green_e]}
  def get("Blue", _), do: %JsonApi{data: [@blue]}
  def get("Mattapan", _), do: %JsonApi{data: [@mattapan]}
  def get("CR-Fairmount", _), do: %JsonApi{data: [@fairmount]}
  def get("CR-Fitchburg", _), do: %JsonApi{data: [@fitchburg]}
  def get("CR-Foxboro", _), do: %JsonApi{data: [@foxboro]}
  def get("CR-Franklin", _), do: %JsonApi{data: [@franklin]}
  def get("CR-Greenbush", _), do: %JsonApi{data: [@greenbush]}
  def get("CR-Haverhill", _), do: %JsonApi{data: [@haverhill]}
  def get("CR-Kingston", _), do: %JsonApi{data: [@kingston]}
  def get("CR-Lowell", _), do: %JsonApi{data: [@lowell]}
  def get("CR-Middleborough", _), do: %JsonApi{data: [@middleborough]}
  def get("CR-Needham", _), do: %JsonApi{data: [@needham]}
  def get("CR-Newburyport", _), do: %JsonApi{data: [@newburyport]}
  def get("CR-Providence", _), do: %JsonApi{data: [@providence]}
  def get("CR-Worcester", _), do: %JsonApi{data: [@worcester]}
  def get("1", _), do: %JsonApi{data: [@bus1]}
  def get("8", _), do: %JsonApi{data: [@bus8]}
  def get("9", _), do: %JsonApi{data: [@bus9]}
  def get("10", _), do: %JsonApi{data: [@bus10]}
  def get("19", _), do: %JsonApi{data: [@bus19]}
  def get("23", _), do: %JsonApi{data: [@bus23]}
  def get("2427", _), do: %JsonApi{data: [@bus2427]}
  def get("28", _), do: %JsonApi{data: [@bus28]}
  def get("39", _), do: %JsonApi{data: [@bus39]}
  def get("43", _), do: %JsonApi{data: [@bus43]}
  def get("47", _), do: %JsonApi{data: [@bus47]}
  def get("57", _), do: %JsonApi{data: [@bus57]}
  def get("57A", _), do: %JsonApi{data: [@bus57a]}
  def get("60", _), do: %JsonApi{data: [@bus60]}
  def get("65", _), do: %JsonApi{data: [@bus65]}
  def get("66", _), do: %JsonApi{data: [@bus66]}
  def get("67", _), do: %JsonApi{data: [@bus67]}
  def get("77", _), do: %JsonApi{data: [@bus77]}
  def get("83", _), do: %JsonApi{data: [@bus83]}
  def get("195", _), do: %JsonApi{data: [@bus195]}
  def get("210", _), do: %JsonApi{data: [@bus210]}
  def get("326", _), do: %JsonApi{data: [@bus326]}
  def get("352", _), do: %JsonApi{data: [@bus352]}
  def get("424", _), do: %JsonApi{data: [@bus424]}
  def get("501", _), do: %JsonApi{data: [@bus501]}
  def get("504", _), do: %JsonApi{data: [@bus504]}
  def get("505", _), do: %JsonApi{data: [@bus505]}
  def get("741", _), do: %JsonApi{data: [@sl1]}
  def get("742", _), do: %JsonApi{data: [@sl2]}
  def get("743", _), do: %JsonApi{data: [@sl3]}
  def get("746", _), do: %JsonApi{data: [@slw]}
  def get("749", _), do: %JsonApi{data: [@sl5]}
  def get("751", _), do: %JsonApi{data: [@sl4]}

  def get(_, _),
    do:
      {:error,
       [
         %JsonApi.Error{
           code: "not_found",
           detail: nil,
           meta: %{},
           source: %{"parameter" => "id"}
         }
       ]}

  @impl V3Api.RoutesApi
  def by_type(type, opts \\ [])
  def by_type(_, _), do: %JsonApi{data: []}

  @impl V3Api.RoutesApi
  def by_stop(stop_id, opts \\ [])
  def by_stop("place-alfcl", _), do: %JsonApi{data: [@red, @bus67]}
  def by_stop("place-asmnl", _), do: %JsonApi{data: [@red, @mattapan, @bus23]}
  def by_stop("place-astao", _), do: %JsonApi{data: [@orange]}
  def by_stop("place-bbsta", _), do: %JsonApi{data: [@orange]}
  def by_stop("place-bmmnl", include: "route_patterns", type: 0), do: %JsonApi{data: []}
  def by_stop("place-bmmnl", _), do: %JsonApi{data: [@blue]}
  def by_stop("place-boyls", _), do: %JsonApi{data: [@green_b, @green_c, @green_d, @green_e]}
  def by_stop("place-brntn", _), do: %JsonApi{data: [@red, @kingston, @middleborough, @bus210]}
  def by_stop("place-ccmnl", _), do: %JsonApi{data: [@orange]}
  def by_stop("place-chncl", _), do: %JsonApi{data: [@orange]}
  def by_stop("place-dwnxg", _), do: %JsonApi{data: [@orange]}
  def by_stop("place-grnst", _), do: %JsonApi{data: [@orange]}
  def by_stop("place-haecl", _), do: %JsonApi{data: [@orange]}
  def by_stop("place-jaksn", _), do: %JsonApi{data: [@orange]}
  def by_stop("place-forhl", _), do: %JsonApi{data: [@orange]}

  def by_stop("place-jfk", _),
    do: %JsonApi{data: [@red, @greenbush, @kingston, @middleborough, @bus8]}

  def by_stop("place-kencl", include: "route_patterns", direction_id: 0),
    do: %JsonApi{
      data: [@green_b, @green_c, @green_d, @bus8, @bus19, @bus57, @bus57a, @bus60, @bus65]
    }

  def by_stop("place-kencl", include: "route_patterns", direction_id: 1),
    do: %JsonApi{
      data: [@green_b, @green_c, @green_d, @bus8, @bus9, @bus19, @bus57, @bus57a, @bus60, @bus65]
    }

  def by_stop("place-kencl", _),
    do: %JsonApi{
      data: [@green_b, @green_c, @green_d, @bus8, @bus9, @bus19, @bus57, @bus57a, @bus60, @bus65]
    }

  def by_stop("place-masta", _), do: %JsonApi{data: [@orange]}
  def by_stop("place-mlmnl", _), do: %JsonApi{data: [@orange]}
  def by_stop("place-north", _), do: %JsonApi{data: [@orange]}
  def by_stop("place-nqncy", _), do: %JsonApi{data: [@red, @bus210]}
  def by_stop("place-ogmnl", _), do: %JsonApi{data: [@orange]}

  def by_stop("place-pktrm", _),
    do: %JsonApi{data: [@red, @green_b, @green_c, @green_d, @green_e]}

  def by_stop("place-rcmnl", _), do: %JsonApi{data: [@orange]}
  def by_stop("place-rugg", _), do: %JsonApi{data: [@orange]}
  def by_stop("place-sbmnl", _), do: %JsonApi{data: [@orange]}

  def by_stop("place-sstat", _),
    do: %JsonApi{
      data: [
        @red,
        @sl1,
        @sl2,
        @sl3,
        @fairmount,
        @franklin,
        @greenbush,
        @kingston,
        @middleborough,
        @needham,
        @providence,
        @worcester
      ]
    }

  def by_stop("place-state", _), do: %JsonApi{data: [@orange]}
  def by_stop("place-sull", _), do: %JsonApi{data: [@orange]}
  def by_stop("place-tumnl", _), do: %JsonApi{data: [@orange]}
  def by_stop("place-welln", _), do: %JsonApi{data: [@orange]}

  def by_stop("46", include: "route_patterns", direction_id: 0), do: %JsonApi{data: []}
  def by_stop("46", include: "route_patterns", direction_id: 1), do: %JsonApi{data: [@bus10]}
  def by_stop("46", _), do: %JsonApi{data: [@bus10]}
  def by_stop("1241", _), do: %JsonApi{data: [@bus43]}
  def by_stop("1242", _), do: %JsonApi{data: [@bus43, @bus39]}
  def by_stop("6542", _), do: %JsonApi{data: [@bus501, @bus504]}
  def by_stop("6565", _), do: %JsonApi{data: [@sl4, @sl5]}
  def by_stop("8279", _), do: %JsonApi{data: [@sl5, @bus39, @bus57]}
  def by_stop("8281", _), do: %JsonApi{data: [@bus43]}
  def by_stop("9983", _), do: %JsonApi{data: [@bus39, @bus57]}
  def by_stop("49002", _), do: %JsonApi{data: [@sl4, @sl5]}
  def by_stop("70020", _), do: %JsonApi{data: [@orange]}
  def by_stop("71199", _), do: %JsonApi{data: [@green_b]}
  def by_stop(_, _), do: %JsonApi{data: []}

  @impl V3Api.RoutesApi
  def by_stop_and_direction(stop_id, direction_id, opts \\ [])

  def by_stop_and_direction("place-kencl", 0, _),
    do: %JsonApi{
      data: [@green_b, @green_c, @green_d, @bus8, @bus19, @bus57, @bus57a, @bus60, @bus65]
    }

  def by_stop_and_direction("place-kencl", 1, _),
    do: %JsonApi{
      data: [@green_b, @green_c, @green_d, @bus8, @bus9, @bus19, @bus57, @bus57a, @bus60, @bus65]
    }

  def by_stop_and_direction("1994", 0, _), do: %JsonApi{data: [@bus65, @bus66]}
  def by_stop_and_direction("1994", 1, _), do: %JsonApi{data: []}
  def by_stop_and_direction(_, _, _), do: %JsonApi{data: []}
end
