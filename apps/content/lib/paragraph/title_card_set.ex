defmodule Content.Paragraph.TitleCardSet do
  defstruct descriptive_links: []

  alias Content.Paragraph.DescriptiveLink

  @type t :: %__MODULE__{
          descriptive_links: [DescriptiveLink.t()]
        }

  @spec from_api(map) :: t
  def from_api(data) do
    cards =
      data
      |> Map.get("field_title_cards", [])
      |> Enum.map(&DescriptiveLink.from_api/1)

    %__MODULE__{
      descriptive_links: cards
    }
  end
end
