defmodule CMS.CustomHTML5ScrubberTest do
  use ExUnit.Case, async: true

  import CMS.CustomHTML5Scrubber

  test "allows the mailto URI scheme" do
    html = "Please email <a href=\"mailto:AACT@ctps.org\">AACT@ctps.org</a>"
    assert html5(html) == html
  end

  test "allows the tel URI scheme" do
    html = "Call me: <a href=\"tel:555-555-5555\">555-555-5555</a>"
    assert html5(html) == html
  end

  test "allows the image attributes: alt width height" do
    html = ~s(<img alt="Heroes_4.jpg" height="226" src="Heroes_4.jpg" width="576" />)
    assert html5(html) == html
  end
end
