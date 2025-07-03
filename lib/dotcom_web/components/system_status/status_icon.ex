defmodule DotcomWeb.Components.SystemStatus.StatusIcon do
  @moduledoc """
  Renders a status as a readable version of that status, along with an
  optional prefix.
  """

  use DotcomWeb, :component

  def status_icon(%{status: :normal} = assigns) do
    ~H"""
    <div class="bg-green-line h-4 w-4 rounded-full shrink-0"></div>
    """
  end

  def status_icon(%{status: :no_scheduled_service} = assigns) do
    ~H"""
    <div class="bg-gray-light h-4 w-4 rounded-full shrink-0"></div>
    """
  end

  def status_icon(assigns) do
    ~H"""
    <.icon
      class="h-[1.125rem] w-[1.125rem] shrink-0"
      type="icon-svg"
      name={status_icon_name(@status)}
      aria-hidden={true}
    />
    """
  end

  def status_icon_name(:shuttle), do: "icon-shuttle-default"
  def status_icon_name(:single_tracking), do: "icon-single-tracking-default"

  def status_icon_name(status) when status in [:cancellation, :station_closure, :suspension],
    do: "icon-cancelled-default"

  def status_icon_name(_), do: "icon-alerts-triangle"
end
