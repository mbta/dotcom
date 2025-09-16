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

    test "strips _format=json when it's the only query" do
      uri = URI.parse("https://example.com/url?_format=json")
      assert [external: "https://example.com/url"] = Api.set_redirect_options(uri)
    end
  end
end
