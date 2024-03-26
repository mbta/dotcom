# Environment Variables

There are many ways to set the environment variables described here:

* The easiest way is to install **[direnv](https://github.com/direnv/direnv)**
  and copy the `.envrc.template` file in the root of the repo to `.envrc`. Type
  `direnv allow` and the current contents of the file will be approved, and
  subsequently loaded and unloaded automatically when you change into and out of
  the project directory.

* `.envrc` is also a plain shell script, so it can be manually loaded into your
  shell session by typing `source .envrc`. Note the variables will persist for
  the rest of the session, even outside the project directory. You can make this
  happen for all new sessions by adding the line to your `.zshrc` or equivalent,
  and using an absolute path to the file.

* Run commands prefixed with `env VARIABLE1=value2 VARIABLE2=value2 ...`. This
  only affects that one command, so can also be used to override values that
  have been exported using one of the above approaches.


## Required

### `V3_URL`

The URL of the MBTA V3 API server, e.g. `https://api-dev.mbtace.com`.

### `V3_API_KEY`

The key to use with the MBTA API (see `README`). This is a practical requirement
for development since requests without an API key have a very low rate limit.


## Optional

### Amazon Web Services credentials

Some background processes, along with the ability to search and locate places, require AWS authentication. Developers can configure this locally using AWS CLI in conjunction with storage in 1Password, as [recommended by TID in this doc](https://www.notion.so/mbta-downtown-crossing/Storing-Access-Keys-Securely-in-1Password-b89310bc67784722a5a218500f34443d?pvs=4).

### `DRUPAL_ROOT`

The URL for our CMS. You'll need to set this to view any of the static content
on the site.

### `ALGOLIA_APP_ID`, `ALGOLIA_SEARCH_KEY`, and `ALGOLIA_WRITE_KEY`

These keys are used to interact with the Algolia search api. The values can be found under the `Api Keys` section in Algolia (you'll need to be added as a team member to get access).

`ALGOLIA_APP_ID` is the id of the Algolia account that holds all of our search indexes. This is 'Application ID' in Algolia.  
`ALGOLIA_WRITE_KEY` allows write access and is used by the Algolia app to keep our search indexes updated. This is 'Write API Key'  in Algolia.  
`ALGOLIA_SEARCH_KEY` is a read-only key that is used by the Site app to perform searches from the front-end. This is 'Search API Key' in Algolia.

### `OPEN_TRIP_PLANNER_URL`

This variable is used to specify which Open Trip Planner URL to use. For our deployments this variable is configured to point to a designated internal load balancer instance on AWS. For local development, the `http://otp2-local.mbtace.com` can be used when logged into the MBTA VPN. Optionally, if not logged into the VPN, you could also set up OTP locally via the guidance at [mbta/otp-deploy](https://github.com/mbta/otp-deploy/tree/master?tab=readme-ov-file#setup).

### `REDIS_HOST` and `REDIS_PORT`

Should point to running Redis service that will contain the application cache.

### `STATIC_HOST`

To make your local server externally visible (useful for testing on a real phone, for example), set this to your IP address, which you can find from `ifconfig`, probably under `en0`.

### `WIREMOCK_PATH`

The path to your wiremock `.jar` file. Currently, this optional variable is only used by `npm` tasks, and not `mix`.

### `WIREMOCK_PROXY_URL`

This is the `V3_URL` value that is used by wiremock when recording API requests.

### `WIREMOCK_TRIP_PLAN_PROXY_URL`

This is the `OPEN_TRIP_PLANNER_URL` value that is used by wiremock when recording Open Trip Planner API requests.

### `SUPPORT_TICKET_TO_EMAIL`

An email address to send support tickets to.

### `SUPPORT_TICKET_REPLY_EMAIL`

An email address to show as the reply-to for support emails.

### `RECAPTCHA_PUBLIC_KEY` + `RECAPTCHA_PRIVATE_KEY`

Keys to use for the reCAPTCHA on the support form. The default values in the
`.envrc.template` are the designated "test keys" [as documented here][testkeys],
which means all reCAPTCHA challenges will succeed.

[testkeys]: https://developers.google.com/recaptcha/docs/faq#id-like-to-run-automated-tests-with-recaptcha.-what-should-i-do
