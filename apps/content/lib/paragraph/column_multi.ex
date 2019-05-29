defmodule Content.Paragraph.ColumnMulti do
  @moduledoc """
  A set of columns to organize layout on the page.
  """
  import Content.Helpers, only: [field_value: 2]
  import Content.Paragraph, only: [parse_header: 1]

  alias Content.Paragraph.{Column, ColumnMultiHeader, DescriptiveLink, FareCard}

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

  @spec from_api(map) :: t
  def from_api(data) do
    columns =
      data
      |> Map.get("field_column", [])
      |> Enum.map(&Column.from_api/1)

    %__MODULE__{
      header: parse_header(data),
      columns: columns,
      display_options: field_value(data, "field_display_options"),
      right_rail: field_value(data, "field_right_rail")
    }
  end

  @doc "Create a default Paragraph type with optional overrides"
  @spec new(Keyword.t()) :: __MODULE__.t()
  def new(opts \\ []), do: struct(__MODULE__, opts)

  @spec is_grouped?(__MODULE__.t()) :: boolean
  def is_grouped?(%__MODULE__{display_options: "grouped"}), do: true
  def is_grouped?(_), do: false

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
