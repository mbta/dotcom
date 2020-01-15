defmodule CMS.Partial.Paragraph.Column do
  @moduledoc """
  An individual column in a ColumnMulti set.
  """
  import CMS.Helpers, only: [parse_paragraphs: 3]

  alias CMS.Partial.Paragraph

  defstruct paragraphs: []

  @type t :: %__MODULE__{
          paragraphs: [Paragraph.t()]
        }

  @spec from_api(map, map) :: t
  def from_api(data, query_params \\ %{}) do
    %__MODULE__{
      paragraphs: parse_paragraphs(data, query_params, "field_content")
    }
  end
end
