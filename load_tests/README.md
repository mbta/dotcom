# Load Tests

This directory contains our load testing scripts which use [Locust](https://locust.io).

Load testing can be a helpful way to verify that a server will stay responsive under heavy use.

## Installing

Follow the [Locust instructions](https://docs.locust.io/en/2.1.0/installation.html) for installing system dependencies (notably `libev` on the macOS).

Install required libraries:

    cd load_tests/
    pip3 install -r requirements.txt

If using `asdf`, you may have to run `asdf reshim python 3.8.5 locust` before using Locust in your shell.
## Running

Run Locust from this directory like:

    cd load_tests/
    locust --host=http://localhost:4001

(This assumes you have Dotcom up and running on http://localhost:4001.)

Once you’ve started Locust, open up a browser and point it to [http://localhost:8089](http://localhost:8089)

## Choosing values

The Locust UI requires defining the number of concurrent users to simulate, as well as the spawn rate (number of new users added per second).  Real-life conditions include scaling and load balancing, which your local server doesn't do.

Useful values can vary depending on:

- your machine's specs
- the wait times defined in [locustfile.py tests](locustfile.py) (as it affects the resulting requests per second)

If evaluating code changes, the goal should be to compare performance between the changed code and the baseline. Therefore, if the baseline case (say, on current `master` branch) produces minimal failures on 100 concurrent users with a spawn rate of 10 users/sec, those same values should produce minimal failures when running against the changed code.
