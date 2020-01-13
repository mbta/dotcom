defmodule CMS.Partial.Paragraph.DescriptionList do
  @moduledoc """
  A description list element (optionally including a header) from the CMS.
  """
  import CMS.Partial.Paragraph, only: [parse_header: 2]

  alias CMS.Partial.Paragraph.{ColumnMultiHeader, Description}

  defstruct header: nil,
            descriptions: []

  @type t :: %__MODULE__{
          header: ColumnMultiHeader.t() | nil,
          descriptions: [Description.t()]
        }

  @spec from_api(map, map) :: t
  def from_api(data, query_params \\ %{}) do
    descriptions =
      data
      |> Map.get("field_definition", [])
      |> Enum.map(&Description.from_api/1)

    %__MODULE__{
      header: parse_header(data, query_params),
      descriptions: descriptions
    }
  end
end
