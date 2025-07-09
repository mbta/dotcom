defmodule DotcomWeb.Plugs.SetLocale do
  @moduledoc """
  A plug to set the locale for a request.
  """

  import Plug.Conn

  import Dotcom.Locales, only: [default_locale_code: 0, locale?: 1]

  def init(default), do: default

  @doc """
  Gets a locale from a query param or cookie value and sets Gettext.
  If no locale is present, the default locale "en" is used.
  """
  def call(conn, _opts) do
    locale = get_locale(conn)

    Gettext.put_locale(DotcomWeb.Gettext, locale)
    Logger.metadata(locale: locale)

    conn
    |> put_resp_cookie("locale", locale, max_age: 365 * 24 * 60 * 60)
    |> put_session(:locale, locale)
  end

  # Check params, then session, then cookie, and use the default if none are present or supported.
  defp get_locale(conn) do
    locale =
      get_locale_from_params(conn) ||
        get_locale_from_session(conn) ||
        get_locale_from_cookie(conn)

    if locale?(locale), do: locale, else: default_locale_code()
  end

  # Destructure the cookies for the locale.
  defp get_locale_from_cookie(%{cookies: %{"locale" => locale}}) do
    locale
  end

  defp get_locale_from_cookie(_), do: nil

  # Destructure the params for the locale.
  defp get_locale_from_params(%{params: %{"locale" => locale}}) do
    locale
  end

  defp get_locale_from_params(_), do: nil

  # Get the locale from the session, if present.
  defp get_locale_from_session(conn) do
    get_session(conn, :locale)
  end
end
