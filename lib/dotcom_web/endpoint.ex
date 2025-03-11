defmodule DotcomWeb.Endpoint do
  @moduledoc false

  use Phoenix.Endpoint, otp_app: :dotcom
  use Sentry.PlugCapture

  @session_options store: :cookie,
                   key: "_site_key",
                   signing_salt: "TInvb4GN",
                   secure: true

  @doc """
  Callback invoked for dynamically configuring the endpoint.

  It receives the endpoint configuration and checks if
  configuration should be loaded from the system environment.
  """
  @spec init(atom, Keyword.t()) :: {:ok, Keyword.t()} | no_return
  def init(_key, config) do
    secret_key_base =
      System.get_env("SITE_SECRET_KEY_BASE") ||
        :dotcom |> Application.get_env(DotcomWeb.Endpoint) |> Keyword.get(:secret_key_base)

    {:ok, Keyword.put(config, :secret_key_base, secret_key_base)}
  end

  socket(
    "/socket",
    DotcomWeb.UserSocket,
    websocket: [check_origin: Application.compile_env(:dotcom, :websocket_check_origin, false)],
    longpoll: [check_origin: Application.compile_env(:dotcom, :websocket_check_origin, false)]
  )

  socket("/live", Phoenix.LiveView.Socket, websocket: [connect_info: [session: @session_options]])

  # Serve at "/" the static files from "priv/static" directory.
  #
  # You should set gzip to true if you are running phx.digest
  # when deploying your static files in production.
  plug(DotcomWeb.Plugs.Static)

  # Code reloading can be explicitly enabled under the
  # :code_reloader configuration of your endpoint.
  if code_reloading? do
    socket("/phoenix/live_reload/socket", Phoenix.LiveReloader.Socket)
    plug(Phoenix.LiveReloader)
    plug(Phoenix.CodeReloader)
  end

  plug(DotcomWeb.Plugs.RemoteIp)
  plug(Plug.RequestId)
  plug(Logster.Plugs.Logger, formatter: Dotcom.Logster.SafeStringFormatter)

  plug(
    Plug.Parsers,
    parsers: [:urlencoded, :multipart, :json],
    pass: ["*/*"],
    json_decoder: Poison
  )

  plug(Sentry.PlugContext)
  plug(Plug.MethodOverride)
  plug(Plug.Head)

  plug(
    Plug.Session,
    @session_options
  )

  plug(Phoenix.LiveDashboard.RequestLogger,
    param_key: "request_logger",
    cookie_key: "request_logger"
  )

  host = System.get_env("HOST", "localhost:8090")
  static_host = System.get_env("STATIC_HOST", "localhost:8090")

  default_policy = %ContentSecurityPolicy.Policy{
    base_uri: ~w['none'],
    connect_src: ~w[
      'self'
      #{Application.compile_env!(:dotcom, :tile_server_url)}
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
      ws://#{host}
    ],
    default_src: ~w['self'],
    font_src: ~w['self' #{static_host}],
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
      #{static_host}
      #{System.get_env("CMS_API_BASE_URL", "")}
      #{Application.compile_env!(:dotcom, :tile_server_url)}
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
      #{static_host}
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
      #{static_host}
      www.gstatic.com
    ],
    worker_src: ~w[blob: ;]
  }

  plug(ContentSecurityPolicy.Plug.Setup, default_policy: default_policy)

  case Regex.run(~r/@(.*)\//, System.get_env("SENTRY_DSN", ""), capture: :all_but_first) do
    nil ->
      :ok

    [sentry_host | _] ->
      plug(ContentSecurityPolicy.Plug.AddSourceValue,
        connect_src: sentry_host
      )
  end

  plug(ContentSecurityPolicy.Plug.AddNonce, directives: [:script_src])
  plug(DotcomWeb.Router)
end
