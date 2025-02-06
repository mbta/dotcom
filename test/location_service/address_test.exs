defmodule LocationService.AddressTest do
  use ExUnit.Case
  alias LocationService.Address
  alias Dotcom.Utils.Position

  describe "Address" do
    test "implements the Position protocol" do
      Protocol.assert_impl!(Position, Address)
      address = %Address{}
      assert Position.latitude(address) == address.latitude
      assert Position.longitude(address) == address.longitude
    end
  end

  describe "get_highlighted_spans/2" do
    defp get_highlighted_spans_text(search, text) do
      Address.get_highlighted_spans(search, text)
      |> Enum.map(fn %{offset: offset, length: length} ->
        String.slice(text, offset, length)
      end)
    end

    test "returns empty when no matches" do
      assert [] = get_highlighted_spans_text("Lame", "Cool")
    end

    test "returns matched word case-insensitively" do
      spans = get_highlighted_spans_text("ses", "Sesame Street")

      assert ["Sesame"] = spans
    end

    test "returns matched words case-insensitively" do
      spans = get_highlighted_spans_text("ses str", "Sesame Street")

      assert ["Sesame", "Street"] = spans
    end

    test "returns matched words case-insensitively, out of order, in the order they appear in the text" do
      spans = get_highlighted_spans_text("str ses", "Sesame Street")

      assert ["Sesame", "Street"] = spans
    end

    test "ignores non-matching parts" do
      spans = get_highlighted_spans_text("ses cool", "Sesame Street")

      assert ["Sesame"] = spans
    end

    test "removes overlapping spans" do
      spans = get_highlighted_spans_text("ses ses", "Sesame Street")

      assert ["Sesame"] = spans
    end

    test "catches double matches" do
      spans = get_highlighted_spans_text("ses", "Sesame Sesame Street")

      assert ["Sesame", "Sesame"] = spans
    end

    test "only matches start of words" do
      spans = get_highlighted_spans_text("ses eet", "Sesame Street")

      assert ["Sesame"] = spans
    end

    test "can handle text with brackets" do
      spans =
        get_highlighted_spans_text(
          "Great Harvest Bread Co. (great harvest bread)",
          "Great Harvest Bread Co."
        )

      assert ["Great", "Harvest", "Bread", "Co."] = spans
    end
  end
end
