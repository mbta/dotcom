defmodule DotcomWeb.Utils.BreadcrumbTest do
  use ExUnit.Case, async: false
  import DotcomWeb.Utils.Breadcrumb

  describe "build/2" do
    test "given text and a URL" do
      assert %DotcomWeb.Utils.Breadcrumb{
               text: "Sample",
               url: "/sample-url"
             } = build("Sample", "/sample-url")
    end

    test "given a URL is not provided" do
      assert %DotcomWeb.Utils.Breadcrumb{
               text: "Sample",
               url: ""
             } = build("Sample")
    end

    test "given text marked as safe" do
      assert %DotcomWeb.Utils.Breadcrumb{
               text: "Sample",
               url: "/sample-url"
             } = build(Phoenix.HTML.raw("Sample"), "/sample-url")
    end
  end
end
