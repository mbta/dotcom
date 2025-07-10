defmodule DotcomWeb.Gettext.Sigils do
  @moduledoc """
  Sigils for Gettext translations.
  """

  defmacro __using__(_ \\ []) do
    quote do
      use Gettext, backend: DotcomWeb.Gettext

      import unquote(__MODULE__)
    end
  end

  @doc """
  Sigil for Gettext translations.
  """
  defmacro sigil_i({:<<>>, _, pieces} = string, [?p]) do
    [s, p, _] = pieces |> List.first() |> String.split(" | ")

    quote do
      n = unquote(string) |> String.split(" | ") |> List.last() |> String.to_integer()

      ngettext(unquote(s), unquote(p), n)
    end
  end

  defmacro sigil_i(string, []) do
    quote do
      gettext(unquote(string))
    end
  end
end
