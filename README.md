![](https://github.com/mbta/dotcom/actions/workflows/tests.yml/badge.svg?branch=main)
![](https://github.com/mbta/dotcom/actions/workflows/docker.yml/badge.svg)
![](https://github.com/mbta/dotcom/actions/workflows/crawler.yml/badge.svg)

# Dotcom

The new face of https://www.mbta.com/. 

## Supported browsers 

We strive to support all users – but the variety of browsers, operating systems and devices available necessitates a more intentioned approach. Generally speaking, Dotcom supports the stable latest releases of all major web browsers (Chrome, Safari, Firefox, Microsoft Edge) and platforms (Windows, MacOS, iOS, Android). 
Other interfaces using the underlying engines of the aforementioned browsers – that's WebKit, Blink, Gecko – are not explicitly supported but are expected to function correctly.

From a development standpoint, polyfills and code transforms are implemented via [Babel](https://babeljs.io/docs/en/next/babel-preset-env.html#browserslist-integration) with the target browsers noted in [the site .browserslistrc](assets/.browserslistrc).


- [Getting Started](#getting-started)
- [Running the Server](#running-the-server)
- [Environment Variables](docs/ENVIRONMENT.md)
    - [`ALGOLIA_APP_ID`, `ALGOLIA_SEARCH_KEY`, and `ALGOLIA_WRITE_KEY`](docs/ENVIRONMENT.md#algolia_app_id-algolia_search_key-and-algolia_write_key)
    - [`CMS_API_BASE_URL`](docs/ENVIRONMENT.md#cms_api_base_url)
    - [`MBTA_API_BASE_URL`](docs/ENVIRONMENT.md#mbta_api_base_url)
    - [`MBTA_API_KEY`](docs/ENVIRONMENT.md#mbta_api_key)
- [Additional documentation](#additional-resources)

## Getting Started

Welcome to [Dotcom](https://www.notion.so/mbta-downtown-crossing/Dotcom-6aa7b0f0258446a197d35b1f05d90e96). There are more [details and background information in this Notion document](https://www.notion.so/mbta-downtown-crossing/Engineering-db62977f905347bab6fe94a2249a8a05), but read on to get started on your setup!

1. Request a V3 API key at https://api-dev.mbtace.com/. After getting an API key, it's customary to click "request increase" for your key's 'Per-Minute Limit'.

1. Install [Homebrew](https://docs.brew.sh/Installation.html):
    ```
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    ```

1. Install [asdf package version manager](https://github.com/asdf-vm/asdf)
   * Follow the instructions on https://github.com/asdf-vm/asdf
     
     ```shell
     brew install asdf
     ```
   * Install the necessary tools to set up asdf plugins:

     ```shell
     brew install gpg gawk # for nodejs plugin
     brew install autoconf openssl@1.1 # for erlang plugin
     brew install wxwidgets # optional for erlang for building with wxWidgets (start observer or debugger!)
     brew install libxslt fop # optional for erlang for building documentation and elixir reference builds
     ```

   * Add asdf plugins

     ```
     asdf plugin add erlang
     asdf plugin add elixir
     asdf plugin add nodejs
     ```
     You can verify the plugins were installed with `asdf plugin list`.

     While Erlang, Elixir, and NodeJS are essential for any development on Dotcom.

     You're welcome to add more plugins for personal use! But these are the ones set up in `.tool-versions` and invoked in the next step:

   * Now run the install:

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

     If you are missing any versions, you should re-run `asdf install`.

     You may have to individually install each version
     ```
     asdf install plugin_name <version> (set by ~/dotcom/.tool-versions)
     ```

1. Install our Elixir dependencies. From the root of this repo:
    ```
    mix deps.get
    ```


1. Install our Node dependencies. From the root of this repo:
    ```
    npm run install
    ```
    You won't see a `node_modules` folder at the root of this project -- this installs packages into `assets`.

    Minor note - you may see a prompt to upgrade `npm`. This isn't needed, and `"lockfileVersion": 1` in our `assets/package-lock.json` file means it was generated with an `npm` version prior to 7.


1. Set up required environment variables:
    ```
    cp .env.template .env
    ```
   Then uncomment the `MBTA_API_KEY` line and fill it in with the key you obtained
   in the first step. If you have [direnv] installed (recommended), it will automatically load
   and unload the environment using this file. If not, `source .envrc` will load
   or update the variables in your shell session manually.

[direnv]: https://github.com/direnv/direnv

For details on environment configuration, including optional variables, see
[ENVIRONMENT.md](docs/ENVIRONMENT.md).

## Running the Server

To run the server, you'll need to have a Redis instance running. You can either install it manually, or run it via Docker:

``` shell
docker run --rm -p 6379:6379 redis:7.2.4
```

Then, start the server with `iex -S mix phx.server`

Then, visit the site at http://localhost:4001.

## How to support translations

### Internationalizing strings in the application

User-facing interfaces in Dotcom are internationalized, supporting 6 key languages.

This is done via [the `Gettext` Elixir library](https://hex.pm/packages/gettext), which uses
[the GNU `gettext` tool](https://www.gnu.org/software/gettext) under the hood,
[managing `.po` files for message strings](https://www.gnu.org/software/gettext/manual/html_node/PO-Files.html).

To internationalize a string in an interface, do the following:

- Wrap strings to be translated in the `gettext` function, i.e. `gettext("your string here")`.
  Note that you may need to wrap the function call in `{...}` for attribute strings.

#### Rules Of Gettext

1. No newlines inside a gettext call. Newlines are a new gettext call.
2. Don't start or end with whitespace. If you break a sentence up, leave the whitespace in the HTML untranslated.
3. If you break apart a sentence across multiple gettext calls, use `pgettext` and add context including the full sentence to help translators. Grep the app for `pgettext` for examples.

Note that new strings will default to English language until translations are provided for them.

### Preparing for Translations

We use Smartling as our department approved vendor to complete translations - this is done through GitHub integrations.

Smartling GitHub integration tracks main to see if changes are made to the translation files in PRs developers open. If this does happen, Smartling opens up seperate PRs to introduce the translated content for all of our supported languages to merge into the PR developers open.

Here is the workflow for making updates to copy in Dotcom and completing translations:
  1. Make your changes in a branch (note that content branches should NOT begin with "smartling.") Localize the content in Dotcom using `gettext` as described in the above section.
  2. Run `mix localize` to update the `gettext` translation files. 
     * If this isn't run - we have a CI check to fail the build if the translation files are out of date, so there will be no 
      way to merge in changes without updated translations.
  3. Put up the changes in your branch to a PR. You will notice a `Not ready for translation` label automatically gets applied to your PR. **When your PR is reviewed and approved (but before it is merged), remove the label.**
  3. After some time, a Smartling machine translation PR will be opened, merging the translated content into your PR.
  4. Review the Smartling PR, approve, and merge it into your PR. The translated content will now be available in your PR.
  5. Get your updated feature PR merged into main.

### How to review Smartling PRs
What's good to check for in review:
* Making sure nothing is glaringly wrong or off
  * Do the files have translations (as opposed to empty strings etc.)?
  * Glance over the file and make sure its structure looks reasonable
* Ensuring nothing is broken feature-wise/UX-wise

What you _don't_ need to worry about:
* Reviewing the translations themselves for correctness

## Algolia

[Algolia](https://www.algolia.com) powers our search features. Sometimes after content updates or GTFS releases we will find that the search results do not contain up-to-date results. When this happens you can re-index the Algolia data by running: `mix algolia.update`.

## Integration Tests

```
npm install --ignore-scripts
npx playwright test all-scenarios
```

You can run a single test (and optionally use `--debug` or `--ui`):

```
npx playwright test all-scenarios --grep @search_for_a_subway_line
```

## Load Tests

### Full load test

```
npm install --ignore-scripts
npx artillery run ./integration/load_tests/all-scenarios.yml --target http://localhost:4001
```

### Light load test / performance test

```
npm install --ignore-scripts
npx artillery run ./integration/load_tests/homepage-light-load.yml
```

This is unlikely to stress your locally-running instance, but it will present output that includes something like

```
http.response_time.2xx:
  min: ......................................................................... 287
  max: ......................................................................... 558
  mean: ........................................................................ 416.7
  median: ...................................................................... 424.2
  p95: ......................................................................... 507.8
  p99: ......................................................................... 539.2
```

This can be useful for comparing homepage load times across different commits or releases.


## Monitoring

```
npm install --ignore-scripts
npx pm2-runtime ./integration/monitor/ecosystem.config.js
```

## Flame On

When running locally, navigate to the [Flame On pane in the dashboard](http://localhost:4001/dashboard/flame_on), click `Flame On`, and then do whatever action you're trying to profile (load a page, perform an action, invoke a function). This will generate a flamegraph that you examine to profile specific functions or page loads. See the [`flame_on` docs](https://github.com/DockYard/flame_on) for more information.

## Additional Resources

New to the team, or looking for further developer resources?
- [Repo docs](docs): info about [testing](docs/TESTING.md) and other development details.
- [Intro to the V3 API](https://github.com/mbta/wiki/blob/master/api/intro.md): a starter guide to the data model with links to relevant API resources.
- [Dotcom Engineering Guide](https://docs.google.com/document/d/1Vg-8-APtBk7JYuj0TgWvcrWjU5mEA9vCk58aaJgq02Q/edit): a more comprehensive look at the Dotcom ecosystem, the V3 API Data Model, and other project info.
- Documentation for some [features that have come and gone](docs/SeasonalFeatures.md).
