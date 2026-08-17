defmodule Dotcom.Cache.PersistentTermWarmer do
  @moduledoc """
  Functions to trigger at application startup to warm caches that are stored in
  :persistent_term.

  By starting these processes at application startup, we can ensure that the
  caches are warmed before any user-facing requests are handled. This is
  important for performance and to avoid cache misses on the first request.
  """

  def warm_homepage do
    # Locale-independent — called once
    DotcomWeb.LayoutView.hidden_icons()
  end
end
