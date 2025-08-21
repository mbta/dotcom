defmodule CMS.Field.File do
  @moduledoc """
  Represents a file field in the Drupal CMS. This field is embedded
  in other drupal content types, like CMS.Page.ProjectUpdate.
  """

  import CMS.Helpers, only: [rewrite_url: 1]

  defstruct description: "", url: "", type: ""

  @type t :: %__MODULE__{
          description: String.t(),
          url: String.t(),
          type: String.t()
        }

  def from_api(%{"description" => description, "url" => url, "mime_type" => type}) do
    %__MODULE__{
      description: description,
      url: rewrite_url(url),
      type: type
    }
  end
end
