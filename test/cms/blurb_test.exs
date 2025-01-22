defmodule CMS.BlurbTest do
  use ExUnit.Case, async: false

  alias CMS.Blurb

  @suffix_length String.length(Blurb.suffix())
  @suffix_range Range.new(-1 * @suffix_length, -1)

  test "keeps string under or equal to max_length characters" do
    max_length = 10
    string = String.duplicate("a", max_length + 2)

    assert String.length(Blurb.blurb(string, max_length)) <= max_length
  end

  test "ends with ... if original string was > max_length characters" do
    max_length = 10
    string = String.duplicate("a", max_length + 1)

    assert String.slice(Blurb.blurb(string, max_length), @suffix_range) == Blurb.suffix()
  end

  test "does not end with ... if original string was <= max_length characters" do
    max_length = 10
    string = String.duplicate("a", max_length)
    assert String.slice(Blurb.blurb(string, max_length), @suffix_range) != Blurb.suffix()
  end

  test "strips HTML tags" do
    max_length = 40

    string =
      "<p>Media Contact:MassDOT Press Office: 857-368-8500</p>" <>
        "<p><b><hr>MBTA Debuts Performance Dashboard</p>"

    assert Blurb.blurb(string, max_length) == "MBTA Debuts Performance Dashboard"
  end

  test "removes a paragraph if it contains 'Media Contact'" do
    max_length = 20
    string = "<p>Media Contact: Leslie Knope</p>Parks and Recreation<p>City Council</p>"
    assert Blurb.blurb(string, max_length) == "City Council"
  end

  test "removes a paragraph if it starts with 'By'" do
    whitespace = ["", " ", "\t \r\n", "&nbsp;", "&#160;"]

    Enum.each(whitespace, fn whitespace ->
      max_length = 10
      string = "<p>" <> whitespace <> "By Leslie Knope</p><p>Soda Tax</p>"

      assert Blurb.blurb(string, max_length) == "Soda Tax"
    end)
  end

  test "ignores the first paragraph if it's empty" do
    max_length = 10
    string = "<p></p><p>Hello</p>"

    assert Blurb.blurb(string, max_length) == "Hello"
  end

  test "returns the default message, given text that is rejected due to byline information" do
    string =
      "<p>By Eric Moskowitz, Boston Globe The MBTA set a modern record" <>
        "for ridership in 2011, providing 389.8 million trips.</p>"

    assert Blurb.blurb(string, 20) == ""
  end

  test "returns the default message when the string ends up empty" do
    max_length = 10

    string =
      ~s(<iframe title="YouTube" src="http://www.youtube.example/embed/foo") <>
        ~s(frameborder="0" allowfullscreen></iframe>)

    assert Blurb.blurb(string, max_length, "Click here") == "Click here"
  end

  test "returns the default message when given nil" do
    max_length = 10
    assert Blurb.blurb(nil, max_length, "Continue reading...") == "Continue reading..."
  end
end
