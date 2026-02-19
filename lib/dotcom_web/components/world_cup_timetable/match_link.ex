defmodule DotcomWeb.WorldCupTimetable.MatchLink do
  @moduledoc """
  A component that renders fancy buttons for World Cup matches
  """

  use DotcomWeb, :component

  import MbtaMetro.Components.Icon

  @valid_teams [
    :bolivia,
    :england,
    :france,
    :ghana,
    :haiti,
    :iraq,
    :morocco,
    :norway,
    :scotland,
    :suriname
  ]

  attr :date, :string, required: true
  attr :selected, :boolean, default: false
  attr :label, :string, required: true
  attr :teams, :any, required: true

  def match_link(assigns) do
    ~H"""
    <.link
      class={[
        "p-sm rounded-lg border-xs border-charcoal-70 no-underline max-w-sm",
        (@selected && "bg-brand-primary text-white") || "hover:bg-brand-primary-lightest text-black"
      ]}
      patch={~p"/preview/schedules/CR-WorldCup?#{[date: @date]}"}
    >
      <div class="font-bold">{@label} ({formatted_date(@date)})</div>
      <.teams selected={@selected} teams={@teams} />
    </.link>
    """
  end

  defp formatted_date(date) do
    date
    |> Date.from_iso8601!()
    |> Dotcom.Utils.Time.format!(:month_day)
  end

  defp teams(%{teams: [_team1, _team2]} = assigns) do
    ~H"""
    <span class="flex gap-1 text-lg">
      <.team_label selected={@selected} team={@teams |> Enum.at(0)} /> vs.
      <.team_label selected={@selected} team={@teams |> Enum.at(1)} />
    </span>
    """
  end

  defp teams(assigns) do
    ~H"""
    <span class="text-lg font-bold">{@teams}</span>
    """
  end

  defp team_label(assigns) do
    ~H"""
    <span class="flex gap-1.5 items-center ml-0.5">
      <span class="flex justify-items-center items-center size-5">
        <.icon
          type="icon-svg"
          name={flag_icon_name(@team)}
          class={["size-4.5 rounded-full ", (@selected && "ring-2 ring-white") || ""]}
        />
      </span>
      <span class="font-bold">{country_name(@team)}</span>
    </span>
    """
  end

  defp country_name(nil), do: "TBD"

  defp country_name(team) when team in @valid_teams,
    do: team |> Atom.to_string() |> String.capitalize()

  defp flag_icon_name(nil), do: "icon-flag-tbd"

  # The country-specific icons are sourced from
  # https://hatscripts.github.io/circle-flags/gallery
  defp flag_icon_name(team) when team in @valid_teams, do: "icon-flag-#{team}"
end
