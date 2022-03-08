defmodule SiteWeb.Plugs.GlxNowOpen do
  @moduledoc """
    assigns glx_now_open? value if the current date is after the set date for the
    glx expansion to open (March 21, 2022) and not greater than 3 months post-opening
    date (June, 21, 2022).

    Stations set to open:
      Lechmere (place-lech)
      Union Square (place-unsqu)
      Science Park/West End (place-spmnl)
  """

  @opening_date ~N[2022-03-21T00:00:00]

  @behaviour Plug
  import Plug.Conn

  @impl true
  def init([]), do: [now_fn: &Util.now/0, to_local_fn: &Util.to_local_time/1]

  @impl true
  def call(conn, now_fn: now_fn, to_local_fn: to_local_fn) do
    conn
    |> assign(:glx_now_open?, check_current_service_date(now_fn.(), to_local_fn.(@opening_date)))
  end

  defp check_current_service_date(current_date, opening_date) do
    after_open_date?(current_date, opening_date) && before_end_date?(current_date, opening_date)
  end

  defp after_open_date?(current_date, opening_date) do
    DateTime.compare(current_date, opening_date) != :lt
  end

  defp before_end_date?(current_date, opening_date) do
    end_date = Timex.shift(opening_date, months: 3)
    DateTime.compare(current_date, end_date) != :gt
  end
end
