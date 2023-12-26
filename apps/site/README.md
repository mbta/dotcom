# TripPlan

The TripPlan application provides trip plans for users of the site looking to explore potential routes from one place to another.

## API

This application relies on an API to a source of trip plan data. The API is defined as an abstract behavior so that we can can have different implementations. Currently we have `MockPlanner` which is used for tests, and `OpenTripPlanner` which calls out to an external resource that provides live data.

### OpenTripPlanner

We run our [own instance](https://github.com/mbta/OpenTripPlanner) of the [OpenTripPlanner (OTP)](https://www.opentripplanner.org) open source project. OTP returns [structured resources](http://dev.opentripplanner.org/apidoc/1.0.0/index.html) encoded as JSON.

## Data Structures

A TripPlan [(OTP data type)](http://dev.opentripplanner.org/apidoc/1.0.0/json_TripPlan.html) consists of a list of Itineraries [(OTP data type)](http://dev.opentripplanner.org/apidoc/1.0.0/json_Itinerary.html) [(Elixir module)](lib/trip_plan/itinerary.ex), or possible routes you might take.

An Itinerary contains a sequenced list of Legs [(OTP data type)](http://dev.opentripplanner.org/apidoc/1.0.0/json_Leg.html) [(Elixir module)](lib/trip_plan/leg.ex). Each leg is a portion of the journey on one mode. This could be "Take the Green Line to North Station," or, "Walk to the bus stop at the corner of Porter St. and Garfield Rd."

In addition to the data we get from the API, we also add fare data to each transit leg (base, recommended and reduced). This allows us to display the cost of each leg and an estimation of the total price of the itinerary.

# Feedback

The Feedback app supports customer support submissions. We receive a user's feedback through our customer support form and submit it as a structured XML email to the Customer Experience team's Iris Heat software.

## Development Logging

In development, the application is configured to print the contents of the email to the log instead of sending an actual email. This is logged at the `info` log level, but the default log level is set to `warn`. Add `LOGGER_LEVEL=info` to your `.env` file to see the feedback emails in your logs.
