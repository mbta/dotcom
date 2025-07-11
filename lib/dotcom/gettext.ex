defmodule Dotcom.Gettext do
  @moduledoc """
  Implement [Gettext](https://hexdocs.pm/gettext/Gettext.html).
  """

  use Gettext.Backend,
    default_domain: "dotcom",
    default_locale: Dotcom.Locales.default_locale_code(),
    locales: Dotcom.Locales.locale_codes(),
    otp_app: :dotcom,
    plural_forms: Dotcom.Gettext.Plural,
    priv: "priv/gettext"
end
