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
    <span data-test="status_label_text" class={["leading-[1.5rem]", status_classes(@status)]}>
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
  defp description(:shuttle, _), do: "Shuttles"
  defp description(status, _), do: Alert.human_effect(%Alert{effect: status})

  defp status_classes(:normal), do: ""
  defp status_classes(_), do: "font-bold text-lg"
end
