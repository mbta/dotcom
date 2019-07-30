defmodule CMS.Field.Image do
  @moduledoc """
  Represents an image field in the Drupal CMS. This image field is embedded
  in other content types like CMS.Page.NewsEntry.
  """

  import CMS.Helpers, only: [rewrite_url: 1]

  defstruct url: "", alt: ""

  @type t :: %__MODULE__{
          url: String.t(),
          alt: String.t()
        }

  @spec from_api(map) :: t
  def from_api(%{"alt" => alt, "url" => url}) do
    %__MODULE__{alt: alt, url: rewrite_url(url)}
  end
end
