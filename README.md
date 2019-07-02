[![Build Status](https://semaphoreci.com/api/v1/mbta/dotcom/branches/master/badge.svg)](https://semaphoreci.com/mbta/dotcom)
# Dotcom

The new face of https://www.mbta.com/
  - [Getting Started](#getting-started)
  - [Running the Server](#running-the-server)
  - [Environment Variables](#environment-variables)
    - [`V3_API_KEY`](#v3apikey)
    - [`V3_URL`](#v3url)
    - [`GOOGLE_API_KEY`](#googleapikey)
    - [`DRUPAL_ROOT`](#drupalroot)
    - [`ALGOLIA_APP_ID`, `ALGOLIA_SEARCH_KEY`, and `ALGOLIA_ADMIN_KEY`](#algoliaappid-algoliasearchkey-and-algoliaadminkey)
    - [Making the variables available to the app](#making-the-variables-available-to-the-app)
  - [Additional documentation](#additional-documentation)
## Getting Started

1. Request a V3 API key at https://api-v3.mbta.com/

2. Install [Homebrew](https://docs.brew.sh/Installation.html):
    ```
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    ```

3. Install [asdf package version manager](https://github.com/asdf-vm/asdf)
   * Follow the instructions on https://github.com/asdf-vm/asdf
   * Install the necessary tools to set up asdf plugins:

     ```
     brew install coreutils automake autoconf openssl libyaml readline libxslt libtool unixodbc
     brew cask install java
     ```

   * Add asdf plugins

     ```
     asdf plugin-add erlang
     asdf plugin-add elixir
     asdf plugin-add ruby
     asdf plugin-add nodejs
     ```
     
     You can verify the plugins were installed with `asdf plugin-list`

   * Import the Node.js release team's OpenPGP keys to install 'nodejs' plugin:

     ```
     bash ~/.asdf/plugins/nodejs/bin/import-release-team-keyring
     ```

     If you run into problems, you might have to update the `import-release-team-keyring` script.

   * Run the install:

     ```
     asdf install
     ```

   * Verify that all the languages for our setup were installed:

     ```
     asdf current
     ```

     You should see the following output with versions specified from `.tool-versions`:

     ```
      elixir         <version> (set by ~/dotcom/.tool-versions)
      erlang         <version> (set by ~/dotcom/.tool-versions)
      nodejs         <version> (set by ~/dotcom/.tool-versions)
      ruby           <version> (set by ~/dotcom/.tool-versions)
     ```
     
     If you are missing any versions, you should re-run `asdf install`. Related [Github issue about asdf-erlang](https://github.com/asdf-vm/asdf-erlang/issues/57)

4. Install Sass:
    ```
    gem install sass
    ```

5. Install chromedriver (for Elixir acceptance tests using Wallaby)
    ```
    brew tap caskroom/cask
    brew cask install chromedriver
    ```

6. Install our Elixir dependencies. From the root of this repo:
    ```
    mix deps.get
    ```

7. Install npm globally
   ```
   npm install -g npm@6.7.0
   ```

8. Install our Node dependencies. From the root of this repo:
    ```
    npm run install
    ```

9. Setup serverside rendering for React:
    ```
    npm run react:setup && npm run react:build
    ```

10. Build the assets:
    ```
    npm run webpack:build
    ```

11. Set up the following environment variables (see [Environment Variables](#environment-variables) section)

    Required:
    * `V3_API_KEY`
    * `V3_URL`

    Suggested, for Google Maps, CMS content, and Algolia search:
    * `GOOGLE_API_KEY`
    * `DRUPAL_ROOT`
    * `ALGOLIA_APP_ID`
    * `ALGOLIA_ADMIN_KEY`
    * `ALGOLIA_SEARCH_KEY`

## Running the Server

Start the server with `mix phx.server`

Then, visit the site at http://localhost:4001/

## Environment Variables

The following variables should be set in your development environment. For additional variables, such as for OpenTripPlanner or Wiremock, see the [additional documentation](docs/ENVIRONMENT.md).

### `V3_API_KEY`

You need to obtain an API key to run the website.

### `V3_URL`

This variable is used to specify which MBTA V3 API server to use.

### `GOOGLE_API_KEY`

This will ensure any part of the site that uses Google's API will not get rate limited. See below for how to get a Google API Key.

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

### `DRUPAL_ROOT`

This is the url for the CMS. You'll need to set this to view any of the static content on the site.

### `ALGOLIA_APP_ID`, `ALGOLIA_SEARCH_KEY`, and `ALGOLIA_ADMIN_KEY`

These keys are used to interact with the Algolia search api. The values can be found under the `Api Keys` section in Algolia (you'll need to be added as a team member to get access).

`ALGOLIA_APP_ID` is the id of the Algolia account that holds all of our search indexes
`ALGOLIA_ADMIN_KEY` allows write access and is used by the Algolia app to keep our search indexes updated
`ALGOLIA_SEARCH_KEY` is a read-only key that is used by the Site app to perform searches from the front-end

### Making the variables available to the app

There are different ways to make sure these variables are in the environment when the application runs:

* Run the server with `env VARIABLE1=value2 VARIABLE2=value2 mix phx.server`. You may want to store them in a file (one per line) and run ```env `cat file_where_you_stored_the_variables` mix phx.server``` instead.
* Put the line `export VARIABLE=value` somewhere in your `.bash_profile`. Then run the application as normal with `mix phx.server`. Note that this environment variable will be available to anything you run in the terminal now, and if you host your config files publicly on github then you should be careful to not let your API key be publicly visible.

## Additional documentation
See [docs](docs) for information about [testing](docs/TESTING.md) and other development details.
