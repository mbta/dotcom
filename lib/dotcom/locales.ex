defmodule Dotcom.Locales do
  @moduledoc """
  Definitions of and convenience functions for supported locales.
  """

  alias Dotcom.Locale

  @default_locale %Locale{code: "en", endonym: "English"}
  @development_locale %Locale{code: "es", endonym: "Español"}
  # @future_locales [
  #   %Locale{code: "ht", endonym: "Kreyòl Ayisyen"},
  #   %Locale{code: "pt", endonym: "Português"},
  #   %Locale{code: "vi", endonym: "Tiếng Việt"},
  #   %Locale{code: "zh", endonym: "中文"}
  # ]
  @locales [
    @default_locale,
    @development_locale
  ]

  @doc """
  The default locale.
  """
  def default_locale, do: @default_locale

  @doc """
  The default locale code.
  """
  def default_locale_code, do: Map.get(@default_locale, :code)

  @doc """
  All of the locales.
  """
  def locales, do: @locales

  @doc """
  All of the locale codes.
  """
  def locale_codes, do: Enum.map(@locales, & &1.code)

  @doc """
  Given a locale code, return the entire locale or nil.
  """
  def locale(code) do
    Enum.find(@locales, fn locale -> locale.code === code end)
  end

  @doc """
  Is the given code a supported locale?
  """
  def locale?(code) do
    locale(code) != nil
  end

  @doc """
  Set the locale in the backend. Does nothing if given an unsupported locale.
  """
  @spec set_locale(String.t()) :: :ok
  def set_locale(locale) do
    if locale in locale_codes() do
      _ = Gettext.put_locale(Dotcom.Gettext, locale)
      _ = Cldr.put_locale(Dotcom.Cldr, locale)
      Logger.metadata(locale: locale)
    else
      :ok
    end
  end
end
