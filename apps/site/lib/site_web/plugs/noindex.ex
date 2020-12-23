defmodule SiteWeb.Plugs.Noindex do
  @moduledoc """
  Plug to add the x-robots-tag header to the response and set its value to
  "noindex" Used in order to prevent search engines from indexing pages on any
  of our development environments.
  """
  @behaviour Plug

  import Plug.Conn, only: [put_resp_header: 3]

  @impl true
  def init(opts), do: opts

  @impl true
  def call(conn, _opts) do
    put_resp_header(conn, "x-robots-tag", "noindex")
  end
end
