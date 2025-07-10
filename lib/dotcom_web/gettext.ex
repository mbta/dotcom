defmodule DotcomWeb.Gettext do
  @moduledoc """
  Implements Gettext.
  """

  use Gettext.Backend,
    default_domain: "dotcom",
    default_locale: Dotcom.Locales.default_locale_code(),
    locales: Dotcom.Locales.locale_codes(),
    otp_app: :dotcom,
    plural_forms: DotcomWeb.GettextPlural,
    priv: "priv/gettext"
end
