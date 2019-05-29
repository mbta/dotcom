# Additional Environment Variables

### `OPEN_TRIP_PLANNER_URL`

This variable is used to specify which Open Trip Planner URL to use.

### `STATIC_HOST`

To make your local server externally visible (useful for testing on a real phone, for example), set this to your IP address, which you can find from `ifconfig`, probably under `en0`.

### `WIREMOCK_PATH`

The path to your wiremock `.jar` file. Currently, this optional variable is only used by `npm` tasks, and not `mix`. If it is not set, `bin/wiremock-standalone-2.1.14.jar` will be used as the default.

### `WIREMOCK_PROXY_URL`

This is the `V3_URL` value that is used by wiremock when recording API requests.

### `WIREMOCK_TRIP_PLAN_PROXY_URL`

This is the `OPEN_TRIP_PLANNER_URL` value that is used by wiremock when recording Open Trip Planner API requests.

### `SUPPORT_TICKET_TO_EMAIL`

An email address to send support tickets to.

### `SUPPORT_TICKET_REPLY_EMAIL`

An email address to show as the reply-to for support emails.
