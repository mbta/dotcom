import Config

config :dotcom,
  test_mail_file: "/tmp/test_support_email.json",
  time_fetcher: DateTime

if config_env() == :test do
  config :dotcom,
    time_fetcher: Feedback.FakeDateTime,
    feedback_rate_limit: 1_000,
    support_ticket_to_email: "test@test.com",
    support_ticket_from_email: "from@test.com",
    support_ticket_reply_email: "reply@test.com"
end

if config_env() == :dev do
  config :dotcom,
    send_email_fn: &Feedback.MockAws.send_email/1
end
