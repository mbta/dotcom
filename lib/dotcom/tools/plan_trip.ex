defmodule Dotcom.Tools.PlanTrip do
  use Vancouver.Tool

  @otp_module Application.compile_env!(:dotcom, :otp_module)
  @params %OpenTripPlannerClient.PlanParams{
    fromPlace: "South Station::42.352271,-71.055242",
    toPlace: "North Station::42.365577,-71.06129",
    date: "2025-06-25",
    time: "12:00pm",
    arriveBy: false,
    numItineraries: 100,
    transportModes: [
      # %{mode: :TRAM},
      %{mode: :SUBWAY},
      # %{mode: :BUS},
      # %{mode: :FERRY},
      # %{mode: :RAIL}
    ],
    wheelchair: false
  }

  def name, do: "plan_trip"
  def description, do: "Plan a trip in Boston from A to B"

  def input_schema do
    %{
      "type" => "object",
      "properties" => %{
        "from" => %{"type" => "string"},
        "to" => %{"type" => "string"}
      },
      "required" => ["from", "to"]
    }
  end

  def run(conn, %{"from" => _, "to" => _}) do
    {:ok, [%OpenTripPlannerClient.ItineraryGroup{itineraries: itineraries} | _]} = @otp_module.plan(@params)

    summary_string = itineraries |> List.first() |> itinerary_to_summary_string()
    link_string = link_string(@params)
    itineraries_strings = itineraries_to_strings(itineraries) |> List.last()

    send_text(conn, summary_string <> link_string <> itineraries_strings)
  end

  defp distance(feet) when feet < 528 do
    "a very short distance"
  end

  defp distance(feet) do
    feet / 5280
    |> Float.round(1)
    |> Float.to_string()
    |> Kernel.<>(" miles")
  end

  defp duration(seconds) do
    minutes = seconds |> round() |> div(60)

    if minutes < 60 do
      "#{minutes} minutes"
    else
      hours = div(minutes, 60)
      remaining_minutes = rem(minutes, 60)
      "#{hours} hours #{remaining_minutes} minutes"
    end
  end

  defp itineraries_to_strings(itineraries) when is_binary(itineraries) do
    [itineraries]
  end

  defp itineraries_to_strings(itineraries) when is_list(itineraries) do
    Enum.map(itineraries, &itinerary_to_string/1)
  end

  defp itinerary_to_string(itinerary) do
    Enum.map(itinerary.legs, &leg_to_string/1) |> Enum.join("\n")
  end

  defp itinerary_to_summary_string(itinerary) do
    tag = itinerary.tag |> Atom.to_string() |> Recase.to_title()

    "The most #{tag} route will take #{duration(itinerary.duration)}.\n"
  end

  defp leg_to_string(%{mode: :WALK} = leg) do
    "Walk #{distance(leg.distance)} #{leg.from.name} from #{leg.to.name}"
  end

  defp leg_to_string(%{mode: :BUS} = leg) do
    "Ride the #{leg.route.short_name} bus for #{duration(leg.duration)} from #{leg.from.name} to #{leg.to.name}"
  end

  defp leg_to_string(leg) do
    "Take the #{leg.route.long_name} from #{leg.from.name} to #{leg.to.name} for approximately #{duration(leg.duration)}"
  end

  defp link_string(params) do
    encoded = Dotcom.TripPlan.AntiCorruptionLayer.encode(params)

    "Visit MBTA's [Trip Planner](https://www.mbta.com/trip-planner?plan=#{encoded}) for more details.\n"
  end
end
