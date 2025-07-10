defmodule DotcomWeb.TestController do
  @moduledoc """
  A controller to do what we want, when we want.
  """

  require Logger

  use DotcomWeb, :controller

  def index(conn, _params) do
    status = ~t(All clear, Captain!)

    Logger.notice("#{__MODULE__}: #{status}")

    send_resp(conn, 200, status)
  end
end
