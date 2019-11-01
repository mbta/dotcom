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

The URL of the MBTA V3 API server, e.g. `https://dev.api.mbtace.com`.

### `V3_API_KEY`

The key to use with the MBTA API (see `README`). This is a practical requirement
for development since requests without an API key have a very low rate limit.


## Optional

### `DRUPAL_ROOT`

The URL for our CMS. You'll need to set this to view any of the static content
on the site.

### `GOOGLE_API_KEY`

This will ensure any part of the site that uses Google's API will not get rate
limited. See below for how to get a Google API Key.

1. Obtain a Google API key:
    * Go to [Google's API documentation](https://developers.google.com/maps/documentation/javascript/get-api-key)
    * Click on "GET STARTED", create a personal project (e.g. "mbtadotcom").
        * You have to enter personal billing information for your API key but Google gives you $200 of free credit per month. You can set up budget alerts to email you if you are approaching your free credit limit or set up daily quotas for each API. However, our costs accumulate very slowly in local development so it's not likely that you will approach this limit.
    * Go to [the Google developer credentials page](https://console.developers.google.com/apis/credentials)
    * Use the "Select Project" button at the top of the page to choose your project and then hit "Create Credentials" -> "API Key"
2. Enable specific APIs:
    * Go to the API library for your project (e.g. https://console.developers.google.com/apis/library?project=mbtadotcom)
    * Using the search box at the top of the page, find "Google Maps Geolocation API"
    * Click "Enable"
    * Repeat for
        * "Places API"
        * "Maps Javascript API"
        * "Maps Static API"

### `ALGOLIA_APP_ID`, `ALGOLIA_SEARCH_KEY`, and `ALGOLIA_ADMIN_KEY`

These keys are used to interact with the Algolia search api. The values can be found under the `Api Keys` section in Algolia (you'll need to be added as a team member to get access).

`ALGOLIA_APP_ID` is the id of the Algolia account that holds all of our search indexes
`ALGOLIA_ADMIN_KEY` allows write access and is used by the Algolia app to keep our search indexes updated
`ALGOLIA_SEARCH_KEY` is a read-only key that is used by the Site app to perform searches from the front-end

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
