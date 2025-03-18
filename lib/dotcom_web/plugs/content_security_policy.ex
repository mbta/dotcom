defmodule DotcomWeb.Plugs.ContentSecurityPolicy do
  @moduledoc """
  Defines the content security policy, accomodating the wide variety
  of embedded scripts and inserted content across the website.
  """
  use Plug.Builder

  @default_policy %ContentSecurityPolicy.Policy{
    base_uri: ~w['none'],
    connect_src: ~w[
      'self'
      *.arcgis.com
      analytics.google.com
      cdn.mbta.com
      px.ads.linkedin.com
      stats.g.doubleclick.net
      translate.googleapis.com
      translate-pa.googleapis.com
      www.google.com
      www.google-analytics.com
      www.googletagmanager.com
    ],
    default_src: ~w['self'],
    font_src: ~w['self'],
    frame_src: ~w[
      'self'
      *.arcgis.com
      *.soundcloud.com
      *.vimeo.com
      cdn.knightlab.com
      data.mbta.com
      livestream.com
      vimeo.com
      www.instagram.com
      www.google.com
      www.googletagmanager.com
      www.youtube.com
    ],
    img_src: ~w[
      'self'
      *.arcgis.com
      *.google.com
      *.googleapis.com
      cdn.mbta.com
      data:
      i.ytimg.com
      fonts.gstatic.com
      px.ads.linkedin.com
      www.facebook.com
      www.googletagmanager.com
      www.gstatic.com
      www.linkedin.com
    ],
    script_src: ~w[
      'self'
      'unsafe-eval'
      *.arcgis.com
      connect.facebook.net
      data.mbta.com
      https://www.google.com/recaptcha/api.js
      https://www.google.com/recaptcha/api/fallback
      https://www.googletagmanager.com/gtm.js
      insitez.blob.core.windows.net
      snap.licdn.com
      translate.google.com/translate_a/element.js
      translate-pa.googleapis.com
      www.instagram.com
    ],
    style_src: ~w[
      'self'
      'unsafe-inline'
      www.gstatic.com
    ],
    worker_src: ~w[blob: ;]
  }

  plug(ContentSecurityPolicy.Plug.Setup, default_policy: @default_policy)

  # Map tiles, hosted either on the CDN or in S3
  tile_server_url = Application.compile_env(:dotcom, :tile_server_url)

  plug(ContentSecurityPolicy.Plug.AddSourceValue,
    connect_src: tile_server_url,
    img_src: tile_server_url
  )

  # Content from the Drupal CMS
  plug(ContentSecurityPolicy.Plug.AddSourceValue,
    img_src: Application.compile_env(:dotcom, :cms_api, [])[:base_url]
  )

  # Application websocket
  endpoint_config = Application.compile_env(:dotcom, DotcomWeb.Endpoint, [])

  plug(ContentSecurityPolicy.Plug.AddSourceValue,
    connect_src: "ws://#{Keyword.get(endpoint_config, :url)[:host]}"
  )

  # Static assets, hosted on the CDN or served locally
  static_host =
    case Keyword.get(endpoint_config, :static_url, []) do
      [url: url] -> url
      [host: host, port: port] -> "#{host}:#{port}"
      _ -> nil
    end

  if static_host do
    plug(ContentSecurityPolicy.Plug.AddSourceValue,
      font_src: static_host,
      img_src: static_host,
      script_src: static_host,
      style_src: static_host
    )
  end

  # More static assets, served locally
  if Application.compile_env(:dotcom, :dev_server?) and
       Application.compile_env(:dotcom, :webpack_path) do
    webpack_path =
      Application.compile_env(:dotcom, :webpack_path)
      |> String.replace("http://", "")

    plug(ContentSecurityPolicy.Plug.AddSourceValue,
      connect_src: "ws://#{webpack_path}/ws",
      font_src: webpack_path,
      script_src: webpack_path,
      style_src: webpack_path
    )
  end

  # Sentry needs to be able to run code to send events
  if Sentry.get_dsn() do
    plug(ContentSecurityPolicy.Plug.AddSourceValue,
      connect_src: Sentry.get_dsn(),
      connect_src: Application.compile_env(:sentry, :js_dsn)
    )
  end

  plug(ContentSecurityPolicy.Plug.AddNonce, directives: [:script_src])
end
