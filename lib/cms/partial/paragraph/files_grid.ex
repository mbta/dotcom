defmodule CMS.Partial.Paragraph.FilesGrid do
  @moduledoc """
  Represents a files grid paragraph type in the Drupal CMS.
  """

  import CMS.Helpers, only: [field_value: 2]

  alias CMS.Field.File

  defstruct files: [], title: nil

  @type t :: %__MODULE__{
          files: [File.t()],
          title: String.t() | nil
        }

  def from_api(data) do
    files =
      data
      |> Map.get("field_files", [])
      |> Enum.map(&File.from_api/1)

    %__MODULE__{
      files: files,
      title: field_value(data, "field_files_grid_title")
    }
  end
end
