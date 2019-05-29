## Tests

Run `mix phx.server` to start a server in one window, then open a
separate window and run `npm test` from the main folder. This will execute
the following scripts in succession:

* `mix test` — Phoenix tests
* `npm run test:js` — JS tests
* `npm run backstop` — Backstop tests (see section below for details)

Note that all tests will run even if one of them fails, and there is no final
summary at the end, so pay attention to the output while they're running to
make sure everything passes.

### Dialyzer

Dialyzer is a static analysis tool which looks at type information. We use it
verify our type specifcations and make sure we're calling functions properly.

* `mix dialyzer` — Runs the actual type checks.

Currently, there are some spurious "The variable _ can never match ..."
errors that can be ignored.
`npm run dialyzer` will filter out these errors, though there are still a few
which show up.

### Pronto

Pronto is a lint runner for various languages.

Installing Pronto on Max OS can be challenging because some of its dependencies are missing or outdated.

Follow these instructions to install:

```
brew install cmake
brew install pkg-config
gem install pronto
gem install pronto-scss
gem install pronto-credo
```

Run it by calling `pronto run` in the `mbta/dotcom` directory. If there is no output, that means it passed.

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

To run the tests, do the following:

* Make sure docker is [installed](https://docs.docker.com/docker-for-mac/install/) and running: we run the tests in docker to ensure we get consistent images across platforms.
* Run `npm run backstop` which starts up wiremock, a mocked phoenix server, and when those are up, kicks off backstop testing in docker

Note: If you are not running on OSX or Windows, you'll need to modify the `STATIC_HOST=host.docker.internal` in the commands.

### Other helpful test scripts

All run from the main folder:

* `mix backstop.update` - takes any failed backstop diffs and marks them as new reference images
* `npm run backstop:reference` — create new backstop reference images
* `npm run webpack:watch` — run webpack-dev-server for local development
* `npm run webpack:build` — builds the static files for production
* `semaphore/smoke_test.sh` - tries to hit all the URLs on your server.
  Requires wget (installable with `brew install wget`)
* `mix run apps/content/bin/validate_fixtures.exs` - compares the attributes in our fixture files to production Drupal API endpoints to see if any are missing. Note that rather than using this script, it is better to update these fixture attributes at the time you are making API changes.
