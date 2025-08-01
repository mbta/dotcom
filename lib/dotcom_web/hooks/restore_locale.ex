defmodule DotcomWeb.Hooks.RestoreLocale do
  @moduledoc """
  If the locale is specified in the params or already set in the session,
  ensures that this locale is set in the LiveView process. Also assigns
  `:locale` in the socket for convenience.
  """

  import Dotcom.Locales, only: [set_locale: 1]
  import Phoenix.Component, only: [assign: 3]

  # Using URL params
  def on_mount(:default, %{"locale" => locale}, _session, socket) do
    unless Application.get_env(:dotcom, :is_prod_env?) do
      set_and_assign_locale(socket, locale)
    end
  end

  # From session
  def on_mount(:default, _params, %{"locale" => locale}, socket) do
    unless Application.get_env(:dotcom, :is_prod_env?) do
      set_and_assign_locale(socket, locale)
    end
  end

  # catch-all case
  def on_mount(:default, _params, _session, socket), do: {:cont, socket}

  defp set_and_assign_locale(socket, locale) do
    _ = set_locale(locale)

    {:cont, assign(socket, :locale, locale)}
  end
end
