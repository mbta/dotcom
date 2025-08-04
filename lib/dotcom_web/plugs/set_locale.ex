defmodule DotcomWeb.Plugs.SetLocale do
  @moduledoc """
  A plug to set the locale for a request.
  """

  import Plug.Conn

  import Dotcom.Locales, only: [default_locale_code: 0, locale?: 1, set_locale: 1]

  def init(default), do: default

  @doc """
  Gets a locale from a query param or cookie value and sets Gettext and Cldr.
  If no locale is present, the default locale "en" is used.
  """
  def call(conn, _opts) do
    # Since we're only testing this out right now, don't
    # enable this in the live prod website yet.
    if Application.get_env(:dotcom, :is_prod_env?) do
      conn
      |> assign(:locale, default_locale_code())
    else
      conn = fetch_session(conn)
      locale = get_locale(conn)
      _ = set_locale(locale)

      conn
      |> assign(:locale, locale)
      |> put_session("locale", locale)
      |> put_resp_cookie("locale", locale, max_age: 365 * 24 * 60 * 60)
    end
  end

  # Check params, then session, then cookie, and use the default if none are present or supported.
  defp get_locale(conn) do
    locale =
      get_locale_from_params(conn) || get_session(conn, :locale) || get_locale_from_cookie(conn)

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
end
