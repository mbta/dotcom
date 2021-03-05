defmodule SiteWeb.Redirector do
  @moduledoc """
  Simple plug to assist in redirects.
  ## Example Router Usage
      get "/", SiteWeb.Redirector, to: "/other_path"
  """
  @behaviour Plug

  import Plug.Conn, only: [put_status: 2, halt: 1]
  import Phoenix.Controller, only: [redirect: 2, render: 3, put_layout: 2, put_view: 2]

  alias CMS.Repo

  @impl true
  def init(opts), do: opts

  @impl true
  def call(%Plug.Conn{params: %{"id" => id}} = conn, to: to) when to not in ["/projects"] do
    case find_record(id, to) do
      :not_found -> render_not_found(conn)
      record -> redirect_to_show(conn, to, record)
    end
  end

  def call(conn, to: to) do
    conn
    |> put_status(:moved_permanently)
    |> redirect(to: append_query_string(conn, to))
    |> halt()
  end

  def call(_conn, _), do: raise("Missing required to: option in redirect")

  defp append_query_string(%Plug.Conn{query_string: ""}, path), do: path
  defp append_query_string(%Plug.Conn{query_string: query}, path), do: "#{path}?#{query}"

  defp find_record(id, "/events") do
    Repo.event_by(meeting_id: id)
  end

  defp find_record(id, "/news") do
    Repo.news_entry_by(migration_id: id)
  end

  defp redirect_to_show(conn, to, record) do
    conn
    |> put_status(:moved_permanently)
    |> redirect(to: to <> "/#{record.id}")
    |> halt()
  end

  defp render_not_found(conn) do
    conn
    |> put_status(:not_found)
    |> put_layout({SiteWeb.LayoutView, "app.html"})
    |> put_view(SiteWeb.ErrorView)
    |> render("404.html", [])
    |> halt()
  end
end
