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
       selected_match: nil
     })}
  end

  @impl true
  def handle_params(params, _uri, socket) do
    {:noreply, assign(socket, :selected_match, selected_match(params["date"]))}
  end

  defp selected_match(selected_date) do
    Enum.find(@match_list, fn {date, _, _, _} -> date == selected_date end)
  end

  defp ticket_icon(assigns) do
    ~H"""
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="13"
      viewBox="0 0 19 13"
      aria-label={~t"Reserved Ticket Required"}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M19 7.96875C18.1255 7.96875 17.4167 7.25521 17.4167 6.375C17.4167 5.49479 18.1255 4.78125 19 4.78125V1.59375C19 0.713535 18.2911 0 17.4167 0H1.58333C0.708872 0 0 0.713535 0 1.59375V4.78125C0.874462 4.78125 1.58333 5.49479 1.58333 6.375C1.58333 7.25521 0.874462 7.96875 0 7.96875V11.1562C0 12.0365 0.708872 12.75 1.58333 12.75H17.4167C18.2911 12.75 19 12.0365 19 11.1562V7.96875ZM9.13038 3.24695L8.2894 4.95633L6.40783 5.23133C6.07041 5.28039 5.93518 5.69741 6.17987 5.93626L7.54115 7.26606L7.21918 9.14457C7.16123 9.48412 7.51797 9.73847 7.81676 9.57966L9.5 8.6927L11.1832 9.57966C11.482 9.73717 11.8388 9.48412 11.7808 9.14457L11.4588 7.26606L12.8201 5.93626C13.0648 5.69741 12.9296 5.28039 12.5922 5.23133L10.7106 4.95633L9.86962 3.24695C9.71894 2.94226 9.28235 2.93838 9.13038 3.24695Z"
        fill="currentColor"
      />
    </svg>
    """
  end
end
