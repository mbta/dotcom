defmodule Content.Field.LinkTest do
  use ExUnit.Case, async: true

  describe "from_api/1" do
    test "creates external link" do
      assert %Content.Field.Link{
               title: "Title",
               url: "https://www.google.com"
             } = Content.Field.Link.from_api(link_data_from_uri("https://www.google.com"))
    end

    test "shortens internal links to the path" do
      assert %Content.Field.Link{
               title: "Title",
               url: "/schedules/subway"
             } = Content.Field.Link.from_api(link_data_from_uri("internal:/schedules/subway"))
    end

    test "corrects autocompleted node links to relative path" do
      assert %Content.Field.Link{
               title: "Title",
               url: "/node/123"
             } = Content.Field.Link.from_api(link_data_from_uri("entity:node/123"))
    end
  end

  @spec link_data_from_uri(String.t()) :: map
  defp link_data_from_uri(uri) do
    %{
      "title" => "Title",
      "uri" => uri,
      "options" => []
    }
  end
end
