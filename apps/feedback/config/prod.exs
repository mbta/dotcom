use Mix.Config

config :feedback,
  mailgun_domain: "${MAILGUN_DOMAIN}",
  mailgun_key: "${MAILGUN_API_KEY}",
  support_ticket_to_email: "${SUPPORT_TICKET_TO_EMAIL}",
  support_ticket_from_email: "${SUPPORT_TICKET_FROM_EMAIL}",
  support_ticket_reply_email: "${SUPPORT_TICKET_REPLY_EMAIL}"
