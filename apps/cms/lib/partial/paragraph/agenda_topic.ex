defmodule CMS.Partial.Paragraph.AgendaTopic do
  @moduledoc """
  A paragraph for agenda topics (used exclusively by CMS.Page.Agenda).
  """

  alias Phoenix.HTML

  import CMS.Helpers,
    only: [
      field_value: 2,
      handle_html: 1
    ]

  defstruct title: "",
            bookmark: "",
            description: HTML.raw("")

  @type t :: %__MODULE__{
          title: String.t(),
          bookmark: String.t(),
          description: HTML.safe()
        }

  @spec from_api(map) :: t
  def from_api(data) do
    %__MODULE__{
      title: field_value(data, "field_topic_title"),
      bookmark: field_value(data, "field_video_bookmark"),
      description: data |> field_value("field_agenda_topic_description") |> handle_html
    }
  end
end
