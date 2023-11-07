defmodule SiteWeb.WwwRedirector do
  @behaviour Plug
  import Plug.Conn, only: [put_status: 2, halt: 1]
  import Phoenix.Controller, only: [redirect: 2]

  alias Plug.Conn

  @impl true
  def init(options), do: options

  @impl true
  def call(conn, options) do
    url = Keyword.get(options, :host, SiteWeb.Endpoint.url())
    site_redirect(url, conn)
  end

  @spec site_redirect(String.t(), Conn.t()) :: Plug.Conn.t()
  def site_redirect(site_url, conn) do
    full_redirect_url = redirect_url(site_url, conn)

    conn
    |> put_status(:moved_permanently)
    |> redirect(external: full_redirect_url)
    |> halt()
  end

  # If path_params are matched via SiteWeb.Router, use that to determine path
  defp redirect_url(site_url, %Conn{path_params: %{"path" => path}, query_string: query}) do
    revised_path = "/" <> Enum.join(path, "/")
    do_redirect_url(site_url, revised_path, query)
  end

  defp redirect_url(site_url, %Conn{request_path: path, query_string: query}) do
    do_redirect_url(site_url, path, query)
  end

  defp do_redirect_url(site_url, path, query)
       when is_binary(query) and query != "" do
    "#{site_url}#{path}?#{query}"
  end

  defp do_redirect_url(site_url, path, _) do
    "#{site_url}#{path}"
  end
end
