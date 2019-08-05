defmodule SiteWeb.ProjectView do
  @moduledoc """
  Project page-related view helpers.
  """
  use SiteWeb, :view

  import SiteWeb.CMS.ParagraphView, only: [render_paragraph: 2]

  alias CMS.Field.Link
  alias CMS.Page.Project
  alias CMS.Partial.Paragraph.DescriptiveLink
  alias CMS.Partial.Teaser

  @spec show_all_updates_link?([Teaser.t()]) :: boolean()
  def show_all_updates_link?([_, _ | [_ | _]]) do
    # only show "view all updates" if there are
    # 3 or more updates
    true
  end

  def show_all_updates_link?(_) do
    false
  end
end
