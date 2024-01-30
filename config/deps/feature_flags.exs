import Config

config :laboratory,
  features: [],
  cookie: [
    # one month,
    max_age: 3600 * 24 * 30,
    http_only: true
  ]
