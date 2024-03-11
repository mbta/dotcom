# This file houses definitions for defining Mox mocks.

Mox.defmock(Redis.Mock, for: Dotcom.Redis.Behaviour)
Mox.defmock(Redix.Mock, for: Dotcom.Redix.Behaviour)
Mox.defmock(Redix.PubSub.Mock, for: Dotcom.Redix.PubSub.Behaviour)
