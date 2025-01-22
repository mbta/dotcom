defmodule CMS.Partial.Paragraph.ContentList do
  @moduledoc """
  A content list paragraph (optionally including a header) from the CMS.
  This paragraph provides a formula for retreiving a dynamic list of
  content items from the CMS via the `/cms/teasers` API endpoint.

  For API documentation, see https://github.com/mbta/cms/blob/master/API.md#teasers
  """
  import CMS.Helpers,
    only: [
      field_value: 2,
      field_values: 2,
      int_or_string_to_int: 1,
      content_type: 1,
      parse_link: 2,
      parse_paragraphs: 3
    ]

  alias CMS.Partial.Paragraph.ColumnMultiHeader
  alias CMS.Partial.Teaser
  alias CMS.Repo

  defstruct header: nil,
            right_rail: false,
            display_fields: [],
            ingredients: %{},
            recipe: [],
            teasers: [],
            cta: %{}

  @type order :: :DESC | :ASC | nil
  @type text_or_nil :: String.t() | nil

  @type t :: %__MODULE__{
          header: ColumnMultiHeader.t() | nil,
          right_rail: boolean(),
          display_fields: [Teaser.display_field()],
          ingredients: map(),
          recipe: Keyword.t(),
          teasers: [Teaser.t()],
          cta: map()
        }

  @spec from_api(map, Keyword.t()) :: t
  def from_api(data, preview_opts \\ []) do
    type =
      data
      |> field_value("field_content_type")
      |> content_type()
      |> case do
        nil -> nil
        type -> [type]
      end

    ingredients = %{
      type: type,
      terms: [field_value(data, "field_terms"), field_value(data, "field_routes")],
      term_depth: field_value(data, "field_term_depth"),
      items_per_page: field_value(data, "field_number_of_items"),
      type_op: field_value(data, "field_type_logic"),
      promoted: field_value(data, "field_promoted"),
      sticky: field_value(data, "field_sticky"),
      relationship: field_value(data, "field_relationship"),
      except: field_value(data, "field_content_logic"),
      content_id: field_value(data, "field_content_reference"),
      host_id: data |> field_value("parent_id") |> int_or_string_to_int(),
      date_op: field_value(data, "field_date_logic"),
      date_min: field_value(data, "field_date"),
      date_max: field_value(data, "field_date_max"),
      sort_by: field_value(data, "field_sorting"),
      sort_order: data |> field_value("field_sorting_logic") |> order()
    }

    cta_link = parse_link(data, "field_cta_link")

    cta = %{
      behavior: field_value(data, "field_cta_behavior"),
      text: field_value(data, "field_cta_text"),
      url: cta_link && Map.get(cta_link, :url)
    }

    recipe = combine(ingredients)

    %__MODULE__{
      header: data |> parse_paragraphs(preview_opts, "field_multi_column_header") |> List.first(),
      right_rail: field_value(data, "field_right_rail"),
      display_fields: data |> field_values("field_teaser_field_display") |> field_options(),
      ingredients: ingredients,
      recipe: recipe,
      cta: cta
    }
  end

  @spec field_options([map]) :: [Teaser.display_field()]
  defp field_options(visible_fields) do
    Enum.map(visible_fields, &String.to_existing_atom/1)
  end

  @spec fetch_teasers(t()) :: t()
  def fetch_teasers(%__MODULE__{recipe: opts} = content_list) do
    %{content_list | teasers: Repo.teasers(opts)}
  end

  # Some ingredients need to be transformed, merged, or otherwise
  # post-processed in order to be compatible with the CMS endpoint.
  @spec combine(map) :: Keyword.t()
  # If no relationship data is found, discard all related data
  defp combine(%{relationship: nil, except: nil} = ingredients) do
    ingredients
    |> Map.drop([:except, :relationship, :host_id, :content_id])
    |> combine()
  end

  # If author has selected "except," update relationship type
  defp combine(%{relationship: nil} = ingredients) do
    ingredients
    |> Map.put(:relationship, "except")
    |> combine()
  end

  # If relating by host page, discard content ID and update relationship type
  defp combine(%{relationship: "host", host_id: id} = ingredients) do
    ingredients
    |> Map.drop([:host_id, :content_id])
    |> Map.put(:relationship, "related_to")
    |> Map.put(:id, id)
    |> combine()
  end

  # If a specific content ID is not present, use the default host ID and discard the placeholders
  defp combine(%{content_id: nil, host_id: id} = ingredients) do
    ingredients
    |> Map.drop([:host_id, :content_id])
    |> Map.put(:id, id)
    |> combine()
  end

  # Otherwise, if a specific content ID is present, use that and discard the host page ID
  defp combine(%{content_id: id, host_id: _} = ingredients) do
    ingredients
    |> Map.drop([:host_id, :content_id])
    |> Map.put(:id, id)
    |> combine()
  end

  # Compose the API query param for the relationship using final ID
  defp combine(%{relationship: relationship, id: id} = ingredients) do
    ingredients
    |> Map.drop([:except, :relationship, :id])
    |> Map.put(String.to_atom(relationship), id)
    |> combine()
  end

  # If no terms are present, drop all term arguments
  defp combine(%{terms: [nil, nil]} = ingredients) do
    ingredients
    |> Map.drop([:terms, :term_depth])
    |> combine()
  end

  # Compose arguments and term depth, setting defaults where needed
  defp combine(%{terms: terms, term_depth: depth} = ingredients) do
    args_with_depth =
      terms
      |> Enum.map(fn x -> (is_nil(x) && "any") || x end)
      |> List.insert_at(-1, depth)

    ingredients
    |> Map.drop([:terms, :term_depth])
    |> Map.put(:args, args_with_depth)
    |> combine()
  end

  # Discard all date criteria if no date operator has been set
  defp combine(%{date_op: nil} = ingredients) do
    ingredients
    |> Map.drop([:date_op, :date_min, :date_min])
    |> combine()
  end

  # Check if required min and max values are present when using :between.
  # If either or both min and max are nil, discard all date information.
  defp combine(%{date_op: "between", date_min: min, date_max: max} = ingredients) when is_nil(min) or is_nil(max) do
    ingredients
    |> Map.drop([:date_op, :date_min, :date_max])
    |> combine()
  end

  # For valid date range, add and format :date param
  defp combine(%{date_op: "between", date_min: min, date_max: max} = ingredients) do
    ingredients
    |> Map.drop([:date_min, :date_max])
    |> Map.put(:date, min: min, max: max)
    |> combine()
  end

  # Use relative time "now" if date operator is specified without specific date.
  defp combine(%{date_op: op, date_min: nil} = ingredients) when op in ["<", ">="] do
    ingredients
    |> Map.drop([:date_min, :date_max])
    |> Map.put(:date, value: "now")
    |> combine()
  end

  # Otherwise, use the specific date the author provided for the date value.
  defp combine(%{date_op: op, date_min: date} = ingredients) when op in ["<", ">="] do
    ingredients
    |> Map.drop([:date_min, :date_max])
    |> Map.put(:date, value: date)
    |> combine()
  end

  # Ingredients are ready to bake into opts for endpoint call. Discard
  # all nil values and converts remaining ingredients to a list
  defp combine(ingredients) do
    ingredients
    |> limit_count_by_type()
    |> Enum.reject(fn {_k, v} -> is_nil(v) end)
  end

  # Limit amount of teasers when certain types are requested
  @spec limit_count_by_type(map) :: map
  defp limit_count_by_type(%{type: [type], items_per_page: items} = ingredients)
       when type in [:project_update, :project] and items > 2 do
    Map.put(ingredients, :items_per_page, 2)
  end

  defp limit_count_by_type(ingredients) do
    ingredients
  end

  # Convert order value strings to atoms
  @spec order(text_or_nil) :: order()
  defp order("ASC"), do: :ASC
  defp order("DESC"), do: :DESC
  defp order(_), do: nil
end
