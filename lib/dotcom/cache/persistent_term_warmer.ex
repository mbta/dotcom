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
    DotcomWeb.LayoutView.footer_languages()

    # Per-locale — called once per locale (8 locales)
    # Handled inside a Task because the locale is set per-process,
    # thus does not change locale for user-facing requests.
    for %{code: code} <- Dotcom.Locales.locales() do
      Task.async(fn ->
        Dotcom.Locales.set_locale(code)

        # All of these should use the locale code in its cache key.
        DotcomWeb.LayoutView.top_tier_nav(code)
        DotcomWeb.LayoutView.desktop_menu(code)
        DotcomWeb.LayoutView.mobile_menu(code)
        DotcomWeb.LayoutView.contact_numbers(code)
        DotcomWeb.LayoutView.footer_links(code)
        DotcomWeb.LayoutView.footer_social_links(code)
        DotcomWeb.PageView.shortcut_icons(code)
      end)
    end
    |> Task.await_many()
  end
end
