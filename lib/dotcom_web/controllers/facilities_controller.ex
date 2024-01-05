defmodule DotcomWeb.FacilitiesController do
  @moduledoc """
  Page for display of information about facilities.
  """
  use DotcomWeb, :controller

  def get_facilities(conn, %{"stop_id" => stop_id}) do
    res = Facilities.Repo.get_for_stop(stop_id)

    case res do
      {:error, _x} ->
        DotcomWeb.ControllerHelpers.return_internal_error(conn)

      _ ->
        json(conn, res.data)
    end
  end
end
