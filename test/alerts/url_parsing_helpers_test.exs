defmodule Alerts.URLParsingHelpersTest do
  use DotcomWeb.ConnCase, async: true
  import Alerts.URLParsingHelpers

  describe "get_full_url/1" do
    test "should return the url parsed from the text" do
      text =
        "The Orange Line shutdown (9 PM, August 19 - September 18) overlaps with Green Line closures. Learn more and see alternative travel options at MBTA.com/BBT2022"

      assert get_full_url(text) == "https://MBTA.com/BBT2022"
    end

    test "should return the url parsed from the text if '.' after url" do
      text =
        "The Orange Line shutdown (9 PM, August 19 - September 18) overlaps with Green Line closures. Learn more and see alternative travel options at MBTA.com/BBT2022."

      assert get_full_url(text) == "https://MBTA.com/BBT2022"
    end

    test "should return nil if there is no url in the parsed text" do
      text =
        "The Orange Line shutdown (9 PM, August 19 - September 18) overlaps with Green Line closures. Learn more and see alternative travel options at"

      assert get_full_url(text) == nil
    end

    test "should return the url with special characters parsed from the text" do
      word_fn = &Faker.Internet.domain_word/0
      # Characters between ! and @ :  !\"#$%&'()*+,-./0123456789:;<=>?@
      special_chars =
        Enum.to_list(33..64)
        |> Enum.map(fn x -> <<x::utf8>> end)
        |> List.to_string()

      url =
        "#{Faker.Util.pick(["http", "https"])}://#{word_fn.()}.#{Faker.Internet.domain_name()}/#{word_fn.()}/#{word_fn.()}?#{word_fn.()}=[#{word_fn.()}]&param_2=hello%20world##{word_fn.()}#{special_chars}"

      text =
        "This is a test for url validation, the following URL should be completely parsed:  #{url} "

      result = get_full_url(text)

      assert result == url,
             "Unexpected URL received: got #{result}, expected #{url}"
    end
  end

  describe "create_url/1" do
    test "get_full_url/1 should return a properly formatted url given a valid input" do
      text_one = "The Orange Line http://mbta.com"
      assert get_full_url(text_one) == "http://mbta.com"
      text_two = "The Orange Line https://mbta.com"
      assert get_full_url(text_two) == "https://mbta.com"
      text_three = "The Orange Line mbta.com"
      assert get_full_url(text_three) == "https://mbta.com"
      text_four = "The Orange Line MBTA.com"
      assert get_full_url(text_four) == "https://MBTA.com"
      text_five = "The Orange Line othersite.com"
      assert get_full_url(text_five) == "http://othersite.com"
    end
  end

  test "urls a stripped correctly" do
    assert Enum.at(Tuple.to_list(replace_urls_with_links("https://mbta.com")), 1) ==
             "<a target=\"_blank\" href=\"https://mbta.com\">MBTA.com</a>"

    assert Enum.at(Tuple.to_list(replace_urls_with_links("www.google.com")), 1) ==
             "<a target=\"_blank\" href=\"http://www.google.com\">google.com</a>"

    assert Enum.at(Tuple.to_list(replace_urls_with_links("mbta.com")), 1) ==
             "<a target=\"_blank\" href=\"https://mbta.com\">MBTA.com</a>"
  end
end
