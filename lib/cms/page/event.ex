defmodule CMS.Page.Event do
  @moduledoc """
  Represents an "event" content type in the Drupal CMS.
  """

  import CMS.Helpers,
    only: [
      field_value: 2,
      int_or_string_to_int: 1,
      parse_body: 1,
      parse_iso_datetime: 1,
      handle_html: 1,
      parse_files: 2,
      parse_link: 2,
      parse_paragraphs: 2,
      path_alias: 1
    ]

  import Phoenix.HTML, only: [raw: 1]

  import Util,
    only: [time_is_greater_or_equal?: 2, date_to_naive_date: 1, now: 0]

  alias CMS.Field.File
  alias CMS.Field.Link
  alias CMS.Page.EventAgenda
  alias CMS.Partial.Paragraph
  alias Phoenix.HTML

  @type status :: :not_started | :started | :ended

  defstruct id: nil,
            start_time: nil,
            end_time: nil,
            started_status: nil,
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
            paragraphs: [],
            registration_link: nil,
            livestream_link: nil,
            event_agenda: nil

  @type t :: %__MODULE__{
          id: integer | nil,
          start_time: DateTime.t() | nil,
          end_time: DateTime.t() | nil,
          started_status: status | nil,
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
          paragraphs: [Paragraph.t()],
          registration_link: Link.t() | nil,
          livestream_link: Link.t() | nil,
          event_agenda: EventAgenda.t() | nil
        }

  @spec from_api(map, Keyword.t()) :: t
  def from_api(%{} = data, preview_opts \\ []) do
    start_time = parse_iso_datetime(field_value(data, "field_start_time"))
    end_time = parse_iso_datetime(field_value(data, "field_end_time"))

    event_agenda =
      case field_value(data, "field_agenda_reference") do
        %{} = agenda_page -> EventAgenda.from_api(agenda_page, preview_opts)
        _ -> nil
      end

    %__MODULE__{
      id: int_or_string_to_int(field_value(data, "nid")),
      start_time: start_time,
      end_time: end_time,
      started_status: started_status(start_time, end_time),
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
      paragraphs: parse_paragraphs(data, preview_opts),
      registration_link: parse_link(data, "field_registration_url"),
      livestream_link: parse_link(data, "field_livestream_url"),
      event_agenda: event_agenda
    }
  end

  @spec started_status(
          NaiveDateTime.t() | DateTime.t() | Date.t(),
          NaiveDateTime.t() | DateTime.t() | nil
        ) :: status | nil
  # Events have DateTime start/ends.  Teasers have NaiveDateTimes OR Dates.
  # Events will always have a start time, but unsure if teasers will. Handle :nil
  def started_status(nil, _), do: nil

  def started_status(%NaiveDateTime{} = start, %NaiveDateTime{} = stop) do
    now = DateTime.to_naive(now())

    cond do
      time_is_greater_or_equal?(now, stop) -> :ended
      time_is_greater_or_equal?(now, start) -> :started
      true -> :not_started
    end
  end

  def started_status(%NaiveDateTime{} = start, nil) do
    now_dt = now()

    cond do
      Date.compare(now_dt, start) === :gt -> :ended
      time_is_greater_or_equal?(DateTime.to_naive(now_dt), start) -> :started
      true -> :not_started
    end
  end

  def started_status(start, stop) do
    started_status(
      date_to_naive_date(start),
      if(is_nil(stop), do: nil, else: date_to_naive_date(stop))
    )
  end

  @spec parse_optional_html(String.t() | nil) :: HTML.safe() | nil
  defp parse_optional_html(nil), do: nil
  defp parse_optional_html(value), do: handle_html(value)
end
