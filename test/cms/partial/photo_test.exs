defmodule CMS.Partial.PhotoTest do
  use ExUnit.Case, async: true

  alias CMS.Api.Static
  alias CMS.Field.Image
  alias CMS.Partial.Photo

  setup do
    api_notices = Static.photos_response()
    %{api_notices: api_notices}
  end

  test "it parses the API response into a CMS.Photo struct", %{api_notices: [raw | _]} do
    assert %Photo{
             image: %Image{url: url, alt: alt}
           } = Photo.from_api(raw)

    assert url =~
             "/sites/default/files/styles/vanity_photo/public/photos/2025-08/2025-06-24-jackson-square-crews-prepare-platform.jpg?itok=fhWzrEeu"

    assert alt == ""
  end

  test "handles missing values without crashing" do
    assert %Photo{
             image: nil
           } = Photo.from_api(%{})
  end
end
