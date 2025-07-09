defmodule DotcomWeb.Gettext do
  @moduledoc """
  A module providing Internationalization with a gettext-based API.

  By using [Gettext](http://hexdocs.pm/gettext),
  your module gains a set of macros for translations, for example:

      use Gettext, backend: DotcomWeb.Gettext

      # Simple translation
      gettext "Here is the string to translate"

      # Plural translation
      ngettext "Here is the string to translate",
               "Here are the strings to translate",
               3

      # Domain-based translation
      dgettext "errors", "Here is the error message to translate"

  See the [Gettext Docs](http://hexdocs.pm/gettext) for detailed usage.
  """

  @dialyzer [
    {:nowarn_function, lngettext: 6}
  ]

  use Gettext.Backend,
    otp_app: :dotcom,
    default_locale: Dotcom.Locales.default_locale_code(),
    locales: Dotcom.Locales.locale_codes()
end
