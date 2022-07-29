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

  describe "index without params" do
    test "renders index.html", %{conn: conn} do
      conn = get(conn, trip_compare_path(conn, :index))
      assert html_response(conn, 200) =~ "Trip Planner"
      assert conn.assigns.requires_location_service?
    end

    test "assigns initial map data", %{conn: conn} do
      conn = get(conn, trip_compare_path(conn, :index))
      assert conn.assigns.map_data
    end

    test "assigns modes to empty map", %{conn: conn} do
      conn = get(conn, trip_compare_path(conn, :index))
      assert conn.assigns.modes == %{}
    end

    test "sets a custom meta description", %{conn: conn} do
      conn = get(conn, trip_compare_path(conn, :index))
      assert conn.assigns.meta_description
    end
  end

  describe "index with params" do
    test "renders the query plan", %{conn: conn} do
      conn = get(conn, trip_compare_path(conn, :index, @good_params))
      response = html_response(conn, 200)
      assert response =~ "Trip Planner"
      assert %Query{} = conn.assigns.query
      assert conn.assigns.itineraries
      assert conn.assigns.routes
      assert conn.assigns.itinerary_maps
      assert conn.assigns.related_links
    end

    test "uses current location to render a query plan", %{conn: conn} do
      params = %{
        "date_time" => @system_time,
        "plan" => %{
          "from" => "Your current location",
          "from_latitude" => "42.3428",
          "from_longitude" => "-71.0857",
          "to" => "to address",
          "to_latitude" => "",
          "to_longitude" => "",
          "date_time" => @morning,
          "modes" => @modes
        }
      }

      conn = get(conn, trip_compare_path(conn, :index, params))

      assert html_response(conn, 200) =~ "Trip Planner"
      assert conn.assigns.requires_location_service?
      assert %Query{} = conn.assigns.query
    end

    test "sets hidden inputs for lat/lng", %{conn: conn} do
      params = %{
        "date_time" => @system_time,
        "plan" => %{
          "from" => "from address",
          "from_latitude" => "1",
          "from_longitude" => "2",
          "to" => "to address",
          "to_latitude" => "3",
          "to_longitude" => "4",
          "date_time" => @morning,
          "modes" => @modes
        }
      }

      conn = get(conn, trip_compare_path(conn, :index, params))

      resp = html_response(conn, 200)
      assert from_latitude = Floki.find(resp, "#from_latitude")
      assert from_longitude = Floki.find(resp, "#from_longitude")
      assert to_latitude = Floki.find(resp, "#to_latitude")
      assert to_longitude = Floki.find(resp, "#to_longitude")
      assert List.first(Floki.attribute(from_latitude, "value")) == "1.0"
      assert List.first(Floki.attribute(from_longitude, "value")) == "2.0"
      assert List.first(Floki.attribute(to_latitude, "value")) == "3.0"
      assert List.first(Floki.attribute(to_longitude, "value")) == "4.0"
    end

    test "assigns.mode is a map of parsed mode state", %{conn: conn} do
      params = %{
        "date_time" => @system_time,
        "plan" => %{
          "from" => "Your current location",
          "from_latitude" => "42.3428",
          "from_longitude" => "-71.0857",
          "to" => "to address",
          "to_latitude" => "",
          "to_longitude" => "",
          "date_time" => @morning,
          "modes" => @modes
        }
      }

      conn = get(conn, trip_compare_path(conn, :index, params))

      assert html_response(conn, 200) =~ "Trip Planner"
      assert conn.assigns.modes == %{subway: true, commuter_rail: true, bus: false, ferry: false}
      assert %Query{} = conn.assigns.query
    end

    test "assigns.optimize_for defaults to best_route", %{conn: conn} do
      params = %{
        "date_time" => @system_time,
        "plan" => %{
          "from" => "Your current location",
          "from_latitude" => "42.3428",
          "from_longitude" => "-71.0857",
          "to" => "to address",
          "to_latitude" => "",
          "to_longitude" => "",
          "date_time" => @morning,
          "modes" => @modes
        }
      }

      conn = get(conn, trip_compare_path(conn, :index, params))

      assert html_response(conn, 200) =~ "Trip Planner"
      assert conn.assigns.optimize_for == "best_route"
    end

    test "assigns.optimize_for uses value provided in params", %{conn: conn} do
      params = %{
        "date_time" => @system_time,
        "plan" => %{
          "from" => "Your current location",
          "from_latitude" => "42.3428",
          "from_longitude" => "-71.0857",
          "to" => "to address",
          "to_latitude" => "",
          "to_longitude" => "",
          "date_time" => @morning,
          "modes" => @modes,
          "optimize_for" => "less_walking"
        }
      }

      conn = get(conn, trip_compare_path(conn, :index, params))

      assert html_response(conn, 200) =~ "Trip Planner"
      assert conn.assigns.optimize_for == "less_walking"
    end

    test "can use the old date time format", %{conn: conn} do
      old_dt_format = Map.delete(@afternoon, "am_pm")

      params = %{
        "date_time" => @system_time,
        "plan" => %{
          "from" => "from_address",
          "from_latitude" => "",
          "from_longitude" => "",
          "to" => "to address",
          "to_latitude" => "",
          "to_longitude" => "",
          "date_time" => old_dt_format,
          "mode" => @modes
        }
      }

      conn = get(conn, trip_compare_path(conn, :index, params))
      assert html_response(conn, 200)
    end

    test "each map url has a path color", %{conn: conn} do
      conn = get(conn, trip_compare_path(conn, :index, @good_params))

      for {map_data, static_map} <- conn.assigns.itinerary_maps do
        assert static_map =~ "color"

        for path <- map_data.polylines do
          assert path.color
        end
      end
    end

    test "renders a geocoding error", %{conn: conn} do
      conn = get(conn, trip_compare_path(conn, :index, @bad_params))
      response = html_response(conn, 200)
      assert response =~ "Trip Planner"
      assert response =~ "Did you mean?"
      assert conn.assigns.requires_location_service?
      assert %Query{} = conn.assigns.query
    end

    test "assigns maps for each itinerary", %{conn: conn} do
      conn = get(conn, trip_compare_path(conn, :index, @good_params))
      assert conn.assigns.itinerary_maps

      for {_map_data, static_map} <- conn.assigns.itinerary_maps do
        assert static_map =~ "https://maps.googleapis.com/maps/api/staticmap"
      end
    end

    test "gets routes from each itinerary", %{conn: conn} do
      conn = get(conn, trip_compare_path(conn, :index, @good_params))
      assert conn.assigns.routes

      for routes_for_itinerary <- conn.assigns.routes do
        assert length(routes_for_itinerary) > 0
      end
    end

    test "assigns an ItineraryRowList for each itinerary", %{conn: conn} do
      conn = get(conn, trip_compare_path(conn, :index, @good_params))
      assert conn.assigns.itinerary_row_lists
    end

    test "adds fare data to each transit leg of each itinerary", %{conn: conn} do
      conn = get(conn, trip_compare_path(conn, :index, @good_params))

      assert Enum.all?(conn.assigns.itineraries, fn itinerary ->
               Enum.all?(itinerary.legs, fn leg ->
                 match?(%PersonalDetail{}, leg.mode) ||
                   match?(
                     %TransitDetail{
                       fares: %{
                         highest_one_way_fare: %Fares.Fare{},
                         lowest_one_way_fare: %Fares.Fare{},
                         reduced_one_way_fare: %Fares.Fare{}
                       }
                     },
                     leg.mode
                   )
               end)
             end)
    end

    test "returns all nil fares when there is not enough information", %{conn: conn} do
      # force legs to have incomplete information:
      with_mock TripPlan.Leg, [:passthrough],
        is_fare_complete_transit_leg?: fn _leg ->
          false
        end do
        conn = get(conn, trip_compare_path(conn, :index, @good_params))

        for itinerary <- conn.assigns.itineraries do
          for leg <- itinerary.legs do
            if TripPlan.Leg.transit?(leg) do
              assert leg.mode.fares == %{
                       highest_one_way_fare: nil,
                       lowest_one_way_fare: nil,
                       reduced_one_way_fare: nil
                     }
            end
          end
        end
      end
    end

    test "adds monthly pass data to each itinerary", %{conn: conn} do
      conn = get(conn, trip_compare_path(conn, :index, @good_params))

      assert Enum.all?(conn.assigns.itineraries, fn itinerary ->
               %Itinerary{passes: %{base_month_pass: %Fare{}, recommended_month_pass: %Fare{}}} =
                 itinerary
             end)
    end

    test "renders an error if longitude and latitude from both addresses are the same", %{
      conn: conn
    } do
      params = %{
        "date_time" => @system_time,
        "plan" => %{
          "from_latitude" => "90",
          "to_latitude" => "90",
          "from_longitude" => "50",
          "to_longitude" => "50",
          "date_time" => @afternoon,
          "from" => "from St",
          "to" => "from Street"
        }
      }

      conn = get(conn, trip_compare_path(conn, :index, params))
      assert conn.assigns.plan_error == [:same_address]
      assert html_response(conn, 200)
      assert html_response(conn, 200) =~ "two different locations"
    end

    test "doesn't render an error if longitudes and latitudes are unique", %{conn: conn} do
      params = %{
        "date_time" => @system_time,
        "plan" => %{
          "from_latitude" => "90",
          "to_latitude" => "90.5",
          "from_longitude" => "50.5",
          "to_longitude" => "50",
          "date_time" => @afternoon,
          "from" => "from St",
          "to" => "from Street"
        }
      }

      conn = get(conn, trip_compare_path(conn, :index, params))
      assert conn.assigns.plan_error == []
      assert html_response(conn, 200)
    end

    test "renders an error if to and from address are the same", %{conn: conn} do
      params = %{
        "date_time" => @system_time,
        "plan" => %{
          "from" => "from",
          "to" => "from",
          "date_time" => @afternoon
        }
      }

      conn = get(conn, trip_compare_path(conn, :index, params))
      assert conn.assigns.plan_error == [:same_address]
      assert html_response(conn, 200)
      assert html_response(conn, 200) =~ "two different locations"
    end

    test "doesn't render an error if to and from address are unique", %{conn: conn} do
      params = %{
        "date_time" => @system_time,
        "plan" => %{
          "from" => "from",
          "to" => "to",
          "date_time" => @afternoon
        }
      }

      conn = get(conn, trip_compare_path(conn, :index, params))
      assert conn.assigns.plan_error == []
      assert html_response(conn, 200)
    end

    test "handles empty lat/lng", %{conn: conn} do
      params = %{
        "date_time" => @system_time,
        "plan" => %{
          "from" => "from",
          "to" => "from",
          "to_latitude" => "",
          "to_longitude" => "",
          "from_latitude" => "",
          "from_longitude" => "",
          "date_time" => @afternoon
        }
      }

      conn = get(conn, trip_compare_path(conn, :index, params))
      assert conn.assigns.plan_error == [:same_address]
      assert html_response(conn, 200)
      assert html_response(conn, 200) =~ "two different locations"
    end

    test "bad date input: fictional day", %{conn: conn} do
      params = %{
        "date_time" => @system_time,
        "plan" => %{
          "from" => "from address",
          "to" => "to address",
          "date_time" => %{@morning | "month" => "6", "day" => "31"}
        }
      }

      conn = get(conn, trip_compare_path(conn, :index, params))
      response = html_response(conn, 200)
      assert response =~ "Date is not valid"
    end

    test "bad date input: partial input", %{conn: conn} do
      params = %{
        "date_time" => @system_time,
        "plan" => %{
          "from" => "from address",
          "to" => "to address",
          "date_time" => %{@morning | "month" => ""}
        }
      }

      conn = get(conn, trip_compare_path(conn, :index, params))
      response = html_response(conn, 200)
      assert response =~ "Date is not valid"
    end

    test "bad date input: corrupt day", %{conn: conn} do
      date_input = %{
        "year" => "A",
        "month" => "B",
        "day" => "C",
        "hour" => "D",
        "minute" => "E",
        "am_pm" => "PM"
      }

      params = %{
        "date_time" => @system_time,
        "plan" => %{"from" => "from address", "to" => "to address", "date_time" => date_input}
      }

      conn = get(conn, trip_compare_path(conn, :index, params))
      response = html_response(conn, 200)
      assert response =~ "Date is not valid"
    end

    test "bad date input: too far in future", %{conn: conn} do
      end_date = Timex.shift(Schedules.Repo.end_of_rating(), days: 1)

      end_date_as_params = %{
        "month" => Integer.to_string(end_date.month),
        "day" => Integer.to_string(end_date.day),
        "year" => Integer.to_string(end_date.year),
        "hour" => "12",
        "minute" => "15",
        "am_pm" => "PM"
      }

      params = %{
        "date_time" => @system_time,
        "plan" => %{
          "from" => "from address",
          "to" => "to address",
          "date_time" => end_date_as_params,
          "time" => "depart"
        }
      }

      conn = get(conn, trip_compare_path(conn, :index, params))
      response = html_response(conn, 200)
      assert Map.get(conn.assigns, :plan_error) == [:too_future]
      assert response =~ "Date is too far in the future"

      expected =
        [:too_future]
        |> SiteWeb.TripCompareView.plan_error_description()
        |> IO.iodata_to_binary()

      assert response =~ expected
    end

    test "bad date input: date in past", %{conn: conn} do
      past_date =
        @system_time
        |> Timex.parse!("{ISO:Extended}")
        |> Timex.shift(days: -10)

      past_date_as_params = %{
        "month" => Integer.to_string(past_date.month),
        "day" => Integer.to_string(past_date.day),
        "year" => Integer.to_string(past_date.year),
        "hour" => "12",
        "minute" => "15",
        "am_pm" => "PM"
      }

      params = %{
        "date_time" => @system_time,
        "plan" => %{
          "from" => "from address",
          "to" => "to address",
          "date_time" => past_date_as_params,
          "time" => "depart"
        }
      }

      conn = get(conn, trip_compare_path(conn, :index, params))
      response = html_response(conn, 200)
      assert Map.get(conn.assigns, :plan_error) == [:past]
      assert response =~ "Date is in the past"
    end

    test "handles missing date and time params, using today's values if they are missing",
         %{conn: conn} do
      wrong_datetime_params = %{
        "year" => "2017",
        "day" => "2",
        "hour" => "9",
        "am_pm" => "AM"
      }

      params = %{
        "date_time" => @system_time,
        "plan" => %{
          "from" => "from address",
          "to" => "to address",
          "date_time" => wrong_datetime_params
        }
      }

      conn = get(conn, trip_compare_path(conn, :index, params))
      assert html_response(conn, 200)
    end

    test "handles non-existing date and time params, using today's values",
         %{conn: conn} do
      params = %{
        "date_time" => @system_time,
        "plan" => %{
          "from" => "from address",
          "to" => "to address",
          "date_time" => %{}
        }
      }

      conn = get(conn, trip_compare_path(conn, :index, params))
      assert html_response(conn, 200)
    end

    test "does not need to default date and time params as they are present",
         %{conn: conn} do
      params = %{
        "date_time" => @system_time,
        "plan" => %{
          "from" => "from address",
          "to" => "to address",
          "date_time" => @morning
        }
      }

      conn = get(conn, trip_compare_path(conn, :index, params))
      assert html_response(conn, 200)
    end

    test "good date input: date within service date of end of rating", %{conn: conn} do
      # after midnight but before end of service on last day of rating
      # should still be inside of the rating

      date = Timex.shift(conn.assigns.end_of_rating, days: 1)

      date_params = %{
        "month" => Integer.to_string(date.month),
        "day" => Integer.to_string(date.day),
        "year" => Integer.to_string(date.year),
        "hour" => "12",
        "minute" => "15",
        "am_pm" => "AM"
      }

      params = %{
        "date_time" => @system_time,
        "plan" => %{"from" => "from address", "to" => "to address", "date_time" => date_params}
      }

      conn = get(conn, trip_compare_path(conn, :index, params))

      response = html_response(conn, 200)
      assert Map.get(conn.assigns, :plan_error) == []
      refute response =~ "Date is too far in the future"
      refute response =~ "Date is not valid"
    end

    test "hour and minute are processed correctly when provided as single digits", %{conn: conn} do
      params = %{
        "date_time" => @system_time,
        "plan" => %{
          "from" => "from address",
          "to" => "to address",
          "date_time" => %{@after_hours | "hour" => "1", "minute" => "1"},
          "time" => "depart"
        }
      }

      conn = get(conn, trip_compare_path(conn, :index, params))
      response = html_response(conn, 200)
      assert Map.get(conn.assigns, :plan_error) == []
      refute response =~ "Date is not valid"
    end

    test "destination address has a checkmark in its stop bubble", %{conn: conn} do
      params = %{
        "date_time" => @system_time,
        "plan" => %{"from" => "from address", "to" => "to address", "date_time" => @morning}
      }

      morning_conn = get(conn, trip_compare_path(conn, :index, params))
      assert Enum.count(morning_conn.assigns.itinerary_row_lists) == 4

      afternoon_conn =
        get(
          conn,
          trip_compare_path(conn, :index, %{
            params
            | "plan" => %{
                "from" => "from address",
                "to" => "to address",
                "date_time" => @afternoon
              }
          })
        )

      assert Enum.count(afternoon_conn.assigns.itinerary_row_lists) == 4
    end
  end

  describe "/to/ address path" do
    test "gets a valid address in the 'to' field", %{conn: conn} do
      conn = get(conn, trip_compare_path(conn, :to, "Boston Common"))

      assert conn.assigns.query.to.name == "Geocoded Boston Common"
    end

    test "uses expected values when addres is formatted latitutde,longitude,stopName", %{
      conn: conn
    } do
      conn = get(conn, trip_compare_path(conn, :to, "42.395428,-71.142483,Cobbs Corner, Canton"))

      assert html_response(conn, 200)
      assert conn.assigns.query.to.name == "Cobbs Corner, Canton"
      assert conn.assigns.query.to.latitude == 42.395428
      assert conn.assigns.query.to.longitude == -71.142483
    end

    test "when 'plan' is part of the parameters, it redirects to the usual trip planner", %{
      conn: conn
    } do
      plan_params = %{"plan" => %{"from" => "from address", "to" => "to address"}}

      conn =
        get(
          conn,
          trip_compare_path(conn, :to, "Address", plan_params)
        )

      assert redirected_to(conn) == trip_compare_path(conn, :index, plan_params)
    end
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

  describe "Date and time selector" do
    test "renders a date and time selector", %{conn: conn} do
      conn = get(conn, trip_compare_path(conn, :index))
      rendered = html_response(conn, 200)

      # check there are date and time selectors:
      refute Floki.find(rendered, "div[id=\"plan-time-select\"]") == []
      refute Floki.find(rendered, "select[id=\"plan_date_time_hour\"]") == []
      refute Floki.find(rendered, "select[id=\"plan_date_time_minute\"]") == []
      refute Floki.find(rendered, "select[id=\"plan_date_time_am_pm\"]") == []

      refute Floki.find(rendered, "div[id=\"plan-date\"]") == []
    end
  end
end
