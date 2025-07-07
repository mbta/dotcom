defmodule DotcomWeb.GettextPlural do
  @moduledoc """
  This module defines plural form equations for languages for PO files.

  Plural forms are documented in the gettext docs here:
  https://www.gnu.org/software/gettext/manual/gettext.html#Plural-forms

  There's a list of plural forms for most languages here:
  https://docs.translatehouse.org/projects/localization-guide/en/latest/l10n/pluralforms.html
  """
  @behaviour Gettext.Plural

  # Haitian Creole is not supported by default by Gettext.Plural (which uses Expo.PluralForms)
  @impl Gettext.Plural
  def nplurals("ht"), do: 2

  # Gettext.Plural forwards xx_YY to xx for plurals, but not xx-YY, so this patches that
  def nplurals(<<locale::binary-size(2)>> <> "-" <> _sublocale),
    do: Gettext.Plural.nplurals(locale)

  # Fall back to Gettext.Plural
  defdelegate nplurals(locale), to: Gettext.Plural

  # Haitian Creole is not supported by default by Gettext.Plural (which uses Expo.PluralForms)
  @impl Gettext.Plural
  def plural("ht", 1), do: 0
  def plural("ht", _), do: 1

  # Gettext.Plural forwards xx_YY to xx for plurals, but not xx-YY, so this patches that
  def plural(<<locale::binary-size(2)>> <> "-" <> _sublocale, count),
    do: Gettext.Plural.plural(locale, count)

  # Fall back to Gettext.Plural
  defdelegate plural(locale, n), to: Gettext.Plural
end
