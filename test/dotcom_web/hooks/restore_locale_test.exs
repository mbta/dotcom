defmodule DotcomWeb.Hooks.RestoreLocaleTest do
  use ExUnit.Case, async: true

  alias Dotcom.Locales
  alias DotcomWeb.Hooks.RestoreLocale

  describe "on_mount" do
    test "sets locale from session" do
      locale = Locales.locale_codes() |> Enum.random()

      {:cont, new_socket} =
        RestoreLocale.on_mount(:default, nil, %{"locale" => locale}, %Phoenix.LiveView.Socket{})

      assert new_socket.assigns.locale == locale
      assert Gettext.get_locale(Dotcom.Gettext) == locale
    end

    test "sets locale from params" do
      locale = Locales.locale_codes() |> Enum.random()

      {:cont, new_socket} =
        RestoreLocale.on_mount(:default, %{"locale" => locale}, %{}, %Phoenix.LiveView.Socket{})

      assert new_socket.assigns.locale == locale
      assert Gettext.get_locale(Dotcom.Gettext) == locale
    end
  end
end
