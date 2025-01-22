defmodule DotcomWeb.NewsEntryView do
  use DotcomWeb, :view

  import DotcomWeb.TimeHelpers, only: [format_date: 1]

  alias CMS.Page.NewsEntry

  def render_recent_news?(recent_news) do
    Enum.count(recent_news) == NewsEntry.number_of_recent_news_suggestions()
  end

  def previous_page_available?(page_number) do
    page_number > 1
  end

  def next_page_available?([]), do: false
  def next_page_available?(_upcoming_news_entries), do: true
end
