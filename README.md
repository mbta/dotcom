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

1. Request a V3 API key at https://api-v3.mbta.com/. Note that, at any given time, the site may not be compatible with the
very latest API version. As of this writing, the site is compatible with API version 2019-04-05.

1. Install [Homebrew](https://docs.brew.sh/Installation.html):
    ```
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    ```

1. Install [asdf package version manager](https://github.com/asdf-vm/asdf)
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
     asdf plugin-add nodejs
     asdf plugin-add ruby
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

1. Install chromedriver (for Elixir acceptance tests using Wallaby)
    ```
    brew tap caskroom/cask
    brew cask install chromedriver
    ```

1. Install our Elixir dependencies. From the root of this repo:
    ```
    mix deps.get
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

## Additional documentation

See [docs](docs) for information about [testing](docs/TESTING.md) and other development details.
