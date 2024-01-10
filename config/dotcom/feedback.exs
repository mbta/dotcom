import Config

config :dotcom,
  test_mail_file: "/tmp/test_support_email.json",
  time_fetcher: DateTime

if config_env() == :test do
  config :dotcom,
    time_fetcher: Feedback.FakeDateTime,
    exaws_config_fn: &Feedback.Test.mock_config/1,
    exaws_perform_fn: &Feedback.Test.mock_perform/2,
    feedback_rate_limit: 1_000,
    support_ticket_to_email: "test@test.com",
    support_ticket_from_email: "from@test.com",
    support_ticket_reply_email: "reply@test.com"
end

if config_env() == :dev do
  config :dotcom,
    exaws_config_fn: &Feedback.MockAws.config/1,
    exaws_perform_fn: &Feedback.MockAws.perform/2
end
