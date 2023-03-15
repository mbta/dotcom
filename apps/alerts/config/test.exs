use Mix.Config

config :alerts,
  api_mfa: {JsonApi, :empty, []},
  aws_client: Alerts.TestExAws,
  s3_client: Alerts.TestExAws
