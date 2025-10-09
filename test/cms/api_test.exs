defmodule CMS.ApiTest do
  @moduledoc false
  use ExUnit.Case, async: true

  alias CMS.Api

  describe "set_redirect_options/1" do
    test "does not re-encode spaces to plus signs" do
      uri = URI.parse("https://example.com/url?field=value%20with%20spaces&_format=json")

      assert [external: "https://example.com/url?field=value%20with%20spaces"] =
               Api.set_redirect_options(uri)
    end

    test "strips _format=json when it's the first query" do
      uri =
        URI.parse(
          "https://www.mbta.com/projects/lynnway-multimodal-corridor-project?_format=json&fbclid=IwY2xjawM"
        )

      assert [
               external:
                 "https://www.mbta.com/projects/lynnway-multimodal-corridor-project?fbclid=IwY2xjawM"
             ] =
               Api.set_redirect_options(uri)
    end

    test "strips _format=json when it's the a middle query" do
      uri = URI.parse("https://www.example.com?query=first&_format=json&second=query")

      assert [external: "https://www.example.com?query=first&second=query"] =
               Api.set_redirect_options(uri)
    end

    test "strips _format=json when it's the only query" do
      uri = URI.parse("https://example.com/url?_format=json")
      assert [external: "https://example.com/url"] = Api.set_redirect_options(uri)
    end
  end
end
