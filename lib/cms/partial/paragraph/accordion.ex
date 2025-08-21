defmodule CMS.Partial.Paragraph.Accordion do
  @moduledoc """

  This paragraph type provides a tabbed user interface. This
  type of interface can be set to appear as either a set of
  exapandable/collapsible items ("collapsible" display type),
  or as an accordion ("accordion" display type), the latter
  of which only allows a single tab open at a time.

  """

  import CMS.Helpers, only: [field_value: 2, parse_paragraphs: 3]

  alias CMS.Partial.Paragraph.{AccordionSection, ColumnMultiHeader}

  defstruct header: nil,
            display: "",
            sections: []

  @type t :: %__MODULE__{
          header: ColumnMultiHeader.t() | nil,
          display: String.t(),
          sections: [AccordionSection.t()]
        }

  def from_api(data, preview_opts \\ []) do
    %__MODULE__{
      header: data |> parse_paragraphs(preview_opts, "field_multi_column_header") |> List.first(),
      display: field_value(data, "field_tabs_display"),
      sections: data |> parse_paragraphs(preview_opts, "field_tabs")
    }
  end
end
