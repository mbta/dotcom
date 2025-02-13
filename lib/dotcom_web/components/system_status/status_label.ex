defmodule DotcomWeb.Components.SystemStatus.StatusLabel do
  @moduledoc """
  Renders a status as a readable version of that status, along with an
  optional prefix.
  """

  use DotcomWeb, :component

  attr :prefix, :string, default: nil
  attr :plural, :boolean, default: false
  attr :status, :atom, required: true

  def status_label(assigns) do
    rendered_prefix =
      case assigns.prefix do
        nil -> ""
        prefix -> "#{prefix}: "
      end

    assigns = assigns |> assign(:rendered_prefix, rendered_prefix)

    ~H"""
    <span class={[status_classes(@status), "flex items-center gap-2"]}>
      <.status_icon status={@status} />
      {@rendered_prefix} {description(@status, @plural)}
    </span>
    """
  end

  defp description(status, true), do: description(status) |> Inflex.pluralize()
  defp description(status, false), do: description(status)

  defp description(:normal), do: "Normal Service"
  defp description(:see_alerts), do: "See Alerts"
  defp description(:station_closure), do: "Station Closure"
  defp description(status), do: status |> Atom.to_string() |> String.capitalize()

  defp status_icon(%{status: :normal} = assigns) do
    ~H"""
    <div class="bg-green-line h-4 w-4 rounded-full"></div>
    """
  end

  defp status_icon(assigns) do
    ~H"""
    <.icon class="h-[1.125rem] w-[1.125rem]" type="icon-svg" name={status_icon_name(@status)} />
    """
  end

  defp status_icon_name(:shuttle), do: "icon-shuttle-default"

  defp status_icon_name(status) when status in [:station_closure, :suspension],
    do: "icon-cancelled-default"

  defp status_icon_name(_), do: "icon-alerts-triangle"

  defp status_classes(:normal), do: ""
  defp status_classes(_), do: "font-bold"
end
