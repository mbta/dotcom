defmodule CMS.Partial.Paragraph.FareCard do
  @moduledoc """
  Represents a Fare Card paragraph type from the CMS.
  """

  import CMS.Helpers, only: [field_value: 2, parse_link: 2, parse_paragraphs: 3]

  alias CMS.Field.Link
  alias CMS.Partial.Paragraph.CustomHTML

  defstruct fare_token: "",
            note: nil,
            link: nil,
            show_media: true

  @type t :: %__MODULE__{
          fare_token: String.t(),
          note: CustomHTML.t(),
          link: Link.t() | nil,
          show_media: boolean()
        }

  def from_api(data, preview_opts \\ []) do
    with fare_token <- fare_token(data),
         note <- note(data, preview_opts) do
      %__MODULE__{
        fare_token: fare_token,
        note: note,
        link: parse_link(data, "field_card_link"),
        show_media: field_value(data, "field_fare_media")
      }
    end
  end

  defp fare_token(data) do
    data
    |> field_value("field_fare_request")
    |> parse_token()
  end

  defp note(data, preview_opts) do
    data
    |> parse_paragraphs(preview_opts, "field_fare_notes")
    # There is only ever 1 note element
    |> List.first()
  end

  # Parse the liquid object syntax and remove the "fare:" prefix to get the
  # token in the format expected by `Dotcom.ContentRewriters.LiquidObjects.Fare`
  defp parse_token(input) do
    Regex.replace(~r/\{\{(.*)\}\}/U, input, fn _, str ->
      str
      |> String.trim()
      |> String.replace_leading("fare:", "")
    end)
  end
end
