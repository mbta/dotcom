use Mix.Config

config :feedback,
  exaws_config_fn: &Feedback.MockAws.config/1,
  exaws_perform_fn: &Feedback.MockAws.perform/2
