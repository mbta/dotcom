defmodule Fares.Format do
  @moduledoc """
  Formatting functions for fare data.
  """
  alias Fares.{Fare, Summary}

  @type mode_type :: :bus_subway | :commuter_rail | :ferry

  @doc "Formats the price of a fare as a traditional $dollar.cents value"
  @spec price(Fare.t() | non_neg_integer | nil) :: String.t()
  def price(nil), do: ""
  def price(%Fare{cents: +0.0}), do: "Free"
  def price(%Fare{cents: cents}), do: price(cents)
  def price(0), do: "Free"
  def price(cents), do: "$#{:erlang.float_to_binary(cents / 100, decimals: 2)}"

  @doc "Formats the fare media (card, &c) as a string"
  @spec media(Fare.t() | [Fare.media()] | Fare.media()) :: iodata
  def media(%Fare{reduced: :any}), do: "reduced fare card"
  def media(%Fare{media: list}), do: media(list)

  def media(list) when is_list(list) do
    list
    |> Enum.map(&media/1)
    |> Util.AndOr.join(:or)
  end

  def media(:cash), do: "cash"
  def media(:charlie_card), do: "CharlieCard"
  def media(:charlie_ticket), do: "CharlieTicket"
  def media(:commuter_ticket), do: "CharlieTicket"
  def media(:contactless_payment), do: "contactless payment"
  def media(:mticket), do: "mTicket App"
  def media(:paper_ferry), do: "paper ferry ticket"
  def media(:senior_card), do: "Senior CharlieCard or TAP ID"
  def media(:special_event), do: "Special Event Ticket"
  def media(:student_card), do: "Student CharlieCard"

  @doc "Formats the duration of the Fare"
  @spec duration(Fare.t() | Summary.t()) :: String.t()
  def duration(%{duration: :single_trip}) do
    "One-Way"
  end

  def duration(%{duration: :round_trip}) do
    "Round Trip"
  end

  def duration(%{name: :ferry_inner_harbor, duration: :day}) do
    "One-Day Pass"
  end

  def duration(%{duration: :day}) do
    "Day Pass"
  end

  def duration(%{duration: :week}) do
    "7-Day Pass"
  end

  def duration(%{duration: :weekend}) do
    "Weekend Pass"
  end

  def duration(%{duration: :month, media: media}) do
    if :mticket in media do
      "Monthly Pass on mTicket App"
    else
      "Monthly Pass"
    end
  end

  def duration(%{duration: :invalid}) do
    "Invalid Duration"
  end

  @doc "Friendly name for the given Fare"
  @spec name(Fare.t() | Fare.fare_name()) :: String.t()
  def name(%Fare{name: name}), do: name(name)
  def name(:subway), do: "Subway"
  def name(:local_bus), do: "Local Bus"
  def name(:express_bus), do: "Express Bus"
  def name(:ferry_inner_harbor), do: "Charlestown Ferry"
  def name(:ferry_cross_harbor), do: "Cross Harbor Ferry"
  def name(:ferry_east_boston), do: "East Boston Ferry"
  def name(:ferry_lynn), do: "Lynn Ferry"
  def name(:ferry_winthrop), do: "Winthrop/Quincy Ferry"
  def name(:ferry_george), do: "Georges Island"
  def name(:commuter_ferry), do: "Hingham/Hull Ferry"
  def name(:commuter_ferry_logan), do: "Commuter Ferry to Logan Airport"
  def name({:zone, zone}), do: "Zone #{zone}"
  def name({:interzone, zone}), do: "Interzone #{zone}"
  def name(:foxboro), do: "Foxboro Special Event"
  # A free fare might be an SL1 trip from airport stops or shuttle bus service
  def name(:free_fare), do: "Free Service"
  def name(:shuttle), do: "Shuttle"
  def name(:ada_ride), do: "ADA Ride"
  def name(:premium_ride), do: "Premium Ride"
  def name(:invalid), do: "Invalid Fare"
  def name(:massport_shuttle), do: "Massport Shuttle"
  def name(:logan_express), do: "Logan Express"
  def name("Massport-" <> _id), do: "Massport Shuttle"

  @spec full_name(Fare.t() | nil) :: String.t() | iolist
  def full_name(nil), do: "Shuttle"
  def full_name(%Fare{mode: :subway, duration: :month}), do: "Monthly LinkPass"
  def full_name(%Fare{mode: :bus, duration: :month}), do: "Monthly Local Bus Pass"
  def full_name(%Fare{mode: :commuter_rail, duration: :weekend}), do: "Weekend Pass"
  def full_name(%Fare{duration: :week}), do: "7-Day Pass"
  def full_name(%Fare{duration: :day}), do: "1-Day Pass"
  def full_name(%Fare{name: :ada_ride}), do: "ADA Ride Fare"
  def full_name(%Fare{name: :premium_ride}), do: "Premium Ride Fare"

  def full_name(fare) do
    [name(fare), " ", duration(fare)]
  end

  @spec concise_full_name(Fare.t()) :: String.t() | iolist()
  def concise_full_name(%Fare{mode: :commuter_rail} = fare), do: name(fare)

  def concise_full_name(%Fare{mode: :bus, name: :express_bus} = fare), do: name(fare)

  def concise_full_name(fare), do: full_name(fare)

  @spec summarize([Fare.t()], mode_type | [mode_type], String.t() | nil) :: [Summary.t()]
  def summarize(fares, mode, url \\ nil)

  def summarize(fares, :bus_subway, url) do
    for [base | _] = chunk <-
          Enum.chunk_by(fares, &{&1.name, &1.duration, &1.additional_valid_modes, &1.reduced}) do
      %Summary{
        name: Fares.Format.full_name(base),
        duration: base.duration,
        modes: [base.mode | base.additional_valid_modes],
        fares: Enum.map(chunk, &{Fares.Format.media(&1), Fares.Format.price(&1)}),
        url: url
      }
    end
  end

  def summarize(fares, mode, url) when mode in [:commuter_rail, :ferry] do
    for [base | _] = chunk <- Enum.chunk_by(fares, &match?(%{duration: :single_trip}, &1)) do
      price_range_label = price_range_label(mode)
      min_price = Enum.min_by(chunk, & &1.cents)
      max_price = Enum.max_by(chunk, & &1.cents)

      %Summary{
        name: price_range_summary_name(base, mode),
        duration: base.duration,
        modes: [base.mode | base.additional_valid_modes],
        fares: [
          {price_range_label,
           [Fares.Format.price(min_price), " – ", Fares.Format.price(max_price)]}
        ],
        url: url
      }
    end
  end

  def summarize(fares, modes, url) when is_list(modes) do
    Enum.flat_map(modes, fn mode ->
      fares
      |> Enum.filter(fn fare -> fare.mode == mode end)
      |> summarize(mode, url)
    end)
  end

  @spec summarize_one(Fare.t(), Keyword.t()) :: Summary.t()
  def summarize_one(fare, opts \\ []) do
    %Fares.Summary{
      name: Fares.Format.full_name(fare),
      duration: fare.duration,
      modes: [fare.mode | fare.additional_valid_modes],
      fares: [{Fares.Format.media(fare), Fares.Format.price(fare.cents)}],
      url: Keyword.get(opts, :url)
    }
  end

  defp price_range_label(:commuter_rail), do: "Zones 1A-10"
  defp price_range_label(:ferry), do: "All ferry routes"

  defp price_range_summary_name(fare, :commuter_rail), do: "Commuter Rail " <> duration(fare)
  defp price_range_summary_name(fare, :ferry), do: "Ferry " <> duration(fare)

  @spec mode_type_for_fare_class(Routes.Route.gtfs_fare_class()) :: mode_type | :unknown
  def mode_type_for_fare_class(:ferry_fare), do: :ferry
  def mode_type_for_fare_class(:commuter_rail_fare), do: :commuter_rail
  def mode_type_for_fare_class(_), do: :bus_subway
end
