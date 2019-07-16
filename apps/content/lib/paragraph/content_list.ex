defmodule Content.Paragraph.ContentList do
  @moduledoc """
  A content list paragraph (optionally including a header) from the CMS.
  This paragraph provides a formula for retreiving a dynamic list of
  content items from the CMS via the `/cms/teasers` API endpoint.
  """
  import Content.Helpers, only: [field_value: 2, int_or_string_to_int: 1, content_type: 1]
  import Content.Paragraph, only: [parse_header: 1]

  alias Content.{Field.Link, Paragraph.ColumnMultiHeader, Repo, Teaser}

  defstruct header: nil,
            right_rail: false,
            ingredients: %{},
            recipe: [],
            teasers: [],
            more_link: nil

  @type order :: :DESC | :ASC

  @type text_or_nil :: String.t() | nil

  @type t :: %__MODULE__{
          header: ColumnMultiHeader.t() | nil,
          right_rail: boolean(),
          ingredients: map(),
          recipe: Keyword.t(),
          teasers: [Teaser.t()],
          more_link: Link.t() | nil
        }

  @spec from_api(map) :: t
  def from_api(data) do
    terms =
      data
      |> Map.get("field_terms", [])
      |> Enum.map(& &1["target_id"])
      |> Enum.reject(&is_nil(&1))

    ingredients = %{
      terms: terms,
      term_depth: field_value(data, "field_term_depth"),
      items_per_page: field_value(data, "field_number_of_items"),
      type: data |> field_value("field_content_type") |> content_type(),
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
      sort_order: data |> field_value("field_sorting_logic") |> order()
    }

    recipe = combine(ingredients)

    more_link =
      setup_link(
        ingredients,
        field_value(data, "field_more_link_behavior"),
        field_value(data, "field_more_link"),
        field_value(data, "field_more_text")
      )

    %__MODULE__{
      header: parse_header(data),
      right_rail: field_value(data, "field_right_rail"),
      ingredients: ingredients,
      recipe: recipe,
      more_link: more_link
    }
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

  # If no terms are found, discard term and depth data
  defp combine(%{terms: []} = ingredients) do
    ingredients
    |> Map.drop([:terms, :term_depth])
    |> combine()
  end

  # If the default term depth is found, discard depth and compose arguments
  defp combine(%{terms: terms, term_depth: 4} = ingredients) do
    ingredients
    |> Map.drop([:terms, :term_depth])
    |> Map.put(:args, terms)
    |> combine()
  end

  # If we are using a non-standard depth, all arguments must be set if terms are present
  defp combine(%{terms: terms, term_depth: depth} = ingredients) do
    args_with_depth =
      case terms do
        [a] -> [a, "any", depth]
        [a, b] -> [a, b, depth]
      end

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
  defp combine(%{date_op: "between", date_min: min, date_max: max} = ingredients)
       when is_nil(min) or is_nil(max) do
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
  defp combine(%{date_op: op, date_min: nil} = ingredients)
       when op in ["<", ">="] do
    ingredients
    |> Map.drop([:date_min, :date_max])
    |> Map.put(:date, value: "now")
    |> combine()
  end

  # Otherwise, use the specific date the author provided for the date value.
  defp combine(%{date_op: op, date_min: date} = ingredients)
       when op in ["<", ">="] do
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
  defp limit_count_by_type(%{type: type} = ingredients)
       when type in [:project_update, :project, :diversion] do
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

  @spec setup_link(map(), text_or_nil, text_or_nil, text_or_nil) :: Link.t() | nil
  defp setup_link(ingredients, "show", nil, nil) do
    default_link(ingredients)
  end

  defp setup_link(ingredients, "show", url, title) do
    custom_link(ingredients, url, title)
  end

  defp setup_link(_, "hide", _, _) do
    nil
  end

  defp setup_link(ingredients, _auto, _, _) do
    default_link(ingredients)
  end

  @spec custom_link(map, text_or_nil, text_or_nil) :: Link.t() | nil
  defp custom_link(ingredients, url, nil) do
    ingredients
    |> default_link()
    |> Map.put(:url, url)
  end

  defp custom_link(ingredients, nil, title) do
    ingredients
    |> default_link()
    |> Map.put(:title, title)
  end

  defp custom_link(_, _, _) do
    nil
  end

  @spec default_link(map) :: Link.t()
  defp default_link(%{host_id: id, type: :project_update}) do
    %Link{
      title: "View all project updates",
      url: "/projects/#{id}/updates"
    }
  end

  defp default_link(%{type: :event}) do
    %Link{
      title: "View all events",
      url: "/events"
    }
  end

  defp default_link(%{type: :news_entry}) do
    %Link{
      title: "View all news",
      url: "/news"
    }
  end

  defp default_link(%{type: :project}) do
    %Link{
      title: "View all projects",
      url: "/projects"
    }
  end

  defp default_link(_) do
    nil
  end
end
