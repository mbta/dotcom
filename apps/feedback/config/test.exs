use Mix.Config

config :feedback,
  time_fetcher: Feedback.FakeDateTime,
  exaws_config_fn: &Feedback.Test.mock_config/1,
  exaws_perform_fn: &Feedback.Test.mock_perform/2,
  rate_limit: false
