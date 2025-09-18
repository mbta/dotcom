defmodule Dotcom.Translator.Behaviour do
  @moduledoc """
  A behaviour for handling translations.
  """

  require Dotcom.Locales

  @callback translate_html(binary(), String.t()) :: binary()
  @callback translate_text(binary(), String.t()) :: binary()

  @implementation Application.compile_env!(:dotcom, :translator)

  def translate_html(html, locale) when locale === Dotcom.Locales.default_locale_code(), do: html
  def translate_html(html, locale), do: @implementation.translate_html(html, locale)

  def translate_text(text, locale) when locale === Dotcom.Locales.default_locale_code(), do: text
  def translate_text(text, locale), do: @implementation.translate_text(text, locale)
end
