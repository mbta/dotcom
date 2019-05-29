defmodule Content.PersonTest do
  use ExUnit.Case, async: true

  setup do
    %{api_person: person_from_api()}
  end

  describe "from_api/1" do
    test "parses the api response and returns a struct", %{api_person: api_person} do
      assert %Content.Person{
               id: 2606,
               bio: bio,
               name: "Joseph Aiello",
               path_alias: "/people/joseph-aiello",
               position: "Chair",
               profile_image: %Content.Field.Image{}
             } = Content.Person.from_api(api_person)

      assert Phoenix.HTML.safe_to_string(bio) =~ "overseeing strategic development"
    end
  end

  defp person_from_api do
    Content.CMS.Static.person_response()
  end
end
