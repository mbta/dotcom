defmodule DotcomWeb.ErrorView do
  use DotcomWeb, :view

  def render("404.html", assigns) do
    render(
      __MODULE__,
      "error_layout.html",
      Map.merge(assigns, %{
        error_code: "404",
        error_type: "Page not found",
        error_title: "Sorry! We missed your stop.",
        error_description: "This page is no longer in service.",
        error_instructions: "Try searching for what you're looking for below."
      })
    )
  end

  def render("500.html", assigns) do
    render(
      __MODULE__,
      "error_layout.html",
      Map.merge(assigns, %{
        error_code: "500",
        error_type: "Server issue",
        error_title: "Oh no! We're experiencing delays.",
        error_description: "Something went wrong on our end.",
        error_instructions: "Try searching for what you're looking for below."
      })
    )
  end

  # Stubbed out, but untested
  # def render("403.html", assigns) do
  #   render(__MODULE__, "error_layout.html", Map.merge(assigns, %{
  #     error_code: "403",
  #     error_type: "Access denied",
  #     error_title: "This stop is closed.",
  #     error_description: "Unfortunately, you do not have access to this page.",
  #     error_instructions: "Try searching for what you're looking for below."
  #   }))
  # end
  # def render("404_missing_file.html", assigns) do
  #   render(__MODULE__, "error_layout.html", Map.merge(assigns, %{
  #     error_code: "404",
  #     error_type: "File not found",
  #     error_title: "Uh oh! We can't find the file.",
  #     error_description: "The file you were looking for cannot be found.",
  #     error_instructions: "We may have deleted it. Try searching for what you're looking for below."
  #   }))
  # end
  # def render("503.html", assigns) do
  #   render(__MODULE__, "error_layout.html", Map.merge(assigns, %{
  #     error_code: "503",
  #     error_type: "Maintenance",
  #     error_title: "Service change in effect.",
  #     error_description: "This page is down for maintenance.",
  #     error_instructions: "Please check back after at least 24 hours..."
  #   }))
  # end

  # In case no render clause matches or no
  # template is found, let's render it as 500
  def template_not_found(_template, assigns) do
    render("500.html", assigns)
  end
end
