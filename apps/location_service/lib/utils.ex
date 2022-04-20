defmodule LocationService.Utils do
  defmodule HighlightedSpan do
    @type t :: %__MODULE__{
            offset: integer(),
            length: non_neg_integer()
          }

    @enforce_keys [:offset, :length]
    defstruct offset: nil,
              length: nil
  end

  @doc """
  Gets indices of spans of text that should be highlighted in the
  autocomplete dropdown.

  Essentially, `search` is split on whitespace, and then we search `text`
  for words that start with any of the `search` terms. The spans are
  non-overlapping, and sorted by `offset`. There are examples in the tests
  that should further clarify the behavior.
  """
  @spec get_highlighted_spans(%{search: String.t(), text: String.t()}) :: [HighlightedSpan.t()]
  def get_highlighted_spans(%{search: search, text: text}) do
    parts = String.split(search)

    Enum.flat_map(parts, fn p ->
      # (^|\\W) -- Match start of string or non-word character
      # (?<t>   -- Begin a capture group named `t`
      # p       -- Match the current part
      # \\w*    -- Match any number of word characters
      # )       -- Close `t`
      src = "(^|\\W)(?<t>" <> p <> "\\w*)"
      {:ok, re} = Regex.compile(src, "i")

      Regex.scan(re, text, return: :index, capture: :all_names)
      |> Enum.map(fn
        [{offset, length}] -> %HighlightedSpan{offset: offset, length: length}
        nil -> nil
      end)
      |> Enum.filter(& &1)
    end)
    |> Enum.uniq()
    |> Enum.sort(&(&1.offset <= &2.offset))
  end
end
