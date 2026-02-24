defmodule DotcomWeb.WorldCupTimetableLive do
  @moduledoc """
  Showing World Cup trains with a custom template handling
  match selection, ticket information, and more
  """

  use DotcomWeb, :live_view

  import DotcomWeb.WorldCupTimetable.MatchLink, only: [match_link: 1, selected_match_banner: 1]

  on_mount {DotcomWeb.Hooks.Breadcrumbs, :world_cup_timetable}

  @match_list [
    {"2026-06-13", ~t"Match 5", [:haiti, :scotland],
     [
       {~t"Placeholder 5A", [~T[05:34:00], ~T[06:56:00]]},
       {~t"Placeholder 5B", [~T[07:34:00], ~T[09:56:00]]},
       {~t"Placeholder 5C", [~T[13:10:00], ~T[13:59:00]]},
       {~t"Placeholder 5D", [~T[15:48:00], ~T[19:07:00]]}
     ]},
    {"2026-06-16", ~t"Match 18", [nil, :norway],
     [
       {~t"Placeholder 18X", [~T[18:55:00], ~T[18:56:00]]},
       {~t"Placeholder 18Y", [~T[19:20:00], ~T[19:36:00]]},
       {~t"Placeholder 18Z", [~T[20:10:00], ~T[20:20:00]]}
     ]},
    {"2026-06-19", ~t"Match 30", [:scotland, :morocco],
     [
       {~t"Placeholder 30Q", [~T[06:14:00], ~T[07:00:00]]},
       {~t"Placeholder 30R", [~T[07:35:00], ~T[08:59:00]]}
     ]},
    {"2026-06-23", ~t"Match 45", [:england, :ghana],
     [
       {~t"Placeholder 45A", [~T[15:00:00], ~T[15:40:00]]},
       {~t"Placeholder 45B", [~T[16:00:00], ~T[16:40:00]]},
       {~t"Placeholder 45C", [~T[17:00:00], ~T[17:40:00]]},
       {~t"Placeholder 45D", [~T[18:00:00], ~T[18:40:00]]}
     ]},
    {"2026-06-26", ~t"Match 61", [:norway, :france],
     [
       {~t"Placeholder 61A", [~T[17:30:00], ~T[18:10:00]]},
       {~t"Placeholder 61B", [~T[18:00:00], ~T[19:10:00]]},
       {~t"Placeholder 61C", [~T[19:00:00], ~T[20:10:00]]},
       {~t"Placeholder 61D", [~T[20:00:00], ~T[21:10:00]]}
     ]},
    {"2026-06-29", ~t"Match 74", [~t"Round of 32"],
     [
       {~t"Placeholder 74A", [~T[15:00:00], ~T[15:40:00]]},
       {~t"Placeholder 74B", [~T[16:00:00], ~T[16:40:00]]},
       {~t"Placeholder 74C", [~T[17:00:00], ~T[17:40:00]]},
       {~t"Placeholder 74D", [~T[18:00:00], ~T[18:40:00]]}
     ]},
    {"2026-07-09", ~t"Match 97", [~t"Quarter Finals"],
     [
       {~t"Placeholder 97A", [~T[05:10:00], ~T[05:15:00]]},
       {~t"Placeholder 97B", [~T[06:10:00], ~T[06:15:00]]},
       {~t"Placeholder 97C", [~T[07:10:00], ~T[07:15:00]]},
       {~t"Placeholder 97D", [~T[08:10:00], ~T[08:15:00]]},
       {~t"Placeholder 97E", [~T[09:10:00], ~T[09:15:00]]},
       {~t"Placeholder 97F", [~T[10:10:00], ~T[10:15:00]]},
       {~t"Placeholder 97G", [~T[11:10:00], ~T[11:15:00]]},
       {~t"Placeholder 97H", [~T[12:10:00], ~T[12:15:00]]}
     ]}
  ]

  @impl true
  def mount(_params, _session, socket) do
    {:ok,
     assign(socket, %{
       match_list: @match_list,
       selected_match: nil,
       disable_preview_container: true
     })}
  end

  @impl true
  def handle_params(params, _uri, socket) do
    {:noreply, assign(socket, :selected_match, selected_match(params["date"]))}
  end

  defp selected_match(selected_date) do
    Enum.find(@match_list, fn {date, _, _, _} -> date == selected_date end)
  end
end
