use Mix.Config

config :feedback,
  time_fetcher: Feedback.FakeDateTime,
  exaws_perform_fn: &Feedback.Test.mock_perform/2
