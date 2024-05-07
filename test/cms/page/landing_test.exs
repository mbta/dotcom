defmodule CMS.Page.LandingTest do
  use ExUnit.Case, async: true

  alias CMS.Api.Static
  alias CMS.Field.Image
  alias CMS.Page.Landing

  describe "from_api/1" do
    test "it parses the api response" do
      api_page = Static.landing_page_response()

      assert %Landing{
               id: 2750,
               title: title,
               subtitle: subtitle,
               hero_desktop: %Image{},
               hero_mobile: %Image{},
               hero_mobile_2x: %Image{}
             } = Landing.from_api(api_page)

      assert title == "Parking"
      assert subtitle == "Parking page subtitle"
    end
  end
end
