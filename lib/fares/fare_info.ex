defmodule Fares.FareInfo do
  @moduledoc """
  Retrieve saved fare data from the file system and map to structs.
  """

  alias Fares.Fare

  @fare_data [
    %{
      mode: :commuter,
      zone: "1A",
      single_trip: "2.40",
      single_trip_reduced: "1.10",
      monthly: "90.00",
      monthly_reduced: "30.00"
    },
    %{
      mode: :commuter,
      zone: "1",
      single_trip: "6.50",
      single_trip_reduced: "3.25",
      monthly: "214.00",
      monthly_reduced: "107.00"
    },
    %{
      mode: :commuter,
      zone: "2",
      single_trip: "7.00",
      single_trip_reduced: "3.50",
      monthly: "232.00",
      monthly_reduced: "116.00"
    },
    %{
      mode: :commuter,
      zone: "3",
      single_trip: "8.00",
      single_trip_reduced: "4.00",
      monthly: "261.00",
      monthly_reduced: "130.00"
    },
    %{
      mode: :commuter,
      zone: "4",
      single_trip: "8.75",
      single_trip_reduced: "4.25",
      monthly: "281.00",
      monthly_reduced: "136.00"
    },
    %{
      mode: :commuter,
      zone: "5",
      single_trip: "9.75",
      single_trip_reduced: "4.75",
      monthly: "311.00",
      monthly_reduced: "152.00"
    },
    %{
      mode: :commuter,
      zone: "6",
      single_trip: "10.50",
      single_trip_reduced: "5.25",
      monthly: "340.00",
      monthly_reduced: "170.00"
    },
    %{
      mode: :commuter,
      zone: "7",
      single_trip: "11.00",
      single_trip_reduced: "5.50",
      monthly: "360.00",
      monthly_reduced: "180.00"
    },
    %{
      mode: :commuter,
      zone: "8",
      single_trip: "12.25",
      single_trip_reduced: "6.00",
      monthly: "388.00",
      monthly_reduced: "190.00"
    },
    %{
      mode: :commuter,
      zone: "9",
      single_trip: "12.75",
      single_trip_reduced: "6.25",
      monthly: "406.00",
      monthly_reduced: "199.00"
    },
    %{
      mode: :commuter,
      zone: "10",
      single_trip: "13.25",
      single_trip_reduced: "6.50",
      monthly: "426.00",
      monthly_reduced: "209.00"
    },
    %{
      mode: :commuter,
      zone: "interzone_1",
      single_trip: "2.75",
      single_trip_reduced: "1.25",
      monthly: "90.00",
      monthly_reduced: "41.00"
    },
    %{
      mode: :commuter,
      zone: "interzone_2",
      single_trip: "3.25",
      single_trip_reduced: "1.50",
      monthly: "110.00",
      monthly_reduced: "51.00"
    },
    %{
      mode: :commuter,
      zone: "interzone_3",
      single_trip: "3.50",
      single_trip_reduced: "1.75",
      monthly: "120.00",
      monthly_reduced: "60.00"
    },
    %{
      mode: :commuter,
      zone: "interzone_4",
      single_trip: "4.25",
      single_trip_reduced: "2.00",
      monthly: "139.00",
      monthly_reduced: "65.00"
    },
    %{
      mode: :commuter,
      zone: "interzone_5",
      single_trip: "4.75",
      single_trip_reduced: "2.25",
      monthly: "158.00",
      monthly_reduced: "75.00"
    },
    %{
      mode: :commuter,
      zone: "interzone_6",
      single_trip: "5.25",
      single_trip_reduced: "2.50",
      monthly: "178.00",
      monthly_reduced: "85.00"
    },
    %{
      mode: :commuter,
      zone: "interzone_7",
      single_trip: "5.75",
      single_trip_reduced: "2.75",
      monthly: "196.00",
      monthly_reduced: "94.00"
    },
    %{
      mode: :commuter,
      zone: "interzone_8",
      single_trip: "6.25",
      single_trip_reduced: "3.00",
      monthly: "216.00",
      monthly_reduced: "104.00"
    },
    %{
      mode: :commuter,
      zone: "interzone_9",
      single_trip: "6.75",
      single_trip_reduced: "3.25",
      monthly: "237.00",
      monthly_reduced: "114.00"
    },
    %{
      mode: :commuter,
      zone: "interzone_10",
      single_trip: "7.25",
      single_trip_reduced: "3.50",
      monthly: "257.00",
      monthly_reduced: "124.00"
    },
    %{mode: :foxboro, round_trip: "20.00"},
    %{
      mode: :subway,
      charlie_card_price: "2.40",
      day_reduced_price: "1.10",
      week_reduced_price: "10.00",
      month_reduced_price: "30.00",
      day_pass_price: "11.00",
      week_pass_price: "22.50",
      month_pass_price: "90.00"
    },
    %{
      mode: :local_bus,
      charlie_card_price: "1.70",
      day_reduced_price: "0.85",
      week_reduced_price: "10.00",
      month_reduced_price: "30.00",
      day_pass_price: "11.00",
      week_pass_price: "22.50",
      month_pass_price: "55.00"
    },
    %{
      mode: :express_bus,
      charlie_card_price: "4.25",
      day_reduced_price: "2.10",
      week_reduced_price: "10.00",
      month_reduced_price: "67.00",
      day_pass_price: "11.00",
      week_pass_price: "22.50",
      month_pass_price: "136.00"
    },
    %{
      mode: :ferry,
      inner_harbor_price: "3.70",
      inner_harbor_month_price: "90.00",
      inner_harbor_month_price_reduced: "30.00",
      cross_harbor_price: "9.75",
      east_boston_price: "2.40",
      lynn_price: "7.00",
      winthrop_price: "6.50",
      commuter_ferry_price: "9.75",
      commuter_ferry_month_price: "329.00",
      commuter_ferry_month_price_reduced: "164.00",
      commuter_ferry_logan_price: "9.75",
      day_pass_price: "11.00",
      week_pass_price: "22.50"
    },
    %{
      mode: :the_ride,
      ada_ride: "3.35",
      ada_ride_reduced: "1.70",
      premium_ride: "5.60",
      premium_ride_reduced: "2.80"
    },
    # Logan Express Back Bay
    %{mode: :massport_shuttle, name: "Massport-32511", single_trip: "3.00"},
    # Logan Express Framingham
    %{mode: :massport_shuttle, name: "Massport-FH", single_trip: "9.00"},
    # Logan Express Braintree
    %{mode: :massport_shuttle, name: "Massport-BT", single_trip: "9.00"},
    # Logan Express Danvers
    %{mode: :massport_shuttle, name: "Massport-DV", single_trip: "9.00"},
    # Logan Express Woburn
    %{mode: :massport_shuttle, name: "Massport-WO", single_trip: "9.00"}
  ]

  @doc "Load fare info from a CSV file."
  @spec fare_info() :: [Fare.t()]
  def fare_info do
    @fare_data
    |> Enum.flat_map(&mapper/1)
    |> Enum.concat(free_fare())
    |> split_reduced_fares()
  end

  @spec mapper(map()) :: [Fare.t()]
  def mapper(%{
        mode: :commuter,
        zone: zone,
        single_trip: single_trip,
        single_trip_reduced: single_trip_reduced,
        monthly: monthly,
        monthly_reduced: monthly_reduced
      }) do
    base = %Fare{
      mode: :commuter_rail,
      name: commuter_rail_fare_name(zone)
    }

    fares = [
      %{
        base
        | duration: :single_trip,
          media: [:commuter_ticket, :cash, :mticket],
          reduced: nil,
          cents: dollars_to_cents(single_trip)
      },
      %{
        base
        | duration: :single_trip,
          media: [:senior_card, :student_card],
          reduced: :any,
          cents: dollars_to_cents(single_trip_reduced)
      },
      %{
        base
        | duration: :round_trip,
          media: [:commuter_ticket, :cash, :mticket],
          reduced: nil,
          cents: dollars_to_cents(single_trip) * 2
      },
      %{
        base
        | duration: :round_trip,
          media: [:senior_card, :student_card],
          reduced: :any,
          cents: dollars_to_cents(single_trip_reduced) * 2
      },
      %{
        base
        | duration: :month,
          media: [:commuter_ticket],
          reduced: nil,
          cents: dollars_to_cents(monthly),
          additional_valid_modes: monthly_commuter_modes(zone)
      },
      %{
        base
        | duration: :month,
          media: [:senior_card, :student_card],
          reduced: :any,
          cents: dollars_to_cents(monthly_reduced),
          additional_valid_modes: monthly_commuter_modes(zone)
      },
      %{
        base
        | duration: :month,
          media: [:mticket],
          reduced: nil,
          cents: mticket_price(dollars_to_cents(monthly))
      },
      %{
        base
        | duration: :month,
          media: [:mticket],
          reduced: :any,
          cents: reduced_mticket_price(dollars_to_cents(monthly_reduced))
      },
      %{
        base
        | duration: :weekend,
          media: [:commuter_ticket, :cash, :mticket],
          reduced: nil,
          cents: 1_000
      }
    ]

    if zone == "zone_1a" do
      [
        %{
          base
          | duration: :month,
            media: [:senior_card, :student_card],
            reduced: :any,
            cents: dollars_to_cents(monthly_reduced)
        }
        | fares
      ]
    else
      fares
    end
  end

  def mapper(%{
        mode: :subway,
        charlie_card_price: charlie_card_price,
        day_reduced_price: day_reduced_price,
        week_reduced_price: week_reduced_price,
        month_reduced_price: month_reduced_price,
        day_pass_price: day_pass_price,
        week_pass_price: week_pass_price,
        month_pass_price: month_pass_price
      }) do
    base = %Fare{
      mode: :subway,
      name: :subway
    }

    [
      %{
        base
        | duration: :month,
          media: [:charlie_card, :charlie_ticket],
          reduced: nil,
          cents: dollars_to_cents(month_pass_price),
          additional_valid_modes: [:bus]
      },
      %{
        base
        | duration: :week,
          media: [:senior_card, :student_card],
          reduced: :any,
          cents: dollars_to_cents(week_reduced_price),
          additional_valid_modes: [:bus]
      },
      %{
        base
        | duration: :month,
          media: [:senior_card, :student_card],
          reduced: :any,
          cents: dollars_to_cents(month_reduced_price),
          additional_valid_modes: [:bus]
      },
      %{
        base
        | duration: :single_trip,
          media: [:charlie_card, :charlie_ticket, :contactless_payment, :cash],
          reduced: nil,
          cents: dollars_to_cents(charlie_card_price),
          additional_valid_modes: [:bus]
      },
      %{
        base
        | duration: :single_trip,
          media: [:senior_card, :student_card],
          reduced: :any,
          cents: dollars_to_cents(day_reduced_price)
      },
      %{
        base
        | duration: :week,
          media: [:charlie_card, :charlie_ticket],
          reduced: nil,
          cents: dollars_to_cents(week_pass_price),
          additional_valid_modes: [:bus, :commuter_rail, :ferry]
      },
      %{
        base
        | duration: :day,
          media: [:charlie_card, :charlie_ticket],
          reduced: nil,
          cents: dollars_to_cents(day_pass_price),
          additional_valid_modes: [:bus, :commuter_rail, :ferry]
      }
    ]
  end

  def mapper(%{
        mode: mode,
        charlie_card_price: charlie_card_price,
        day_reduced_price: day_reduced_price,
        week_reduced_price: week_reduced_price,
        month_reduced_price: month_reduced_price,
        month_pass_price: month_pass_price
      })
      when mode in [:local_bus, :express_bus] do
    base = %Fare{
      mode: :bus,
      name: mode
    }

    fares = [
      %{
        base
        | duration: :single_trip,
          media: [:charlie_card, :charlie_ticket, :contactless_payment, :cash],
          reduced: nil,
          cents: dollars_to_cents(charlie_card_price)
      },
      %{
        base
        | duration: :single_trip,
          media: [:senior_card, :student_card],
          reduced: :any,
          cents: dollars_to_cents(day_reduced_price)
      },
      %{
        base
        | duration: :month,
          media: [:charlie_card, :charlie_ticket],
          reduced: nil,
          cents: dollars_to_cents(month_pass_price)
      }
    ]

    if mode == :local_bus do
      [
        %{
          base
          | duration: :week,
            media: [:senior_card, :student_card],
            reduced: :any,
            cents: dollars_to_cents(week_reduced_price)
        }
        | fares
      ]
    else
      [
        %{
          base
          | duration: :month,
            media: [:senior_card, :student_card],
            reduced: :any,
            cents: dollars_to_cents(month_reduced_price)
        }
        | fares
      ]
    end
  end

  def mapper(%{
        mode: :ferry,
        inner_harbor_price: inner_harbor_price,
        inner_harbor_month_price: inner_harbor_month_price,
        inner_harbor_month_price_reduced: inner_harbor_month_price_reduced,
        cross_harbor_price: cross_harbor_price,
        east_boston_price: east_boston_price,
        lynn_price: lynn_price,
        winthrop_price: winthrop_price,
        commuter_ferry_price: commuter_ferry_price,
        commuter_ferry_month_price_reduced: commuter_ferry_month_price_reduced,
        commuter_ferry_month_price: commuter_ferry_month_price,
        commuter_ferry_logan_price: commuter_ferry_logan_price
      }) do
    fares = [
      %Fare{
        mode: :ferry,
        name: :ferry_inner_harbor,
        duration: :single_trip,
        media: [:mticket, :paper_ferry, :contactless_payment, :cash],
        reduced: nil,
        cents: dollars_to_cents(inner_harbor_price)
      },
      %Fare{
        mode: :ferry,
        name: :ferry_inner_harbor,
        duration: :round_trip,
        media: [:mticket, :paper_ferry, :contactless_payment, :cash],
        reduced: nil,
        cents: dollars_to_cents(inner_harbor_price) * 2
      },
      %Fare{
        mode: :ferry,
        name: :ferry_inner_harbor,
        duration: :month,
        media: [:charlie_ticket],
        reduced: nil,
        cents: dollars_to_cents(inner_harbor_month_price),
        additional_valid_modes: [:subway, :bus, :commuter_rail]
      },
      %Fare{
        mode: :ferry,
        name: :ferry_inner_harbor,
        duration: :month,
        media: [:senior_card, :student_card],
        reduced: :any,
        cents: dollars_to_cents(inner_harbor_month_price_reduced),
        additional_valid_modes: [:subway, :bus, :commuter_rail]
      },
      %Fare{
        mode: :ferry,
        name: :ferry_inner_harbor,
        duration: :month,
        media: [:mticket],
        reduced: nil,
        cents: dollars_to_cents(inner_harbor_month_price) - 1000
      },
      %Fare{
        mode: :ferry,
        name: :ferry_cross_harbor,
        duration: :single_trip,
        media: [:mticket, :paper_ferry, :contactless_payment, :cash],
        reduced: nil,
        cents: dollars_to_cents(cross_harbor_price)
      },
      %Fare{
        mode: :ferry,
        name: :ferry_cross_harbor,
        duration: :round_trip,
        media: [:mticket, :paper_ferry, :contactless_payment, :cash],
        reduced: nil,
        cents: dollars_to_cents(cross_harbor_price) * 2
      },
      %Fare{
        mode: :ferry,
        name: :ferry_east_boston,
        duration: :single_trip,
        media: [:mticket, :paper_ferry, :contactless_payment],
        reduced: nil,
        cents: dollars_to_cents(east_boston_price)
      },
      %Fare{
        mode: :ferry,
        name: :ferry_east_boston,
        duration: :round_trip,
        media: [:mticket, :paper_ferry, :contactless_payment],
        reduced: nil,
        cents: dollars_to_cents(east_boston_price) * 2
      },
      %Fare{
        mode: :ferry,
        name: :ferry_lynn,
        duration: :single_trip,
        media: [:mticket, :paper_ferry, :contactless_payment, :cash],
        reduced: nil,
        cents: dollars_to_cents(lynn_price)
      },
      %Fare{
        mode: :ferry,
        name: :ferry_lynn,
        duration: :round_trip,
        media: [:mticket, :paper_ferry, :contactless_payment, :cash],
        reduced: nil,
        cents: dollars_to_cents(lynn_price) * 2
      },
      %Fare{
        mode: :ferry,
        name: :ferry_winthrop,
        duration: :single_trip,
        media: [:mticket, :paper_ferry, :contactless_payment, :cash],
        reduced: nil,
        cents: dollars_to_cents(winthrop_price)
      },
      %Fare{
        mode: :ferry,
        name: :ferry_winthrop,
        duration: :round_trip,
        media: [:mticket, :paper_ferry, :contactless_payment, :cash],
        reduced: nil,
        cents: dollars_to_cents(winthrop_price) * 2
      },
      %Fare{
        mode: :ferry,
        name: :commuter_ferry,
        duration: :single_trip,
        media: [:mticket, :paper_ferry, :contactless_payment, :cash],
        reduced: nil,
        cents: dollars_to_cents(commuter_ferry_price)
      },
      %Fare{
        mode: :ferry,
        name: :commuter_ferry,
        duration: :round_trip,
        media: [:mticket, :paper_ferry, :contactless_payment, :cash],
        reduced: nil,
        cents: dollars_to_cents(commuter_ferry_price) * 2
      },
      %Fare{
        mode: :ferry,
        name: :commuter_ferry_logan,
        duration: :single_trip,
        media: [:mticket, :paper_ferry, :contactless_payment, :cash],
        reduced: nil,
        cents: dollars_to_cents(commuter_ferry_logan_price)
      },
      %Fare{
        mode: :ferry,
        name: :commuter_ferry_logan,
        duration: :round_trip,
        media: [:mticket, :paper_ferry, :contactless_payment, :cash],
        reduced: nil,
        cents: dollars_to_cents(commuter_ferry_logan_price) * 2
      },
      %Fare{
        mode: :ferry,
        name: :commuter_ferry,
        duration: :month,
        media: [:charlie_ticket],
        reduced: nil,
        cents: dollars_to_cents(commuter_ferry_month_price),
        additional_valid_modes: [:subway, :bus, :commuter_rail]
      },
      %Fare{
        mode: :ferry,
        name: :commuter_ferry,
        duration: :month,
        media: [:mticket],
        reduced: nil,
        cents: dollars_to_cents(commuter_ferry_month_price) - 1000
      },
      %Fare{
        mode: :ferry,
        name: :commuter_ferry,
        duration: :month,
        media: [:senior_card, :student_card],
        reduced: :any,
        cents: dollars_to_cents(commuter_ferry_month_price_reduced),
        additional_valid_modes: [:subway, :bus, :commuter_rail]
      }
    ]

    reduced_fares =
      fares
      |> Enum.filter(&(&1.duration in [:single_trip, :round_trip]))
      |> Enum.flat_map(fn fare ->
        reduced_price = compute_reduced_fare(fare)
        [%{fare | cents: reduced_price, media: [:senior_card, :student_card], reduced: :any}]
      end)

    fares ++ reduced_fares
  end

  def mapper(%{
        mode: :the_ride,
        ada_ride: ada_ride,
        premium_ride: premium_ride,
        ada_ride_reduced: ada_ride_reduced,
        premium_ride_reduced: premium_ride_reduced
      }) do
    [
      %Fare{
        mode: :the_ride,
        name: :ada_ride,
        reduced: nil,
        duration: :single_trip,
        cents: dollars_to_cents(ada_ride)
      },
      %Fare{
        mode: :the_ride,
        name: :premium_ride,
        duration: :single_trip,
        cents: dollars_to_cents(premium_ride)
      },
      %Fare{
        mode: :the_ride,
        name: :ada_ride,
        reduced: :any,
        duration: :single_trip,
        cents: dollars_to_cents(ada_ride_reduced)
      },
      %Fare{
        mode: :the_ride,
        name: :premium_ride,
        reduced: :any,
        duration: :single_trip,
        cents: dollars_to_cents(premium_ride_reduced)
      }
    ]
  end

  def mapper(%{mode: :foxboro, round_trip: round_trip}) do
    [
      %Fare{
        mode: :commuter_rail,
        name: :foxboro,
        duration: :round_trip,
        media: [:mticket, :special_event, :cash],
        reduced: nil,
        cents: dollars_to_cents(round_trip)
      }
    ]
  end

  def mapper(%{mode: :massport_shuttle, single_trip: single_trip, name: name}) do
    [
      %Fare{
        mode: :massport_shuttle,
        name: name,
        duration: :single_trip,
        media: [],
        reduced: nil,
        cents: dollars_to_cents(single_trip)
      }
    ]
  end

  defp monthly_commuter_modes("interzone_" <> _) do
    [:bus]
  end

  defp monthly_commuter_modes(_zone) do
    [:subway, :bus, :ferry]
  end

  def mticket_price(monthly_price) when monthly_price > 1000 do
    monthly_price - 1000
  end

  def reduced_mticket_price(reduced_monthly_price) when reduced_monthly_price > 3000 do
    reduced_monthly_price - 500
  end

  def reduced_mticket_price(reduced_monthly_price), do: reduced_monthly_price

  defp commuter_rail_fare_name(zone) do
    case String.split(zone, "_") do
      [zone] -> {:zone, String.upcase(zone)}
      ["interzone", zone] -> {:interzone, String.upcase(zone)}
    end
  end

  defp dollars_to_cents(dollars) do
    dollars
    |> String.to_float()
    |> Kernel.*(100)
    |> round
  end

  defp floor_to_ten_cents(fare), do: Float.floor(fare / 10) * 10

  defp compute_reduced_fare(%Fare{name: :ferry_east_boston, duration: :single_trip}), do: 110
  defp compute_reduced_fare(%Fare{name: :ferry_east_boston, duration: :round_trip}), do: 220
  defp compute_reduced_fare(%Fare{cents: cents}), do: floor_to_ten_cents(cents) / 2

  # Student and Senior fare prices are always the same.
  # For every generic reduced fare, add in two discreet
  # fares by media type (senior_card and student_card).
  @spec split_reduced_fares([Fare.t()]) :: [Fare.t()]
  defp split_reduced_fares(fares) do
    fares
    |> Enum.filter(&match?(%{reduced: :any}, &1))
    |> Enum.reduce(fares, &populate_reduced(&1, &2))
  end

  @spec populate_reduced(Fare.t(), [Fare.t()]) :: [Fare.t()]
  defp populate_reduced(fare, fares) do
    senior = %{fare | media: [:senior_card], reduced: :senior_disabled}
    student = %{fare | media: [:student_card], reduced: :student}

    [senior, student | fares]
  end

  # Special fare used only for inbound trips from the airport
  @spec free_fare() :: [Fare.t()]
  defp free_fare do
    [
      %Fare{
        mode: :bus,
        name: :free_fare,
        duration: :single_trip,
        media: [],
        reduced: nil,
        cents: dollars_to_cents("0.00")
      }
    ]
  end

  @spec georges_island_ferry_fares() :: [Fare.t()]
  def georges_island_ferry_fares do
    base_fare = %Fare{
      mode: :ferry,
      name: :ferry_george,
      duration: :round_trip,
      media: [],
      reduced: nil
    }

    [
      %{base_fare | cents: dollars_to_cents("19.95"), price_label: "Adult"},
      %{base_fare | cents: dollars_to_cents("12.95"), price_label: "Child"},
      %{base_fare | cents: dollars_to_cents("0.0"), price_label: "Child under 3"},
      %{
        base_fare
        | cents: dollars_to_cents("49.00"),
          price_label: "Family 4-pack (2 adults, 2 children)"
      },
      %{base_fare | reduced: :student, cents: dollars_to_cents("14.95"), price_label: "Student"},
      %{
        base_fare
        | reduced: :senior_disabled,
          cents: dollars_to_cents("14.95"),
          price_label: "Seniors"
      },
      %{
        base_fare
        | reduced: :senior_disabled,
          cents: dollars_to_cents("14.95"),
          price_label: "Military"
      }
    ]
  end
end
