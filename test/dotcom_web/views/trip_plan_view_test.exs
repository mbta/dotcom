defmodule DotcomWeb.TripPlanViewTest do
  use DotcomWeb.ConnCase, async: true

  import DotcomWeb.TripPlanView
  import Mox

  alias Dotcom.TripPlan.{
    Itinerary,
    Leg,
    NamedPosition,
    PersonalDetail,
    TransitDetail
  }

  alias Fares.Fare
  alias OpenTripPlannerClient.Schema.Step
  alias Test.Support.Factories.{Stops.Stop, TripPlanner.TripPlanner}

  @highest_one_way_fare %Fares.Fare{
    additional_valid_modes: [:bus],
    cents: 240,
    duration: :single_trip,
    media: [:charlie_card, :charlie_ticket, :contactless_payment, :cash],
    mode: :subway,
    name: :subway,
    price_label: nil,
    reduced: nil
  }

  @lowest_one_way_fare %Fares.Fare{
    additional_valid_modes: [:bus],
    cents: 240,
    duration: :single_trip,
    media: [:charlie_card, :charlie_ticket, :contactless_payment, :cash],
    mode: :subway,
    name: :subway,
    price_label: nil,
    reduced: nil
  }

  @reduced_one_way_fare %Fares.Fare{
    additional_valid_modes: [],
    cents: 110,
    duration: :single_trip,
    media: [:senior_card],
    mode: :subway,
    name: :subway,
    price_label: nil,
    reduced: :senior_disabled
  }

  @fares %{
    highest_one_way_fare: @highest_one_way_fare,
    lowest_one_way_fare: @lowest_one_way_fare,
    reduced_one_way_fare: @reduced_one_way_fare
  }

  setup :verify_on_exit!

  setup do
    stub(Stops.Repo.Mock, :get, fn _ ->
      Stop.build(:stop)
    end)

    stub(MBTA.Api.Mock, :get_json, fn "/schedules/", [route: "Red", date: "1970-01-01"] ->
      {:error,
       [
         %JsonApi.Error{
           code: "no_service",
           source: %{
             "parameter" => "date"
           },
           detail: "The current rating does not describe service on that date.",
           meta: %{
             "end_date" => "2024-06-15",
             "start_date" => "2024-05-10",
             "version" => "Spring 2024, 2024-05-17T21:10:15+00:00, version D"
           }
         }
       ]}
    end)

    :ok
  end

  describe "Fares logic" do
    @itinerary %Itinerary{
      start: nil,
      stop: nil,
      legs: [
        %Leg{
          from: %NamedPosition{
            latitude: 42.365486,
            longitude: -71.103802,
            name: "Central",
            stop: nil
          },
          mode: %PersonalDetail{
            distance: 24.274,
            steps: [
              %Step{
                absolute_direction: :southeast,
                distance: 24.274,
                relative_direction: :depart,
                street_name: "Massachusetts Avenue"
              }
            ]
          },
          polyline: "eoqaGzm~pLTe@BE@A",
          to: %NamedPosition{
            latitude: 42.365304,
            longitude: -71.103621,
            name: "Central",
            stop: %Stops.Stop{id: "70069"}
          }
        },
        %Leg{
          from: %NamedPosition{
            latitude: 42.365304,
            longitude: -71.103621,
            name: "Central",
            stop: %Stops.Stop{id: "70069"}
          },
          mode: %TransitDetail{
            fares: @fares,
            intermediate_stops: [%Stops.Stop{id: "70071"}, %Stops.Stop{id: "70073"}],
            route: %Routes.Route{id: "Red"},
            trip: %Schedules.Trip{id: "43870769C0"}
          },
          to: %NamedPosition{
            latitude: 42.356395,
            longitude: -71.062424,
            name: "Park Street",
            stop: %Stops.Stop{id: "70075"}
          }
        }
      ],
      passes: %{
        base_month_pass: %Fare{
          additional_valid_modes: [:bus],
          cents: 9_000,
          duration: :month,
          media: [:charlie_card, :charlie_ticket],
          mode: :subway,
          name: :subway,
          price_label: nil,
          reduced: nil
        },
        recommended_month_pass: %Fare{
          additional_valid_modes: [:bus],
          cents: 9_000,
          duration: :month,
          media: [:charlie_card, :charlie_ticket],
          mode: :subway,
          name: :subway,
          price_label: nil,
          reduced: nil
        },
        reduced_month_pass: %Fare{
          additional_valid_modes: [:bus],
          cents: 9_000,
          duration: :month,
          media: [:charlie_card, :charlie_ticket],
          mode: :subway,
          name: :subway,
          price_label: nil,
          reduced: nil
        }
      }
    }

    test "gets the highest one-way fare" do
      assert get_one_way_total_by_type(@itinerary, :highest_one_way_fare) == 240
    end

    test "gets the total for a reduced one-way fare" do
      assert get_one_way_total_by_type(@itinerary, :reduced_one_way_fare) == 110
    end

    test "when there's a free shuttle and then a transfer to a paid leg, the total should include the cost of the paid leg(s)" do
      free_leg =
        TripPlanner.build(:shuttle_leg)

      paid_leg =
        TripPlanner.build(:subway_leg)

      itinerary =
        %Itinerary{start: nil, stop: nil, legs: [free_leg, paid_leg]}

      assert get_one_way_total_by_type(itinerary, :highest_one_way_fare) == 240
    end

    test "gets the highest one-way fare correctly with subway -> subway xfer" do
      subway_leg_for_route =
        &%Leg{
          from: %NamedPosition{},
          to: %NamedPosition{},
          mode: %TransitDetail{
            route: %Routes.Route{id: &1},
            fares: %{
              highest_one_way_fare: %Fares.Fare{
                additional_valid_modes: [:bus],
                cents: 290,
                duration: :single_trip,
                media: [:charlie_ticket, :cash],
                mode: :subway,
                name: :subway,
                price_label: nil,
                reduced: nil
              },
              lowest_one_way_fare: %Fares.Fare{
                additional_valid_modes: [:bus],
                cents: 240,
                duration: :single_trip,
                media: [:charlie_card],
                mode: :subway,
                name: :subway,
                price_label: nil,
                reduced: nil
              }
            }
          }
        }

      red_leg = %{
        subway_leg_for_route.("Red")
        | to: %NamedPosition{
            stop: %Stops.Stop{id: "place-dwnxg"}
          }
      }

      orange_leg = %{
        subway_leg_for_route.("Orange")
        | from: %NamedPosition{
            stop: %Stops.Stop{id: "place-dwnxg"}
          }
      }

      itinerary = %Itinerary{
        start: nil,
        stop: nil,
        legs: [red_leg, orange_leg]
      }

      assert get_one_way_total_by_type(itinerary, :highest_one_way_fare) == 290
    end

    test "returns nil when there is no highest one-way fare" do
      itinerary = %Itinerary{
        start: nil,
        stop: nil,
        legs: [
          %Leg{
            from: %NamedPosition{
              latitude: 42.365486,
              longitude: -71.103802,
              name: "Central",
              stop: nil
            },
            mode: %PersonalDetail{
              distance: 24.274,
              steps: [
                %Step{
                  absolute_direction: :southeast,
                  distance: 24.274,
                  relative_direction: :depart,
                  street_name: "Massachusetts Avenue"
                }
              ]
            },
            polyline: "eoqaGzm~pLTe@BE@A",
            to: %NamedPosition{
              latitude: 42.365304,
              longitude: -71.103621,
              name: "Central",
              stop: %Stops.Stop{id: "70069"}
            }
          },
          %Leg{
            from: %NamedPosition{
              latitude: 42.365304,
              longitude: -71.103621,
              name: "Central",
              stop: %Stops.Stop{id: "70069"}
            },
            mode: %TransitDetail{
              fares: %{
                highest_one_way_fare: nil,
                lowest_one_way_fare: nil
              },
              intermediate_stops: [%Stops.Stop{id: "70071"}, %Stops.Stop{id: "70073"}],
              route: %Routes.Route{id: "Red"},
              trip: %Schedules.Trip{id: "43870769C0"}
            },
            to: %NamedPosition{
              latitude: 42.356395,
              longitude: -71.062424,
              name: "Park Street",
              stop: %Stops.Stop{id: "70075"}
            }
          }
        ]
      }

      assert get_one_way_total_by_type(itinerary, :highest_one_way_fare) == nil
    end
  end
end
