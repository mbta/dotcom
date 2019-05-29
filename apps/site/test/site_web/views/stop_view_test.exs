defmodule SiteWeb.StopViewTest do
  use ExUnit.Case, async: false
  use SiteWeb.ConnCase

  import SiteWeb.StopView
  alias Fares.RetailLocations.Location
  alias Phoenix.HTML
  alias SiteWeb.PartialView.{HeaderTab, HeaderTabBadge}
  alias SiteWeb.StopView
  alias Stops.Stop
  alias Stops.Stop.ParkingLot
  alias Stops.Stop.ParkingLot.{Capacity, Manager, Payment}

  @stop_page_data %{
    routes: [
      %{
        group_name: :subway,
        routes: [
          %{
            directions: [
              %{
                direction_id: 0,
                headsigns: [
                  %{
                    name: "Ashmont",
                    times: [
                      %{
                        prediction: %{
                          status: nil,
                          time: ["1", " ", "min"],
                          track: "2"
                        },
                        scheduled_time: nil
                      },
                      %{
                        prediction: %{
                          status: nil,
                          time: ["9", " ", "min"],
                          track: nil
                        },
                        scheduled_time: nil
                      }
                    ],
                    train_number: ""
                  },
                  %{
                    name: "Braintree",
                    times: [
                      %{
                        prediction: %{
                          status: nil,
                          time: ["3", " ", "min"],
                          track: nil
                        },
                        scheduled_time: nil
                      },
                      %{
                        prediction: %{
                          status: nil,
                          time: ["6", " ", "min"],
                          track: nil
                        },
                        scheduled_time: nil
                      }
                    ],
                    train_number: ""
                  }
                ]
              },
              %{
                direction_id: 1,
                headsigns: [
                  %{
                    name: "Alewife",
                    times: [
                      %{
                        prediction: %{
                          status: nil,
                          time: ["3", " ", "min"],
                          track: "2"
                        },
                        scheduled_time: nil
                      },
                      %{
                        prediction: %{
                          status: nil,
                          time: ["11", " ", "min"],
                          track: nil
                        },
                        scheduled_time: nil
                      }
                    ],
                    train_number: ""
                  }
                ]
              }
            ],
            route: %{
              custom_route?: false,
              description: :rapid_transit,
              direction_destinations: %{
                "0" => "Ashmont/Braintree",
                "1" => "Alewife"
              },
              direction_names: %{"0" => "South", "1" => "North"},
              id: "Red",
              long_name: "Red Line",
              name: "Red Line",
              type: 1
            }
          }
        ]
      },
      %{
        group_name: :bus,
        routes: [
          %{
            directions: [
              %{
                direction_id: 1,
                headsigns: [
                  %{
                    name: "South Station",
                    times: [
                      %{
                        delay: 0,
                        prediction: nil,
                        scheduled_time: ["2:30", " ", "AM"]
                      }
                    ],
                    train_number: ""
                  }
                ]
              },
              %{
                direction_id: 0,
                headsigns: [
                  %{
                    name: "Silver Line Way",
                    times: [
                      %{
                        delay: 0,
                        prediction: nil,
                        scheduled_time: ["5:36", " ", "AM"]
                      }
                    ],
                    train_number: ""
                  },
                  %{
                    name: "Logan Airport",
                    times: [
                      %{
                        delay: 0,
                        prediction: nil,
                        scheduled_time: ["5:40", " ", "AM"]
                      }
                    ],
                    train_number: ""
                  }
                ]
              }
            ],
            route: %{
              custom_route?: false,
              description: :key_bus_route,
              direction_destinations: %{
                "0" => "Logan Airport",
                "1" => "South Station"
              },
              direction_names: %{"0" => "Outbound", "1" => "Inbound"},
              id: "741",
              long_name: "Logan Airport - South Station",
              name: "SL1",
              type: 3
            }
          },
          %{
            directions: [
              %{
                direction_id: 1,
                headsigns: [
                  %{
                    name: "South Station",
                    times: [
                      %{
                        delay: 0,
                        prediction: nil,
                        scheduled_time: ["4:17", " ", "AM"]
                      }
                    ],
                    train_number: ""
                  }
                ]
              },
              %{
                direction_id: 0,
                headsigns: [
                  %{
                    name: "Silver Line Way",
                    times: [
                      %{
                        delay: 0,
                        prediction: nil,
                        scheduled_time: ["5:36", " ", "AM"]
                      }
                    ],
                    train_number: ""
                  },
                  %{
                    name: "Drydock",
                    times: [
                      %{
                        delay: 0,
                        prediction: nil,
                        scheduled_time: ["5:46", " ", "AM"]
                      }
                    ],
                    train_number: ""
                  }
                ]
              }
            ],
            route: %{
              custom_route?: false,
              description: :key_bus_route,
              direction_destinations: %{
                "0" => "Design Center",
                "1" => "South Station"
              },
              direction_names: %{"0" => "Outbound", "1" => "Inbound"},
              id: "742",
              long_name: "Design Center - South Station",
              name: "SL2",
              type: 3
            }
          },
          %{
            directions: [
              %{
                direction_id: 1,
                headsigns: [
                  %{
                    name: "South Station",
                    times: [
                      %{
                        delay: 0,
                        prediction: nil,
                        scheduled_time: ["4:17", " ", "AM"]
                      }
                    ],
                    train_number: ""
                  }
                ]
              },
              %{
                direction_id: 0,
                headsigns: [
                  %{
                    name: "Chelsea",
                    times: [
                      %{
                        delay: 0,
                        prediction: nil,
                        scheduled_time: ["4:25", " ", "AM"]
                      }
                    ],
                    train_number: ""
                  },
                  %{
                    name: "Silver Line Way",
                    times: [
                      %{
                        delay: 0,
                        prediction: nil,
                        scheduled_time: ["5:36", " ", "AM"]
                      }
                    ],
                    train_number: ""
                  }
                ]
              }
            ],
            route: %{
              custom_route?: false,
              description: :key_bus_route,
              direction_destinations: %{"0" => "Chelsea", "1" => "South Station"},
              direction_names: %{"0" => "Outbound", "1" => "Inbound"},
              id: "743",
              long_name: "Chelsea - South Station",
              name: "SL3",
              type: 3
            }
          }
        ]
      },
      %{
        group_name: :commuter_rail,
        routes: [
          %{
            directions: [
              %{
                direction_id: 1,
                headsigns: [
                  %{
                    name: "South Station",
                    times: [
                      %{
                        delay: 0,
                        prediction: nil,
                        scheduled_time: ["4:55", " ", "AM"]
                      }
                    ],
                    train_number: "790"
                  }
                ]
              },
              %{
                direction_id: 0,
                headsigns: [
                  %{
                    name: "Readville",
                    times: [
                      %{
                        delay: 0,
                        prediction: nil,
                        scheduled_time: ["6:24", " ", "AM"]
                      }
                    ],
                    train_number: "751"
                  }
                ]
              }
            ],
            route: %{
              custom_route?: false,
              description: :commuter_rail,
              direction_destinations: %{
                "0" => "Fairmount",
                "1" => "South Station"
              },
              direction_names: %{"0" => "Outbound", "1" => "Inbound"},
              id: "CR-Fairmount",
              long_name: "Fairmount Line",
              name: "Fairmount Line",
              type: 2
            }
          },
          %{
            directions: [
              %{
                direction_id: 0,
                headsigns: [
                  %{
                    name: "Worcester",
                    times: [
                      %{
                        delay: 0,
                        prediction: nil,
                        scheduled_time: ["4:40", " ", "AM"]
                      }
                    ],
                    train_number: "501"
                  },
                  %{
                    name: "Framingham",
                    times: [
                      %{
                        delay: 0,
                        prediction: nil,
                        scheduled_time: ["5:30", " ", "AM"]
                      }
                    ],
                    train_number: "583"
                  },
                  %{
                    name: "Ashland",
                    times: [
                      %{
                        delay: 0,
                        prediction: nil,
                        scheduled_time: ["7:30", " ", "AM"]
                      }
                    ],
                    train_number: "589"
                  }
                ]
              },
              %{
                direction_id: 1,
                headsigns: [
                  %{
                    name: "South Station",
                    times: [
                      %{
                        delay: 0,
                        prediction: nil,
                        scheduled_time: ["4:45", " ", "AM"]
                      }
                    ],
                    train_number: "500"
                  }
                ]
              }
            ],
            route: %{
              custom_route?: false,
              description: :commuter_rail,
              direction_destinations: %{
                "0" => "Worcester",
                "1" => "South Station"
              },
              direction_names: %{"0" => "Outbound", "1" => "Inbound"},
              id: "CR-Worcester",
              long_name: "Framingham/Worcester Line",
              name: "Framingham/Worcester Line",
              type: 2
            }
          },
          %{
            directions: [
              %{
                direction_id: 0,
                headsigns: [
                  %{
                    name: "Forge Park/​495",
                    times: [
                      %{
                        delay: 0,
                        prediction: nil,
                        scheduled_time: ["3:50", " ", "AM"]
                      }
                    ],
                    train_number: "701"
                  },
                  %{
                    name: "Walpole",
                    times: [
                      %{
                        delay: 0,
                        prediction: nil,
                        scheduled_time: ["6:40", " ", "AM"]
                      }
                    ],
                    train_number: "741"
                  },
                  %{
                    name: "Norwood Central",
                    times: [
                      %{
                        delay: 0,
                        prediction: nil,
                        scheduled_time: ["4:15", " ", "PM"]
                      }
                    ],
                    train_number: "743"
                  }
                ]
              },
              %{
                direction_id: 1,
                headsigns: [
                  %{
                    name: "South Station",
                    times: [
                      %{
                        delay: 0,
                        prediction: nil,
                        scheduled_time: ["4:55", " ", "AM"]
                      }
                    ],
                    train_number: "790"
                  }
                ]
              }
            ],
            route: %{
              custom_route?: false,
              description: :commuter_rail,
              direction_destinations: %{
                "0" => "Forge Park/495",
                "1" => "South Station"
              },
              direction_names: %{"0" => "Outbound", "1" => "Inbound"},
              id: "CR-Franklin",
              long_name: "Franklin Line",
              name: "Franklin Line",
              type: 2
            }
          },
          %{
            directions: [
              %{
                direction_id: 1,
                headsigns: [
                  %{
                    name: "South Station",
                    times: [
                      %{
                        delay: 0,
                        prediction: nil,
                        scheduled_time: ["5:40", " ", "AM"]
                      }
                    ],
                    train_number: "070"
                  }
                ]
              },
              %{
                direction_id: 0,
                headsigns: [
                  %{
                    name: "Greenbush",
                    times: [
                      %{
                        delay: 0,
                        prediction: nil,
                        scheduled_time: ["6:54", " ", "AM"]
                      }
                    ],
                    train_number: "071"
                  }
                ]
              }
            ],
            route: %{
              custom_route?: false,
              description: :commuter_rail,
              direction_destinations: %{
                "0" => "Greenbush",
                "1" => "South Station"
              },
              direction_names: %{"0" => "Outbound", "1" => "Inbound"},
              id: "CR-Greenbush",
              long_name: "Greenbush Line",
              name: "Greenbush Line",
              type: 2
            }
          },
          %{
            directions: [
              %{
                direction_id: 1,
                headsigns: [
                  %{
                    name: "South Station",
                    times: [
                      %{
                        delay: 0,
                        prediction: nil,
                        scheduled_time: ["5:30", " ", "AM"]
                      }
                    ],
                    train_number: "032"
                  }
                ]
              },
              %{
                direction_id: 0,
                headsigns: [
                  %{
                    name: "Kingston",
                    times: [
                      %{
                        delay: 0,
                        prediction: nil,
                        scheduled_time: ["7:11", " ", "AM"]
                      }
                    ],
                    train_number: "033"
                  },
                  %{
                    name: "Plymouth",
                    times: [
                      %{
                        delay: 0,
                        prediction: nil,
                        scheduled_time: ["10:50", " ", "AM"]
                      }
                    ],
                    train_number: "063"
                  }
                ]
              }
            ],
            route: %{
              custom_route?: false,
              description: :commuter_rail,
              direction_destinations: %{
                "0" => "Kingston or Plymouth",
                "1" => "South Station"
              },
              direction_names: %{"0" => "Outbound", "1" => "Inbound"},
              id: "CR-Kingston",
              long_name: "Kingston/Plymouth Line",
              name: "Kingston/Plymouth Line",
              type: 2
            }
          },
          %{
            directions: [
              %{
                direction_id: 1,
                headsigns: [
                  %{
                    name: "South Station",
                    times: [
                      %{
                        delay: 0,
                        prediction: nil,
                        scheduled_time: ["5:20", " ", "AM"]
                      }
                    ],
                    train_number: "002"
                  }
                ]
              },
              %{
                direction_id: 0,
                headsigns: [
                  %{
                    name: "Middleborough/​Lakeville",
                    times: [
                      %{
                        delay: 0,
                        prediction: nil,
                        scheduled_time: ["6:35", " ", "AM"]
                      }
                    ],
                    train_number: "003"
                  }
                ]
              }
            ],
            route: %{
              custom_route?: false,
              description: :commuter_rail,
              direction_destinations: %{
                "0" => "Middleborough/Lakeville",
                "1" => "South Station"
              },
              direction_names: %{"0" => "Outbound", "1" => "Inbound"},
              id: "CR-Middleborough",
              long_name: "Middleborough/Lakeville Line",
              name: "Middleborough/Lakeville Line",
              type: 2
            }
          },
          %{
            directions: [
              %{
                direction_id: 1,
                headsigns: [
                  %{
                    name: "South Station",
                    times: [
                      %{
                        delay: 0,
                        prediction: nil,
                        scheduled_time: ["6:05", " ", "AM"]
                      }
                    ],
                    train_number: "600"
                  }
                ]
              },
              %{
                direction_id: 0,
                headsigns: [
                  %{
                    name: "Needham Heights",
                    times: [
                      %{
                        delay: 0,
                        prediction: nil,
                        scheduled_time: ["7:05", " ", "AM"]
                      }
                    ],
                    train_number: "601"
                  }
                ]
              }
            ],
            route: %{
              custom_route?: false,
              description: :commuter_rail,
              direction_destinations: %{
                "0" => "Needham Heights",
                "1" => "South Station"
              },
              direction_names: %{"0" => "Outbound", "1" => "Inbound"},
              id: "CR-Needham",
              long_name: "Needham Line",
              name: "Needham Line",
              type: 2
            }
          },
          %{
            directions: [
              %{
                direction_id: 1,
                headsigns: [
                  %{
                    name: "South Station",
                    times: [
                      %{
                        delay: 0,
                        prediction: nil,
                        scheduled_time: ["4:45", " ", "AM"]
                      }
                    ],
                    train_number: "802"
                  }
                ]
              },
              %{
                direction_id: 0,
                headsigns: [
                  %{
                    name: "Wickford Junction",
                    times: [
                      %{
                        delay: 0,
                        prediction: nil,
                        scheduled_time: ["4:58", " ", "AM"]
                      }
                    ],
                    train_number: "8801"
                  },
                  %{
                    name: "Providence",
                    times: [
                      %{
                        delay: 0,
                        prediction: nil,
                        scheduled_time: ["6:31", " ", "AM"]
                      }
                    ],
                    train_number: "803"
                  },
                  %{
                    name: "Stoughton",
                    times: [
                      %{
                        delay: 0,
                        prediction: nil,
                        scheduled_time: ["6:57", " ", "AM"]
                      }
                    ],
                    train_number: "903"
                  }
                ]
              }
            ],
            route: %{
              custom_route?: false,
              description: :commuter_rail,
              direction_destinations: %{
                "0" => "Wickford Junction",
                "1" => "South Station"
              },
              direction_names: %{"0" => "Outbound", "1" => "Inbound"},
              id: "CR-Providence",
              long_name: "Providence/Stoughton Line",
              name: "Providence/Stoughton Line",
              type: 2
            }
          }
        ]
      }
    ],
    stop: %Stop{
      accessibility: ["accessible", "escalator_both", "elevator", "fully_elevated_platform"],
      address: "700 Atlantic Ave, Boston, MA 02110",
      closed_stop_info: nil,
      has_charlie_card_vendor?: false,
      has_fare_machine?: true,
      id: "place-sstat",
      is_child?: false,
      latitude: 42.352271,
      longitude: -71.055242,
      name: "South Station",
      note: nil,
      parking_lots: [
        %ParkingLot{
          address: nil,
          capacity: %Capacity{
            accessible: 4,
            total: 210,
            type: "Garage"
          },
          latitude: 42.349838,
          longitude: -71.055963,
          manager: %Manager{
            contact: "ProPark",
            name: "ProPark",
            phone: "617-345-0202",
            url: "https://www.propark.com/propark-locator2/south-station-garage/"
          },
          name: "South Station Bus Terminal Garage",
          note: nil,
          payment: %Payment{
            daily_rate:
              "Hourly: 30 min: $5, 1 hr: $10, 1.5 hrs: $15, 2 hrs: $20, 2.5 hrs: $25, 3+ hrs: $30 | Daily Max: $30 | Early Bird (in by 8:30 AM, out by 6 PM): $26 | Nights/Weekends: $10",
            methods: ["Credit/Debit Card", "Cash"],
            mobile_app: nil,
            monthly_rate: "$150 regular, $445 overnight"
          },
          utilization: nil
        }
      ],
      station?: true
    },
    tabs: [
      %HeaderTab{
        badge: nil,
        class: "",
        href: "/stops/place-sstat",
        id: "details",
        name: "Station Details"
      },
      %HeaderTab{
        badge: %HeaderTabBadge{
          aria_label: "1 alert",
          class: "m-alert-badge",
          content: "1"
        },
        class: "",
        href: "/stops/place-sstat?tab=alerts",
        id: "alerts",
        name: "Alerts"
      }
    ],
    zone_number: "1A",
    retail_locations: [
      %{
        distance: "123 ft",
        location: %Location{
          name: "Store Name",
          address: "1234 Main St., Boston MA",
          latitude: 41.0,
          longitude: -72.0,
          phone: "617-555-1234"
        }
      }
    ],
    suggested_transfers: [],
    alerts: []
  }

  test "render_react returns HTML" do
    assert {:safe, "<div" <> _} =
             StopView.render_react(%{
               stop_page_data: @stop_page_data,
               map_id: "map",
               map_data: %{
                 map_srcset: "",
                 map_url: "",
                 map_data: %{
                   default_center: %{longitude: -71.05891, latitude: 42.360718},
                   scale: 2,
                   width: 735,
                   height: 250,
                   zoom: 16,
                   markers: [],
                   tile_server_url: ""
                 }
               }
             })
  end

  @high_priority_alerts [
    %Alerts.Alert{
      active_period: [{~N[2017-04-12T20:00:00], ~N[2017-05-12T20:00:00]}],
      description: "description",
      effect: :delay,
      header: "header",
      id: "1",
      lifecycle: :ongoing,
      priority: :high
    }
  ]

  @low_priority_alerts [
    %Alerts.Alert{
      active_period: [{~N[2017-04-12T20:00:00], ~N[2017-05-12T20:00:00]}],
      description: "description",
      effect: :access_issue,
      header: "header",
      id: "1",
      priority: :low
    }
  ]

  describe "render_alerts/4" do
    test "displays an alert" do
      response =
        StopView.render_alerts(
          @high_priority_alerts,
          ~D[2017-05-11],
          %Stop{id: "2438"},
          priority_filter: :high
        )

      assert HTML.safe_to_string(response) =~ "c-alert-item"
    end

    test "does not display an alert" do
      response =
        StopView.render_alerts(
          @low_priority_alerts,
          ~D[2017-05-11],
          %Stop{id: "2438"},
          priority_filter: :high
        )

      assert response == ""
    end
  end

  describe "feature_icons/1" do
    test "returns list of featured icons" do
      [red_icon, access_icon | _] =
        StopView.feature_icons(%DetailedStop{features: [:red_line, :access]})

      assert HTML.safe_to_string(red_icon) =~ "icon-red-line"
      assert HTML.safe_to_string(access_icon) =~ "icon-access"
    end
  end

  describe "stop_feature_icon" do
    test "sets a default size" do
      green = stop_feature_icon(:"Green-B")

      assert HTML.safe_to_string(green) =~ "default"
    end
  end

  describe "_detailed_stop_list.html" do
    test "renders a list of stops", %{conn: conn} do
      stops = [
        %DetailedStop{stop: %Stop{name: "Alewife", id: "place-alfcl"}},
        %DetailedStop{stop: %Stop{name: "Davis", id: "place-davis"}},
        %DetailedStop{stop: %Stop{name: "Porter", id: "place-porter"}}
      ]

      html =
        "_detailed_stop_list.html"
        |> render(detailed_stops: stops, conn: conn)
        |> HTML.safe_to_string()

      assert [alewife, davis, porter] = Floki.find(html, ".stop-btn")
      assert Floki.text(alewife) =~ "Alewife"
      assert Floki.text(davis) =~ "Davis"
      assert Floki.text(porter) =~ "Porter"
    end
  end

  describe "_search_bar.html" do
    test "renders a search bar", %{conn: conn} do
      stops = [
        %DetailedStop{stop: %Stop{name: "Alewife", id: "place-alfcl"}},
        %DetailedStop{stop: %Stop{name: "Davis", id: "place-davis"}},
        %DetailedStop{stop: %Stop{name: "Porter", id: "place-porter"}}
      ]

      html =
        "_search_bar.html"
        |> render(stop_info: stops, conn: conn)
        |> HTML.safe_to_string()

      assert [{"div", _, _}] = Floki.find(html, ".c-search-bar")
    end
  end
end
