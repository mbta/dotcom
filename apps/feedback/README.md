# Feedback

The Feedback app supports customer support submissions. We receive a user's feedback through our customer support form and submit it as a structured XML email to the Customer Experience team's Iris Heat software.

## Development Logging

In development, the application is configured to print the contents of the email to the log instead of sending an actual email. This is logged at the `info` log level, but the default log level is set to `warn`. Add `LOGGER_LEVEL=info` to your `.env` file to see the feedback emails in your logs.
