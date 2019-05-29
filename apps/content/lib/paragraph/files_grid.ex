defmodule Content.Paragraph.FilesGrid do
  @moduledoc """
  Represents a files grid paragraph type in the Drupal CMS.
  """

  import Content.Helpers, only: [field_value: 2]

  defstruct files: [], title: nil

  @type t :: %__MODULE__{
          files: [Content.Field.File.t()],
          title: String.t() | nil
        }

  @spec from_api(map) :: t
  def from_api(data) do
    files =
      data
      |> Map.get("field_files", [])
      |> Enum.map(&Content.Field.File.from_api/1)

    %__MODULE__{
      files: files,
      title: field_value(data, "field_files_grid_title")
    }
  end
end
