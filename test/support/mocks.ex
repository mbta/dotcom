# This file houses definitions for defining Mox mocks.

# External
Mox.defmock(HTTPoison.Mock, for: HTTPoison.Base)
Mox.defmock(Req.Mock, for: Req.Behaviour)

# Internal
Mox.defmock(Dotcom.Redis.Mock, for: Dotcom.Redis.Behaviour)
Mox.defmock(Dotcom.Redix.Mock, for: Dotcom.Redix.Behaviour)
Mox.defmock(Dotcom.Redix.PubSub.Mock, for: Dotcom.Redix.PubSub.Behaviour)

Mox.defmock(MBTA.Api.Mock, for: MBTA.Api.Behaviour)
Mox.defmock(OpenTripPlannerClient.Mock, for: OpenTripPlannerClient.Behaviour)
