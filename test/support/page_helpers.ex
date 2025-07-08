defmodule Dotcom.PageHelpers do
  use ExUnit.CaseTemplate

  def refute_text_visible?(html, text) do
    refute html =~ text
    html
  end

  @spec breadcrumbs_include?(String.t(), String.t() | [String.t()]) :: boolean
  def breadcrumbs_include?(html, crumb) when is_binary(crumb) do
    breadcrumbs_include?(html, [crumb])
  end

  def breadcrumbs_include?(html, crumbs) do
    {:ok, document} = Floki.parse_document(html)

    rendered_breadcrumbs =
      document
      |> Floki.find(".breadcrumb-container")
      |> Floki.raw_html()

    Enum.all?(crumbs, fn crumb ->
      assert rendered_breadcrumbs =~ crumb
    end)
  end
end
