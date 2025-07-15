defmodule Dotcom.Cldr do
  @moduledoc """
  Implement [Cldr](https://hexdocs.pm/ex_cldr/readme.html).
  """

  use Cldr,
    default_locale: Dotcom.Locales.default_locale_code(),
    gettext: Dotcom.Gettext,
    json_library: Jason,
    locales: Dotcom.Locales.locale_codes(),
    otp_app: :dotcom
end
