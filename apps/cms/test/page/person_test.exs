defmodule CMS.Page.PersonTest do
  use ExUnit.Case, async: true

  import Phoenix.HTML, only: [safe_to_string: 1]

  alias CMS.API.Static
  alias CMS.Field.Image
  alias CMS.Page.Person

  setup do
    %{api_person: person_from_api()}
  end

  describe "from_api/1" do
    test "parses the api response and returns a struct", %{api_person: api_person} do
      assert %Person{
               id: 2606,
               bio: bio,
               name: "Joseph Aiello",
               path_alias: "/people/joseph-aiello",
               position: "Chair",
               profile_image: %Image{}
             } = Person.from_api(api_person)

      assert safe_to_string(bio) =~ "overseeing strategic development"
    end
  end

  defp person_from_api do
    Static.person_response()
  end
end
