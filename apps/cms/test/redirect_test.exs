defmodule Content.RedirectTest do
  use ExUnit.Case, async: true

  setup do
    api_item = Content.CMS.Static.redirect_response()
    %{api_item: api_item}
  end

  test "parses an api response into a Content.Redirect", %{api_item: api_item} do
    expects = %Content.Redirect{
      link: %Content.Field.Link{url: "http://www.google.com", title: ""}
    }

    assert expects == Content.Redirect.from_api(api_item)
  end
end
