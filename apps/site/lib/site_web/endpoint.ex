defmodule SiteWeb.Endpoint do
  @moduledoc false
  use Sentry.PlugCapture
  use Phoenix.Endpoint, otp_app: :site

  @doc """
  Callback invoked for dynamically configuring the endpoint.

  It receives the endpoint configuration and checks if
  configuration should be loaded from the system environment.
  """
  @spec init(atom, Keyword.t()) :: {:ok, Keyword.t()} | no_return
  def init(_key, config) do
    secret_key_base =
      System.get_env("SITE_SECRET_KEY_BASE") ||
        :site |> Application.get_env(SiteWeb.Endpoint) |> Keyword.get(:secret_key_base)

    {:ok, Keyword.put(config, :secret_key_base, secret_key_base)}
  end

  socket(
    "/socket",
    SiteWeb.UserSocket,
    websocket: [check_origin: Application.get_env(:site, :websocket_check_origin, false)],
    longpoll: [check_origin: Application.get_env(:site, :websocket_check_origin, false)]
  )

  # Serve at "/" the static files from "priv/static" directory.
  #
  # You should set gzip to true if you are running phx.digest
  # when deploying your static files in production.
  plug(SiteWeb.Plugs.Static)

  # Code reloading can be explicitly enabled under the
  # :code_reloader configuration of your endpoint.
  if code_reloading? do
    socket("/phoenix/live_reload/socket", Phoenix.LiveReloader.Socket)
    plug(Phoenix.LiveReloader)
    plug(Phoenix.CodeReloader)
  end

  plug(SiteWeb.Plugs.RemoteIp)
  plug(Plug.RequestId)
  plug(Logster.Plugs.Logger, formatter: Site.Logster.SafeStringFormatter)

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
    store: :cookie,
    key: "_site_key",
    signing_salt: "TInvb4GN"
  )

  plug(SiteWeb.Plugs.UriChecker)
  plug(SiteWeb.Router)
end
