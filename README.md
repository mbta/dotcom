![](https://github.com/mbta/dotcom/actions/workflows/tests.yml/badge.svg?branch=master)
![](https://github.com/mbta/dotcom/actions/workflows/deploy-prod.yml/badge.svg)
![](https://github.com/mbta/dotcom/actions/workflows/deploy-dev.yml/badge.svg)
![](https://github.com/mbta/dotcom/actions/workflows/deploy-dev-blue.yml/badge.svg)
![](https://github.com/mbta/dotcom/actions/workflows/deploy-dev-green.yml/badge.svg)
![](https://github.com/mbta/dotcom/actions/workflows/docker.yml/badge.svg)
![](https://github.com/mbta/dotcom/actions/workflows/crawler.yml/badge.svg)
![](https://github.com/mbta/dotcom/actions/workflows/report-coverage.yml/badge.svg)
![](https://github.com/mbta/dotcom/actions/workflows/shellcheck.yml/badge.svg)

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
- [Additional documentation](#additional-resources)

## Getting Started

Welcome to [Dotcom](https://www.notion.so/mbta-downtown-crossing/Dotcom-6aa7b0f0258446a197d35b1f05d90e96). There are more [details and background information in this Notion document](https://www.notion.so/mbta-downtown-crossing/Engineering-db62977f905347bab6fe94a2249a8a05), but read on to get started on your setup!

1. Request a V3 API key at https://api-dev.mbtace.com/. Note that, at
any given time, the site may not be compatible with the very latest API version - as of Jan 2021 the site is using API version `2019-07-01`. After receiving an API key, you may need to edit the version of your key to match the site's API version.

1. Install [Homebrew](https://docs.brew.sh/Installation.html):
    ```
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    ```

1. Install [asdf package version manager](https://github.com/asdf-vm/asdf)
   * Follow the instructions on https://github.com/asdf-vm/asdf
   * Install the necessary tools to set up asdf plugins:

     ```
     brew install coreutils automake autoconf openssl libyaml readline libxslt libtool unixodbc gpg
     ```

   * Add asdf plugins

     ```
     asdf plugin-add erlang
     asdf plugin-add elixir
     asdf plugin-add nodejs
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

   * If running OSX 11 Big Sur, you will need to modify the source directly.
     ([This comment captures the issue/solution](https://github.com/asdf-vm/asdf-erlang/issues/161#issuecomment-731558207)). As of Jan 2021, we use erlang 22.3.3, and the filenames below reflect this.

     First, run the install. Navigate to the erlang directory and unzip the source.

     ```
     asdf install
     cd ~/.asdf/plugins/erlang/kerl-home/archives
     tar zxvf OTP-22.3.3.tar.gz
     ```
     Modify ~/.asdf/plugins/erlang/kerl-home/archives/otp-OTP-23.1.4/make/configure.in line 415 to read:
     ```
     #if __ENVIRONMENT_MAC_OS_X_VERSION_MIN_REQUIRED__ > $int_macosx_version && false
     ```
     Re-tar the directory:
     ```
     rm OTP-22.3.3.tar.gz
     tar czvf OTP-22.3.3.tar.gz otp-OTP-22.3.3
     rm -rf otp-OTP-22.3.3
     ```
     Then re-run the erlang install:
     ```
     asdf install erlang 22.3.3
     ```
   
   * _Note on Erlang version:  while v24 resolves the compilation issue, we still need to use v22 as of Jan 2021._

   * Now, (if you haven't already in the OSX11 instructions above) run the install:

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
      ...
     ```

     If you are missing any versions, you should re-run `asdf install`. Related [Github issue about asdf-erlang](https://github.com/asdf-vm/asdf-erlang/issues/57)

     You may have to individually install each version
     ```
     asdf install plugin_name <version> (set by ~/dotcom/.tool-versions)
     ```

     If erlang is still missing you can run the following commands
     ```
      brew install openssl@1.1
      export KERL_CONFIGURE_OPTIONS="--without-javac --with-ssl=/usr/local/opt/openssl@1.1"
      brew install autoconf@2.69 && \
      brew link --overwrite autoconf@2.69 && \
      autoconf -V
     ```

1. Install chromedriver (for Elixir acceptance tests using Wallaby)
    ```
    brew install chromedriver
    ```
   Note: `chromedriver` requires Chrome to be installed. If you don't already
   have it, `brew install --cask google-chrome` is an easy way to install it.

1. Install our Elixir dependencies. From the root of this repo:
    ```
    mix deps.get
    ```


1. Install our Node dependencies. From the root of this repo:
    ```
    npm run install
    ```
    You won't see a `node_modules` folder at the root of this project -- this installs packages into `apps/site/assets`.

1.  Build the project:
    ```
    npm run build
    ```
    * If this fails try adding the following line to `defp deps` section in `mix.exs`:
    ```
    {:fs, git: "https://github.com/synrc/fs.git", override: true}
    ```

  `npm run build` does several things: builds the Phoenix application assets, builds all the front-end assets, and then compiles the entire Elixir application.

1. Set up required environment variables:
    ```
    cp .envrc.template .envrc
    ```
   Then uncomment the `V3_API_KEY` line and fill it in with the key you obtained
   in the first step. If you have [direnv] installed (recommended), it will automatically load
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

## Commiting Code

When commiting code a bunch of checks are run using [git pre-commit hook](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)

This is configured using the tool [husky](https://typicode.github.io/husky/#/) and should install as part of the regular `npm run install` process

This allows all code changed during a commit to be linted and formatted before being commited.

If you wish to modify the checks ran during the pre-commit process the [pre-commit](.husky/pre-commit) file can be modified with any command line commands/scripts

These checks can be skipped by using the `--no-verify` flag when runnint the `commit` git command

## Additional Resources

New to the team, or looking for further developer resources?
- [Repo docs](docs): info about [testing](docs/TESTING.md) and other development details.
- [Intro to the V3 API](https://github.com/mbta/wiki/blob/master/api/intro.md): a starter guide to the data model with links to relevant API resources.
- [Dotcom Engineering Guide](https://docs.google.com/document/d/1Vg-8-APtBk7JYuj0TgWvcrWjU5mEA9vCk58aaJgq02Q/edit): a more comprehensive look at the Dotcom ecosystem, the V3 API Data Model, and other project info.
- Documentation for some [features that have come and gone](docs/SeasonalFeatures.md).

### Nested Applications

- [Feedback](apps/feedback/README.md)
- [TripPlan](apps/trip_plan/README.md)
