defmodule DotcomWeb.Plugs.SetLocale do
  @moduledoc """
  """

  import Plug.Conn

  import Dotcom.Locales, only: [default_locale_code: 0, locale?: 1]

  def init(default), do: default

  def call(conn, _opts) do
    locale = get_locale(conn)

    Gettext.put_locale(DotcomWeb.Gettext, locale)
    Logger.metadata(locale: locale)

    conn
    |> put_resp_cookie("locale", locale, max_age: 365 * 24 * 60 * 60)
  end

  defp get_locale(conn) do
    locale = get_locale_from_params(conn) || get_locale_from_cookie(conn) |> IO.inspect(label: "LOCALE")

    if locale?(locale), do: locale, else: default_locale_code()
  end

  defp get_locale_from_params(%{params: %{"locale" => locale}}) do
    locale
  end

  defp get_locale_from_params(_), do: nil

  defp get_locale_from_cookie(%{cookies: %{"locale" => locale}}) do
    locale
  end

  defp get_locale_from_cookie(_), do: nil
end
