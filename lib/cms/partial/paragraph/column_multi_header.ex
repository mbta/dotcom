defmodule CMS.Partial.Paragraph.ColumnMultiHeader do
  @moduledoc """
  Header content that can appear above a set of columns.
  """
  alias CMS.Helpers
  alias Phoenix.HTML

  defstruct text: HTML.raw("")

  @type t :: %__MODULE__{
          text: HTML.safe()
        }

  def from_api(data) do
    %__MODULE__{
      text: data |> Helpers.field_value("field_header_text") |> Helpers.handle_html()
    }
  end
end
