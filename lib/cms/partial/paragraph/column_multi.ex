defmodule CMS.Partial.Paragraph.ColumnMulti do
  @moduledoc """
  A set of columns to organize layout on the page.
  """
  import CMS.Helpers, only: [field_value: 2, parse_paragraphs: 3]

  alias CMS.Partial.Paragraph.Column
  alias CMS.Partial.Paragraph.ColumnMultiHeader
  alias CMS.Partial.Paragraph.DescriptiveLink
  alias CMS.Partial.Paragraph.FareCard

  defstruct header: nil,
            columns: [],
            display_options: "default",
            right_rail: false

  @type t :: %__MODULE__{
          header: ColumnMultiHeader.t() | nil,
          columns: [Column.t()],
          display_options: String.t(),
          right_rail: boolean
        }

  @spec from_api(map, Keyword.t()) :: t
  def from_api(data, preview_opts \\ []) do
    %__MODULE__{
      header: data |> parse_paragraphs(preview_opts, "field_multi_column_header") |> List.first(),
      columns: parse_paragraphs(data, preview_opts, "field_column"),
      display_options: field_value(data, "field_display_options"),
      right_rail: field_value(data, "field_right_rail")
    }
  end

  @doc "Create a default Paragraph type with optional overrides"
  @spec new(Keyword.t()) :: __MODULE__.t()
  def new(opts \\ []), do: struct(__MODULE__, opts)

  @spec grouped?(__MODULE__.t()) :: boolean
  def grouped?(%__MODULE__{display_options: "grouped"}), do: true
  def grouped?(_), do: false

  @spec includes?(__MODULE__.t(), atom) :: boolean
  def includes?(%__MODULE__{columns: columns}, type) do
    columns
    |> Enum.flat_map(& &1.paragraphs)
    |> Enum.any?(&matches?(&1, type))
  end

  @spec matches?(__MODULE__.t(), atom) :: boolean
  defp matches?(%FareCard{}, :fares), do: true
  defp matches?(%DescriptiveLink{}, :links), do: true
  defp matches?(_, _), do: false
end
