# This file houses definitions for defining Mox mocks.

# External
Mox.defmock(HTTPoison.Mock, for: HTTPoison.Base)

# Internal
Mox.defmock(Dotcom.Redis.Mock, for: Dotcom.Redis.Behaviour)
Mox.defmock(Dotcom.Redix.Mock, for: Dotcom.Redix.Behaviour)
Mox.defmock(Dotcom.Redix.PubSub.Mock, for: Dotcom.Redix.PubSub.Behaviour)

Mox.defmock(MBTA.Api.Mock, for: MBTA.Api.Behaviour)
