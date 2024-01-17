defmodule Turbolinks do
  @moduledoc """

  Helper functions for working with Turbolinks

  """
  import Plug.Conn, only: [get_req_header: 2]
  alias Phoenix.HTML.Tag

  @doc "Return a boolean indicating whether Turbolinks is enabled on the request"
  def enabled?(conn) do
    case get_req_header(conn, "turbolinks-referrer") do
      [] -> false
      _ -> true
    end
  end

  @doc "Return HTML for the Turbolinks Cache-Control on the current request"
  def cache_meta(%{assigns: %{turbolinks_cache_header: header}}) when is_binary(header) do
    Tag.tag(:meta, name: "turbolinks-cache-control", content: header)
  end

  def cache_meta(_conn) do
    ""
  end
end

defmodule Turbolinks.Plug do
  @moduledoc """

  Handles notifying Turbolinks of an redirect.

  See https://github.com/turbolinks/turbolinks#following-redirects for more
  information.

  """
  @behaviour Plug
  import Phoenix.Controller, only: [put_flash: 3]

  import Plug.Conn, only: [register_before_send: 2, get_resp_header: 2, put_resp_header: 3]

  @impl true
  def init([]), do: []

  @impl true
  def call(conn, []) do
    if Turbolinks.enabled?(conn) do
      conn
      |> check_flash
      |> register_before_send(&before_send/1)
    else
      conn
    end
  end

  def check_flash(conn) do
    case Phoenix.Flash.get(conn.assigns.flash, :turbolinks_redirect) do
      nil -> conn
      location -> conn |> put_resp_header("turbolinks-location", location)
    end
  end

  def before_send(%{status: status} = conn) when status >= 300 and status < 400 do
    location =
      conn
      |> get_resp_header("location")
      |> List.first()

    conn
    |> put_flash(:turbolinks_redirect, location)
  end

  def before_send(conn) do
    conn
  end
end

defmodule Turbolinks.Plug.NoCache do
  @moduledoc """

  Plug to disable the Turbolinks caching behavior for a controller.

  Usage:

      plug Turbolinks.Plug.NoCache

  """
  import Plug.Conn, only: [assign: 3]

  def init(value \\ []) do
    case value do
      [header] -> header
      _ -> "no-cache"
    end
  end

  def call(conn, value) do
    conn
    |> assign(:turbolinks_cache_header, value)
  end
end
