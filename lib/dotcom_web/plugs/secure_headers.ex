defmodule DotcomWeb.Plugs.SecureHeaders do
  @moduledoc """
  Configures secure browser headers for Dotcom requests, including specifying
  content security policy directives at funtime.
  """

  @base_csp_directives %{
    connect: ~w[
      connect-src
      'self'
      *.arcgis.com
      *.googleapis.com
      *.s3.amazonaws.com
      analytics.google.com
      cdn.mbta.com
      px.ads.linkedin.com
      stats.g.doubleclick.net
      www.google-analytics.com
      www.google.com
    ],
    default: ~w[default-src 'none'],
    font: ~w[font-src 'self'],
    frame: ~w[
      frame-src
      'self'
      *.arcgis.com
      cdn.knightlab.com
      data.mbta.com
      livestream.com
      www.youtube.com
      www.google.com
      www.googletagmanager.com
      www.instagram.com
    ],
    img: ~w[
      img-src
      'self'
      *.arcgis.com
      *.google.com
      *.googleapis.com
      *.gstatic.com
      *.s3.amazonaws.com
      cdn.mbta.com
      data:
      i.ytimg.com
      px.ads.linkedin.com
      www.linkedin.com
      www.facebook.com
      www.googletagmanager.com
    ],
    script: ~w[
      script-src
      'self'
      'unsafe-eval'
      'unsafe-inline'
      *.arcgis.com
      *.google.com
      *.googleapis.com
      connect.facebook.net
      data.mbta.com
      insitez.blob.core.windows.net
      snap.licdn.com
      www.instagram.com
      www.google-analytics.com
      www.gstatic.com
      www.googletagmanager.com
    ],
    style: ~w[style-src 'self' 'unsafe-inline' www.gstatic.com],
    worker: ~w[worker-src blob: ;]
  }

  @default_secure_headers %{
    "strict-transport-security" => "max-age=31536000",
    "x-content-type-options" => "nosniff",
    "x-frame-options" => "DENY",
    "x-xss-protection" => "1; mode=block"
  }

  @behaviour Plug

  @impl Plug
  def init(opts), do: opts

  @impl Plug
  @spec call(Plug.Conn.t(), any()) :: Plug.Conn.t()
  def call(conn, _) do
    Phoenix.Controller.put_secure_browser_headers(conn, default_secure_headers())
  end

  def base_csp_directives, do: @base_csp_directives

  def default_secure_headers,
    do:
      @default_secure_headers
      |> Map.put(
        "content-security-policy",
        Application.get_env(:dotcom, :content_security_policy_definition, "")
      )
end
