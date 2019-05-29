defmodule SiteWeb.ErrorView do
  use SiteWeb, :view

  def render("404.html", assigns) do
    render(__MODULE__, "not_found.html", assigns)
  end

  def render("500.html", assigns) do
    render(__MODULE__, "crash.html", assigns)
  end

  # In case no render clause matches or no
  # template is found, let's render it as 500
  def template_not_found(_template, assigns) do
    render("500.html", assigns)
  end
end
