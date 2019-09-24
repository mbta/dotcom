defmodule CMS.Field.Image do
  @moduledoc """
  Represents an image field in the Drupal CMS. This image field is embedded
  in other content types like CMS.Page.NewsEntry. Captions only used on galleries.
  """
  alias Phoenix.HTML

  import CMS.Helpers, only: [handle_html: 1, rewrite_url: 1]

  defstruct url: "",
            alt: "",
            caption: nil

  @type t :: %__MODULE__{
          url: String.t(),
          alt: String.t(),
          caption: HTML.safe() | nil
        }

  @spec from_api(map) :: t
  def from_api(%{"alt" => alt, "url" => url, "caption" => caption}) do
    %__MODULE__{
      url: rewrite_url(url),
      alt: alt,
      caption: caption && handle_html(caption)
    }
  end
end
