[![Build Status](https://semaphoreci.com/api/v1/mbta/dotcom/branches/master/badge.svg)](https://semaphoreci.com/mbta/dotcom)

# Dotcom

The new face of https://www.mbta.com/. 

## Supported browsers 

We strive to support all users – but the variety of browsers, operating systems and devices available necessitates a more intentioned approach. Generally speaking, Dotcom supports the stable latest releases of all major web browsers (Chrome, Safari, Firefox, Microsoft Edge, and Internet Explorer 11) and platforms (Windows, MacOS, iOS, Android). 
Other interfaces using the underlying engines of the aforementioned browsers – that's WebKit, Blink, Gecko – are not explicitly supported but are expected to function correctly.

From a development standpoint, polyfills and code transforms are implemented via [Babel](https://babeljs.io/docs/en/next/babel-preset-env.html#browserslist-integration) with the target browsers noted in [the site .browserslistrc](apps/site/assets/.browserslistrc).


- [Getting Started](#getting-started)
- [Running the Server](#running-the-server)
- [Environment Variables](docs/ENVIRONMENT.md)
    - [`V3_URL`](docs/ENVIRONMENT.md#v3_url)
    - [`V3_API_KEY`](docs/ENVIRONMENT.md#v3_api_key)
    - [`DRUPAL_ROOT`](docs/ENVIRONMENT.md#drupal_root)
    - [`GOOGLE_API_KEY`](docs/ENVIRONMENT.md#google_api_key)
    - [`ALGOLIA_APP_ID`, `ALGOLIA_SEARCH_KEY`, and `ALGOLIA_WRITE_KEY`](docs/ENVIRONMENT.md#algolia_app_id-algolia_search_key-and-algolia_write_key)
- [Additional documentation](#additional-documentation)

## Getting Started

1. Request a V3 API key at https://dev.api.mbtace.com/, and request an increased
rate limit for it (someone with access will need to approve this). Note that, at
any given time, the site may not be compatible with the very latest API version - as of Aug 2020 the site is using API version `2019-07-01`.

1. Install [Homebrew](https://docs.brew.sh/Installation.html):
    ```
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    ```

1. Install [asdf package version manager](https://github.com/asdf-vm/asdf)
   * Follow the instructions on https://github.com/asdf-vm/asdf
   * Install the necessary tools to set up asdf plugins:

     ```
     brew install coreutils automake autoconf openssl libyaml readline libxslt libtool unixodbc
     ```

   * Add asdf plugins

     ```
     asdf plugin-add erlang
     asdf plugin-add elixir
     asdf plugin-add nodejs
     asdf plugin-add python
     ```
     You can verify the plugins were installed with `asdf plugin-list`

   * Import the Node.js release team's OpenPGP keys to install 'nodejs' plugin:

     ```
     bash ~/.asdf/plugins/nodejs/bin/import-release-team-keyring
     ```

     If you run into problems, you might have to update the `import-release-team-keyring` script.

   * If running OSX 10.15 Catalina, run `export MACOSX_DEPLOYMENT_TARGET=10.14`.
     This works around a [known issue](https://github.com/asdf-vm/asdf-erlang/issues/116)
     with compiling versions of Erlang prior to 22.1.4.

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
     ```

     If you are missing any versions, you should re-run `asdf install`. Related [Github issue about asdf-erlang](https://github.com/asdf-vm/asdf-erlang/issues/57)

1. Install chromedriver (for Elixir acceptance tests using Wallaby)
    ```
    brew cask install chromedriver
    ```
   Note: `chromedriver` requires Chrome to be installed. If you don't already
   have it, `brew cask install google-chrome` is an easy way to install it.

1. Install our Elixir dependencies. From the root of this repo:
    ```
    mix deps.get
    ```

1. Install python dependencies
    ```
    pip install -r requirements.txt
    ```

1. Install npm globally
   ```
   npm install -g npm@6.7.0
   ```

1. Install our Node dependencies. From the root of this repo:
    ```
    npm run install
    ```

1. Setup serverside rendering for React:
    ```
    npm run react:setup && npm run react:build
    ```

1.  Build the assets:
    ```
    npm run webpack:build
    ```

1. Set up required environment variables:
    ```
    cp .envrc.template .envrc
    ```
   Then uncomment the `V3_API_KEY` line and fill it in with the key you obtained
   in the first step. If you have [direnv] installed, it will automatically load
   and unload the environment using this file. If not, `source .envrc` will load
   or update the variables in your shell session manually.

[direnv]: https://github.com/direnv/direnv

For details on environment configuration, including optional variables, see
[ENVIRONMENT.md](docs/ENVIRONMENT.md).

## Running the Server

Start the server with `mix phx.server`

Then, visit the site at http://localhost:4001/

## Algolia

[Algolia](https://www.algolia.com) powers our search features. Sometimes after content updates or GTFS releases we will find that the search results do not contain up-to-date results. When this happens you can re-index the Algolia data by running: `mix algolia.update`.

## Additional Documentation

See [docs](docs) for information about [testing](docs/TESTING.md) and other development details.

### Nested Applications

- [Feedback](apps/feedback/README.md)
- [TripPlan](apps/trip_plan/README.md)
