defmodule DotcomWeb.Live.Usage do
  @moduledoc """
  A LiveView that tracks application use.
  """

  use Phoenix.LiveDashboard.PageBuilder

  import DotcomWeb.Usage.Templates

  @impl true
  def menu_link(_, _) do
    {:ok, "Usage"}
  end

  @impl true
  def render(assigns) do
    ~H"""
    <h5>Usage</h5>
    <.unused_templates />
    """
  end

  def unused_templates(assigns) do
    ~H"""
    <h6>Unused Templates</h6>
    <p>{unused_template_count()} of {template_count()} templates have not been used since the last deployment.</p>
    <p>The following templates have not been used:</p>
    <ul>
      <li :for={template <- unused_templates()}>
        {template}
      </li>
    </ul>
    """
  end
end
