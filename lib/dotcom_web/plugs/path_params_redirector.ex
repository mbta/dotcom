defmodule DotcomWeb.Plugs.PathParamsRedirector do
  import Plug.Conn, only: [put_status: 2, halt: 1]
  import Phoenix.Controller, only: [redirect: 2]

  @behaviour Plug

  @impl Plug
  @spec init(Keyword.t()) :: Keyword.t()
  def init([to: _] = opts), do: opts
  def init(_opts), do: raise("Missing required to: option in redirect")

  @impl true
  @spec call(Plug.Conn.t(), Keyword.t()) :: Plug.Conn.t()
  def call(conn, to: to) do
    new_path =
      to
      |> add_path_params(conn)
      |> append_query_string(conn)

    conn
    |> put_status(:moved_permanently)
    |> redirect(to: new_path)
    |> halt()
  end

  defp add_path_params(path, %Plug.Conn{path_params: %{"path_params" => path_params}}) do
    [path | path_params] |> Enum.join("/")
  end

  defp add_path_params(path, _conn), do: path

  defp append_query_string(path, %Plug.Conn{query_string: ""}), do: path
  defp append_query_string(path, %Plug.Conn{query_string: query}), do: "#{path}?#{query}"
end
