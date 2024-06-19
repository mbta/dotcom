defmodule DotcomWeb.Plugs.CSPHeaders do
  @moduledoc """
  Adds Content-Security-Policy headers.
  """

  import Phoenix.Controller, only: [put_secure_browser_headers: 2]
  @behaviour Plug

  # MBTA has accounts with these social media networks
  @social_media "www.facebook.com www.instagram.com www.threads.net www.linkedin.com www.youtube.com www.twitter.com www.x.com www.tiktok.com"

  @impl true
  def init(opts), do: opts

  @impl true
  def call(conn, _) do
    policy =
      [
        "default-src 'self' #{static_host()} #{cms_host()}",
        "img-src 'self' #{img_src()}",
        "style-src 'self' 'unsafe-inline' #{style_src()}",
        "font-src 'self' #{font_src()}",
        "script-src 'self' 'unsafe-eval' 'unsafe-inline' #{script_src()}",
        "connect-src 'self' ws://#{static_host()} #{connect_src()}",
        "frame-src 'self' #{frame_src()}"
      ]
      |> Enum.join("; ")

    conn
    |> put_secure_browser_headers(%{
      "content-security-policy-report-only" => policy
    })
  end

  # Data URIs, MBTA CDN, Google Translate, Facebook pixel, Drupal CMS, Map tiles
  defp img_src do
    tile_host = Application.fetch_env!(:dotcom, :tile_server_url) |> hostname()

    ~w(
      data:
      cdn.mbta.com
      fonts.gstatic.com
      www.gstatic.com
      www.googletagmanager.com
      www.facebook.com
      #{cms_host()}
      #{tile_host}
    ) |> Enum.join(" ")
  end

  # Google Translate
  defp style_src, do: "localhost:* www.gstatic.com"

  defp font_src, do: "localhost:*"

  # Google Tag Manager, Translate, ReCaptcha, Instagram embeds
  defp script_src do
    ~w(
      localhost:*
      www.gstatic.com
      www.googletagmanager.com
      translate.google.com
      translate.googleapis.com
      translate-pa.googleapis.com
      insitez.blob.core.windows.net
      www.facebook.com
      connect.facebook.net
      https://www.google.com/recaptcha/api.js
      http://www.instagram.com/embed.js
    ) |> Enum.join(" ")
  end

  # Websocket connections, Google Translate, Sentry
  defp connect_src do
    sentry_dsn = Application.fetch_env!(:sentry, :dsn) |> hostname()
    sentry_js_dsn = Application.fetch_env!(:sentry, :js_dsn) |> hostname()

    "analytics.google.com translate.googleapis.com #{sentry_dsn} #{sentry_js_dsn}"
  end

  # Project pages using a slider component,
  # pages displaying OPMI dashboards,
  # events showing livestreams,
  # Google Tag Manager-created ad service
  # anything embedding content from our social media channels
  defp frame_src do
    ~w(
      cdn.knightlab.com
      data.mbta.com
      livestream.com
      td.doubleclick.net
      #{@social_media}
    ) |> Enum.join(" ")
  end

  defp static_host do
    host = Application.fetch_env!(:dotcom, DotcomWeb.Endpoint)[:static_url][:host]
    "#{host}:*"
  end

  defp cms_host, do: Application.fetch_env!(:dotcom, :cms_api)[:base_url] |> hostname()

  defp hostname(nil), do: ""

  defp hostname(url) do
    case URI.parse(url) do
      %URI{host: host} -> host
      _ -> ""
    end
  end
end
