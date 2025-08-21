defmodule DotcomWeb.NewsEntryController do
  use DotcomWeb, :controller

  alias CMS.Page.NewsEntry
  alias CMS.Repo
  alias Dotcom.Pagination
  alias DotcomWeb.ControllerHelpers
  alias Plug.Conn

  def index(conn, params) do
    page = current_page(params)
    items_per_page = 10
    zero_based_current_page = page - 1
    zero_based_next_page = page

    news_entry_teasers_fn = fn ->
      Repo.teasers(
        type: [:news_entry],
        items_per_page: items_per_page,
        offset: items_per_page * zero_based_current_page
      )
    end

    upcoming_news_entry_teasers_fn = fn ->
      Repo.teasers(
        type: [:news_entry],
        items_per_page: items_per_page,
        offset: items_per_page * zero_based_next_page
      )
    end

    media_relations_paragraph_fn = fn ->
      url = "/paragraphs/custom-html/custom-html-media-relations-members-the-press-l"

      case Repo.get_paragraph(url) do
        {:error, _} -> nil
        paragraph -> Map.put(paragraph, :right_rail, false)
      end
    end

    conn
    |> assign(:breadcrumbs, index_breadcrumbs())
    |> assign(:page, page)
    |> async_assign_default(:news_entries, news_entry_teasers_fn, [])
    |> async_assign_default(:upcoming_news_entries, upcoming_news_entry_teasers_fn, [])
    |> async_assign_default(:media_relations_paragraph, media_relations_paragraph_fn, nil)
    |> await_assign_all_default(__MODULE__)
    |> render(:index)
  end

  def show(%Conn{} = conn, _params) do
    conn.request_path
    |> Repo.get_page(conn.query_params)
    |> do_show(conn)
  end

  defp do_show(%NewsEntry{} = news_entry, conn), do: show_news_entry(conn, news_entry)

  defp do_show({:error, {:redirect, status, opts}}, conn) do
    conn
    |> put_status(status)
    |> redirect(opts)
  end

  defp do_show(_404_or_mismatch, conn), do: render_404(conn)

  def show_news_entry(conn, %NewsEntry{posted_on: posted_on} = news_entry) do
    recent_news = Repo.teasers(type: [:news_entry], except: news_entry.id, items_per_page: 4)

    conn
    |> ControllerHelpers.unavailable_after_one_year(posted_on)
    |> assign(:breadcrumbs, show_breadcrumbs(conn, news_entry))
    |> put_view(DotcomWeb.NewsEntryView)
    |> render(
      "show.html",
      news_entry: news_entry,
      recent_news: recent_news
    )
  end

  defp current_page(params) do
    params
    |> Map.get("page")
    |> Pagination.current_page(1)
  end

  defp index_breadcrumbs do
    [Breadcrumb.build("News")]
  end

  defp show_breadcrumbs(conn, news_entry) do
    [
      Breadcrumb.build("News", news_entry_path(conn, :index)),
      Breadcrumb.build(news_entry.title)
    ]
  end
end
