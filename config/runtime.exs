import Config

if config_env() == :prod do
  config :alerts, bus_stop_change_bucket: System.get_env("S3_PREFIX_BUSCHANGE")
end

if config_env() == :prod do
  host = System.fetch_env!("HOST")
  port = String.to_integer(System.get_env("PORT") || "4000")

  config :site, SiteWeb.Endpoint,
    url: [host: host],
    http: [
      # Enable IPv6 and bind on all interfaces.
      # Set it to  {0, 0, 0, 0, 0, 0, 0, 1} for local network only access.
      # See the documentation on https://hexdocs.pm/plug_cowboy/Plug.Cowboy.html
      # for details about using IPv6 vs IPv4 and loopback vs public addresses.
      # ip: {0, 0, 0, 0, 0, 0, 0, 0},
      port: port,
      acceptors: 2_048,
      max_connections: 32_768,
      compress: true,
      protocol_options: [
        max_header_value_length: 16_384,
        max_request_line_length: 16_384
      ],
      # dispatch websockets but don't dispatch any other URLs, to avoid parsing invalid URLs
      # see https://hexdocs.pm/phoenix/Phoenix.Endpoint.CowboyHandler.html
      dispatch: [
        {:_,
         [
           {:_, Phoenix.Endpoint.Cowboy2Handler, {SiteWeb.Endpoint, []}}
         ]}
      ]
    ],
    static_url: [
      scheme: System.fetch_env!("STATIC_SCHEME"),
      host: System.fetch_env!("STATIC_HOST"),
      port: System.fetch_env!("STATIC_PORT")
    ]
end
