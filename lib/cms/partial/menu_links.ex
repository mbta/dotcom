defmodule CMS.Partial.MenuLinks do
  @moduledoc """
  Represents a "Menu Links" content type in the Drupal CMS.
  """

  import CMS.Helpers, only: [field_value: 2, handle_html: 1]

  alias CMS.Field.Link
  alias Phoenix.HTML

  defstruct title: "", blurb: HTML.raw(""), links: []

  @type t :: %__MODULE__{
          title: String.t(),
          blurb: HTML.safe(),
          links: [Link.t()]
        }

  def from_api(%{"type" => [%{"target_id" => "menu_links"}]} = data) do
    %__MODULE__{
      title: field_value(data, "title"),
      blurb: parse_blurb(data),
      links: Enum.map(data["field_links"], &Link.from_api(&1))
    }
  end

  defp parse_blurb(data) do
    data
    |> field_value("field_blurb")
    |> handle_html
  end
end
