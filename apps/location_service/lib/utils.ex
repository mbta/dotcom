defmodule LocationService.Utils do
  defmodule HighlightedSpan do
    @type t :: %__MODULE__{
            offset: number,
            length: number
          }

    @enforce_keys [:offset, :length]
    defstruct offset: nil,
              length: nil
  end

  @spec get_highlighted_spans(%{search: String.t(), text: String.t()}) :: [HighlightedSpan]
  def get_highlighted_spans(%{search: search, text: text}) do
    parts = String.split(search)

    Enum.map(parts, fn p ->
      src = "(^|\\W)(?<t>" <> p <> "\\w*)"
      {:ok, re} = Regex.compile(src, "i")

      Regex.scan(re, text, return: :index, capture: :all_names)
      |> Enum.map(fn
        [{offset, length}] -> %HighlightedSpan{offset: offset, length: length}
        nil -> nil
      end)
    end)
    |> Enum.filter(& &1)
    |> List.flatten()
    |> Enum.uniq()
    |> Enum.sort(&(&1.offset <= &2.offset))
  end
end
