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
      parse_paragraphs: 3
    ]

  alias CMS.Partial.Paragraph

  defstruct title: "",
            prefix: "",
            content: []

  @type t :: %__MODULE__{
          title: String.t(),
          prefix: String.t(),
          content: [Paragraph.t()]
        }

  def from_api(%{} = data, preview_opts \\ []) do
    %__MODULE__{
      title: field_value(data, "field_label"),
      prefix: "cms-#{field_value(data, "id")}",
      content: parse_paragraphs(data, preview_opts, "field_content")
    }
  end
end
