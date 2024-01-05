defmodule DotcomWeb.ScheduleController.RoutePdfs do
  @moduledoc """
  Assigns @route_pdfs with the pdfs from the cms.
  """

  @behaviour Plug

  @impl true
  def init([]), do: []

  @impl true
  def call(%{assigns: %{date: date}, params: %{"route" => route_id}} = conn, []) do
    Plug.Conn.assign(conn, :route_pdfs, Dotcom.RoutePdfs.fetch_and_choose_pdfs(route_id, date))
  end
end
