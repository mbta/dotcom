defmodule CMS.Page.Event do
  @moduledoc """
  Represents an "event" content type in the Drupal CMS.
  """

  import Phoenix.HTML, only: [raw: 1]

  import CMS.Helpers,
    only: [
      field_value: 2,
      int_or_string_to_int: 1,
      parse_body: 1,
      parse_iso_datetime: 1,
      handle_html: 1,
      parse_files: 2,
      parse_paragraphs: 2,
      path_alias: 1
    ]

  alias CMS.Field.File
  alias CMS.Partial.Paragraph
  alias Phoenix.HTML

  defstruct id: nil,
            start_time: nil,
            end_time: nil,
            title: "",
            location: nil,
            street_address: nil,
            city: nil,
            state: nil,
            who: nil,
            body: raw(""),
            notes: raw(""),
            agenda: raw(""),
            meeting_id: nil,
            imported_address: nil,
            files: [],
            agenda_file: nil,
            minutes_file: nil,
            path_alias: nil,
            paragraphs: []

  @type t :: %__MODULE__{
          id: integer | nil,
          start_time: DateTime.t() | nil,
          end_time: DateTime.t() | nil,
          title: String.t() | nil,
          location: String.t() | nil,
          street_address: String.t() | nil,
          city: String.t() | nil,
          state: String.t() | nil,
          who: String.t() | nil,
          body: HTML.safe(),
          notes: HTML.safe() | nil,
          agenda: HTML.safe() | nil,
          meeting_id: String.t() | nil,
          imported_address: HTML.safe(),
          files: [File.t()],
          agenda_file: File.t() | nil,
          minutes_file: File.t() | nil,
          path_alias: String.t() | nil,
          paragraphs: [Paragraph.t()]
        }

  @spec from_api(map, Keyword.t()) :: t
  def from_api(%{} = data, preview_opts \\ []) do
    %__MODULE__{
      id: int_or_string_to_int(field_value(data, "nid")),
      start_time: parse_iso_datetime(field_value(data, "field_start_time")),
      end_time: parse_iso_datetime(field_value(data, "field_end_time")),
      title: field_value(data, "title"),
      location: field_value(data, "field_location"),
      street_address: field_value(data, "field_street_address"),
      city: field_value(data, "field_city"),
      state: field_value(data, "field_state"),
      who: field_value(data, "field_who"),
      body: parse_body(data),
      notes: data |> field_value("field_notes") |> parse_optional_html(),
      agenda: data |> field_value("field_agenda") |> parse_optional_html(),
      imported_address: handle_html(field_value(data, "field_imported_address")),
      meeting_id: field_value(data, "field_meeting_id"),
      files: parse_files(data, "field_other_files"),
      agenda_file: List.first(parse_files(data, "field_agenda_file")),
      minutes_file: List.first(parse_files(data, "field_minutes_file")),
      path_alias: path_alias(data),
      paragraphs: parse_paragraphs(data, preview_opts)
    }
  end

  @spec past?(t, Date.t()) :: boolean
  def past?(event, now) do
    Date.compare(event.start_time, now) == :lt
  end

  @spec parse_optional_html(String.t() | nil) :: HTML.safe() | nil
  defp parse_optional_html(nil), do: nil
  defp parse_optional_html(value), do: handle_html(value)
end
