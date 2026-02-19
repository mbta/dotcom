defmodule Alerts.ParserTest do
  use ExUnit.Case, async: true

  alias Alerts.{InformedEntity, InformedEntitySet, Parser}

  describe "Alert.parse/1" do
    test ".parse converts a JsonApi.Item into an Alerts.Alert" do
      assert Parser.Alert.parse(%JsonApi.Item{
               type: "alert",
               id: "130612",
               attributes: %{
                 "informed_entity" => [
                   %{
                     "route_type" => 3,
                     "route" => "18",
                     "stop" => "stop",
                     "trip" => "trip",
                     "direction_id" => 1,
                     "activities" => [
                       "BOARD",
                       "RIDE"
                     ]
                   }
                 ],
                 "header" => "Route 18 experiencing moderate delays due to traffic",
                 "active_period" => [
                   %{
                     "start" => "2016-06-06T14:48:48-04:00",
                     "end" => "2016-06-06T19:53:51-04:00"
                   }
                 ],
                 "severity" => "Minor",
                 "lifecycle" => "Ongoing",
                 "effect_name" => "Delay",
                 "cause" => "TRAFFIC",
                 "updated_at" => "2016-06-20T16:09:29-04:00",
                 "description" => "Affected routes: 18",
                 "banner" => "Test banner copy",
                 "url" => "www.mbta.com",
                 "image_alternative_text" => "Line map of the 18 route(s) closures"
               }
             }) ==
               %Alerts.Alert{
                 id: "130612",
                 header: "Route 18 experiencing moderate delays due to traffic",
                 informed_entity:
                   Alerts.InformedEntitySet.new([
                     %Alerts.InformedEntity{
                       route_type: 3,
                       route: "18",
                       stop: "stop",
                       trip: "trip",
                       direction_id: 1,
                       activities:
                         MapSet.new([
                           :board,
                           :ride
                         ])
                     }
                   ]),
                 active_period: [
                   {~N[2016-06-06T14:48:48]
                    |> Timex.Timezone.convert("America/New_York"),
                    ~N[2016-06-06T19:53:51]
                    |> Timex.Timezone.convert("America/New_York")}
                 ],
                 banner: "Test banner copy",
                 severity: 3,
                 lifecycle: :ongoing,
                 effect: :delay,
                 cause: :traffic,
                 updated_at:
                   ~N[2016-06-20T16:09:29]
                   |> Timex.Timezone.convert("America/New_York"),
                 description: "Affected routes: 18",
                 priority: :low,
                 url: "www.mbta.com",
                 image_alternative_text: "Line map of the 18 route(s) closures"
               }
    end

    test "Whitespace is trimmed from description" do
      assert %Alerts.Alert{description: "Affected routes:\t18"} =
               Parser.Alert.parse(%JsonApi.Item{
                 type: "alert",
                 id: "130612",
                 attributes: %{
                   "informed_entity" => [
                     %{
                       "route_type" => 3,
                       "route" => "18",
                       "stop" => "stop",
                       "trip" => "trip",
                       "direction_id" => 1,
                       "activities" => ["BOARD"]
                     }
                   ],
                   "header" => "Route 18 experiencing moderate delays due to traffic",
                   "active_period" => [
                     %{
                       "start" => "2016-06-06T14:48:48-04:00",
                       "end" => "2016-06-06T19:53:51-04:00"
                     }
                   ],
                   "severity" => "Minor",
                   "lifecycle" => "Ongoing",
                   "effect_name" => "Delay",
                   "updated_at" => "2016-06-20T16:09:29-04:00",
                   "description" => "\n\r\tAffected routes:\t18\n\r\t"
                 }
               })
    end

    test "Green line informed entity creates entity for 'Green' route" do
      parsed =
        Parser.Alert.parse(%JsonApi.Item{
          type: "alert",
          id: "130612",
          attributes: %{
            "informed_entity" => [
              %{
                "route_type" => 0,
                "route" => "Green-B",
                "stop" => "stop",
                "trip" => "trip",
                "direction_id" => 1,
                "activities" => ["BOARD"]
              }
            ],
            "header" => "Green Line is experiencing moderate delays due to traffic",
            "active_period" => [
              %{
                "start" => "2016-06-06T14:48:48-04:00",
                "end" => "2016-06-06T19:53:51-04:00"
              }
            ],
            "severity" => "Minor",
            "lifecycle" => "Ongoing",
            "effect_name" => "Delay",
            "updated_at" => "2016-06-20T16:09:29-04:00",
            "description" => "\n\r\tAffected routes:\t18\n\r\t"
          }
        })

      informed_entities =
        parsed.informed_entity
        |> Enum.map(& &1.route)

      assert informed_entities == ["Green-B", "Green"]
    end

    test "Green line informed entities are not duplicated" do
      parsed =
        Parser.Alert.parse(%JsonApi.Item{
          type: "alert",
          id: "130612",
          attributes: %{
            "informed_entity" => [
              %{
                "route_type" => 0,
                "route" => "Green-B",
                "stop" => "stop",
                "trip" => "trip",
                "direction_id" => 1,
                "activities" => ["BOARD"]
              },
              %{
                "route_type" => 0,
                "route" => "Green-C",
                "stop" => "stop",
                "trip" => "trip",
                "direction_id" => 1,
                "activities" => ["BOARD"]
              }
            ],
            "header" => "Green Line is experiencing moderate delays due to traffic",
            "active_period" => [
              %{
                "start" => "2016-06-06T14:48:48-04:00",
                "end" => "2016-06-06T19:53:51-04:00"
              }
            ],
            "severity" => "Minor",
            "lifecycle" => "Ongoing",
            "effect_name" => "Delay",
            "updated_at" => "2016-06-20T16:09:29-04:00",
            "description" => "\n\r\tAffected routes:\t18\n\r\t"
          }
        })

      informed_entities =
        parsed.informed_entity
        |> Enum.map(& &1.route)

      assert Enum.filter(informed_entities, &(&1 == "Green")) == ["Green"]
    end

    test "Boat-F1 line informed entity creates entity for Boat-F2H route" do
      parsed =
        Parser.Alert.parse(%JsonApi.Item{
          type: "alert",
          id: "130612",
          attributes: %{
            "informed_entity" => [
              %{
                "route_type" => 4,
                "route" => "Boat-F1",
                "stop" => "stop",
                "trip" => "trip",
                "direction_id" => 1,
                "activities" => ["BOARD"]
              }
            ],
            "header" => "The ferry is stuck in ice",
            "active_period" => [
              %{
                "start" => "2016-06-06T14:48:48-04:00",
                "end" => "2016-06-06T19:53:51-04:00"
              }
            ],
            "severity" => "Minor",
            "lifecycle" => "Ongoing",
            "effect_name" => "Delay",
            "updated_at" => "2016-06-20T16:09:29-04:00",
            "description" => "\n\r\tAffected routes:\t18\n\r\t"
          }
        })

      informed_entities =
        parsed.informed_entity
        |> Enum.map(& &1.route)

      assert "Boat-F2H" in informed_entities
    end

    test "All whitespace descriptions are parsed as nil" do
      assert %Alerts.Alert{description: nil} =
               Parser.Alert.parse(%JsonApi.Item{
                 type: "alert",
                 id: "130612",
                 attributes: %{
                   "informed_entity" => [
                     %{
                       "route_type" => 3,
                       "route" => "18",
                       "stop" => "stop",
                       "trip" => "trip",
                       "direction_id" => 1,
                       "activities" => ["BOARD"]
                     }
                   ],
                   "header" => "Route 18 experiencing moderate delays due to traffic",
                   "active_period" => [
                     %{
                       "start" => "2016-06-06T14:48:48-04:00",
                       "end" => "2016-06-06T19:53:51-04:00"
                     }
                   ],
                   "severity" => "Minor",
                   "lifecycle" => "Ongoing",
                   "effect_name" => "Delay",
                   "updated_at" => "2016-06-20T16:09:29-04:00",
                   "description" => "\n\r\t\n    \r\t\n\r "
                 }
               })
    end

    test "alerts with effect and not effect_name are parsed" do
      alert =
        Parser.Alert.parse(%JsonApi.Item{
          type: "alert",
          id: "130612",
          attributes: %{
            "informed_entity" => [],
            "header" => "",
            "active_period" => [],
            "severity" => 3,
            "lifecycle" => "ONGOING",
            "effect" => "DELAY",
            "updated_at" => "2016-06-20T16:09:29-04:00",
            "description" => ""
          }
        })

      assert %Alerts.Alert{
               lifecycle: :ongoing,
               severity: 3,
               effect: :delay,
               cause: :unknown_cause
             } = alert
    end

    test "parses alerts as :single_tracking if their effect/cause/severity is :delay/:single_tracking/1" do
      alert =
        Parser.Alert.parse(%JsonApi.Item{
          type: "alert",
          id: "130612",
          attributes: %{
            "informed_entity" => [],
            "header" => "",
            "active_period" => [],
            "severity" => 1,
            "lifecycle" => "ONGOING",
            "effect" => "DELAY",
            "cause" => "SINGLE_TRACKING",
            "updated_at" => "2016-06-20T16:09:29-04:00",
            "description" => ""
          }
        })

      assert %Alerts.Alert{
               severity: 1,
               effect: :single_tracking
             } = alert
    end

    test "parses single-tracking alerts as :delay if their severity is >1" do
      alert =
        Parser.Alert.parse(%JsonApi.Item{
          type: "alert",
          id: "130612",
          attributes: %{
            "informed_entity" => [],
            "header" => "",
            "active_period" => [],
            "severity" => 2,
            "lifecycle" => "ONGOING",
            "effect" => "DELAY",
            "cause" => "SINGLE_TRACKING",
            "updated_at" => "2016-06-20T16:09:29-04:00",
            "description" => ""
          }
        })

      assert %Alerts.Alert{
               severity: 2,
               effect: :delay,
               cause: :single_tracking
             } = alert
    end

    test "Categorizes ACCESS_ISSUE alerts without special text as :access_issue" do
      alert =
        Parser.Alert.parse(%JsonApi.Item{
          type: "alert",
          id: "130612",
          attributes: %{
            "informed_entity" => [],
            "header" => "This is not a special issue",
            "active_period" => [],
            "severity" => 3,
            "lifecycle" => "ONGOING",
            "effect" => "ACCESS_ISSUE",
            "updated_at" => "2016-06-20T16:09:29-04:00",
            "description" => ""
          }
        })

      assert %Alerts.Alert{
               lifecycle: :ongoing,
               severity: 3,
               effect: :access_issue,
               cause: :unknown_cause
             } = alert
    end
  end

  describe "Banner.parse/1" do
    setup do
      json_item = %JsonApi.Item{
        attributes: %{
          "active_period" => [
            %{
              "end" => "2019-01-13T02:30:00-05:00",
              "start" => "2019-01-07T16:26:25-05:00"
            }
          ],
          "banner" => "All service may experience delays due to snow",
          "cause" => "SPECIAL_EVENT",
          "created_at" => "2019-01-07T16:26:31-05:00",
          "description" => nil,
          "effect" => "DELAY",
          "header" => "All service may experience delays due to snow",
          "informed_entity" => [
            %{
              "activities" => [
                "BOARD",
                "EXIT",
                "RIDE"
              ],
              "route_type" => 2
            }
          ],
          "lifecycle" => "NEW",
          "service_effect" => "Subway delays",
          "severity" => 5,
          "short_header" => "All service may experience delays due to snow",
          "timeframe" => "through Saturday",
          "updated_at" => "2019-01-07T16:26:59-05:00",
          "url" => "https://mbta.com/guides/winter-guide"
        },
        id: "123",
        type: "alert"
      }

      %{json_item: json_item}
    end

    test "converts a JsonApi.Item into a list of Alerts.Banners", %{json_item: json_item} do
      expected_banner = [
        %Alerts.Banner{
          id: "123",
          title: "All service may experience delays due to snow",
          url: "https://mbta.com/guides/winter-guide",
          effect: :delay,
          severity: 5,
          informed_entity_set:
            InformedEntitySet.new([
              %InformedEntity{
                activities: MapSet.new([:board, :exit, :ride]),
                direction_id: nil,
                route: nil,
                route_type: 2,
                stop: nil,
                trip: nil
              }
            ])
        }
      ]

      assert Parser.Banner.parse(json_item) == expected_banner
    end
  end
end
