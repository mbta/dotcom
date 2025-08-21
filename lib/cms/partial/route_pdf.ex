defmodule CMS.Partial.RoutePdf do
  @moduledoc """
  Represents metadata about all the pdfs we have associated with a route.
  """

  import CMS.Helpers, only: [field_value: 2, parse_date: 2, parse_files: 2]

  @enforce_keys [:path, :date_start]
  defstruct [
    :path,
    :date_start,
    :name,
    date_end: nil,
    link_text_override: nil
  ]

  @type t :: %__MODULE__{
          path: String.t(),
          date_start: Date.t(),
          date_end: Date.t(),
          link_text_override: String.t(),
          # Once we move off the old endpoint, we can remove the `| nil`
          name: String.t() | nil
        }

  def from_api(data) do
    %__MODULE__{
      path:
        data
        |> parse_files("field_route_pdf")
        |> List.first()
        |> Map.get(:url)
        |> URI.parse()
        |> Map.get(:path),
      date_start: parse_date(data, "field_pdf_date_start"),
      date_end: parse_date(data, "field_pdf_date_end"),
      link_text_override: field_value(data, "field_link_text_override"),
      name: field_value(data, "name")
    }
  end

  def custom?(%__MODULE__{link_text_override: text}) do
    text != nil and text != ""
  end

  def started?(%__MODULE__{date_start: date_start}, date) do
    Date.compare(date_start, date) != :gt
  end

  def outdated?(%__MODULE__{date_end: date_end}, date) do
    date_end != nil && Date.compare(date_end, date) == :lt
  end
end
