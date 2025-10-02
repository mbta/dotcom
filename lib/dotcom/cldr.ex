defmodule Dotcom.Cldr do
  @moduledoc """
  Implement [Cldr](https://hexdocs.pm/ex_cldr/readme.html).
  """

  require Dotcom.Locales

  use Cldr,
    default_locale: Dotcom.Locales.default_locale_code(),
    gettext: Dotcom.Gettext,
    json_library: Jason,
    locales: Dotcom.Locales.locale_codes(),
    otp_app: :dotcom,
    providers: [Cldr.Number, Cldr.Calendar, Cldr.DateTime, Cldr.Unit, Cldr.List],
    precompile_number_formats: ["#,##0"]
end
