defmodule DotcomWeb.Plugs.PathParamsRedirector do
  import Plug.Conn, only: [put_status: 2, halt: 1]
  import Phoenix.Controller, only: [redirect: 2]

  @behaviour Plug

  @impl Plug
  @spec init(Keyword.t()) :: Keyword.t()
  def init(opts) do
    opts
    |> validate_to_keyword()
  end

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

  defp add_path_params(to, %Plug.Conn{path_params: %{"path_params" => path_params}}),
    do: [to | path_params] |> Enum.join("/")

  defp add_path_params(to, _conn), do: to

  defp append_query_string(path, %Plug.Conn{query_string: ""}), do: path
  defp append_query_string(path, %Plug.Conn{query_string: query}), do: "#{path}?#{query}"

  defp validate_to_keyword([to: _] = opts), do: opts
  defp validate_to_keyword(_), do: raise("Missing required to: option in redirect")
end
