defmodule CMS.Field.ImageTest do
  use ExUnit.Case, async: true

  alias CMS.Field.Image

  describe "from_api/1" do
    test "maps image api data to a struct" do
      image_data = %{
        "target_id" => 1,
        "alt" => "Purple Train",
        "title" => "",
        "width" => "800",
        "height" => "600",
        "target_type" => "file",
        "target_uuid" => "universal-unique-identifier",
        "url" => "http://example.com/files/purple-train.jpeg",
        "mime_type" => "image/jpeg"
      }

      image = Image.from_api(image_data)

      assert image.alt == image_data["alt"]
      assert %URI{path: "/files/purple-train.jpeg"} = URI.parse(image.url)
    end
  end
end
