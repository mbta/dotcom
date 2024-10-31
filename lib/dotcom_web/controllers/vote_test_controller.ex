defmodule DotcomWeb.VoteTestController do
  use DotcomWeb, :controller

  def show(conn, _params) do
    address = "6 Greenough Ave, Boston, MA 02130"

    google_api_key = Application.get_env(:dotcom, :google_api_key)

    response =
      Req.get("https://www.googleapis.com/civicinfo/v2/voterinfo",
        params: [
          key: google_api_key,
          electionId: "9000",
          address: address
        ]
      )

    conn
    |> assign(:address, address)
    |> assign(:response, response)
    |> render()
  end
end
