defmodule Dotcom.Gettext.Sigils do
  @moduledoc """
  Sigils for Gettext translations.

  ## Usage

  ```elixir
  use Dotcom.Gettext.Sigils
  ```

  ```heex
  <div>{~t(Text to translate)}</div>
  ```

  ## Examples
      iex> use Dotcom.Gettext.Sigils
      iex> ~t(Simple text!)
      "Simple text!"
      iex> ~t(1 error | %{count} errors | 1)p
      "1 error"
      iex> ~t(1 error | %{count} errors | 54)p
      "54 errors"
  """

  defmacro __using__(_ \\ []) do
    quote do
      use Gettext, backend: Dotcom.Gettext

      import unquote(__MODULE__)
    end
  end

  @doc """
  Sigil for Gettext translations.
  """
  defmacro sigil_t({:<<>>, _, pieces} = string, [?p]) do
    [s, p, _] = pieces |> List.first() |> String.split(" | ")

    quote do
      n = unquote(string) |> String.split(" | ") |> List.last() |> String.to_integer()

      ngettext(unquote(s), unquote(p), n)
    end
  end

  defmacro sigil_t(string, []) do
    quote do
      gettext(unquote(string))
    end
  end
end
