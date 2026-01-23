defmodule DotcomWeb.Plugs.Banner do
  @moduledoc """

  A module Plug to handle the banner at the top of every page.

  * If there's a banner alert, that should always be displayed with the alert styling.
  * Otherwise, display the beta announcement banner if necessary.
  """

  import Plug.Conn, only: [assign: 3]

  @behaviour Plug

  @impl true
  def init(opts), do: opts

  @impl true
  def call(conn, opts) do
    # banner_fn: a function which returns either an Alert.Banner or nil
    banner_fn = Keyword.get(opts, :banner_fn, &Alerts.Repo.banner/0)
    assign_alert_banner(conn, banner_fn.())
  end

  @spec assign_alert_banner(Plug.Conn.t(), Alerts.Banner.t() | nil) :: Plug.Conn.t()
  defp assign_alert_banner(conn, nil) do
    conn
  end

  defp assign_alert_banner(conn, banner) do
    conn
    |> assign(:alert_banner, banner)
    |> assign(:banner_class, "alert-announcement__container")
    |> assign(:banner_template, "_alert_announcement.html")
  end
end
