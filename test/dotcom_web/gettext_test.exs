defmodule DotcomWeb.GettextTest do
  @moduledoc false
  use ExUnit.Case, async: true

  test "has additional locales established" do
    locales = Gettext.known_locales(DotcomWeb.Gettext)
    assert length(locales) > 1
  end
end
