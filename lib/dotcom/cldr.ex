defmodule Dotcom.Cldr do
  @moduledoc """
  Implement [Cldr](https://hexdocs.pm/ex_cldr/readme.html).
  """

  use Cldr,
    default_locale: Application.compile_env!(:dotcom, :default_locale_code),
    gettext: Application.compile_env!(:dotcom, :gettext_backend),
    json_library: Jason,
    locales: Application.compile_env!(:dotcom, :locale_codes),
    otp_app: :dotcom,
    providers: [Cldr.Calendar, Cldr.DateTime, Cldr.List, Cldr.Number, Cldr.Unit],
    precompile_number_formats: ["#,##0"]
end
