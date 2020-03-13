# Tests

* `mix test` — Elixir tests
* `npm run test:js` — JS tests
* `npm run backstop` — Backstop tests (see section below for details)

`npm test` runs all of these in succession.

### Dialyzer

* `mix dialyzer`

Dialyzer is a static analysis tool which looks at type information. We use it
verify our type specifications and make sure we're calling functions properly.

### Linting

* Elixir: `mix credo`
* SCSS: `npm run stylelint`
* TypeScript: `npm run tslint`

### Formatting

* Elixir: `mix format`
* JavaScript/TypeScript: `npm run format`

Frontend code is formatted by Prettier. If using the Prettier plugin for Visual
Studio Code, ensure it uses the ignore file `apps/site/assets/.prettierignore`.

## Backstop

We use [BackstopJS](https://github.com/garris/BackstopJS) to test for unexpected
visual changes. Backstop works by keeping a repository of reference images. When
you run a Backstop test, it takes snapshots of pages on your version of the site
and compares them to those reference images. If anything has changed, the test
will fail. This helps us catch unintended changes to the UI (for example a CSS
selector that is broader than expected). Whenever you make a change that affects
the UI, you will need to check and update the Backstop images if necessary.

The tests are run against a live application, built in production mode. To make
sure that the tests work consistently and do not depend on a specific schedule
or realtime vehicle locations, we use [WireMock](http://wiremock.org/) to record
and play back the V3 API responses.

Prerequisites for running the tests:

* Docker
  * `brew cask install docker`
  * Start Docker Desktop from the dock or Applications; this only has to be done
    once, after which it will auto-start on login by default
* Wiremock
  * `brew cask install java --no-quarantine`
    * This option is currently required on OS X 10.15+ due to Gatekeeper
      changes. Ref: https://github.com/Homebrew/homebrew-cask/issues/70798
  * `brew install wiremock-standalone`
* Ensure the [environment variable](ENVIRONMENT.md) `WIREMOCK_PATH` points to
  the Wiremock JAR file; with brew cask this will be something like
  `/usr/local/Cellar/wiremock-standalone/<VERSION>/libexec/wiremock-standalone-<VERSION>.jar`

Once all the above are in place:

* `npm run backstop` — run the tests
* `npm run backstop:record` — run tests with recording of new network requests
* `npm run backstop:approve` — mark the last set of failed diffs as approved

Note: If you are not running on OSX or Windows, you'll need to modify the
`STATIC_HOST=host.docker.internal` in the commands.

## Other helpful test scripts

* `semaphore/smoke_test.sh` - tries to hit all the URLs on your server.
  Requires wget (installable with `brew install wget`)

* `mix run apps/content/bin/validate_fixtures.exs` - compares the attributes in
  our fixture files to production Drupal API endpoints to see if any are
  missing. Note that rather than using this script, it is better to update these
  fixture attributes at the time you are making API changes.
