defmodule DotcomWeb.Plugs.SecureHeaders do
  @moduledoc """
  Configures secure browser headers for Dotcom requests, including specifying
  content security policy directives at funtime.
  """

  import Phoenix.Controller, only: [put_secure_browser_headers: 2]

  @base_csp_directives [
    default: "default-src 'none'",
    img:
      "img-src 'self' cdn.mbta.com px.ads.linkedin.com www.linkedin.com www.facebook.com *.google.com *.googleapis.com *.gstatic.com *.s3.amazonaws.com data: i.ytimg.com www.googletagmanager.com *.arcgis.com",
    style: "style-src 'self' 'unsafe-inline' www.gstatic.com cdn.jsdelivr.net",
    script:
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' insitez.blob.core.windows.net snap.licdn.com connect.facebook.net www.instagram.com www.google-analytics.com *.google.com www.gstatic.com www.googletagmanager.com *.googleapis.com data.mbta.com *.arcgis.com",
    font: "font-src 'self'",
    connect:
      "connect-src 'self' *.googleapis.com analytics.google.com www.google-analytics.com www.google.com px.ads.linkedin.com stats.g.doubleclick.net *.arcgis.com *.s3.amazonaws.com",
    frame:
      "frame-src 'self' data.mbta.com www.youtube.com www.google.com cdn.knightlab.com livestream.com www.instagram.com *.arcgis.com",
    worker: "worker-src blob: ;"
  ]

  @default_secure_headers %{
    "content-security-policy" =>
      Application.compile_env(:dotcom, :content_security_policy_definition, ""),
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
    put_secure_browser_headers(conn, @default_secure_headers)
  end

  def default_secure_headers, do: @default_secure_headers

  @type csp_directive_src ::
          :default | :img | :style | :script | :font | :connect | :frame | :worker

  @doc """
  Used to define the Content-Security-Policy header in prod using runtime
  values. Add to the `@base_csp_directives` by passing in key-value pairs, e.g.
  `[script: "www.fancy-js-cdn-host.io"]`
  """
  @spec build_csp_directives([{csp_directive_src(), String.t()}]) :: String.t()
  def build_csp_directives(directives_values) do
    directives_values
    |> Enum.reduce(@base_csp_directives, fn {directive, value}, directives ->
      Keyword.update!(directives, directive, &(&1 <> " " <> value))
    end)
    |> Keyword.values()
    |> Enum.join("; ")
  end
end
