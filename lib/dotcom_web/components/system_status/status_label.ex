defmodule DotcomWeb.Components.SystemStatus.StatusLabel do
  @moduledoc """
  Renders a status as a readable version of that status, along with an
  optional prefix.
  """

  use DotcomWeb, :component

  alias Alerts.Alert

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
      {@rendered_prefix} {description(@status, @prefix, @plural)}
    </span>
    """
  end

  defp description(status, prefix, true), do: description(status, prefix) |> Inflex.pluralize()
  defp description(status, prefix, false), do: description(status, prefix)

  defp description(:normal, _), do: "Normal Service"
  defp description(:see_alerts, _), do: "See Alerts"

  # Special case for delays - when displayed with a future date, say 
  # "Expect Delay" (or Expect Delays) rather than simply "Delay"
  defp description(:delay, prefix) when is_binary(prefix), do: "Expect Delay"
  defp description(status, _), do: Alert.human_effect(%Alert{effect: status})

  defp status_icon(%{status: :normal} = assigns) do
    ~H"""
    <div class="bg-green-line h-4 w-4 rounded-full shrink-0"></div>
    """
  end

  defp status_icon(assigns) do
    ~H"""
    <.icon
      class="h-[1.125rem] w-[1.125rem] shrink-0"
      type="icon-svg"
      name={status_icon_name(@status)}
      aria-hidden={true}
    />
    """
  end

  defp status_icon_name(:shuttle), do: "icon-shuttle-default"

  defp status_icon_name(status) when status in [:station_closure, :suspension],
    do: "icon-cancelled-default"

  defp status_icon_name(_), do: "icon-alerts-triangle"

  defp status_classes(:normal), do: ""
  defp status_classes(_), do: "font-bold"
end
