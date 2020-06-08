# TripPlan

The TripPlan application provides trip plans for users of the site looking to explore potential routes from one place to another.

## API

This application relies on an API to a source of trip plan data. The API is defined as an abstract behavior so that we can can have different implementations. Currently we have `MockPlanner` which is used for tests, and `OpenTripPlanner` which calls out to an external resource that provides live data.

### OpenTripPlanner

We run our [own instance](https://github.com/mbta/OpenTripPlanner) of the [OpenTripPlanner (OTP)](https://www.opentripplanner.org) open source project. OTP returns [structured resources](http://dev.opentripplanner.org/apidoc/1.0.0/index.html) encoded as JSON.

## Data Structures

A [TripPlan](http://dev.opentripplanner.org/apidoc/1.0.0/json_TripPlan.html) consists of a list of [Itineraries](http://dev.opentripplanner.org/apidoc/1.0.0/json_Itinerary.html), or possible routes you might take.

An Itinerary contains a sequenced list of [Legs](http://dev.opentripplanner.org/apidoc/1.0.0/json_Leg.html). Each leg is a portion of the journey on one mode. This could be "Take the Green Line to North Station," or, "Walk to the bus stop at the corner of Porter St. and Garfield Rd."
