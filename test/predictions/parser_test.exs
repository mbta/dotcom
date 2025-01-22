defmodule Predictions.ParserTest do
  use ExUnit.Case, async: true

  import Predictions.Parser

  alias JsonApi.Item
  alias Timex.Timezone

  @moduletag :external

  describe "parse/1" do
    test "parses a %JsonApi.Item{} into a record" do
      item = %Item{
        attributes: %{
          "track" => "5",
          "status" => "On Time",
          "direction_id" => 0,
          "departure_time" => "2016-09-15T15:40:00-04:00",
          "arrival_time" => "2016-01-01T00:00:00-04:00",
          "stop_sequence" => 5
        },
        relationships: %{
          "route" => [
            %Item{
              id: "route_id",
              attributes: %{
                "long_name" => "Route",
                "direction_names" => ["East", "West"],
                "type" => 5
              }
            },
            %Item{id: "wrong"}
          ],
          "stop" => [
            %Item{id: "place-pktrm", attributes: %{"name" => "Stop"}},
            %Item{id: "wrong"}
          ],
          "trip" => [
            %Item{
              id: "trip_id",
              attributes: %{
                "name" => "trip_name",
                "direction_id" => "0",
                "headsign" => "trip_headsign"
              }
            },
            %Item{
              id: "wrong",
              attributes: %{
                "name" => "trip_name",
                "direction_id" => "0",
                "headsign" => "trip_headsign"
              }
            }
          ],
          "vehicle" => [
            %Item{
              id: "vehicle_id"
            }
          ]
        }
      }

      expected = {
        nil,
        "trip_id",
        "place-pktrm",
        "route_id",
        0,
        Timezone.convert(~N[2016-01-01T04:00:00], "Etc/GMT+4"),
        Timezone.convert(~N[2016-09-15T19:40:00], "Etc/GMT+4"),
        Timezone.convert(~N[2016-09-15T19:40:00], "Etc/GMT+4"),
        5,
        nil,
        "5",
        "On Time",
        true,
        "vehicle_id"
      }

      assert parse(item) == expected
    end

    test "uses arrival time if departure time isn't available" do
      item = %Item{
        attributes: %{
          "track" => nil,
          "status" => "On Time",
          "direction_id" => 0,
          "departure_time" => nil,
          "arrival_time" => "2016-09-15T15:40:00+01:00"
        },
        relationships: %{
          "route" => [
            %Item{
              id: "route_id",
              attributes: %{
                "long_name" => "Route",
                "direction_names" => ["East", "West"],
                "type" => 5
              }
            },
            %Item{id: "wrong"}
          ],
          "stop" => [
            %Item{id: "place-pktrm", attributes: %{"name" => "Stop"}},
            %Item{id: "wrong"}
          ],
          "trip" => [
            %Item{
              id: "trip_id",
              attributes: %{
                "name" => "trip_name",
                "direction_id" => "0",
                "headsign" => "trip_headsign"
              }
            },
            %Item{
              id: "wrong",
              attributes: %{
                "name" => "trip_name",
                "direction_id" => "0",
                "headsign" => "trip_headsign"
              }
            }
          ],
          "vehicle" => [
            %Item{
              id: "vehicle_id"
            }
          ]
        }
      }

      parsed = parse(item)

      assert elem(parsed, 5) == Timezone.convert(~N[2016-09-15T14:40:00], "Etc/GMT-1")
      refute elem(parsed, 10)
    end

    test "can parse a prediction with no times" do
      item = %Item{
        attributes: %{
          "track" => "5",
          "status" => "On Time",
          "direction_id" => 0,
          "departure_time" => nil,
          "arrival_time" => nil
        },
        relationships: %{
          "route" => [
            %Item{
              id: "route_id",
              attributes: %{
                "long_name" => "Route",
                "direction_names" => ["East", "West"],
                "type" => 5
              }
            },
            %Item{id: "wrong"}
          ],
          "stop" => [
            %Item{id: "place-pktrm", attributes: %{"name" => "Stop"}},
            %Item{id: "wrong"}
          ],
          "trip" => [
            %Item{
              id: "trip_id",
              attributes: %{
                "name" => "trip_name",
                "direction_id" => "0",
                "headsign" => "trip_headsign"
              }
            },
            %Item{
              id: "wrong",
              attributes: %{
                "name" => "trip_name",
                "direction_id" => "0",
                "headsign" => "trip_headsign"
              }
            }
          ],
          "vehicle" => [
            %Item{
              id: "vehicle_id"
            }
          ]
        }
      }

      parsed = parse(item)

      assert elem(parsed, 7) == nil
      refute elem(parsed, 12)
    end

    test "can parse a prediction where the track is part of the stop" do
      item = %Item{
        attributes: %{
          "status" => "On Time",
          "direction_id" => 0,
          "departure_time" => "2018-06-15T12:00:00-04:00",
          "arrival_time" => nil
        },
        relationships: %{
          "route" => [
            %Item{
              id: "route_id",
              attributes: %{
                "long_name" => "Route",
                "direction_names" => ["East", "West"],
                "type" => 5
              }
            },
            %Item{id: "wrong"}
          ],
          "stop" => [%Item{id: "South Station-11", attributes: %{"platform_code" => "11"}}],
          "trip" => [
            %Item{
              id: "trip_id",
              attributes: %{
                "name" => "trip_name",
                "direction_id" => "0",
                "headsign" => "trip_headsign"
              }
            },
            %Item{
              id: "wrong",
              attributes: %{
                "name" => "trip_name",
                "direction_id" => "0",
                "headsign" => "trip_headsign"
              }
            }
          ],
          "vehicle" => [
            %Item{
              id: "vehicle_id"
            }
          ]
        }
      }

      parsed = parse(item)

      assert elem(parsed, 10) == "11"
    end

    test "can parse possible schedule relationships" do
      base_item = %Item{
        attributes: %{
          "track" => nil,
          "status" => "On Time",
          "direction_id" => 0,
          "departure_time" => "2016-09-15T15:40:00-04:00",
          "arrival_time" => "2016-01-01T00:00:00-04:00"
        },
        relationships: %{
          "route" => [
            %Item{
              id: "route_id",
              attributes: %{
                "long_name" => "Route",
                "direction_names" => ["East", "West"],
                "type" => 5
              }
            },
            %Item{id: "wrong"}
          ],
          "stop" => [
            %Item{id: "place-pktrm", attributes: %{"name" => "Stop"}},
            %Item{id: "wrong"}
          ],
          "trip" => [
            %Item{
              id: "trip_id",
              attributes: %{
                "name" => "trip_name",
                "direction_id" => "0",
                "headsign" => "trip_headsign"
              }
            },
            %Item{
              id: "wrong",
              attributes: %{
                "name" => "trip_name",
                "direction_id" => "0",
                "headsign" => "trip_headsign"
              }
            }
          ],
          "vehicle" => [
            %Item{
              id: "vehicle_id"
            }
          ]
        }
      }

      for {json, expected} <- [
            {nil, nil},
            {"unknown", nil},
            {"ADDED", :added},
            {"SKIPPED", :skipped},
            {"CANCELLED", :cancelled},
            {"UNSCHEDULED", :unscheduled},
            {"NO_DATA", :no_data}
          ] do
        # update the item to set the given JSON relationship
        item = %{
          base_item
          | attributes: Map.put(base_item.attributes, "schedule_relationship", json)
        }

        parsed = parse(item)
        assert elem(parsed, 9) == expected
      end
    end

    test "can handle empty trip relationships" do
      item = %Item{
        attributes: %{
          "track" => nil,
          "status" => "On Time",
          "direction_id" => 0,
          "departure_time" => "2016-09-15T15:40:00-04:00",
          "arrival_time" => "2016-01-01T00:00:00-04:00"
        },
        relationships: %{
          "route" => [
            %Item{
              id: "route_id",
              attributes: %{
                "long_name" => "Route",
                "direction_names" => ["East", "West"],
                "type" => 5
              }
            }
          ],
          "stop" => [%Item{id: "place-pktrm", attributes: %{"name" => "Stop"}}],
          "trip" => [],
          "vehicle" => [
            %Item{
              id: "vehicle_id"
            }
          ]
        }
      }

      parsed = parse(item)
      assert elem(parsed, 1) == nil
    end

    test "can handle empty vehicle relationship" do
      item = %Item{
        attributes: %{
          "track" => nil,
          "status" => "On Time",
          "direction_id" => 0,
          "departure_time" => "2016-09-15T15:40:00-04:00",
          "arrival_time" => "2016-01-01T00:00:00-04:00"
        },
        relationships: %{
          "route" => [
            %Item{
              id: "route_id",
              attributes: %{
                "long_name" => "Route",
                "direction_names" => ["East", "West"],
                "type" => 5
              }
            }
          ],
          "stop" => [%Item{id: "place-pktrm", attributes: %{"name" => "Stop"}}],
          "trip" => [],
          "vehicle" => []
        }
      }

      parsed = parse(item)
      assert elem(parsed, 13) == nil
    end

    test "departing status is determined by prediction status if no time is given" do
      json_item = %Item{
        attributes: %{
          "track" => nil,
          "status" => "3 stops away",
          "direction_id" => 0,
          "departure_time" => nil,
          "arrival_time" => nil
        },
        relationships: %{
          "route" => [
            %Item{
              id: "route_id",
              attributes: %{
                "long_name" => "Route",
                "direction_names" => ["East", "West"],
                "type" => 1
              }
            }
          ],
          "stop" => [%Item{id: "place-pktrm", attributes: %{"name" => "Stop"}}],
          "trip" => [],
          "vehicle" => [
            %Item{
              id: "vehicle_id"
            }
          ]
        }
      }

      parsed = parse(json_item)
      assert elem(parsed, 12)
    end
  end
end
