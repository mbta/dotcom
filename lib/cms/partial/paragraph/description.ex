defmodule CMS.Partial.Paragraph.Description do
  @moduledoc """
  A description term-details pair within a DescriptionList.
  """

  alias CMS.Helpers
  alias Phoenix.HTML

  defstruct term: HTML.raw(""),
            details: HTML.raw("")

  @type t :: %__MODULE__{
          term: HTML.safe(),
          details: HTML.safe()
        }

  def from_api(data) do
    term =
      data
      |> Helpers.field_value("field_custom_html_body")
      |> Helpers.handle_html()

    details =
      data
      |> Map.get("field_term_description", [])
      |> List.first()
      |> Helpers.field_value("field_custom_html_body")
      |> Helpers.handle_html()

    %__MODULE__{
      term: term,
      details: details
    }
  end
end
