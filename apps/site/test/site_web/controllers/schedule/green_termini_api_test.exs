defmodule SiteWeb.ScheduleController.GreenTerminiApi do

  describe "show/2" do
    test "successfully calls the API", %{conn: conn} do
      path =
        green_termini_api_path(conn, :result, %{
          id: "Green-B" # array of strings
        })

      opts = [

      ]

      conn
      |> assign(:trip_info_functions, opts)
      |> get(path)
      |> json_response(200)
    end
  end
