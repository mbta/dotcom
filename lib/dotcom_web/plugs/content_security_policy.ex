defmodule DotcomWeb.Plugs.ContentSecurityPolicy do
  @moduledoc """
  Defines the content security policy, accomodating the wide variety
  of embedded scripts and inserted content across the website.
  """
  # Map tiles, hosted either on the CDN or in S3
  @tile_server_url Application.compile_env(:dotcom, :tile_server_url)

  @default_policy %ContentSecurityPolicy.Policy{
    base_uri: ~w['none'],
    connect_src: ~w[
        'self'
        #{@tile_server_url}
        *.arcgis.com
        *.tableau.com
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
        *.tableau.com
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
        edge.fullstory.com
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

  @behaviour Plug

  @impl Plug
  def init(opts), do: opts

  @impl Plug
  def call(conn, _opts) do
    conn
    |> ContentSecurityPolicy.Plug.Setup.call(default_policy: @default_policy)
    |> ContentSecurityPolicy.Plug.AddNonce.call(directives: [:script_src])
    |> ContentSecurityPolicy.Plug.AddSourceValue.call(runtime_directives())
  end

  defp runtime_directives do
    drupal_url = Util.config(:dotcom, :cms_api)[:base_url]
    endpoint_config = Util.config(:dotcom, DotcomWeb.Endpoint)
    websocket_url = "#{Keyword.get(endpoint_config, :url, [])[:host]}"

    [
      {:connect_src, "ws://#{websocket_url}"},
      {:connect_src, "wss://#{websocket_url}"},
      {:img_src, drupal_url}
    ]
    |> static_host(Keyword.get(endpoint_config, :static_url))
    |> webpack(Util.config(:dotcom, :webpack_path))
    |> sentry(Sentry.get_dsn())
  end

  defp sentry(directives, dsn) do
    if is_binary(dsn) do
      [
        {:connect_src, sentry_host(dsn)},
        {:connect_src, Util.config(:sentry, :js_dsn) |> sentry_host()}
      ] ++ directives
    else
      directives
    end
  end

  defp sentry_host(dsn) do
    case Regex.run(~r/@(.*)\//, dsn, capture: :all_but_first) do
      nil -> ""
      [match | _] -> match
    end
  end

  defp static_host(directives, url: url) do
    if url do
      [
        {:font_src, url},
        {:img_src, url},
        {:script_src, url},
        {:style_src, url}
      ] ++ directives
    else
      directives
    end
  end

  defp static_host(directives, host: host, port: port) do
    static_host(directives, url: "#{host}:#{port}")
  end

  defp static_host(directives, _), do: directives

  defp webpack(directives, webpack_path) when is_binary(webpack_path) do
    webpack_path = String.replace(webpack_path, "http://", "")

    [
      {:connect_src, webpack_path},
      {:connect_src, "ws://#{webpack_path}/ws"},
      {:font_src, webpack_path},
      {:script_src, webpack_path},
      {:style_src, webpack_path}
    ] ++ directives
  end

  defp webpack(directives, _), do: directives
end
