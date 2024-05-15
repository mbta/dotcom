# This file houses definitions for defining Mox mocks.

# External
Mox.defmock(HTTPoison.Mock, for: HTTPoison.Base)
Mox.defmock(Req.Mock, for: Req.Behaviour)

# Internal
Mox.defmock(Dotcom.Redis.Mock, for: Dotcom.Redis.Behaviour)
Mox.defmock(Dotcom.Redix.Mock, for: Dotcom.Redix.Behaviour)
Mox.defmock(Dotcom.Redix.PubSub.Mock, for: Dotcom.Redix.PubSub.Behaviour)

Mox.defmock(CMS.Api.Mock, for: CMS.Api.Behaviour)
Mox.defmock(MBTA.Api.Mock, for: MBTA.Api.Behaviour)
Mox.defmock(OpenTripPlannerClient.Mock, for: OpenTripPlannerClient.Behaviour)

# Repos
Mox.defmock(Predictions.Repo.Mock, for: Predictions.Repo.Behaviour)
Mox.defmock(RoutePatterns.Repo.Mock, for: RoutePatterns.Repo.Behaviour)
