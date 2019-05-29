defmodule Content.Paragraph.DescriptionList do
  @moduledoc """
  A description list element (optionally including a header) from the CMS.
  """
  import Content.Paragraph, only: [parse_header: 1]

  alias Content.Paragraph.{ColumnMultiHeader, Description}

  defstruct header: nil,
            descriptions: []

  @type t :: %__MODULE__{
          header: ColumnMultiHeader.t() | nil,
          descriptions: [Description.t()]
        }

  @spec from_api(map) :: t
  def from_api(data) do
    descriptions =
      data
      |> Map.get("field_definition", [])
      |> Enum.map(&Description.from_api/1)

    %__MODULE__{
      header: parse_header(data),
      descriptions: descriptions
    }
  end
end
