defmodule CMS.Partial.Paragraph.Column do
  @moduledoc """
  An individual column in a ColumnMulti set.
  """
  alias CMS.Partial.Paragraph

  defstruct paragraphs: []

  @type t :: %__MODULE__{
          paragraphs: [Paragraph.t()]
        }

  @spec from_api(map, Plug.Conn.t()) :: t
  def from_api(data, conn) do
    paragraphs =
      data
      |> Map.get("field_content", [])
      |> Enum.map(&Paragraph.from_api(&1, conn))

    %__MODULE__{
      paragraphs: paragraphs
    }
  end
end
