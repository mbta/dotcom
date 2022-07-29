defmodule SiteWeb.TripCompareControllerTest do
  use SiteWeb.ConnCase
  alias Fares.Fare
  alias Site.TripPlan.Query
  alias SiteWeb.TripCompareController
  alias TripPlan.{Api.MockPlanner, Itinerary, PersonalDetail, TransitDetail}
  doctest SiteWeb.TripCompareController

  import Mock

  @system_time "2017-01-01T12:20:00-05:00"
  @morning %{
    "year" => "2017",
    "month" => "1",
    "day" => "2",
    "hour" => "9",
    "minute" => "30",
    "am_pm" => "AM"
  }
  @afternoon %{
    "year" => "2017",
    "month" => "1",
    "day" => "2",
    "hour" => "5",
    "minute" => "30",
    "am_pm" => "PM"
  }
  @after_hours %{
    "year" => "2017",
    "month" => "1",
    "day" => "2",
    "hour" => "3",
    "minute" => "00",
    "am_pm" => "AM"
  }
  @modes %{"subway" => "true", "commuter_rail" => "true", "bus" => "false", "ferry" => "false"}

  @good_params %{
    "date_time" => @system_time,
    "plan" => %{
      "from" => "from address",
      "to" => "to address",
      "date_time" => @afternoon,
      "time" => "depart",
      "modes" => @modes,
      "optimize_for" => "best_route"
    }
  }

  @bad_params %{
    "date_time" => @system_time,
    "plan" => %{"from" => "no results", "to" => "too many results", "date_time" => @afternoon}
  }

  @subway_fare %Fare{
    additional_valid_modes: [:bus],
    cents: 290,
    duration: :single_trip,
    media: [:charlie_ticket, :cash],
    mode: :subway,
    name: :subway,
    price_label: nil,
    reduced: nil
  }

  @free_sl_fare %Fare{
    additional_valid_modes: [],
    cents: 0,
    duration: :single_trip,
    media: [],
    mode: :bus,
    name: :free_fare,
    price_label: nil,
    reduced: nil
  }

  @login_sl_plus_subway_itinerary %Itinerary{
    legs: [
      %TripPlan.Leg{
        description: "WALK",
        mode: %TripPlan.PersonalDetail{
          distance: 385.75800000000004
        }
      },
      %TripPlan.Leg{
        description: "BUS",
        from: %TripPlan.NamedPosition{
          name: "Terminal A",
          stop_id: "17091"
        },
        mode: %TripPlan.TransitDetail{
          route_id: "741",
          fares: %{
            highest_one_way_fare: @free_sl_fare,
            lowest_one_way_fare: @free_sl_fare,
            reduced_one_way_fare: @free_sl_fare
          }
        },
        name: "SL1",
        to: %TripPlan.NamedPosition{
          name: "South Station",
          stop_id: "74617"
        },
        type: "1"
      },
      %TripPlan.Leg{
        description: "WALK",
        mode: %TripPlan.PersonalDetail{
          distance: 0.0
        },
        name: ""
      },
      %TripPlan.Leg{
        description: "SUBWAY",
        from: %TripPlan.NamedPosition{
          name: "South Station",
          stop_id: "70080"
        },
        mode: %TripPlan.TransitDetail{
          route_id: "Red",
          fares: %{
            highest_one_way_fare: @subway_fare,
            lowest_one_way_fare: @subway_fare,
            reduced_one_way_fare: @subway_fare
          }
        },
        name: "Red Line",
        to: %TripPlan.NamedPosition{
          name: "Downtown Crossing",
          stop_id: "70078"
        },
        type: "1"
      }
    ],
    start: DateTime.from_unix!(0),
    stop: DateTime.from_unix!(0)
  }

  setup do
    conn = default_conn() |> put_req_cookie("tp_redesign", "true")

    end_of_rating =
      @system_time
      |> Timex.parse!("{ISO:Extended}")
      |> Timex.shift(months: 3)
      |> DateTime.to_date()

    {:ok, conn: assign(conn, :end_of_rating, end_of_rating)}
  end

  describe "routes_for_query/1" do
    setup do
      from = MockPlanner.random_stop()
      to = MockPlanner.random_stop()
      {:ok, itineraries} = TripPlan.plan(from, to, [])
      {:ok, %{itineraries: itineraries}}
    end

    test "doesn't set custom_route? flag for regular routes", %{itineraries: itineraries} do
      rfq = TripCompareController.routes_for_query(itineraries)
      assert Enum.all?(rfq, fn {_route_id, route} -> !route.custom_route? end)
    end

    test "sets custom_route? flag for routes not present in API", %{itineraries: itineraries} do
      itineraries =
        Enum.map(itineraries, fn i ->
          legs =
            Enum.map(i.legs, fn l ->
              case l do
                %{mode: %{route_id: _route_id}} ->
                  mode = %{l.mode | route_id: "UNKNOWN"}
                  %{l | mode: mode}

                _ ->
                  l
              end
            end)

          %{i | legs: legs}
        end)

      rfq = TripCompareController.routes_for_query(itineraries)
      assert Enum.all?(rfq, fn {_route_id, route} -> route.custom_route? end)
    end

    test "identifies subsequent subway legs as free when trip is from the airport" do
      it =
        TripCompareController.readjust_itinerary_with_free_fares(@login_sl_plus_subway_itinerary)

      fares = SiteWeb.TripCompareView.get_calculated_fares(it)

      assert fares == %{
               free_service: %{
                 mode: %{
                   fares: %{
                     highest_one_way_fare: @free_sl_fare,
                     lowest_one_way_fare: @free_sl_fare,
                     reduced_one_way_fare: @free_sl_fare
                   },
                   mode: :bus,
                   mode_name: "Bus",
                   name: "Free Service"
                 }
               }
             }
    end

    test "does not modify itinerary since trip is not from the airport" do
      # reuse @login_sl_plus_subway_itinerary except the SL leg:
      subway_legs = List.delete_at(@login_sl_plus_subway_itinerary.legs, 1)
      subway_itinerary = %Itinerary{@login_sl_plus_subway_itinerary | legs: subway_legs}

      it = TripCompareController.readjust_itinerary_with_free_fares(subway_itinerary)

      fares = SiteWeb.TripCompareView.get_calculated_fares(it)

      assert fares == %{
               subway: %{
                 mode: %{
                   fares: %{
                     highest_one_way_fare: @subway_fare,
                     lowest_one_way_fare: @subway_fare,
                     reduced_one_way_fare: @subway_fare
                   },
                   mode: :subway,
                   mode_name: "Subway",
                   name: "Subway"
                 }
               }
             }
    end
  end
end
