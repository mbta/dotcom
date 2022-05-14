defmodule CMS.Page.ProjectUpdateTest do
  use ExUnit.Case

  import CMS.APITestHelpers, only: [update_api_response_whole_field: 3]

  alias CMS.API.Static
  alias CMS.Field.Image
  alias CMS.Page.ProjectUpdate
  alias Phoenix.HTML

  setup do
    %{api_data: Static.project_update_repo()}
  end

  describe "from_api/1" do
    test "maps the project update api data to a struct", %{api_data: api_data} do
      assert %ProjectUpdate{
               id: id,
               body: body,
               photo_gallery: [],
               posted_on: posted_on,
               project_id: project_id,
               teaser: teaser,
               title: title,
               path_alias: path_alias,
               redirects: redirects
             } = ProjectUpdate.from_api(List.first(api_data))

      assert id == 3005
      assert HTML.safe_to_string(body) =~ "What's the bus shuttle schedule?</h2>"
      assert posted_on == ~D[2018-04-02]
      assert project_id == 3004
      assert teaser =~ "On January 8, Wollaston Station on the Red Line closed"
      assert title == "How the Wollaston Station Closure Affects Your Trip"
      assert path_alias == nil
      assert redirects == ["/another-path/to/update"]
    end

    test "sets project update path_alias accordingly", %{api_data: api_data} do
      assert %ProjectUpdate{
               id: id,
               project_id: project_id,
               path_alias: path_alias
             } =
               api_data
               |> Enum.at(1)
               |> ProjectUpdate.from_api()

      assert id == 3174
      assert project_id == 3004
      assert path_alias == "/projects/project-name/update/project-progress"
    end

    test "when photo gallery images are provided", %{api_data: api_data} do
      project_update_data =
        api_data
        |> List.first()
        |> update_api_response_whole_field("field_photo_gallery", image_api_data())

      project_update = ProjectUpdate.from_api(project_update_data)

      assert [%Image{}] = project_update.photo_gallery
    end
  end

  defp image_api_data do
    [
      %{
        "alt" => "image alt",
        "url" => "http://example.com/files/train.jpeg"
      }
    ]
  end
end
