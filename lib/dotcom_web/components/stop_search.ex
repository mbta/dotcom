defmodule DotcomWeb.Components.StopSearch do
  use Phoenix.LiveComponent

  def mount(_params, _session, socket) do
    config = Map.get(socket.assigns, :config, %{})
    {locale, new_config} = Map.pop(config, :locale, "en")
    new_socket = assign(socket, config: new_config, locale: locale)

    {:ok, new_socket}
  end

  @doc """
  Renders the date picker component.
  """
  def render(assigns) do
    ~H"""
    <div id={@id} class="stop_search-autcomplete_container"></div>
    """
  end

  def handle_event("query", %{"query" => query}, socket) do
    {:reply, %{foo: "I saw your query!", bar: query}, socket}
  end
end
