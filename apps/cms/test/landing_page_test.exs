defmodule CMS.Page.LandingTest do
  use ExUnit.Case, async: true

  describe "from_api/1" do
    test "it parses the api response" do
      api_page = CMS.API.Static.landing_page_response()

      assert %CMS.Page.Landing{
               id: 2750,
               title: title,
               subtitle: subtitle,
               hero_desktop: %CMS.Field.Image{},
               hero_mobile: %CMS.Field.Image{},
               hero_mobile_2x: %CMS.Field.Image{}
             } = CMS.Page.Landing.from_api(api_page)

      assert title == "Parking"
      assert subtitle == "Parking page subtitle"
    end
  end
end
