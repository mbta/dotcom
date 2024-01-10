defmodule Dotcom.ContentRewriters.Links do
  import DotcomWeb.ViewHelpers, only: [cms_static_page_path: 2]

  @doc """
  Adds the target=_blank attribute to links that redirect to
  the old site so they open in a new tab.
  """
  @spec add_target_to_redirect(Floki.html_tree()) :: Floki.html_tree()
  def add_target_to_redirect({"a", attrs, children} = element) do
    case Floki.attribute(element, "href") do
      ["/redirect/" <> _] ->
        case Floki.attribute(element, "target") do
          [] -> {"a", [{"target", "_blank"} | attrs], children}
          _ -> element
        end

      _ ->
        element
    end
  end

  @doc """
  Adds the ?preview&vid=latest query parameters to relative URLs
  if the current page is in preview mode.
  """
  @spec add_preview_params(Floki.html_tree(), Plug.Conn.t()) :: Floki.html_tree()
  def add_preview_params({"a", attrs, children} = element, conn) do
    case Enum.into(attrs, %{}) do
      %{"href" => "/" <> internal_path} = attr_map ->
        processed_href = cms_static_page_path(conn, "/#{internal_path}")

        updated_attrs =
          attr_map
          |> Map.replace!("href", processed_href)
          |> Map.to_list()

        {"a", updated_attrs, children}

      _ ->
        element
    end
  end
end
