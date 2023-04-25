import Config

config :alerts,
  api_mfa: {JsonApi, :empty, []},
  mock_aws_client: Alerts.TestExAws
