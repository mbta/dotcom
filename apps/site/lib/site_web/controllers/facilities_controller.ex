defmodule SiteWeb.FacilitiesController do
  @moduledoc """
  Page for display of information about facilities.
  """
  use SiteWeb, :controller

  def get_facilities(conn, %{"stop_id" => stop_id}) do
    res = Facilities.Repo.get_for_stop(stop_id)

    case res do
      {:error, _x} ->
        json(conn, res)

      _ ->
        json(conn, res.data)
    end
  end
end
