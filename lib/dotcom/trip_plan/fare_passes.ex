defmodule Dotcom.TripPlan.FarePasses do
  @moduledoc """
  Computing fare passes and prices for trip plan itineraries.
  """
  alias Dotcom.TripPlan.{Itinerary, Leg, NamedPosition, PersonalDetail, TransitDetail}
  alias Fares.{Fare, Month, OneWay}

  @spec with_passes(Itinerary.t()) :: Itinerary.t()
  def with_passes(itinerary) do
    base_month_pass = base_month_pass_for_itinerary(itinerary)

    passes = %{
      base_month_pass: base_month_pass,
      recommended_month_pass: recommended_month_pass_for_itinerary(itinerary),
      reduced_month_pass: reduced_month_pass_for_itinerary(itinerary, base_month_pass)
    }

    %Itinerary{itinerary | passes: passes}
  end

  @spec with_free_legs_if_from_airport(Itinerary.t()) :: Itinerary.t()
  def with_free_legs_if_from_airport(itinerary) do
    # If Logan airport is the origin, all subsequent subway trips from there should be free
    first_transit_leg = itinerary |> Itinerary.transit_legs() |> List.first()

    if Leg.stop_is_silver_line_airport?([first_transit_leg], :from) do
      readjust_itinerary_with_free_fares(itinerary)
    else
      itinerary
    end
  end

  @spec leg_with_fares(Leg.t()) :: Leg.t()
  def leg_with_fares(%Leg{mode: %PersonalDetail{}} = leg), do: leg

  # Logan Express is $9, except Back Bay to Logan is $3 and free from Logan.
  def leg_with_fares(
        %Leg{mode: %TransitDetail{route: %Routes.Route{external_agency_name: agency}}} =
          leg
      )
      when is_binary(agency) do
    logan_express? = agency == "Logan Express"
    price = if logan_express?, do: logan_express_fare(leg), else: 0
    mode = if logan_express?, do: :logan_express, else: :massport_shuttle
    name = if logan_express?, do: :logan_express, else: :massport_shuttle

    fares = %{
      highest_one_way_fare: %Fares.Fare{
        name: name,
        cents: price,
        duration: :single_trip,
        mode: mode
      },
      lowest_one_way_fare: %Fares.Fare{
        name: name,
        cents: 0,
        duration: :single_trip,
        mode: mode,
        reduced: :any
      },
      reduced_one_way_fare: %Fares.Fare{
        name: name,
        cents: 0,
        duration: :single_trip,
        mode: mode,
        reduced: :any
      }
    }

    mode_with_fares = %TransitDetail{leg.mode | fares: fares}
    %Leg{leg | mode: mode_with_fares}
  end

  def leg_with_fares(%Leg{from: %NamedPosition{stop: nil}} = leg), do: leg
  def leg_with_fares(%Leg{to: %NamedPosition{stop: nil}} = leg), do: leg

  def leg_with_fares(%Leg{mode: %TransitDetail{route: route}} = leg) do
    origin_id = leg.from.stop.id
    destination_id = leg.to.stop.id

    fares =
      if Leg.fare_complete_transit_leg?(leg) do
        recommended_fare = OneWay.recommended_fare(route, origin_id, destination_id)
        base_fare = OneWay.base_fare(route, origin_id, destination_id)
        reduced_fare = OneWay.reduced_fare(route, origin_id, destination_id)

        %{
          highest_one_way_fare: base_fare,
          lowest_one_way_fare: recommended_fare,
          reduced_one_way_fare: reduced_fare
        }
      else
        %{
          highest_one_way_fare: nil,
          lowest_one_way_fare: nil,
          reduced_one_way_fare: nil
        }
      end

    mode_with_fares = %TransitDetail{leg.mode | fares: fares}
    %Leg{leg | mode: mode_with_fares}
  end

  defp logan_express_fare(%Leg{
         from: from,
         mode: %TransitDetail{route: %Routes.Route{name: "BB"}}
       }) do
    if String.contains?(from.name, "Logan Airport") || String.contains?(from.name, "Terminal") do
      0
    else
      300
    end
  end

  defp logan_express_fare(_), do: 900

  @spec base_month_pass_for_itinerary(Itinerary.t()) :: Fare.t() | nil
  defp base_month_pass_for_itinerary(%Itinerary{legs: legs}) do
    legs
    |> Enum.map(&highest_month_pass/1)
    |> max_by_cents()
  end

  @spec recommended_month_pass_for_itinerary(Itinerary.t()) :: Fare.t() | nil
  defp recommended_month_pass_for_itinerary(%Itinerary{legs: legs}) do
    legs
    |> Enum.map(&lowest_month_pass/1)
    |> max_by_cents()
  end

  @spec reduced_month_pass_for_itinerary(Itinerary.t(), Fare.t() | nil) :: Fare.t() | nil
  defp reduced_month_pass_for_itinerary(%Itinerary{legs: legs}, base_month_pass) do
    reduced_pass =
      legs
      |> Enum.map(&reduced_pass/1)
      |> max_by_cents()

    if Fare.valid_modes(base_month_pass) -- Fare.valid_modes(reduced_pass) == [] do
      reduced_pass
    else
      nil
    end
  end

  @spec highest_month_pass(Leg.t()) :: Fare.t() | nil
  defp highest_month_pass(%Leg{mode: %PersonalDetail{}}), do: nil
  defp highest_month_pass(%Leg{from: %NamedPosition{stop: nil}}), do: nil
  defp highest_month_pass(%Leg{to: %NamedPosition{stop: nil}}), do: nil

  defp highest_month_pass(
         %Leg{
           mode: %TransitDetail{route: route},
           from: %NamedPosition{stop: origin},
           to: %NamedPosition{stop: destination}
         } = leg
       ) do
    if Leg.fare_complete_transit_leg?(leg) do
      Month.base_pass(route, origin.id, destination.id)
    else
      nil
    end
  end

  @spec lowest_month_pass(Leg.t()) :: Fare.t() | nil
  defp lowest_month_pass(%Leg{mode: %PersonalDetail{}}), do: nil
  defp lowest_month_pass(%Leg{from: %NamedPosition{stop: nil}}), do: nil
  defp lowest_month_pass(%Leg{to: %NamedPosition{stop: nil}}), do: nil

  defp lowest_month_pass(
         %Leg{
           mode: %TransitDetail{route: route},
           from: %NamedPosition{stop: origin},
           to: %NamedPosition{stop: destination}
         } = leg
       ) do
    if Leg.fare_complete_transit_leg?(leg) do
      Month.recommended_pass(route, origin.id, destination.id)
    else
      nil
    end
  end

  @spec reduced_pass(Leg.t()) :: Fare.t() | nil
  defp reduced_pass(%Leg{mode: %PersonalDetail{}}), do: nil
  defp reduced_pass(%Leg{from: %NamedPosition{stop: nil}}), do: nil
  defp reduced_pass(%Leg{to: %NamedPosition{stop: nil}}), do: nil

  defp reduced_pass(
         %Leg{
           mode: %TransitDetail{route: route},
           from: %NamedPosition{stop: origin},
           to: %NamedPosition{stop: destination}
         } = leg
       ) do
    if Leg.fare_complete_transit_leg?(leg) do
      Month.reduced_pass(route, origin.id, destination.id)
    else
      nil
    end
  end

  @spec max_by_cents([Fare.t() | nil]) :: Fare.t() | nil
  defp max_by_cents(fares), do: Enum.max_by(fares, &cents_for_max/1, fn -> nil end)

  @spec cents_for_max(Fare.t() | nil) :: non_neg_integer
  defp cents_for_max(nil), do: 0
  defp cents_for_max(%Fare{cents: cents}), do: cents

  @spec readjust_itinerary_with_free_fares(Itinerary.t()) :: Itinerary.t()
  def readjust_itinerary_with_free_fares(itinerary) do
    transit_legs =
      itinerary.legs
      |> Enum.with_index()
      |> Enum.filter(fn {leg, _idx} -> Leg.transit?(leg) end)

    # set the subsequent subway legs' highest_fare to nil so they get ignored by the fare calculations afterwards:
    legs_after_airport = List.delete_at(transit_legs, 0)

    free_subway_legs =
      if Enum.empty?(legs_after_airport) do
        []
      else
        Enum.filter(
          legs_after_airport,
          fn {leg, _idx} ->
            leg
            |> Fares.get_fare_by_type(:highest_one_way_fare)
            |> Map.get(:mode)
            |> Kernel.==(:subway)
          end
        )
      end

    free_subway_indexes =
      if Enum.empty?(free_subway_legs) do
        []
      else
        free_subway_legs
        |> Enum.map(fn {_leg, index} ->
          index
        end)
      end

    readjusted_legs =
      itinerary.legs
      |> Enum.with_index()
      |> Enum.map(fn {leg, index} ->
        if index in free_subway_indexes do
          %{
            leg
            | mode: %{
                leg.mode
                | fares: %{
                    highest_one_way_fare: nil
                  }
              }
          }
        else
          leg
        end
      end)

    %Itinerary{itinerary | legs: readjusted_legs}
  end
end
