defmodule DotcomWeb.Plugs.SetLocaleTest do
  use DotcomWeb.ConnCase, async: true

  import DotcomWeb.Plugs.SetLocale

  alias Dotcom.Locales

  setup %{conn: conn} do
    {:ok, conn: Plug.Test.init_test_session(conn, %{})}
  end

  describe "supported locales" do
    test "sets the locale for each supported locale", %{conn: conn} do
      Enum.each(Locales.locale_codes(), fn locale ->
        conn
        |> Map.put(:params, %{"locale" => locale})
        |> call(%{})

        assert Gettext.get_locale(DotcomWeb.Gettext) == locale
      end)
    end
  end

  test "a conn with a param locale set the locale", %{conn: conn} do
    locale = Locales.locale_codes() |> Enum.random()

    conn |> Map.put(:params, %{"locale" => locale}) |> call(%{})

    assert Gettext.get_locale(DotcomWeb.Gettext) == locale
  end

  test "a conn with a cookie locale set the locale", %{conn: conn} do
    locale = Locales.locale_codes() |> Enum.random()

    conn |> Map.put(:cookies, %{"locale" => locale}) |> call(%{})

    assert Gettext.get_locale(DotcomWeb.Gettext) == locale
  end

  test "a conn with an unsupported locale uses the default locale", %{conn: conn} do
    conn |> Map.put(:cookies, %{"locale" => "zz"}) |> call(%{})

    assert Gettext.get_locale(DotcomWeb.Gettext) == Locales.default_locale_code()
  end

  test "a conn with no locale information uses the default locale", %{conn: conn} do
    conn |> call(%{})

    assert Gettext.get_locale(DotcomWeb.Gettext) == Locales.default_locale_code()
  end
end
