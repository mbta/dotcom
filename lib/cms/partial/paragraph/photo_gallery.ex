defmodule CMS.Partial.Paragraph.PhotoGallery do
  @moduledoc """
  Represents the Photo Gallery Paragraph type in the CMS. It
  contains a media reference (image) field with multiple values.
  """
  import CMS.Helpers, only: [parse_images: 2, parse_paragraphs: 3]

  alias CMS.Field.Image
  alias CMS.Partial.Paragraph.ColumnMultiHeader

  defstruct header: nil,
            images: []

  @type t :: %__MODULE__{
          header: ColumnMultiHeader.t() | nil,
          images: [Image.t()]
        }

  def from_api(data, preview_opts \\ []) do
    %__MODULE__{
      header: data |> parse_paragraphs(preview_opts, "field_multi_column_header") |> List.first(),
      images: parse_images(data, "field_image")
    }
  end
end
