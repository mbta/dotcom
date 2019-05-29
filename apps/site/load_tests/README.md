# Load Tests

This directory contains our load testing scripts which use [Locust](https://locust.io).

## Installing

Follow the [Locust instructions](https://docs.locust.io/en/stable/installation.html) for installing system dependencies (notably `libev` on the macOS).

Install required libraries:

    cd apps/site/load_tests/
    pip3 install -r requirements.txt

## Running

Run Locust from this directory like:

    cd apps/site/load_tests/
    locust --host=http://localhost:4001

Once you’ve started Locust, open up a browser and point it to [http://localhost:8089](http://localhost:8089)
