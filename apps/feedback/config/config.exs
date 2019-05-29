# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
use Mix.Config

# This configuration is loaded before any dependency and is restricted
# to this project. If another project depends on this project, this
# file won't be loaded nor affect the parent project. For this reason,
# if you want to provide default values for your application for
# 3rd-party users, it should be done in your "mix.exs" file.

# You can configure for your application as:
#
#     config :feedback, key: :value
#
# And access this configuration in your application as:
#
#     Application.get_env(:feedback, :key)
#
# Or configure a 3rd-party app:
#
#     config :logger, level: :info
#

config :feedback,
  support_ticket_to_email: System.get_env("SUPPORT_TICKET_TO_EMAIL") || "test@test.com",
  support_ticket_from_email: System.get_env("SUPPORT_TICKET_FROM_EMAIL") || "from@test.com",
  support_ticket_reply_email: System.get_env("SUPPORT_TICKET_REPLY_EMAIL") || "reply@test.com",
  mailgun_domain: System.get_env("MAILGUN_DOMAIN") || "",
  mailgun_key: System.get_env("MAILGUN_API_KEY") || "",
  test_mail_file: "/tmp/mailgun.json"

import_config "#{Mix.env()}.exs"
