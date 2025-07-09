defmodule DotcomWeb.Gettext.Sigils do
  @moduledoc """

  """

  defmacro __using__(_ \\ []) do
    quote do
      use Gettext, backend: DotcomWeb.Gettext

      import unquote(__MODULE__)
    end
  end

  @doc """

  """
  defmacro sigil_i(string, []) do
    quote do
      text = unquote(string) |> String.trim()

      Gettext.gettext(DotcomWeb.Gettext, text)
    end
  end

  @doc """

  """
  defmacro sigil_i(string, [?p]) do
    quote do
      [s, p, n] = unquote(string) |> String.split("|") |> Enum.map(&String.trim/1)

      Gettext.ngettext(DotcomWeb.Gettext, s, p, String.to_integer(n))
    end
  end
end
