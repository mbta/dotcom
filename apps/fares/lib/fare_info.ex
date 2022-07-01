defmodule Fares.FareInfo do
  @moduledoc """
  Retrieve saved fare data from the file system and map to structs.
  """

  alias Fares.Fare

  @doc "Load fare info from a CSV file."
  @spec fare_info() :: [Fare.t()]
  def fare_info() do
    "priv/fares-july1.csv"
    |> fare_data()
    |> Enum.flat_map(&mapper/1)
    |> Enum.concat(free_fare())
    |> split_reduced_fares()
  end

  @spec mapper([String.t()]) :: [Fare.t()]
  def mapper(["commuter", zone, single_trip, single_trip_reduced, monthly, monthly_reduced | _]) do
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
          media: [:mticket],
          reduced: nil,
          cents: mticket_price(dollars_to_cents(monthly))
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

  def mapper([
        "subway",
        charlie_card_price,
        day_reduced_price,
        week_reduced_price,
        month_reduced_price,
        day_pass_price,
        week_pass_price,
        month_pass_price | _
      ]) do
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
          media: [:charlie_card, :charlie_ticket, :cash],
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

  def mapper([
        mode,
        charlie_card_price,
        day_reduced_price,
        week_reduced_price,
        _month_reduced_price,
        _day_pass_price,
        _week_pass_price,
        month_pass_price | _
      ])
      when mode in ["local_bus", "express_bus"] do
    base = %Fare{
      mode: :bus,
      name: :"#{mode}"
    }

    fares = [
      %{
        base
        | duration: :single_trip,
          media: [:charlie_card, :charlie_ticket, :cash],
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

    if mode == "local_bus" do
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
      fares
    end
  end

  def mapper([
        "ferry",
        inner_harbor_price,
        inner_harbor_month_price,
        inner_harbor_month_price_reduced,
        cross_harbor_price,
        commuter_ferry_price,
        commuter_ferry_month_price,
        commuter_ferry_logan_price,
        _day_pass_price
      ]) do
    fares = [
      %Fare{
        mode: :ferry,
        name: :ferry_inner_harbor,
        duration: :single_trip,
        media: [:mticket, :paper_ferry, :cash],
        reduced: nil,
        cents: dollars_to_cents(inner_harbor_price)
      },
      %Fare{
        mode: :ferry,
        name: :ferry_inner_harbor,
        duration: :round_trip,
        media: [:mticket, :paper_ferry, :cash],
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
        media: [:mticket, :paper_ferry, :cash],
        reduced: nil,
        cents: dollars_to_cents(cross_harbor_price)
      },
      %Fare{
        mode: :ferry,
        name: :ferry_cross_harbor,
        duration: :round_trip,
        media: [:mticket, :paper_ferry, :cash],
        reduced: nil,
        cents: dollars_to_cents(cross_harbor_price) * 2
      },
      %Fare{
        mode: :ferry,
        name: :commuter_ferry,
        duration: :single_trip,
        media: [:mticket, :paper_ferry, :cash],
        reduced: nil,
        cents: dollars_to_cents(commuter_ferry_price)
      },
      %Fare{
        mode: :ferry,
        name: :commuter_ferry,
        duration: :round_trip,
        media: [:mticket, :paper_ferry, :cash],
        reduced: nil,
        cents: dollars_to_cents(commuter_ferry_price) * 2
      },
      %Fare{
        mode: :ferry,
        name: :commuter_ferry_logan,
        duration: :single_trip,
        media: [:mticket, :paper_ferry, :cash],
        reduced: nil,
        cents: dollars_to_cents(commuter_ferry_logan_price)
      },
      %Fare{
        mode: :ferry,
        name: :commuter_ferry_logan,
        duration: :round_trip,
        media: [:mticket, :paper_ferry, :cash],
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
      }
    ]

    reduced_fares =
      fares
      |> Enum.filter(&(&1.duration in [:single_trip, :round_trip]))
      |> Enum.flat_map(fn fare ->
        reduced_price = floor_to_ten_cents(fare.cents) / 2
        [%{fare | cents: reduced_price, media: [:senior_card, :student_card], reduced: :any}]
      end)

    fares ++ reduced_fares
  end

  def mapper(["the_ride", ada_ride, premium_ride | _]) do
    [
      %Fare{
        mode: :the_ride,
        name: :ada_ride,
        media: [:senior_card],
        reduced: :senior_disabled,
        duration: :single_trip,
        cents: dollars_to_cents(ada_ride)
      },
      %Fare{
        mode: :the_ride,
        name: :premium_ride,
        media: [:senior_card],
        reduced: :senior_disabled,
        duration: :single_trip,
        cents: dollars_to_cents(premium_ride)
      }
    ]
  end

  def mapper(["foxboro", round_trip | _]) do
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

  defp fare_data(filename) do
    :fares
    |> Application.app_dir()
    |> Path.join(filename)
    |> File.stream!()
    |> CSV.decode!()
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

  defp commuter_rail_fare_name(zone) do
    case String.split(zone, "_") do
      ["zone", zone] -> {:zone, String.upcase(zone)}
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
