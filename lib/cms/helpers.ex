defmodule CMS.Helpers do
  @moduledoc """
  Various helper functions that aid in parsing CMS JSON data.
  """

  alias CMS.API
  alias CMS.CustomHTML5Scrubber
  alias CMS.Field.{File, Image, Link}
  alias CMS.Partial.Paragraph
  alias Phoenix.HTML

  @static_path "/sites/default/files"

  @doc """
  Each CMS entity hosts a variety of fields which all
  follow common patterns, depending on the field type:
  - Long text field (optional: with summary):
    - value: raw database value from user input
    - processed: Drupal's post-processed (safer) value
    - summary: A plain-text value separate from above
  - Entity reference field (collapsed)
    - target_id: a integer value of another entity
  - Entity reference field (expanded)
    - the entire map is the page struct
  - default: most other fields
    - value: mixed type, but most common pattern
  """
  @spec field_value(map, String.t()) :: any
  def field_value(entity, field) do
    case entity[field] do
      [%{"processed" => value}] -> value
      [%{"value" => value}] -> value
      [%{"target_id" => value}] -> value
      [%{"nid" => _} = node] -> node
      _ -> nil
    end
  end

  @doc """
  Handles entity fields that support multiple values.
  Common patterns above apply here.
  """
  @spec field_values(map, String.t()) :: [map]
  def field_values(entity, field) do
    entity
    |> Map.get(field, [])
    |> Enum.map(&Map.get(&1, "value"))
  end

  @spec handle_html(String.t() | nil) :: HTML.safe()
  def handle_html(html) do
    (html || "")
    |> CustomHTML5Scrubber.html5()
    |> rewrite_static_file_links
    |> HTML.raw()
  end

  @spec parse_body(map) :: HTML.safe()
  def parse_body(%{} = data) do
    data
    |> field_value("body")
    |> handle_html
  end

  @spec parse_files(map, String.t()) :: [File.t()]
  def parse_files(%{} = data, field) do
    data
    |> Map.get(field, [])
    |> Enum.map(&File.from_api/1)
  end

  @spec parse_page_types(map) :: list(String.t())
  def parse_page_types(%{} = data) do
    data
    |> Map.get("field_page_type", [])
    |> Kernel.get_in([Access.all(), "name"])
    |> Enum.reject(&Kernel.is_nil/1)
  end

  @spec parse_related_transit(map) :: list(String.t())
  def parse_related_transit(%{} = data) do
    data
    |> Map.get("field_related_transit", [])
    |> Kernel.get_in([Access.all(), "name"])
    |> Enum.reject(&Kernel.is_nil/1)
  end

  @spec path_alias(map) :: String.t() | nil
  def path_alias(data) do
    data
    |> parse_path_alias()
  end

  @spec parse_path_alias(map) :: String.t() | nil
  def parse_path_alias(%{"path" => [%{"alias" => path_alias}]}), do: path_alias
  def parse_path_alias(_), do: nil

  @spec parse_image(map, String.t()) :: Image.t() | nil
  def parse_image(%{} = data, field) do
    case parse_images(data, field) do
      [image] -> image
      [] -> nil
    end
  end

  @spec parse_images(map, String.t()) :: [Image.t()] | []
  def parse_images(%{} = data, field) do
    data
    |> Map.get(field, [])
    |> Enum.map(&Image.from_api/1)
  end

  @spec parse_iso_datetime(String.t()) :: DateTime.t() | nil
  def parse_iso_datetime(nil) do
    nil
  end

  def parse_iso_datetime(time) do
    case String.split(time, ":") do
      [_date_hr, _min, _sec] ->
        time
        |> Timex.parse("{ISOdate}T{ISOtime}")
        |> do_parse_iso_datetime(:deprecated)

      [_date_hr, _min, _sec, _tz] ->
        time
        |> Timex.parse("{ISO:Extended}")
        |> do_parse_iso_datetime(:extended)

      _ ->
        nil
    end
  end

  defp do_parse_iso_datetime({:ok, dt}, :deprecated), do: Timex.to_datetime(dt, "Etc/UTC")
  defp do_parse_iso_datetime({:ok, dt}, :extended), do: dt
  defp do_parse_iso_datetime(_, _), do: nil

  @spec parse_date(map, String.t()) :: Date.t() | nil
  def parse_date(data, field) do
    case data[field] do
      [%{"value" => date}] -> parse_date_string(date, "{YYYY}-{0M}-{0D}")
      _ -> nil
    end
  end

  @spec parse_date_string(String.t(), String.t()) :: Date.t() | nil
  defp parse_date_string(date, format_string) do
    case Timex.parse(date, format_string) do
      {:error, _message} -> nil
      {:ok, naive_datetime} -> NaiveDateTime.to_date(naive_datetime)
    end
  end

  @spec parse_link(map, String.t()) :: Link.t() | nil
  def parse_link(%{} = data, field) do
    case data[field] do
      [link] -> Link.from_api(link)
      _ -> nil
    end
  end

  # This is silly and should be combined/refactored with above clause
  @spec parse_links(map, String.t()) :: [Link.t()] | nil
  def parse_links(%{} = data, field) do
    case data[field] do
      [_ | _] = links -> Enum.map(links, &Link.from_api(&1))
      _ -> nil
    end
  end

  @doc """
  Gathers information about desired view mode based on incoming
  query parameters. Key presence is enough to count as true.
  - page: whether the page is in preview mode (drafts are rendered)
  - paragraphs: whether unpublished paragraphs should render
  """
  @spec preview_opts(map) :: Keyword.t()
  def preview_opts(query_params \\ %{}) do
    [
      page: Map.has_key?(query_params, "preview"),
      paragraphs: Map.has_key?(query_params, "paragraphs")
    ]
  end

  @doc """
  Expects raw JSON data for a CMS object that contains a paragraphs field.
  This field value will always be a list of potential paragraphs.
  """
  @spec parse_paragraphs(map, Keyword.t(), String.t()) :: [Paragraph.t()]
  def parse_paragraphs(data, preview_opts \\ [], target_field \\ "field_paragraphs") do
    data
    |> Map.get(target_field, [])
    |> Enum.filter(&show_paragraph?(&1, preview_opts))
    |> Enum.map(&Paragraph.from_api(&1, preview_opts))
  end

  @spec show_paragraph?(map | nil, Keyword.t()) :: boolean
  defp show_paragraph?(field_data, preview_opts)

  # Skip broken/missing paragraphs (CMS unable to load and returns NULL)
  defp show_paragraph?(nil, _) do
    false
  end

  # Reusable paragraphs instance aren't automatically removed when their child
  # paragraphs are deleted from the database, so catch that here.
  defp show_paragraph?(%{"field_reusable_paragraph" => [nil]}, _) do
    false
  end

  # Reusable paragraphs are not directly renderable since they act as instance containers.
  # However, these instances can be unpublished. If unpublished, stop and return false.
  # If published, continue checking the nested child paragraph for publish status.
  defp show_paragraph?(%{"field_reusable_paragraph" => [child]} = parent, preview_opts) do
    %{"status" => [parent_status]} = parent
    %{"paragraphs" => [paragraph]} = child

    case parent_status do
      %{"value" => false} -> false
      _ -> show_paragraph?(paragraph, preview_opts)
    end
  end

  # In "preview" mode, allow unpublished paragraphs to be rendered if requested
  defp show_paragraph?(_, preview: true, paragraphs: true) do
    true
  end

  defp show_paragraph?(%{"status" => [%{"value" => value}]}, _) do
    value
  end

  @spec rewrite_static_file_links(String.t()) :: String.t()
  defp rewrite_static_file_links(body) do
    if Application.get_env(:dotcom, :is_prod_env?) do
      Regex.replace(~r/"(#{@static_path}[^"]+)"/, body, fn _, path ->
        [~c"\"", Util.site_path(:static_url, [path]), ~c"\""]
      end)
    else
      body
    end
  end

  @spec rewrite_url(String.t()) :: String.t()
  def rewrite_url(url) when is_binary(url) do
    uri = URI.parse(url)

    path =
      if uri.query do
        "#{uri.path}?#{uri.query}"
      else
        uri.path
      end

    if Application.get_env(:dotcom, :is_prod_env?) do
      Util.site_path(:static_url, [path])
    else
      path
    end
  end

  @spec int_or_string_to_int(integer | String.t() | nil) :: integer | nil
  def int_or_string_to_int(nil), do: nil
  def int_or_string_to_int(num) when is_integer(num), do: num

  def int_or_string_to_int(str) when is_binary(str) do
    case Integer.parse(str) do
      {int, ""} -> int
      _ -> nil
    end
  end

  @doc """
  Retrieves category from CMS data. If "field_page_type" field is
  empty or not found, the returned category is an empty string.

  iex> category(%{"field_page_type" => [%{"name" => "Guides"}]})
  "Guides"
  iex> category(%{"field_page_type" => []})
  ""
  iex> category(%{})
  ""
  iex> category(nil)
  ""
  """
  @spec category(map | nil) :: String.t()
  def category(nil), do: ""

  def category(data) do
    data
    |> Map.get("field_page_type", [%{}])
    |> Enum.at(0, %{})
    |> Map.get("name", "")
  end

  @spec content_type(String.t()) :: API.type() | nil
  for atom <- ~w(
    diversion
    event
    news_entry
    page
    project
    project_update
    )a do
    str = Atom.to_string(atom)
    def content_type(unquote(str)), do: unquote(atom)
  end

  def content_type(_), do: nil

  @doc "Returns the text if present, otherwise returns nil"
  @spec content(String.t()) :: String.t() | nil
  @spec content(HTML.safe()) :: HTML.safe() | nil
  def content(nil) do
    nil
  end

  def content({:safe, string} = safe_html) do
    if content(string) do
      safe_html
    end
  end

  def content(string) do
    case String.trim(string) do
      "" -> nil
      string -> string
    end
  end

  @doc """
  Parses the related_transit field for route-specific data. Could
  contain multiple routes. Contains mode, branch, and other info.
  """
  @spec routes([map()]) :: [API.route_term()]
  def routes(route_data) do
    route_data
    |> Enum.map(&Map.get(&1, "data"))
    |> Enum.map(&route_metadata/1)
  end

  # Maps the tagged CMS route term, its group, and its parent mode.
  # For routes and misc. groupings like "local_bus," the CMS will have
  # mapped the appropriate GTFS mode to that tag prior to parsing here.
  @spec route_metadata(map()) :: API.route_term()
  defp route_metadata(route_data) do
    Map.new(
      id: Map.get(route_data, "gtfs_id"),
      group: Map.get(route_data, "gtfs_group"),
      mode:
        route_data
        |> Map.get("gtfs_ancestry")
        |> Map.get("mode")
        |> route_mode()
    )
  end

  # Some CMS routes are actually custom groups that may not
  # have any single MBTA mode associated with them (mode: nil).
  # There should never be more than one, single mode in the list.
  @spec route_mode([String.t()] | nil) :: String.t() | nil
  defp route_mode(nil), do: nil
  defp route_mode([mode]), do: mode
end
