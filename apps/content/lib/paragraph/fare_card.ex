defmodule Content.Paragraph.FareCard do
  @moduledoc """
  Represents a Fare Card paragraph type from the CMS.
  """

  alias Content.Field.Link
  alias Content.Helpers
  alias Content.Paragraph.CustomHTML

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

  @spec from_api(map) :: t
  def from_api(data) do
    with fare_token <- fare_token(data),
         note <- note(data) do
      %__MODULE__{
        fare_token: fare_token,
        note: note,
        link: nil,
        show_media: Helpers.field_value(data, "field_fare_media")
      }
    end
  end

  defp fare_token(data) do
    data
    |> Helpers.field_value("field_fare_request")
    |> parse_token()
  end

  defp note(data) do
    data
    |> Map.get("field_fare_notes", [])
    |> Enum.map(&CustomHTML.from_api/1)
    # There is only ever 1 note element
    |> List.first()
  end

  # Parse the liquid object syntax and remove the "fare:" prefix to get the
  # token in the format expected by `Site.ContentRewriters.LiquidObjects.Fare`
  defp parse_token(input) do
    Regex.replace(~r/\{\{(.*)\}\}/U, input, fn _, str ->
      str
      |> String.trim()
      |> String.replace_leading("fare:", "")
    end)
  end
end
