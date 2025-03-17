defmodule DotcomWeb.Redirector do
  import Plug.Conn, only: [put_status: 2, halt: 1]
  import Phoenix.Controller, only: [redirect: 2]

  alias CMS.Repo

  @behaviour Plug

  @impl true

  @spec init(Keyword.t()) :: map()
  def init(opts) do
    opts
    |> Map.new()
    |> validate_to_keyword()
    |> default_keep_path_params_keyword()
  end

  @impl true
  @spec call(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def call(%Plug.Conn{params: %{"id" => id}} = conn, %{to: to})
      when to not in ["/projects"] do
    case find_record(id, to) do
      :not_found -> DotcomWeb.ControllerHelpers.render_404(conn)
      record -> redirect_to_show(conn, to, record)
    end
  end

  def call(conn, %{to: to, keep_path_params: keep_path_params}) do
    new_path =
      to
      |> maybe_add_path_params(conn, keep_path_params: keep_path_params)
      |> append_query_string(conn)

    conn
    |> put_status(:moved_permanently)
    |> redirect(to: new_path)
    |> halt()
  end

  defp add_path_params(to, %Plug.Conn{path_params: %{"path_params" => path_params}}),
    do: [to | path_params] |> Enum.join("/")

  defp add_path_params(to, _conn), do: to

  defp append_query_string(path, %Plug.Conn{query_string: ""}), do: path
  defp append_query_string(path, %Plug.Conn{query_string: query}), do: "#{path}?#{query}"

  defp default_keep_path_params_keyword(%{keep_path_params: _} = opts), do: opts
  defp default_keep_path_params_keyword(opts), do: opts |> Map.put(:keep_path_params, false)

  defp find_record(id, "/events") do
    Repo.event_by(meeting_id: id)
  end

  defp find_record(id, "/news") do
    Repo.news_entry_by(migration_id: id)
  end

  defp maybe_add_path_params(to, conn, keep_path_params: true), do: add_path_params(to, conn)
  defp maybe_add_path_params(to, _conn, keep_path_params: false), do: to

  defp redirect_to_show(conn, to, record) do
    conn
    |> put_status(:moved_permanently)
    |> redirect(to: to <> "/#{record.id}")
    |> halt()
  end

  defp validate_to_keyword(%{to: _} = opts), do: opts
  defp validate_to_keyword(_), do: raise("Missing required to: option in redirect")
end
