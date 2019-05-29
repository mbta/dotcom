defmodule Content.WhatsHappeningItem do
  alias Content.Field.{Image, Link}
  import Content.Helpers, only: [field_value: 2, parse_link: 2, parse_image: 2, category: 1]

  defstruct blurb: "",
            title: "",
            category: "",
            link: nil,
            image: nil,
            utm_url: nil

  @type t :: %__MODULE__{
          blurb: String.t() | nil,
          title: String.t() | nil,
          category: String.t(),
          link: Link.t() | nil,
          image: Image.t(),
          utm_url: String.t() | nil
        }

  @spec from_api(map) :: t
  def from_api(%{} = data) do
    %__MODULE__{
      blurb: field_value(data, "field_wh_blurb"),
      title: field_value(data, "title"),
      category: category(data),
      link: parse_link(data, "field_wh_link"),
      image: parse_image(data, "field_image"),
      utm_url: nil
    }
  end
end
