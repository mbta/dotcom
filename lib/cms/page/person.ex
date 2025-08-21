defmodule CMS.Page.Person do
  @moduledoc """
  Represents a "person" content type in the Drupal CMS.
  """

  import CMS.Helpers,
    only: [field_value: 2, handle_html: 1, parse_image: 2, parse_path_alias: 1]

  import Phoenix.HTML, only: [raw: 1]

  alias CMS.Field.Image
  alias Phoenix.HTML

  @enforce_keys [:id]
  defstruct [:id, bio: raw(""), name: "", path_alias: "", position: "", profile_image: ""]

  @type t :: %__MODULE__{
          id: integer,
          bio: HTML.safe(),
          name: String.t(),
          path_alias: String.t() | nil,
          position: String.t(),
          profile_image: Image.t()
        }

  def from_api(data) do
    %__MODULE__{
      id: field_value(data, "nid"),
      bio: handle_html(field_value(data, "field_bio")),
      name: field_value(data, "title"),
      path_alias: parse_path_alias(data),
      position: field_value(data, "field_position"),
      profile_image: parse_image(data, "field_profile_image")
    }
  end
end
