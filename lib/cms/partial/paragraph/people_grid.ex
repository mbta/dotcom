defmodule CMS.Partial.Paragraph.PeopleGrid do
  @moduledoc """
  Represents a PeopleGrid paragraph type in the Drupal CMS.
  """

  alias CMS.Page.Person

  defstruct people: []

  @type t :: %__MODULE__{
          people: [Person.t()]
        }

  def from_api(data) do
    people =
      data
      |> Map.get("field_people", [])
      |> Enum.map(&Person.from_api/1)

    %__MODULE__{people: people}
  end
end
