defmodule DotcomWeb.HealthController do
  @moduledoc """
  Simple controller to return 200 OK when the website is healthy.
  """
  use DotcomWeb, :controller

  @cache Application.compile_env!(:dotcom, :cache)
  @otp_module Application.compile_env!(:dotcom, :otp_module)

  def index(conn, _params) do
    conn
    |> send_resp(200, "")
  end

  def open_trip_planner(conn, _params) do
    result = check_otp()
    status = if result.healthy?, do: 200, else: 503

    conn
    |> put_resp_header("cache-control", "max-age=60, public")
    |> send_resp(status, "")
  end

  defp check_otp do
    case @cache.get(:otp_health) do
      nil ->
        result = %{healthy?: @otp_module.healthy?()}
        @cache.put(:otp_health, result, ttl: :timer.minutes(1))
        result

      health ->
        health
    end
  end
end
