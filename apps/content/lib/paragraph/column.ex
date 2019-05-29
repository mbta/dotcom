defmodule Content.Paragraph.Column do
  @moduledoc """
  An individual column in a ColumnMulti set.
  """
  alias Content.Paragraph

  defstruct paragraphs: []

  @type t :: %__MODULE__{
          paragraphs: [Paragraph.t()]
        }

  @spec from_api(map) :: t
  def from_api(data) do
    paragraphs =
      data
      |> Map.get("field_content", [])
      |> Enum.map(&Paragraph.from_api/1)

    %__MODULE__{
      paragraphs: paragraphs
    }
  end
end
