defmodule DotcomWeb.Plugs.PathParamsRedirector do
  @moduledoc """
  A redirector plug that can redirect from one path to another while
  preserving path params underneath it.

  For example, a route defined as

  ```
  get("/foo/bar/*path_params", Plugs.PathParamsRedirector, to: "/baz")
  ```

  would redirect `/foo/bar` to `/baz` and `/foo/bar/quux` to `/baz/quux`.

  (Note: The wildcard in the path must be called `*path_params`. Other
  wildcards will not work.)
  """

  import Plug.Conn, only: [put_status: 2, halt: 1]
  import Phoenix.Controller, only: [redirect: 2]

  @behaviour Plug

  @impl Plug
  def init([to: _] = opts), do: opts
  def init(_opts), do: raise("Missing required to: option in redirect")

  @impl Plug
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
