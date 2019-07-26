defmodule Content.Helpers do
  @moduledoc """
  Various helper functions that aid in parsing CMS JSON data.
  """

  alias Content.CMS

  @spec field_value(map, String.t()) :: any
  def field_value(parsed, field) do
    case parsed[field] do
      [%{"processed" => value}] -> value
      [%{"value" => value}] -> value
      [%{"target_id" => value}] -> value
      _ -> nil
    end
  end

  @spec handle_html(String.t() | nil) :: Phoenix.HTML.safe()
  def handle_html(html) do
    (html || "")
    |> Content.CustomHTML5Scrubber.html5()
    |> rewrite_static_file_links
    |> Phoenix.HTML.raw()
  end

  @spec parse_body(map) :: Phoenix.HTML.safe()
  def parse_body(%{} = data) do
    data
    |> field_value("body")
    |> handle_html
  end

  @spec parse_files(map, String.t()) :: [Content.Field.File.t()]
  def parse_files(%{} = data, field) do
    data
    |> Map.get(field, [])
    |> Enum.map(&Content.Field.File.from_api/1)
  end

  @spec path_alias(map) :: String.t() | nil
  def path_alias(data) do
    data
    |> parse_path_alias()
  end

  @spec parse_path_alias(map) :: String.t() | nil
  def parse_path_alias(%{"path" => [%{"alias" => path_alias}]}), do: path_alias
  def parse_path_alias(_), do: nil

  @spec parse_image(map, String.t()) :: Content.Field.Image.t() | nil
  def parse_image(%{} = data, field) do
    case parse_images(data, field) do
      [image] -> image
      [] -> nil
    end
  end

  @spec parse_images(map, String.t()) :: [Content.Field.Image.t()] | []
  def parse_images(%{} = data, field) do
    data
    |> Map.get(field, [])
    |> Enum.map(&Content.Field.Image.from_api/1)
  end

  @spec parse_iso_datetime(String.t()) :: DateTime.t() | nil
  def parse_iso_datetime(time) do
    case Timex.parse(time, "{ISOdate}T{ISOtime}") do
      {:ok, dt} -> Timex.to_datetime(dt, "Etc/UTC")
      _ -> nil
    end
  end

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

  @spec parse_link(map, String.t()) :: Content.Field.Link.t() | nil
  def parse_link(%{} = data, field) do
    case data[field] do
      [link] -> Content.Field.Link.from_api(link)
      _ -> nil
    end
  end

  @spec parse_paragraphs(map, String.t()) :: [Content.Paragraph.t()]
  def parse_paragraphs(data, target_field \\ "field_paragraphs") do
    data
    |> Map.get(target_field, [])
    |> Enum.filter(&para_is_published/1)
    |> Enum.map(&Content.Paragraph.from_api/1)
  end

  @spec para_is_published(map) :: boolean
  # Reusable paragraphs can be deleted, but their parent references may remain
  defp para_is_published(%{"field_reusable_paragraph" => [nil]}) do
    false
  end

  defp para_is_published(%{"field_reusable_paragraph" => reusable}) do
    [%{"status" => status, "paragraphs" => data}] = reusable

    case status do
      [%{"value" => false}] -> false
      _ -> data |> List.first() |> para_is_published()
    end
  end

  defp para_is_published(%{"status" => [%{"value" => value}]}) do
    value
  end

  @spec rewrite_static_file_links(String.t()) :: String.t()
  defp rewrite_static_file_links(body) do
    static_path = Content.Config.static_path()

    Regex.replace(~r/"(#{static_path}[^"]+)"/, body, fn _, path ->
      ['"', Util.site_path(:static_url, [path]), '"']
    end)
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

    Util.site_path(:static_url, [path])
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

  @spec content_type(String.t()) :: Content.CMS.type() | nil
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
  @spec content(Phoenix.HTML.safe()) :: Phoenix.HTML.safe() | nil
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
  @spec routes([map()]) :: [CMS.route_term()]
  def routes(route_data) do
    route_data
    |> Enum.map(&Map.get(&1, "data"))
    |> Enum.map(&route_metadata/1)
  end

  # Maps the tagged CMS route term, its group, and its parent mode.
  # For routes and misc. groupings like "local_bus," the CMS will have
  # mapped the appropriate GTFS mode to that tag prior to parsing here.
  @spec route_metadata(map()) :: CMS.route_term()
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
