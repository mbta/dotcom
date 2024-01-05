defmodule Site.BodyTag do
  @moduledoc """

  Contains the logic for the className of the <body> element.

  JS: If we can detect from the conn that JavaScript is enabled (via Turbolinks), then we can set
    the JS header automatically.

  Error: We set an error class if we detect that we're rendering an error page.

  mTicket: If the request has the configured mTicket header, sets a class which will disable certain
    UI elements.
  """

  @spec render(Plug.Conn.t()) :: Phoenix.HTML.Safe.t()
  def render(conn) do
    Phoenix.HTML.Tag.tag(
      :body,
      class: class_name(conn),
      data: [turbolinks: enable_turbolinks?(conn)]
    )
  end

  defp class_name(conn) do
    [
      javascript_class(conn),
      error_class(conn),
      mticket_class(conn),
      preview_class(conn)
    ]
    |> Enum.filter(&(&1 != ""))
    |> Enum.join(" ")
  end

  defp enable_turbolinks?(conn) do
    is_nil(conn.assigns[:disable_turbolinks])
  end

  defp javascript_class(conn) do
    if Turbolinks.enabled?(conn) do
      "js"
    else
      "no-js"
    end
  end

  defp error_class(%{private: %{phoenix_view: view_module}}) do
    case view_module do
      SiteWeb.ErrorView -> "not-found"
      Site.CrashView -> "not-found"
      _ -> ""
    end
  end

  defp error_class(_conn) do
    ""
  end

  @spec mticket_class(Plug.Conn.t()) :: String.t()
  defp mticket_class(%{host: "mticket.mbtace.com"}), do: "mticket"

  defp mticket_class(conn) do
    case conn
         |> Plug.Conn.get_req_header(Application.get_env(:dotcom, __MODULE__)[:mticket_header]) do
      [] -> ""
      _ -> "mticket"
    end
  end

  @spec preview_class(Plug.Conn.t()) :: String.t()
  defp preview_class(%Plug.Conn{query_params: %{"preview" => _, "vid" => _, "nid" => _}}),
    do: "cms-preview"

  defp preview_class(_conn), do: ""
end
