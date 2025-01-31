defmodule Dotcom.ContentRewriter do
  @moduledoc """
  Rewrites the content that comes from the CMS before rendering it to the page.
  """

  require Logger

  alias Dotcom.ContentRewriters.{EmbeddedMedia, Links, LiquidObjects, ResponsiveTables}
  alias Dotcom.FlokiHelpers

  @typep tree_or_binary :: Floki.html_tree() | binary

  @doc """
  The main entry point for the various transformations we apply to CMS content
  before rendering to the page. The content is parsed by Floki and then traversed
  with a dispatch function that will identify nodes to be rewritten and pass
  them to the modules and functions responsible. See the Dotcom.FlokiHelpers.traverse
  docs for more information about how the visitor function should work to
  traverse and manipulate the tree.

  If the content cannot be rewritten, we log a warning and return an empty string.
  """
  @spec rewrite(Phoenix.HTML.safe() | String.t(), Plug.Conn.t()) :: Phoenix.HTML.safe()
  def rewrite({:safe, content}, conn) do
    {:ok, parsed} = Floki.parse_fragment(content)

    parsed
    |> FlokiHelpers.traverse(&dispatch_rewrites(&1, conn))
    |> render
    |> Phoenix.HTML.raw()
  end

  def rewrite(content, conn) when is_binary(content) do
    dispatch_rewrites(content, conn)
  end

  def rewrite(content, conn) when is_list(content) do
    rewrite(Enum.join(content), conn)
  end

  def rewrite(content, _conn) do
    Logger.warning("#{__MODULE__} Cannot rewrite content: #{inspect(content)}")

    {:safe, ""}
  end

  # necessary since foo |> Floki.parse |> Floki.raw_html blows up
  # if there are no HTML tags in foo.
  defp render(content) when is_binary(content), do: content
  defp render(content), do: Floki.raw_html(content, encode: false)

  @spec dispatch_rewrites(tree_or_binary, Plug.Conn.t(), Floki.html_tree() | nil) ::
          tree_or_binary
  defp dispatch_rewrites(element, conn, context \\ nil)

  defp dispatch_rewrites({"table", _, _} = element, conn, context) do
    table =
      element
      |> ResponsiveTables.rewrite_table()
      |> rewrite_children(conn, context)

    {"figure", [{"class", "c-media c-media--table"}],
     [
       {"div", [{"class", "c-media__content"}],
        [
          table
        ]}
     ]}
  end

  defp dispatch_rewrites({"p", _, _} = element, conn, _context) do
    element
    |> Floki.find("a.btn")
    |> case do
      [] -> element
      buttons -> {"div", [{"class", "c-inline-buttons"}], buttons}
    end
    |> rewrite_children(conn, element)
  end

  defp dispatch_rewrites({"ul", _, _} = element, conn, _context) do
    rewrite_children(element, conn, element)
  end

  defp dispatch_rewrites({"ol", _, _} = element, conn, _context) do
    rewrite_children(element, conn, element)
  end

  defp dispatch_rewrites({"td", _, _} = element, conn, _context) do
    rewrite_children(element, conn, element)
  end

  defp dispatch_rewrites({"a", _, _} = element, conn, context) do
    element
    |> Links.add_target_to_redirect()
    |> Links.add_preview_params(conn)
    |> rewrite_children(conn, context)
  end

  defp dispatch_rewrites({"img", _, _} = element, conn, context) do
    element
    |> FlokiHelpers.remove_style_attrs()
    |> FlokiHelpers.add_class("img-fluid")
    |> rewrite_children(conn, context)
  end

  defp dispatch_rewrites(
         {_, [{"class", "iframe-container"}], [{"iframe", _, _}]} = element,
         _conn,
         _context
       ) do
    element
  end

  defp dispatch_rewrites(
         {_, [{"class", "embedded-entity" <> _}], _children} = element,
         conn,
         context
       ) do
    element
    |> EmbeddedMedia.parse()
    |> EmbeddedMedia.build()
    |> rewrite_children(conn, context)
  end

  defp dispatch_rewrites({"iframe", _, _} = element, _conn, _context) do
    iframe = FlokiHelpers.remove_style_attrs(element)
    src = iframe |> Floki.attribute("src") |> List.to_string()

    if EmbeddedMedia.media_iframe?(src) do
      EmbeddedMedia.iframe(iframe)
    else
      {"div", [{"class", "iframe-container"}], FlokiHelpers.add_class(iframe, "iframe")}
    end
  end

  defp dispatch_rewrites(content, _conn, context) when is_binary(content) do
    Regex.replace(~r/\{\{(.*)\}\}/U, content, fn _, obj ->
      obj
      |> String.trim()
      |> LiquidObjects.replace(use_small_icon?: decends_from_a_paragraph_like_element?(context))
    end)
  end

  defp dispatch_rewrites(_node, _conn, _context) do
    nil
  end

  defp rewrite_children({name, attrs, children}, conn, context) do
    {name, attrs, FlokiHelpers.traverse(children, &dispatch_rewrites(&1, conn, context))}
  end

  # Paragraph-like elements include p, ul, and ol
  @spec decends_from_a_paragraph_like_element?(tree_or_binary) :: boolean
  defp decends_from_a_paragraph_like_element?({el, _attrs, _children})
       when el in ["p", "ul", "ol", "td"],
       do: true

  defp decends_from_a_paragraph_like_element?(_), do: false
end
