defmodule CMS.Page.RedirectTest do
  use ExUnit.Case, async: true

  alias CMS.Api.Static
  alias CMS.Field.Link
  alias CMS.Page.Redirect

  setup do
    api_item = Static.redirect_response()
    %{api_item: api_item}
  end

  test "parses an api response into a CMS.Page.Redirect", %{api_item: api_item} do
    expects = %Redirect{
      link: %Link{url: "http://www.google.com", title: ""}
    }

    assert expects == Redirect.from_api(api_item)
  end
end
