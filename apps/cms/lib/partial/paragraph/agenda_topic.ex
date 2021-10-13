defmodule CMS.Partial.Paragraph.AgendaTopic do
  @moduledoc """
  A paragraph for agenda topics (used exclusively by CMS.Page.Agenda).
  """

  alias CMS.Partial.Paragraph.AgendaSubTopic
  alias Phoenix.HTML

  import CMS.Helpers,
    only: [
      field_value: 2,
      handle_html: 1,
      parse_paragraphs: 3
    ]

  defstruct title: "",
            video_bookmark: nil,
            description: HTML.raw(""),
            sub_topics: []

  @type t :: %__MODULE__{
          title: String.t(),
          video_bookmark: String.t() | nil,
          description: HTML.safe(),
          sub_topics: [AgendaSubTopic.t()]
        }

  @spec from_api(map, Keyword.t()) :: t
  def from_api(data, preview_opts \\ []) do
    %__MODULE__{
      title: field_value(data, "field_topic_title"),
      video_bookmark: field_value(data, "field_video_bookmark"),
      description: data |> field_value("field_agenda_topic_description") |> handle_html,
      sub_topics: parse_paragraphs(data, preview_opts, "field_sub_topics")
    }
  end
end
