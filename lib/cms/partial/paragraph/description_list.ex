defmodule CMS.Partial.Paragraph.DescriptionList do
  @moduledoc """
  A description list element (optionally including a header) from the CMS.
  """
  import CMS.Helpers, only: [parse_paragraphs: 3]

  alias CMS.Partial.Paragraph.{ColumnMultiHeader, Description}

  defstruct header: nil,
            descriptions: []

  @type t :: %__MODULE__{
          header: ColumnMultiHeader.t() | nil,
          descriptions: [Description.t()]
        }

  def from_api(data, preview_opts \\ []) do
    %__MODULE__{
      header: data |> parse_paragraphs(preview_opts, "field_multi_column_header") |> List.first(),
      descriptions: parse_paragraphs(data, preview_opts, "field_definition")
    }
  end
end
