defmodule DotcomWeb.Live.Usage do
  @moduledoc """
  A LiveView that tracks application use.
  """

  use Phoenix.LiveDashboard.PageBuilder

  import DotcomWeb.Usage.{Functions, Templates}

  @impl true
  def menu_link(_, _) do
    {:ok, "Usage"}
  end

  @impl true
  def render(assigns) do
    ~H"""
    <h5>Usage</h5>
    <.unused_functions />
    <.unused_templates />
    """
  end

  def unused_functions(assigns) do
    assigns = assign(assigns, :unused_functions, unused_functions())

    ~H"""
    <h6>Unused Functions</h6>
    <p>
      {Kernel.length(@unused_functions)} decorated functions have not been called since the last deployment.
    </p>
    <p :if={Kernel.length(@unused_functions) > 0}>The following functions have not been called:</p>
    <ul :if={Kernel.length(@unused_functions) > 0}>
      <li :for={function <- @unused_functions}>
        {function}
      </li>
    </ul>
    """
  end

  def unused_templates(assigns) do
    ~H"""
    <h6>Unused Templates</h6>
    <p>
      {unused_template_count()} of {template_count()} templates have not been used since the last deployment.
    </p>
    <p :if={unused_template_count() > 0}>The following templates have not been used:</p>
    <ul :if={unused_template_count() > 0}>
      <li :for={template <- unused_templates()}>
        {template}
      </li>
    </ul>
    """
  end
end
