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

  plug(DotcomWeb.Plugs.ContentSecurityPolicy)

  plug(DotcomWeb.Router)
end
