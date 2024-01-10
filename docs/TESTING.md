# Tests

Common test suites developers might want to run:

* `mix test` — Elixir tests
* `npm run --prefix assets mocha && npm run --prefix assets jest` — all of the JavaScript tests


Dotcom runs its test suite automatically using Github Actions, mainly from the [`tests.yml`](../.github/workflows/tests.yml) workflow.

Each test can be run locally by invoking the corresponding NPM script. All the tests are noted below.

## Enabled in Github Actions

### Linting / TypeScript
```sh
 npm run ci:lint:ts
 # This actually runs the following:
 # cd assets/ts
 # npx eslint -c .eslintrc.js --ext .ts,.tsx --max-warnings=0 .
 ```
*Runs only if a file with the `.ts` or `.tsx` extension was changed.*

### Linting / JavaScript
```sh
 npm run ci:lint:js
 # cd assets
 # git diff --name-only --diff-filter=dx origin/master... | grep js/.*\\.js | xargs npx eslint -c .eslintrc.js
 ```
*Runs only if a file with the `.js` extension was changed.*

### Linting / CSS
```sh
 npm run ci:lint:scss
 # cd assets
 # npx stylelint css/**/*.scss --ignore-path .stylelintignore
 ```
*Runs only if a file with the `.scss` extension was changed.*

### Linting / Elixir
```sh
npm run ci:lint:ex
# mix credo diff master -a
```
*Runs only if a file with the `.ex` or `.exs` extension was changed.*

### Unit tests / Elixir
```sh
npm run ci:unit:exunit
# mix test --exclude wallaby --cover
```
*Runs only if a file with the `.ex`, `.exs` or `.eex` extension was changed.*

The CI task should also report test coverage on the PR.

### Unit tests / JavaScript / Mocha
```sh
npm run ci:unit:mocha
# cd assets
# npx mocha --require @babel/register --require ts-node/register js/test/**/*.js
```
*Runs only if a file with the `.js` extension was changed.*

### Unit tests / JavaScript & TypeScript / Jest
```sh
npm run ci:unit:jest
# cd assets
# npx jest -c ts/jest.config.js
```
*Runs only if a file with the `.js` or `.ts`/`.tsx` extension was changed.*

### Type checks / Elixir
```sh
npm run ci:types:ex
# mix dialyzer --halt-exit-status
```
*Runs only if a file with the `.ex`, `.exs` or `.eex` extension was changed.*

In CI this runs Dialyzer via the `mbta/actions/dialyzer@v1` action. Dialyzer is a static analysis tool which looks at type information. We use it to verify our type specifications and make sure we're calling functions properly.

### Type checks / TypeScript
```sh
npm run ci:types:ts
# cd assets/ts
# npx tsc --noEmit --skipLibCheck
```
*Runs only if a file with the `.ts` or `.tsx` extension was changed.*

### Formatting / Elixir
```sh
npm run ci:format:ex
# mix format --check-formatted
```
*Runs only if a file with the `.ex`, `.exs`, or `.eex` extension was changed.*

### Formatting / JavaScript & TypeScript
```sh
npm run ci:format:ts
# cd assets
# npx prettier --write "{js,ts}/**/*.{js,ts,tsx}" --list-different
```
*Runs only if a file with the `.js` or `.ts`/`.tsx` extension was changed.*

Frontend code is formatted by Prettier. If using the Prettier plugin for Visual Studio Code, ensure it uses the ignore file `assets/.prettierignore`.

## Coming soon

The following tests need additional fixes or implementation. These might be implemented in the `tests.yml` workflow or added to new workflows.

### Visual regression tests
There is a WIP adding screenshot capturing and visual regression testing using the Percy service. This would replace the use of Backstop (which is at the moment not enabled).

### Performance measurement
There is an early WIP using the Lighthouse CI service for measuring performance metrics. Eventually this will run on a Github Action too.

## CrossBrowserTesting

We use this service to test site changes in Internet Explorer 11 without needing
a local Windows computer or VM.

* [Run a test here!](https://app.crossbrowsertesting.com/livetests/run)
* Sign in using the shared credentials in **Shared-Website-Dev** in LastPass

Only one person can be running a test using this account at a time; be sure to
**Stop** your session once you're done with it.

### Testing local changes

If your changes aren't deployed anywhere, you can use the `cbt_tunnels` tool to
enable CrossBrowserTesting to connect to your local machine.

The easiest way to install this is as a global NPM package:

    npm install -g cbt_tunnels

Then go to https://app.crossbrowsertesting.com/account, copy the **Authkey**,
and start the tunnel using this command:

    cbt_tunnels --username web-tools@mbtace.com --authkey <AUTHKEY>

If the tunnel is working, the "Local Connection" indicator should flip **ON**.
You can now start a test using `local` as the domain, and the connection will be
tunneled to `localhost` on your machine. For example: `http://local:4001/`

## Other helpful test scripts

* [`mbta/link_checker`](https://github.com/mbta/link_checker) - tries to hit all
  the URLs on your server to find invalid links. This automatically runs as part
  of the [`crawler.yml`](../.github/workflows/crawler.yml) workflow.

* `mix run bin/validate_fixtures.exs` - compares the attributes in
  our fixture files to production Drupal API endpoints to see if any are
  missing. Note that rather than using this script, it is better to update these
  fixture attributes at the time you are making API changes.
