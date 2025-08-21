defmodule CMS.Partial.Teaser do
  @moduledoc """
  A short, simplified representation of any our content types.
  Fed by the /cms/teasers CMS API endpoint.

  NOTE: `%Teaser{}` components should never be directly rendered
  onto a page. Normally these are children of the ContentList struct,
  which renders them within the _teaser_list template automatically.
  """
  import CMS.Helpers,
    only: [
      content_type: 1,
      content: 1,
      int_or_string_to_int: 1,
      routes: 1
    ]

  import CMS.Page.Event, only: [started_status: 2]

  alias CMS.{API, Field.Image}

  @type started_status :: CMS.Page.Event.status()

  @enforce_keys [:id, :type, :path, :title]
  defstruct [
    :id,
    :type,
    :path,
    :title,
    image: nil,
    text: nil,
    topic: nil,
    date: nil,
    date_end: nil,
    started_status: nil,
    location: nil,
    routes: [],
    status: nil
  ]

  @type display_field ::
          :image
          | :title
          | :date
          | :topic
          | :location
          | :summary

  @type location :: [
          place: String.t() | nil,
          address: String.t() | nil,
          city: String.t() | nil,
          state: String.t() | nil
        ]

  @type t :: %__MODULE__{
          id: integer,
          type: API.type(),
          path: String.t(),
          title: String.t(),
          image: Image.t() | nil,
          text: String.t() | nil,
          topic: String.t() | nil,
          date: Date.t() | DateTime.t() | nil,
          date_end: DateTime.t() | nil,
          started_status: started_status | nil,
          location: location() | nil,
          routes: [API.route_term()],
          status: String.t() | nil
        }

  def from_api(
        %{
          "image_uri" => image_path,
          "image_alt" => image_alt,
          "path" => path,
          "text" => text,
          "title" => title,
          "type" => type,
          "topic" => topic,
          "nid" => id,
          "field_related_transit" => route_data
        } = data
      ) do
    status = Map.get(data, "field_project_status")
    date_start = date(data, "start")
    date_end = date(data, "end")

    %__MODULE__{
      id: int_or_string_to_int(id),
      type: content_type(type),
      path: path,
      title: content(title),
      image: image(image_path, image_alt),
      text: content(text),
      topic: content(topic),
      location: data |> location(),
      date: date_start,
      date_end: date_end,
      started_status: started_status(date_start, date_end),
      routes: routes(route_data),
      status: content(status)
    }
  end

  defp date(%{"type" => type, "posted" => date}, _)
       when type in ["news_entry", "project_update"] do
    do_date(date)
  end

  # project types have a required "Updated On" date field.
  defp date(%{"type" => "project", "updated" => date}, _) do
    do_date(date)
  end

  # event types have a required "Start Time" date field.
  defp date(%{"type" => "event"} = event, index) do
    do_datetime(Map.get(event, index))
  end

  # Emulate /cms/teasers endpoint and fall back to creation date when:
  # A: :sort_by and :sort_order have not been set OR
  # B: The results are all basic page type content items.
  # *: All content types have this core field date.
  defp date(%{"created" => date}, _) do
    do_date(date)
  end

  defp do_date(date) do
    case Timex.parse(date, "{YYYY}-{M}-{D}") do
      {:ok, dt} -> NaiveDateTime.to_date(dt)
      {:error, _} -> nil
    end
  end

  # The Event start time includes time and timezone data
  defp do_datetime(date) do
    case NaiveDateTime.from_iso8601(date) do
      {:ok, date_time} -> date_time
      {:error, _} -> nil
    end
  end

  defp image("", _), do: nil
  defp image(uri, alt), do: struct(Image, url: uri, alt: alt)

  # Event location is sent in the form of a pipe-separated string:
  # Ex: "place|address|city|state" (any of the slots may be "").
  defp location(%{"type" => "event", "location" => piped_string}) do
    location =
      piped_string
      |> String.split("|")
      |> Enum.zip([:place, :address, :city, :state])
      |> Keyword.new(fn {v, k} -> {k, content(v)} end)

    if Enum.all?(location, &match?({_, nil}, &1)), do: nil, else: location
  end

  defp location(_not_an_event) do
    nil
  end
end
