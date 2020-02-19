## Tests

* `mix test` — Elixir tests
* `npm run test:js` — JS tests
* `npm run backstop` — Backstop tests (see section below for details)

`npm test` runs all of these in succession.

### Dialyzer

Dialyzer is a static analysis tool which looks at type information. We use it
verify our type specifcations and make sure we're calling functions properly.

* `mix dialyzer` — Runs the actual type checks.

### Linting

* Elixir: `mix credo`
* SCSS: `npm run stylelint`
* TypeScript: `npm run tslint`

### Javascript and Typescript formatting

Our javascript is linted by eslint and formatted by prettier. At this time, only prettier formatting is enforced in CI for javascript. For Typescript, both eslint and prettier are enforced in CI. You can auto-format your javascript and Typescript via `npm run format`, or set it up to autoformat on save in your editor of choice.

If you are using the Prettier plugin for Visual Studio Code, you will want to configure it to use the ignore file  in `apps/site/assets/.prettierignore`.

### Backstop Tests

We use [BackstopJS](https://github.com/garris/BackstopJS) to test for
unexpected visual changes. Backstop works by keeping a repository of
reference images. When you run a backstop test it takes snapshots of the
pages on your localhost and compares them to those references images.
If anything has changed then the test will fail. This helps us catch unintended
changes to the UI (for example a CSS selector that is broader than
expected). Whenever you make a change that affects the UI, you will need to check
and if necessary update the backstop images.

The tests are run against a live application, built in production mode. To make sure that the tests
work consistently and do not depend on a specific schedule or realtime vehicle locations, we use
[WireMock](http://wiremock.org/) to record and playback the V3 API responses.

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

Once all the above are in place: `npm run backstop`

Note: If you are not running on OSX or Windows, you'll need to modify the
`STATIC_HOST=host.docker.internal` in the commands.

### Other helpful test scripts

All run from the main folder:

* `npm run backstop:record` - run Backstop tests with recording of new network requests enabled
* `npm run backstop:approve` - mark failed Backstop diffs as new reference images
* `npm run webpack:watch` — run webpack-dev-server for local development
* `npm run webpack:build` — builds the static files for production
* `semaphore/smoke_test.sh` - tries to hit all the URLs on your server.
  Requires wget (installable with `brew install wget`)
* `mix run apps/content/bin/validate_fixtures.exs` - compares the attributes in our fixture files to production Drupal API endpoints to see if any are missing. Note that rather than using this script, it is better to update these fixture attributes at the time you are making API changes.
