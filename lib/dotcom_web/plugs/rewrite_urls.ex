defmodule DotcomWeb.Plugs.RewriteUrls do
  @moduledoc """
  Plug to redirect before other kinds of data are loaded.

  Currently, only used to redirect from the old Boat-F3 (Hull Ferry) schedule
  to the new Boat-F1 (Hingham/Hull Ferry) schedule.
  """

  import Plug.Conn
  import Phoenix.Controller, only: [redirect: 2]

  @behaviour Plug

  @impl true
  def init([]), do: []

  @impl true
  def call(conn, _) do
    if new_base_url = rewrite_url(conn) do
      conn
      |> redirect(to: merge_url(new_base_url, conn.query_string))
      |> halt
    else
      conn
    end
  end

  # Send SF1.0 URLS to the new SF2.0
  defp rewrite_url(%{
         path_info: ["schedules", _, "line"],
         params: params
       }) do
    route_id = params |> Map.get("route")
    schedule_finder = params |> Map.get("schedule_finder", nil)

    if(is_nil(schedule_finder)) do
      nil
    else
      direction_id = schedule_finder |> Map.get("direction_id")
      stop_id = schedule_finder |> Map.get("origin")
      "/departures/?route_id=#{route_id}&direction_id=#{direction_id}&stop_id=#{stop_id}#"
    end
  end

  defp rewrite_url(%{path_info: ["schedules", "Boat-F3" | _]} = conn) do
    String.replace(conn.request_path, "Boat-F3", "Boat-F1")
  end

  defp rewrite_url(_conn) do
    nil
  end

  defp merge_url(base_url, "") do
    base_url
  end

  defp merge_url(base_url, query_string) do
    "#{base_url}?#{query_string}"
  end
end
