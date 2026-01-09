defmodule DotcomWeb.Components.SystemStatus.StatusLabel do
  @moduledoc """
  Renders a status and a description as a consistently-formatted
  header with an icon.
  """

  use DotcomWeb, :component

  import DotcomWeb.Components.SystemStatus.StatusIcon, only: [status_icon: 1]

  attr :description, :string, required: true
  attr :status, :atom, required: true
  attr :subheading_text, :string, default: nil
  attr :subheading_aria_label, :string, default: nil

  def status_label(assigns) do
    ~H"""
    <div class="flex">
      <div class="h-6 pr-2 flex items-center">
        <.status_icon status={@status} />
      </div>

      <div class="grow flex flex-wrap items-baseline gap-x-2">
        <.heading description={@description} disrupted={disrupted?(@status)} />
        <.subheading text={@subheading_text} aria_label={@subheading_aria_label} />
      </div>
    </div>
    """
  end

  defp disrupted?(:normal), do: false
  defp disrupted?(:no_scheduled_service), do: false
  defp disrupted?(_status), do: true

  attr :description, :string, required: true
  attr :disrupted, :boolean, default: false

  defp heading(assigns) do
    ~H"""
    <span
      data-test="status_label_text"
      class={["leading-md text-md", @disrupted && "font-bold md:text-lg"]}
    >
      {@description}
    </span>
    """
  end

  defp subheading(%{text: nil} = assigns), do: ~H""

  defp subheading(assigns) do
    ~H"""
    <div class="text-sm leading-md" data-test="status_subheading" aria-label={@aria_label}>
      {@text}
    </div>
    """
  end
end
