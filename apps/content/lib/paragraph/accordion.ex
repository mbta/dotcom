defmodule Content.Paragraph.Accordion do
  @moduledoc """

  This paragraph type provides a tabbed user interface. This
  type of interface can be set to appear as either a set of
  exapandable/collapsible items ("collapsible" display type),
  or as an accordion ("accordion" display type), the latter
  of which only allows a single tab open at a time.

  """

  import Content.Helpers, only: [field_value: 2]
  alias Content.Paragraph.AccordionSection

  defstruct display: "",
            sections: []

  @type t :: %__MODULE__{
          display: String.t(),
          sections: [AccordionSection.t()]
        }

  @spec from_api(map) :: t
  def from_api(data) do
    sections =
      data
      |> Map.get("field_tabs", [])
      |> Enum.map(&AccordionSection.from_api/1)

    %__MODULE__{
      display: field_value(data, "field_tabs_display"),
      sections: sections
    }
  end
end
