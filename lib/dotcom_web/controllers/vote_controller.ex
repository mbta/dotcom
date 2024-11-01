defmodule DotcomWeb.VoteController do
  @moduledoc """
  Handles rendering the vote widget
  """

  use DotcomWeb, :controller

  import DotcomWeb.ViewHelpers, only: [cms_static_page_path: 2]

  alias DotcomWeb.ControllerHelpers

  plug(:meta_description)
  plug(:clear_polling_results)

  def show(
        conn,
        %{"address" => address, "latitude" => latitude, "longitude" => longitude} = _params
      ) do
    google_api_key = Application.get_env(:dotcom, :google_api_key)

    response =
      Req.get("https://www.googleapis.com/civicinfo/v2/voterinfo",
        params: [
          key: google_api_key,
          electionId: "9000",
          address: address
        ]
      )

    conn =
      case response do
        {:ok, %{body: %{"pollingLocations" => [polling_location | _]}}} ->
          params = %{
            "plan" => %{
              "from_latitude" => latitude,
              "from_longitude" => longitude,
              "from" => address,
              "to_latitude" => polling_location["latitude"],
              "to_longitude" => polling_location["longitude"],
              "to" => polling_location["address"]["locationName"]
            }
          }

          conn
          |> assign(:polling_location, polling_location)
          |> assign(:trip_plan_path, trip_plan_path(DotcomWeb.Endpoint, :index, params))

        _ ->
          conn |> assign(:polling_error, true)
      end

    conn
    |> assign(:breadcrumbs, [
      Breadcrumb.build("Take the T to Vote", cms_static_page_path(conn, "/vote"))
    ])
    |> render("show.html")
  end

  def show(conn, _params) do
    conn
    |> assign(:breadcrumbs, [
      Breadcrumb.build("Vote", cms_static_page_path(conn, "/vote"))
    ])
    |> render("show.html")
  end

  defp meta_description(conn, _) do
    conn
    |> assign(
      :meta_description,
      "Tuesday, November 5 is the last day to vote in the 2024 general election. Use the T to get to your polling location."
    )
  end

  defp clear_polling_results(conn, _) do
    conn
    |> assign(:polling_location, nil)
    |> assign(:polling_error, false)
  end
end
