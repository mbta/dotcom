defmodule LocationService.UtilsTest do
  use ExUnit.Case, async: false

  import LocationService.Utils
  alias LocationService.Utils.HighlightedSpan

  defp get_highlighted_spans_text(query) do
    get_highlighted_spans(query)
    |> Enum.map(fn %HighlightedSpan{offset: offset, length: length} ->
      String.slice(query[:text], offset, length)
    end)
  end

  describe "get_highlighted_spans/1" do
    test "returns empty when no matches" do
      assert [] = get_highlighted_spans(%{search: "Lame", text: "Cool"})
    end

    test "returns matched word case-insensitively" do
      spans = get_highlighted_spans_text(%{search: "ses", text: "Sesame Street"})

      assert ["Sesame"] = spans
    end

    test "returns matched words case-insensitively" do
      spans = get_highlighted_spans_text(%{search: "ses str", text: "Sesame Street"})

      assert ["Sesame", "Street"] = spans
    end

    test "returns matched words case-insensitively, out of order, in the order they appear in the text" do
      spans = get_highlighted_spans_text(%{search: "str ses", text: "Sesame Street"})

      assert ["Sesame", "Street"] = spans
    end

    test "ignores non-matching parts" do
      spans = get_highlighted_spans_text(%{search: "ses cool", text: "Sesame Street"})

      assert ["Sesame"] = spans
    end

    test "removes overlapping spans" do
      spans = get_highlighted_spans_text(%{search: "ses ses", text: "Sesame Street"})

      assert ["Sesame"] = spans
    end

    test "catches double matches" do
      spans = get_highlighted_spans_text(%{search: "ses", text: "Sesame Sesame Street"})

      assert ["Sesame", "Sesame"] = spans
    end

    test "only matches start of words" do
      spans = get_highlighted_spans_text(%{search: "ses eet", text: "Sesame Street"})

      assert ["Sesame"] = spans
    end

    test "can handle text with brackets" do
      spans =
        get_highlighted_spans_text(%{
          search: "Great Harvest Bread Co. (great harvest bread)",
          text: "Great Harvest Bread Co."
        })

      assert ["Great", "Harvest", "Bread", "Co."] = spans
    end
  end
end
