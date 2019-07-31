defmodule CMS.Partial.Paragraph.AccordionSection do
  @moduledoc """

  This paragraph will only ever exist as a sub-paragraph of
  CMS.Partial.Paragraph.Accordion, and contains each of the section items'
  title, id (for javascript/ARIA targeting purposes), and actual content.

  The content attribute will always be another CMS.Partial.Paragraph.t.

  """

  import CMS.Helpers,
    only: [
      field_value: 2,
      parse_paragraphs: 2
    ]

  alias CMS.Partial.Paragraph

  defstruct title: "",
            prefix: "",
            content: %{}

  @type t :: %__MODULE__{
          title: String.t(),
          prefix: String.t(),
          content: Paragraph.t()
        }

  @spec from_api(map) :: t
  def from_api(%{} = data) do
    %__MODULE__{
      title: field_value(data, "field_label"),
      prefix: "cms-#{field_value(data, "id")}",
      content: data |> parse_paragraphs("field_content") |> List.first()
    }
  end
end
