defmodule CMS.Page.NewsEntryTest do
  use ExUnit.Case

  alias CMS.Api.Static
  alias CMS.Page.NewsEntry
  alias Phoenix.HTML

  setup do
    %{
      api_page_no_path_alias: Enum.at(Static.news_repo(), 0),
      api_page_path_alias: Enum.at(Static.news_repo(), 1)
    }
  end

  describe "from_api/1" do
    test "parses api response without path alias", %{api_page_no_path_alias: api_page} do
      assert %NewsEntry{
               id: id,
               title: title,
               body: body,
               media_contact: media_contact,
               media_email: media_email,
               media_phone: media_phone,
               more_information: more_information,
               posted_on: posted_on,
               teaser: teaser,
               migration_id: migration_id,
               path_alias: path_alias
             } = NewsEntry.from_api(api_page)

      assert id == 3519
      assert title == "New Early Morning Bus Routes Begin April 1"

      assert HTML.safe_to_string(body) =~
               "<p>Beginning Sunday, April 1, the MBTA will begin"

      assert media_contact == "MassDOT Press Office"
      assert media_email == "Lisa.Battiston@dot.state.ma.us"
      assert media_phone == "857-368-8500"
      assert HTML.safe_to_string(more_information) =~ "<p>For more information"
      assert posted_on == ~D[2018-03-29]

      assert HTML.safe_to_string(teaser) =~
               "The MBTA will begin a one-year early morning bus service pilot"

      assert migration_id == "1234"
      assert path_alias == nil
    end

    test "parses api response with path alias", %{api_page_path_alias: api_page} do
      assert %NewsEntry{
               path_alias: path_alias
             } = NewsEntry.from_api(api_page)

      assert path_alias == "/news/date/title"
    end
  end
end
