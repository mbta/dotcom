defmodule CMS.Paragraph.TitleCardSet do
  @moduledoc """
  Represents a collection of Title Cards in the CMS
  """
  defstruct descriptive_links: []

  alias CMS.Paragraph.DescriptiveLink

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
