defmodule DotcomWeb.ErrorView do
  use DotcomWeb, :view

  def render("404.html", assigns) do
    render(
      __MODULE__,
      "error_layout.html",
      Map.merge(assigns, %{
        error_code: "404",
        error_type: ~t"Page not found",
        error_title: ~t"Sorry! We missed your stop.",
        error_description: ~t"This page is no longer in service.",
        error_instructions: ~t"Try searching for what you're looking for below."
      })
    )
  end

  def render("500.html", assigns) do
    render(
      __MODULE__,
      "error_layout.html",
      Map.merge(assigns, %{
        error_code: "500",
        error_type: ~t"Server issue",
        error_title: ~t"Oh no! We're experiencing delays.",
        error_description: ~t"Something went wrong on our end.",
        error_instructions: ~t"Try searching for what you're looking for below."
      })
    )
  end

  # In case no render clause matches or no
  # template is found, let's render it as 500
  def template_not_found(_template, assigns) do
    render("500.html", assigns)
  end
end
