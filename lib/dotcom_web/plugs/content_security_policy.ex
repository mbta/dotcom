defmodule DotcomWeb.Plugs.ContentSecurityPolicy do
  @moduledoc """
  Defines the content security policy, accomodating the wide variety
  of embedded scripts and inserted content across the website.
  """
  use Plug.Builder

  import DotcomWeb.ControllerHelpers, only: [call_plug_with_opts: 3]

  # Map tiles, hosted either on the CDN or in S3
  @tile_server_url Application.compile_env(:dotcom, :tile_server_url)

  @default_policy %ContentSecurityPolicy.Policy{
    base_uri: ~w['none'],
    connect_src: ~w[
      'self'
      #{@tile_server_url}
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
      #{@tile_server_url}
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
      *.tableau.com
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

  # The other directives need to be set up at runtime, so we use `Plug.call/2` any time after `ContentSecurityPolicy.Plug.Setup` is done.
  @impl Plug
  def call(%{private: %{content_security_policy: _}} = conn, _opts) do
    drupal_url = Util.config(:dotcom, :cms_api)[:base_url]
    endpoint_config = Util.config(:dotcom, DotcomWeb.Endpoint)
    # Static assets, hosted on the CDN or served locally
    static_host =
      case Keyword.get(endpoint_config, :static_url, []) do
        [url: url] -> url
        [host: host, port: port] -> "#{host}:#{port}"
        _ -> nil
      end

    webpack_path = Util.config(:dotcom, :webpack_path)
    websocket_url = "#{Keyword.get(endpoint_config, :url, [])[:host]}"

    conn
    |> call_plug_with_opts(ContentSecurityPolicy.Plug.AddSourceValue,
      connect_src: "ws://#{websocket_url}",
      img_src: drupal_url
    )
    |> then(fn conn ->
      if static_host do
        call_plug_with_opts(conn, ContentSecurityPolicy.Plug.AddSourceValue,
          font_src: static_host,
          img_src: static_host,
          script_src: static_host,
          style_src: static_host
        )
      else
        conn
      end
    end)
    |> then(fn conn ->
      if webpack_path do
        call_plug_with_opts(conn, ContentSecurityPolicy.Plug.AddSourceValue,
          connect_src: "ws://#{webpack_path}/ws",
          font_src: webpack_path,
          script_src: webpack_path,
          style_src: webpack_path
        )
      else
        conn
      end
    end)
    |> then(fn conn ->
      # Sentry needs to be able to run code to send events
      dsn = Sentry.get_dsn()
      js_dsn = Util.config(:sentry, :js_dsn)

      if dsn do
        conn
        |> call_plug_with_opts(ContentSecurityPolicy.Plug.AddSourceValue, connect_src: dsn)
        |> call_plug_with_opts(ContentSecurityPolicy.Plug.AddSourceValue, connect_src: js_dsn)
      else
        conn
      end
    end)
  end

  def call(conn, _), do: conn
end
