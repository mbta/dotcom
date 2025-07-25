defmodule DotcomWeb.Plugs.SetLocaleTest do
  use DotcomWeb.ConnCase, async: false

  import DotcomWeb.Plugs.SetLocale

  alias Dotcom.Locales

  setup %{conn: conn} do
    {:ok, conn: Plug.Test.init_test_session(conn, %{})}
  end

  # Reset locale after each test
  setup do
    on_exit(fn -> Gettext.put_locale(Dotcom.Gettext, "en") end)
    :ok
  end

  test "sets the locale for each supported locale", %{conn: conn} do
    Enum.each(Locales.locale_codes(), fn locale ->
      conn
      |> Map.put(:params, %{"locale" => locale})
      |> call(%{})

      assert Gettext.get_locale(Dotcom.Gettext) == locale
    end)
  end

  test "a conn with a param locale sets the locale", %{conn: conn} do
    locale = Locales.locale_codes() |> Enum.random()

    conn |> Map.put(:params, %{"locale" => locale}) |> call(%{})

    assert Gettext.get_locale(Dotcom.Gettext) == locale
  end

  test "a conn with a cookie locale sets the locale", %{conn: conn} do
    locale = Locales.locale_codes() |> Enum.random()

    conn |> Map.put(:cookies, %{"locale" => locale}) |> call(%{})

    assert Gettext.get_locale(Dotcom.Gettext) == locale
  end

  test "a conn with a session locale sets the locale", %{conn: conn} do
    locale = Locales.locale_codes() |> Enum.random()
    conn = fetch_session(conn)

    conn
    |> put_session("locale", locale)
    |> call(%{})

    assert Gettext.get_locale(Dotcom.Gettext) == locale
  end

  test "a conn with an unsupported locale uses the default locale", %{conn: conn} do
    conn |> Map.put(:cookies, %{"locale" => "zz"}) |> call(%{})

    assert Gettext.get_locale(Dotcom.Gettext) == Locales.default_locale_code()
  end

  test "a conn with no locale information uses the default locale", %{conn: conn} do
    conn |> call(%{})

    assert Gettext.get_locale(Dotcom.Gettext) == Locales.default_locale_code()
  end
end
