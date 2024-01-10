defmodule DotcomWeb.StaticPageController do
  @moduledoc "Controller for paths which just render a simple static page."
  use DotcomWeb, :controller
  alias DotcomWeb.StaticPage

  for page <- StaticPage.static_pages() do
    def unquote(page)(conn, _params) do
      conn
      |> assign(:breadcrumbs, build_breadcrumb(unquote(page)))
      |> assign(:meta_description, StaticPage.meta_description(unquote(page)))
      |> render("#{unquote(page)}.html")
    end
  end

  @spec build_breadcrumb(atom) :: [Breadcrumb.t()]
  def build_breadcrumb(page) do
    page
    |> Atom.to_string()
    |> String.split("_")
    |> Enum.map(&String.capitalize/1)
    |> Enum.join(" ")
    |> Breadcrumb.build()
    |> List.wrap()
  end
end
