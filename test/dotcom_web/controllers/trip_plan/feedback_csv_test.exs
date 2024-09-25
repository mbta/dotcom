defmodule DotcomWeb.TripPlan.FeedbackCSVTest do
  use DotcomWeb.ConnCase, async: true

  alias DotcomWeb.TripPlan.FeedbackCSV

  describe "rows/1" do
    test "accepts a list of maps, returns table with headers" do
      assert [
               "generated_time,itinerary_index,feedback_vote,feedback_long,mode_subway,mode_commuter_rail,mode_bus,mode_ferry,query_wheelchair,query_time_type,query_date_time,query_from,query_to,itinerary_0_accessible,itinerary_0_tag,itinerary_0_start_stop,itinerary_0_legs,itinerary_1_accessible,itinerary_1_tag,itinerary_1_start_stop,itinerary_1_legs,itinerary_2_accessible,itinerary_2_tag,itinerary_2_start_stop,itinerary_2_legs,itinerary_3_accessible,itinerary_3_tag,itinerary_3_start_stop,itinerary_3_legs,itinerary_4_accessible,itinerary_4_tag,itinerary_4_start_stop,itinerary_4_legs\r\n"
               | _
             ] = FeedbackCSV.rows([data()])
    end
  end

  describe "format_all/1" do
    test "returns a map" do
      map = FeedbackCSV.format_all(data())
      assert is_map(map)
      assert %{"mode_bus" => true} = map
      assert %{"itinerary_3_legs" => legs} = map
      assert %{"generated_time" => "2024-03-15 8:08PM"} = map
      assert %{"itinerary_1_start_stop" => "2024-03-15 4:10PM, 2024-03-15 4:36PM"} = map

      assert "North Station (id: 70026) to Downtown Crossing (id: 70020) via Orange route on trip 60455437;\nDowntown Crossing (id: 70020) to Downtown Crossing (id: 70077) via walking 137.74 meters:\n\tFollow signs for Red Line - Ashmont/Braintree;\n\tFollow signs for Red Line - Ashmont/Braintree;\n\tFollow signs for Orange Line - Oak Grove;\n\tFollow signs for Red Line - Ashmont/Braintree;\nDowntown Crossing (id: 70077) to South Station (id: 70079) via Red route on trip 60392519" =
               legs

      # no nested maps
      refute Enum.any?(map, fn {_, value} ->
               is_map(value)
             end)
    end
  end

  defp data do
    %{
      "query" => %{
        "wheelchair" => true,
        "to" => %{
          "stop_id" => "place-sstat",
          "name" => "South Station",
          "longitude" => -71.055242,
          "latitude" => 42.352271
        },
        "time_type" => "depart_at",
        "itineraries" => [
          %{
            "tag" => "earliest_arrival",
            "stop" => "2024-03-15T16:31:43.000-04:00",
            "start" => "2024-03-15T16:19:37.000-04:00",
            "legs" => [
              %{
                "to" => %{
                  "stop_id" => "118",
                  "name" => "Causeway St @ Medford St",
                  "longitude" => -71.059491,
                  "latitude" => 42.366283
                },
                "mode" => %{
                  "steps" => [
                    %{
                      "street_name" => "sidewalk",
                      "relative_direction" => "DEPART",
                      "distance" => 48.24,
                      "absolute_direction" => "NORTHEAST"
                    },
                    %{
                      "street_name" => "Lovejoy Wharf",
                      "relative_direction" => "RIGHT",
                      "distance" => 11.98,
                      "absolute_direction" => "SOUTHEAST"
                    },
                    %{
                      "street_name" => "Causeway Street",
                      "relative_direction" => "LEFT",
                      "distance" => 34.42,
                      "absolute_direction" => "NORTHEAST"
                    },
                    %{
                      "street_name" => "Medford Street",
                      "relative_direction" => "RIGHT",
                      "distance" => 11.87,
                      "absolute_direction" => "SOUTHEAST"
                    },
                    %{
                      "street_name" => "path",
                      "relative_direction" => "RIGHT",
                      "distance" => 9.7,
                      "absolute_direction" => "SOUTHWEST"
                    }
                  ],
                  "distance" => 116.22
                },
                "from" => %{
                  "stop_id" => "BNT-0000-B1",
                  "name" => "North Station - Causeway St opp Beverly St",
                  "longitude" => -71.060356,
                  "latitude" => 42.366034
                }
              },
              %{
                "to" => %{
                  "stop_id" => "6564",
                  "name" => "Summer St @ South Station - Red Line entrance",
                  "longitude" => -71.054774,
                  "latitude" => 42.352253
                },
                "mode" => %{
                  "trip_id" => "60166270",
                  "route" => %{
                    "id" => "4"
                  },
                  "intermediate_stop_ids" => [
                    "233",
                    "234",
                    "30235",
                    "236",
                    "2116"
                  ]
                },
                "from" => %{
                  "stop_id" => "118",
                  "name" => "Causeway St @ Medford St",
                  "longitude" => -71.059491,
                  "latitude" => 42.366283
                }
              },
              %{
                "to" => %{
                  "stop_id" => "NEC-2287-B",
                  "name" => "South Station - Atlantic Ave @ Summer St",
                  "longitude" => -71.055529,
                  "latitude" => 42.352293
                },
                "mode" => %{
                  "steps" => [
                    %{
                      "street_name" => "sidewalk",
                      "relative_direction" => "DEPART",
                      "distance" => 38.73,
                      "absolute_direction" => "NORTHWEST"
                    },
                    %{
                      "street_name" => "South Station - Main Entry, Dewey Square",
                      "relative_direction" => "ENTER_STATION",
                      "distance" => 0,
                      "absolute_direction" => "NORTH"
                    },
                    %{
                      "street_name" => "Bus Shuttle Outbound",
                      "relative_direction" => "FOLLOW_SIGNS",
                      "distance" => 24.69,
                      "absolute_direction" => "WEST"
                    }
                  ],
                  "distance" => 63.41
                },
                "from" => %{
                  "stop_id" => "6564",
                  "name" => "Summer St @ South Station - Red Line entrance",
                  "longitude" => -71.054774,
                  "latitude" => 42.352253
                }
              }
            ],
            "accessible?" => true
          },
          %{
            "tag" => "most_direct",
            "stop" => "2024-03-15T16:36:22.000-04:00",
            "start" => "2024-03-15T16:10:00.000-04:00",
            "legs" => [
              %{
                "to" => %{
                  "stop_id" => "NEC-2287-B",
                  "name" => "South Station - Atlantic Ave @ Summer St",
                  "longitude" => -71.055529,
                  "latitude" => 42.352293
                },
                "mode" => %{
                  "steps" => [
                    %{
                      "street_name" => "path",
                      "relative_direction" => "DEPART",
                      "distance" => 93.09,
                      "absolute_direction" => "SOUTHEAST"
                    },
                    %{
                      "street_name" => "Haverhill Street",
                      "relative_direction" => "RIGHT",
                      "distance" => 7.01,
                      "absolute_direction" => "SOUTHEAST"
                    },
                    %{
                      "street_name" => "Valenti Way",
                      "relative_direction" => "LEFT",
                      "distance" => 37.13,
                      "absolute_direction" => "NORTHEAST"
                    },
                    %{
                      "street_name" => "path",
                      "relative_direction" => "RIGHT",
                      "distance" => 265.07,
                      "absolute_direction" => "SOUTHEAST"
                    },
                    %{
                      "street_name" => "path",
                      "relative_direction" => "RIGHT",
                      "distance" => 13.85,
                      "absolute_direction" => "SOUTHWEST"
                    },
                    %{
                      "street_name" => "New Sudbury Street",
                      "relative_direction" => "RIGHT",
                      "distance" => 28.52,
                      "absolute_direction" => "SOUTHWEST"
                    },
                    %{
                      "street_name" => "service road",
                      "relative_direction" => "LEFT",
                      "distance" => 8.69,
                      "absolute_direction" => "SOUTHEAST"
                    },
                    %{
                      "street_name" => "sidewalk",
                      "relative_direction" => "RIGHT",
                      "distance" => 26.43,
                      "absolute_direction" => "SOUTHWEST"
                    },
                    %{
                      "street_name" => "sidewalk",
                      "relative_direction" => "LEFT",
                      "distance" => 109.53,
                      "absolute_direction" => "SOUTHEAST"
                    },
                    %{
                      "street_name" => "Hanover Street",
                      "relative_direction" => "RIGHT",
                      "distance" => 8.11,
                      "absolute_direction" => "SOUTHWEST"
                    },
                    %{
                      "street_name" => "Congress Street",
                      "relative_direction" => "LEFT",
                      "distance" => 457.48,
                      "absolute_direction" => "SOUTHEAST"
                    },
                    %{
                      "street_name" => "path",
                      "relative_direction" => "RIGHT",
                      "distance" => 7.27,
                      "absolute_direction" => "WEST"
                    },
                    %{
                      "street_name" => "sidewalk",
                      "relative_direction" => "LEFT",
                      "distance" => 247.97,
                      "absolute_direction" => "SOUTH"
                    },
                    %{
                      "street_name" => "sidewalk",
                      "relative_direction" => "LEFT",
                      "distance" => 212.42,
                      "absolute_direction" => "SOUTHEAST"
                    },
                    %{
                      "street_name" => "Federal Street",
                      "relative_direction" => "SLIGHTLY_LEFT",
                      "distance" => 68.29,
                      "absolute_direction" => "SOUTHEAST"
                    },
                    %{
                      "street_name" => "path",
                      "relative_direction" => "CONTINUE",
                      "distance" => 92.88,
                      "absolute_direction" => "SOUTHEAST"
                    },
                    %{
                      "street_name" => "sidewalk",
                      "relative_direction" => "RIGHT",
                      "distance" => 24.93,
                      "absolute_direction" => "SOUTH"
                    },
                    %{
                      "street_name" => "South Station - Main Entry, Dewey Square",
                      "relative_direction" => "ENTER_STATION",
                      "distance" => 0,
                      "absolute_direction" => "NORTH"
                    },
                    %{
                      "street_name" => "Bus Shuttle Outbound",
                      "relative_direction" => "FOLLOW_SIGNS",
                      "distance" => 24.69,
                      "absolute_direction" => "WEST"
                    }
                  ],
                  "distance" => 1733.35
                },
                "from" => %{
                  "stop_id" => "70205",
                  "name" => "North Station",
                  "longitude" => -71.060205,
                  "latitude" => 42.36528
                }
              }
            ],
            "accessible?" => true
          },
          %{
            "tag" => "least_walking",
            "stop" => "2024-03-15T16:48:00.000-04:00",
            "start" => "2024-03-15T16:29:00.000-04:00",
            "legs" => [
              %{
                "to" => %{
                  "stop_id" => "70198",
                  "name" => "Park Street",
                  "longitude" => -71.062424,
                  "latitude" => 42.356395
                },
                "mode" => %{
                  "trip_id" => "60564830",
                  "route" => %{
                    "id" => "Green-D"
                  },
                  "intermediate_stop_ids" => [
                    "70204",
                    "70202"
                  ]
                },
                "from" => %{
                  "stop_id" => "70206",
                  "name" => "North Station",
                  "longitude" => -71.060205,
                  "latitude" => 42.36528
                }
              },
              %{
                "to" => %{
                  "stop_id" => "70075",
                  "name" => "Park Street",
                  "longitude" => -71.062424,
                  "latitude" => 42.356395
                },
                "mode" => %{
                  "steps" => [
                    %{
                      "street_name" => "Red Line - Ashmont/Braintree | Stairs",
                      "relative_direction" => "FOLLOW_SIGNS",
                      "distance" => 17.37,
                      "absolute_direction" => "SOUTH"
                    },
                    %{
                      "street_name" => "pathway",
                      "relative_direction" => "CONTINUE",
                      "distance" => 0,
                      "absolute_direction" => "SOUTH"
                    },
                    %{
                      "street_name" => "Red Line - Ashmont/Braintree",
                      "relative_direction" => "FOLLOW_SIGNS",
                      "distance" => 9.14,
                      "absolute_direction" => "SOUTH"
                    }
                  ],
                  "distance" => 26.52
                },
                "from" => %{
                  "stop_id" => "70198",
                  "name" => "Park Street",
                  "longitude" => -71.062424,
                  "latitude" => 42.356395
                }
              },
              %{
                "to" => %{
                  "stop_id" => "70079",
                  "name" => "South Station",
                  "longitude" => -71.055242,
                  "latitude" => 42.352271
                },
                "mode" => %{
                  "trip_id" => "60392520",
                  "route" => %{
                    "id" => "Red"
                  },
                  "intermediate_stop_ids" => [
                    "70077"
                  ]
                },
                "from" => %{
                  "stop_id" => "70075",
                  "name" => "Park Street",
                  "longitude" => -71.062424,
                  "latitude" => 42.356395
                }
              }
            ],
            "accessible?" => true
          },
          %{
            "tag" => nil,
            "stop" => "2024-03-15T16:32:00.000-04:00",
            "start" => "2024-03-15T16:20:00.000-04:00",
            "legs" => [
              %{
                "to" => %{
                  "stop_id" => "70020",
                  "name" => "Downtown Crossing",
                  "longitude" => -71.060225,
                  "latitude" => 42.355518
                },
                "mode" => %{
                  "trip_id" => "60455437",
                  "route" => %{
                    "id" => "Orange"
                  },
                  "intermediate_stop_ids" => [
                    "70024",
                    "70022"
                  ]
                },
                "from" => %{
                  "stop_id" => "70026",
                  "name" => "North Station",
                  "longitude" => -71.060205,
                  "latitude" => 42.36528
                }
              },
              %{
                "to" => %{
                  "stop_id" => "70077",
                  "name" => "Downtown Crossing",
                  "longitude" => -71.060225,
                  "latitude" => 42.355518
                },
                "mode" => %{
                  "steps" => [
                    %{
                      "street_name" => "Red Line - Ashmont/Braintree",
                      "relative_direction" => "FOLLOW_SIGNS",
                      "distance" => 65.23,
                      "absolute_direction" => "SOUTH"
                    },
                    %{
                      "street_name" => "Red Line - Ashmont/Braintree",
                      "relative_direction" => "FOLLOW_SIGNS",
                      "distance" => 0,
                      "absolute_direction" => "SOUTH"
                    },
                    %{
                      "street_name" => "Orange Line - Oak Grove",
                      "relative_direction" => "FOLLOW_SIGNS",
                      "distance" => 21.34,
                      "absolute_direction" => "SOUTH"
                    },
                    %{
                      "street_name" => "Red Line - Ashmont/Braintree",
                      "relative_direction" => "FOLLOW_SIGNS",
                      "distance" => 51.18,
                      "absolute_direction" => "SOUTH"
                    }
                  ],
                  "distance" => 137.74
                },
                "from" => %{
                  "stop_id" => "70020",
                  "name" => "Downtown Crossing",
                  "longitude" => -71.060225,
                  "latitude" => 42.355518
                }
              },
              %{
                "to" => %{
                  "stop_id" => "70079",
                  "name" => "South Station",
                  "longitude" => -71.055242,
                  "latitude" => 42.352271
                },
                "mode" => %{
                  "trip_id" => "60392519",
                  "route" => %{
                    "id" => "Red"
                  },
                  "intermediate_stop_ids" => []
                },
                "from" => %{
                  "stop_id" => "70077",
                  "name" => "Downtown Crossing",
                  "longitude" => -71.060225,
                  "latitude" => 42.355518
                }
              }
            ],
            "accessible?" => true
          }
        ],
        "from" => %{
          "stop_id" => "place-north",
          "name" => "North Station",
          "longitude" => -71.06129,
          "latitude" => 42.365577
        },
        "errors" => [],
        "date_time" => "2024-03-15T16:10:00-04:00"
      },
      "modes" => %{
        "subway" => true,
        "ferry" => true,
        "commuter_rail" => true,
        "bus" => true
      },
      "itinerary_index" => 3,
      "generated_user_id" => "31015079",
      "generated_time" => "2024-03-15T20:08:18.506014Z",
      "feedback_vote" => "down",
      "feedback_long" => "This is a comment..."
    }
  end
end
