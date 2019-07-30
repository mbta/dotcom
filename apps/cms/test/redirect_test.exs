defmodule CMS.Page.RedirectTest do
  use ExUnit.Case, async: true

  setup do
    api_item = CMS.API.Static.redirect_response()
    %{api_item: api_item}
  end

  test "parses an api response into a CMS.Page.Redirect", %{api_item: api_item} do
    expects = %CMS.Page.Redirect{
      link: %CMS.Field.Link{url: "http://www.google.com", title: ""}
    }

    assert expects == CMS.Page.Redirect.from_api(api_item)
  end
end
