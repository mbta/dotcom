defmodule SiteWeb.FareView.Description do
  alias Fares.Fare

  import Phoenix.HTML.Link
  import Phoenix.HTML.Tag, only: [content_tag: 2]
  import Phoenix.HTML.Link, only: [link: 2]
  import SiteWeb.ViewHelpers, only: [cms_static_page_path: 2]
  import Util.AndOr

  @spec description(Fare.t(), map()) :: Phoenix.HTML.unsafe()
  def description(%Fare{mode: :commuter_rail, duration: :single_trip, name: name}, _assigns) do
    ["Valid for travel on Commuter Rail ", valid_commuter_zones(name), " only."]
  end

  def description(%Fare{mode: :commuter_rail, duration: :round_trip, name: name}, _assigns) do
    ["Valid for travel on Commuter Rail ", valid_commuter_zones(name), " only."]
  end

  def description(
        %Fare{mode: :commuter_rail, duration: :month, media: [:mticket], name: name},
        _assigns
      ) do
    [
      content_tag(:p, [
        "Valid for 1 calendar month of travel on the commuter rail ",
        valid_commuter_zones(name),
        " only."
      ]),
      cr_interzone_note()
    ]
  end

  def description(
        %Fare{mode: :commuter_rail, duration: :month, additional_valid_modes: [:bus], name: name},
        _assigns
      ) do
    [
      "Valid for 1 calendar month of unlimited travel on Commuter Rail ",
      valid_commuter_zones(name),
      " as well as Local Bus."
    ]
  end

  def description(
        %Fare{mode: :commuter_rail, duration: :month, name: {:zone, zone} = name},
        _assigns
      )
      when zone in ["6", "7", "8", "9", "10"] do
    [
      content_tag(:p, [
        "Valid for 1 calendar month of unlimited travel on Commuter Rail ",
        [valid_commuter_zones(name), "Local Bus", "Express Bus", "subway", "all ferry routes"]
        |> join(:and),
        "."
      ]),
      cr_interzone_note()
    ]
  end

  def description(
        %Fare{mode: :commuter_rail, duration: :month, name: {:zone, zone} = name},
        _assigns
      )
      when zone in ["1A"] do
    [
      "Valid for 1 calendar month of unlimited travel on Commuter Rail ",
      [valid_commuter_zones(name), "Local Bus", "subway", "Charlestown Ferry"] |> join(:and),
      ".",
      cr_interzone_note()
    ]
  end

  def description(%Fare{mode: :commuter_rail, duration: :month, name: name}, _assigns) do
    [
      "Valid for 1 calendar month of unlimited travel on Commuter Rail ",
      [valid_commuter_zones(name), "Local Bus", "Express Bus", "subway", "Charlestown Ferry"]
      |> join(:and),
      ".",
      cr_interzone_note()
    ]
  end

  def description(%Fare{mode: :commuter_rail, duration: :weekend}, assigns) do
    [
      content_tag(
        :p,
        "Valid for unlimited travel on all lines and zones, Saturdays and Sundays."
      ),
      link("Learn more about weekend passes",
        to: cms_static_page_path(assigns, "/fares/commuter-rail-weekends"),
        class: "c-call-to-action"
      )
    ]
  end

  def description(%Fare{mode: :ferry, duration: duration}, %{
        origin: origin,
        destination: destination
      })
      when duration in [:round_trip, :single_trip] do
    [
      "Valid between ",
      [origin.name, destination.name] |> join(:and),
      " only."
    ]
  end

  def description(%Fare{mode: :ferry, duration: duration} = fare, _assigns)
      when duration in [:round_trip, :single_trip] do
    [
      "Valid for the ",
      Fares.Format.name(fare),
      " only."
    ]
  end

  def description(%Fare{mode: :ferry, duration: :month, media: [:mticket]}, _assigns) do
    "Valid for 1 calendar month of unlimited travel on all ferry routes."
  end

  def description(%Fare{mode: :ferry, duration: :month} = fare, _assigns) do
    [
      content_tag(:p, "Valid for 1 calendar month of unlimited travel on:"),
      content_tag(:ul, boston_ferry_pass_modes(fare))
    ]
  end

  def description(
        %Fare{name: name, duration: :single_trip, media: [:charlie_ticket, :cash]},
        _assigns
      )
      when name == :express_bus do
    "No free or discounted transfers."
  end

  def description(%Fare{mode: :subway, media: media, duration: :single_trip} = fare, _assigns)
      when media != [:charlie_ticket, :cash] do
    [
      "Travel on ",
      ["all subway lines", "SL1", "SL2", "SL3"] |> join(:and),
      ". ",
      transfers(fare)
    ]
  end

  def description(%Fare{mode: :subway, media: [:charlie_ticket, :cash]}, _assigns) do
    "CharlieTickets include 1 free transfer to any SL route within 2 hours of original ride. No transfers with cash."
  end

  def description(%Fare{mode: :bus, media: [:charlie_ticket, :cash]}, _assigns) do
    [
      "CharlieTickets include 1 free transfer to ",
      :local_bus |> local_bus_text() |> join(:or),
      ". No transfers with cash."
    ]
  end

  def description(%Fare{mode: :subway, duration: :month, reduced: :student}, _assigns) do
    modes =
      [
        "Local Bus",
        "Express Bus",
        "Subway",
        "Commuter Rail Zones 1A-2 (M7 Card only)"
      ]
      |> list_items()

    [
      content_tag(:p, "Unlimited travel for 1 calendar month on:"),
      content_tag(:ul, modes)
    ]
  end

  def description(%Fare{mode: :subway, duration: :month}, _assigns) do
    modes =
      [
        "Local Bus",
        "Subway"
      ]
      |> list_items()

    [
      content_tag(:p, "Unlimited travel for 1 calendar month on:"),
      content_tag(:ul, modes),
      content_tag(:p, [
        "CharlieTicket also valid for travel on ",
        ["Commuter Rail Zone 1A", "Charlestown Ferry"] |> join(:and),
        "."
      ])
    ]
  end

  def description(%Fare{mode: :subway, duration: duration}, _assigns)
      when duration in [:day, :week] do
    modes =
      [
        "Local Bus",
        "Subway"
      ]
      |> list_items()

    [
      content_tag(:p, "Unlimited travel for #{duration_string_header(duration)}* on:"),
      content_tag(:ul, modes),
      content_tag(:p, [
        "CharlieTicket also valid for travel on ",
        ["Commuter Rail Zone 1A", "Charlestown Ferry"] |> join(:and),
        "."
      ]),
      content_tag(
        :p,
        "*CharlieTickets are valid from the time of purchase. CharlieCards are valid from the first time they are used."
      )
    ]
  end

  def description(%Fare{name: :local_bus, duration: :month}, _assigns) do
    modes =
      ["Local Bus (not including routes ", ["SL1", "SL2", "SL3"] |> join(:or), ")"]
      |> Enum.join()
      |> List.wrap()
      |> list_items()

    [
      content_tag(:p, "Unlimited travel for 1 calendar month on:"),
      content_tag(:ul, modes)
    ]
  end

  def description(
        %Fare{
          name: :express_bus,
          media: [:charlie_card, :charlie_ticket],
          duration: :month
        },
        _assigns
      ) do
    modes =
      [
        "Express Bus",
        "Local Bus",
        "Subway",
        "Commuter Rail Zone 1A (CharlieTicket or pre-printed CharlieCard with valid date only)",
        "Charlestown Ferry (CharlieTicket or pre-printed CharlieCard with valid date only)"
      ]
      |> list_items()

    [
      content_tag(:p, "Unlimited travel for 1 calendar month on:"),
      content_tag(:ul, modes)
    ]
  end

  def description(%Fare{name: :free_fare, mode: :bus, media: []}, _assigns) do
    ["Travel on ", :local_bus_all |> local_bus_text() |> join(:and), "."]
  end

  def description(%Fare{mode: :bus, media: media, name: name} = fare, _assigns)
      when media != [:charlie_ticket, :cash] do
    [
      bus_description_intro(name),
      transfers(fare)
    ]
  end

  def description(%Fare{name: :ada_ride}, _assigns) do
    [
      content_tag(:p, "Destination is:"),
      content_tag(:ul, [
        content_tag(:li, [
          "Less than ",
          {:safe, ["&frac34;"]},
          " mile from an active MBTA bus or subway stop/station ",
          content_tag(:strong, "OR")
        ]),
        content_tag(:li, "In the core RIDE service area")
      ]),
      content_tag(:p, "You may also pay a premium fare if you:")
    ]
  end

  def description(%Fare{name: :premium_ride}, _assigns) do
    [
      content_tag(:p, "Destination is:"),
      content_tag(:ul, [
        content_tag(:li, [
          "More than ",
          {:safe, ["&frac34;"]},
          " mile from an active MBTA bus or subway stop/station ",
          content_tag(:strong, "OR")
        ]),
        content_tag(:li, "Not within the core RIDE service area")
      ]),
      content_tag(:p, "You may also pay a premium fare if you:"),
      content_tag(:ul, [
        content_tag(:li, "Request same-day service changes"),
        content_tag(:li, "Change your reservation after 5 PM for service the next day")
      ])
    ]
  end

  def description(%Fare{name: :free_fare}, _assigns) do
    "Inbound SL1 travel from any airport stop is free."
  end

  defp boston_ferry_pass_modes(%Fare{name: :ferry_inner_harbor}) do
    [
      "Charlestown Ferry",
      "Local Bus",
      "Subway",
      "Commuter Rail Zones 1A"
    ]
    |> list_items()
  end

  defp boston_ferry_pass_modes(_) do
    [
      "All ferry routes",
      "Local Bus",
      "Express Bus",
      "Subway",
      "Commuter Rail Zones 1A-5"
    ]
    |> list_items()
  end

  defp bus_description_intro(name) when name == :express_bus, do: ""
  defp bus_description_intro(_), do: "Travel on all local bus routes, SL4 and SL5. "

  defp cr_interzone_note do
    content_tag(
      :p,
      "Travel beyond the designated zone on your pass will cost an additional interzone fare."
    )
  end

  defp duration_string_header(:day), do: "1 day"
  defp duration_string_header(:week), do: "7 days"

  defp valid_commuter_zones({:zone, "1A"}) do
    "in Zone 1A"
  end

  defp valid_commuter_zones({:zone, final}) do
    ["Zones 1A-", final]
  end

  defp valid_commuter_zones({:interzone, total}) do
    ["between ", total, " zones outside of Zone 1A"]
  end

  defp valid_commuter_zones(:foxboro) do
    [
      "to ",
      link("Gillette Stadium", to: "/gillette"),
      " for special events"
    ]
  end

  def transfers(fare) do
    # used to generate the list of transfer fees for a a given fare.
    # Transfers <= 0 are considered free.
    {paid, free} =
      fare.name
      |> valid_transfers()
      |> Enum.split_with(&transfers_filter(&1, fare))

    [
      free_transfers(free),
      content_tag(:ul, Enum.map(paid, &transfers_map(&1, fare)))
    ]
  end

  defp valid_transfers(:express_bus = name) do
    [subway: "subway", local_bus: local_bus_text(name)]
  end

  defp valid_transfers(name) do
    [
      subway: "subway",
      local_bus: local_bus_text(name),
      express_bus: "Express Bus",
    ]
  end

  defp local_bus_text(:subway), do: ["Local Bus", "SL4", "SL5"]
  defp local_bus_text(:local_bus), do: ["another Local Bus", "SL4", "SL5"]
  defp local_bus_text(:local_bus_all), do: ["all Local Bus routes", "SL4", "SL5"]
  # Should Express Bus be on this list or not?  Haven't figured out how it's used.
  defp local_bus_text(:express_bus), do: ["Local Bus", "Express Bus", "any SL route"]

  defp transfers_filter({name, _}, fare) do
    other_fare = transfers_other_fare(name, fare)
    other_fare.cents > fare.cents
  end

  defp free_transfers([]) do
    []
  end

  defp free_transfers(names_and_texts) do
    [
      "Includes 1 free transfer to ",
      names_and_texts
      |> Enum.map(&elem(&1, 1))
      |> List.flatten()
      |> join(:or),
      " within 2 hours of your original ride."
    ]
  end

  defp transfers_map({name, text}, fare) do
    other_fare = transfers_other_fare(name, fare)

    content_tag(:li, [
      "Transfer to ",
      text,
      ": ",
      Fares.Format.price(other_fare.cents - fare.cents)
    ])
  end

  defp transfers_other_fare(name, fare) do
    case {fare, name, Fares.Repo.all(name: name, media: fare.media, duration: fare.duration)} do
      {_, _, [other_fare]} -> other_fare
    end
  end

  @spec list_items([String.t()]) :: Phoenix.HTML.unsafe()
  defp list_items(items) when is_list(items) do
    for item <- items do
      content_tag(:li, item)
    end
  end
end
