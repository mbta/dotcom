defmodule DotcomWeb.Plugs.Debug do
  @moduledoc """
  Filters alerts by timeframe. Used by pages that list alerts
  and have a timeframe filter:

  - /alerts
  - /schedules/ROUTE/alerts
  - /stops/STOP/alerts
  """
  require Logger

  use Plug.Builder

  @pipeline Application.compile_env(:dotcom, :secure_pipeline)[:force_ssl]

  @impl Plug
  def call(conn, _) do
    if Enum.member?(@pipeline) do
      Logger.info(
        "#{Enum.map_join(@pipeline, "&", fn {k, v} -> "#{k}:#{v}" end)} **************************"
      )
    end

    conn
  end
end