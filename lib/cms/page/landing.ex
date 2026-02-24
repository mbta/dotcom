defmodule CMS.Page.Landing do
  @moduledoc "Represents a 'Landing Page' type in the Drupal CMS"

  import CMS.Helpers,
    only: [
      field_value: 2,
      parse_image: 2,
      parse_paragraphs: 2
    ]

  alias CMS.Breadcrumbs
  alias CMS.Field.Image
  alias CMS.Partial.Paragraph

  @enforce_keys [:id]
  defstruct [
    :id,
    title: "",
    subtitle: nil,
    hero_desktop: nil,
    hero_mobile: nil,
    hero_mobile_2x: nil,
    paragraphs: [],
    breadcrumbs: []
  ]

  @type t :: %__MODULE__{
          id: integer,
          title: String.t(),
          hero_desktop: Image.t(),
          hero_mobile: Image.t(),
          hero_mobile_2x: Image.t(),
          paragraphs: [Paragraph.t()],
          subtitle: String.t() | nil,
          breadcrumbs: [Util.Breadcrumb.t()]
        }

  @spec from_api(map, Keyword.t()) :: t
  def from_api(%{} = data, preview_opts \\ []) do
    %__MODULE__{
      id: field_value(data, "nid"),
      title: field_value(data, "title"),
      hero_desktop: parse_image(data, "field_hero_image_desktop"),
      hero_mobile: parse_image(data, "field_hero_image_mobile"),
      hero_mobile_2x: parse_image(data, "field_hero_image_mobile_2x"),
      paragraphs: parse_paragraphs(data, preview_opts),
      subtitle: field_value(data, "field_subtitle"),
      breadcrumbs: Breadcrumbs.build(data)
    }
  end
end
