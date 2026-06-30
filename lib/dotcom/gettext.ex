defmodule Dotcom.Gettext do
  @moduledoc """
  Implement [Gettext](https://hexdocs.pm/gettext/Gettext.html).
  """

  use Gettext.Backend,
    default_domain: "dotcom",
    # default_locale: Application.compile_env!(:dotcom, :default_locale_code),
    default_locale: :en,
    # locales: Application.compile_env!(:dotcom, :locale_codes),
    locales: Dotcom.Locales.locale_codes(),
    otp_app: :dotcom,
    plural_forms: Dotcom.Gettext.Plural,
    priv: "priv/gettext"
end

# defmodule MyCharlieWeb.Gettext do
#   @moduledoc """
#   A module providing Internationalization with a gettext-based API.

#   By using [Gettext](https://hexdocs.pm/gettext),
#   your module gains a set of macros for translations, for example:

#       use Gettext, backend: MyCharlieWeb.Gettext

#       # Simple translation
#       gettext("Here is the string to translate")

#       # Plural translation
#       ngettext("Here is the string to translate",
#                "Here are the strings to translate",
#                3)

#       # Domain-based translation
#       dgettext("errors", "Here is the error message to translate")

#   See the [Gettext Docs](https://hexdocs.pm/gettext) for detailed usage.
#   """
#   use Gettext.Backend,
#     otp_app: :my_charlie,
#     default_locale: :en,
#     locales: MyCharlie.Locales.locale_codes(),
#     plural_forms: MyCharlieWeb.Gettext.Plural,
#     priv: "priv/gettext"
# end
