defmodule DotcomWeb.FacilitiesController do
  @moduledoc """
  Page for display of information about facilities.
  """
  use DotcomWeb, :controller

  @facilities_repo Application.compile_env!(:dotcom, :repo_modules)[:facilities]

  def get_facilities(conn, %{"stop_id" => stop_id}) do
    facilities = @facilities_repo.get_for_stop(stop_id)

    case facilities do
      {:error, _x} ->
        DotcomWeb.ControllerHelpers.return_internal_error(conn)

      _ ->
        json(conn, facilities)
    end
  end
end
