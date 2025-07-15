defmodule Dotcom.GettextTest do
  use ExUnit.Case, async: true

  test "has additional locales established" do
    locales = Gettext.known_locales(Dotcom.Gettext)

    assert length(locales) > 1
  end
end
