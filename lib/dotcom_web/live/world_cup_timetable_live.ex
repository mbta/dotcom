defmodule DotcomWeb.WorldCupTimetableLive do
  @moduledoc """
  Showing World Cup trains with a custom template handling
  match selection, ticket information, and more
  """

  use DotcomWeb, :live_view

  import DotcomWeb.WorldCupTimetable.MatchLink, only: [match_link: 1, selected_match_banner: 1]

  on_mount {DotcomWeb.Hooks.Breadcrumbs, :world_cup_timetable}

  @match_list [
    {"2026-06-13", ~t"Match 5", [:haiti, :scotland]},
    {"2026-06-16", ~t"Match 18", [nil, :norway]},
    {"2026-06-19", ~t"Match 30", [:scotland, :morocco]},
    {"2026-06-23", ~t"Match 45", [:england, :ghana]},
    {"2026-06-26", ~t"Match 61", [:norway, :france]},
    {"2026-06-29", ~t"Match 74", [~t"Round of 32"]},
    {"2026-07-09", ~t"Match 97", [~t"Quarter Finals"]}
  ]

  @impl true
  def mount(_params, _session, socket) do
    {:ok, assign(socket, %{match_list: @match_list, selected_match: nil})}
  end

  @impl true
  def handle_params(params, _uri, socket) do
    {:noreply, assign(socket, :selected_match, params["date"])}
  end

  defp valid_match_date?(selected_match) do
    Enum.find(@match_list, false, fn {date, _, _} -> date == selected_match end)
  end
end
