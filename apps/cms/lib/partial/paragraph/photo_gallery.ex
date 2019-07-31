defmodule CMS.Partial.Paragraph.PhotoGallery do
  @moduledoc """
  Represents the Photo Gallery Paragraph type in the CMS. It
  contains a media reference (image) field with multiple values.
  """
  import CMS.Helpers, only: [parse_images: 2]

  alias CMS.Field.Image

  defstruct images: []

  @type t :: %__MODULE__{images: [Image.t()]}

  @spec from_api(map) :: t
  def from_api(data) do
    %__MODULE__{
      images: parse_images(data, "field_image")
    }
  end
end
