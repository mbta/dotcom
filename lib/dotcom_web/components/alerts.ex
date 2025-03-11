defmodule DotcomWeb.Components.Alerts do
  @moduledoc """
  Function components for rendering different styles of alerts.
  """

  use DotcomWeb, :component

  import Dotcom.Alerts, only: [affected_stations: 1]

  alias Alerts.Alert
  alias DotcomWeb.AlertView

  @date_time_module Application.compile_env!(:dotcom, :date_time_module)

  attr :alert, Alert, required: true

  @doc """
  An alert that is embedded within another component.
  It does not include header information like the time range, effect, or route.
  """
  def embedded_alert(%{alert: alert} = assigns) do
    assigns =
      assign(
        assigns,
        Map.new([:description, :header, :url], fn key ->
          {key, if(Map.get(alert, key) != "", do: Map.get(alert, key))}
        end)
      )
      |> assign(:now, @date_time_module.now())

    ~H"""
    <div
      class={"p-md c-alert-item c-alert-item--#{@alert.priority}"}
      data-test={"alert_id:#{@alert.id}"}
    >
      {AlertView.format_alert_description(@header)}
      <%= if @description do %>
        <div class="mt-sm">
          <a :if={@alert.image} href={@alert.image} target="_blank">
            <img
              class="w-full mb-4"
              src={@alert.image}
              alt={if @alert.image_alternative_text, do: @alert.image_alternative_text, else: ""}
            />
          </a>
          {AlertView.format_alert_description(@description)}
          <%= if @url do %>
            <hr class="my-4 border-t-[1px] border-gray-lightest" />
            <p class="my-0">
              For more information: <a href={@url}>{@url}</a>
            </p>
          <% end %>
          <div class="c-alert-item__updated">
            {AlertView.alert_updated(@alert, @now)}
          </div>
        </div>
      <% end %>
    </div>
    """
  end

  def full_alert(%{alert: alert} = assigns) do
    affected_stations = affected_stations(alert)

    assigns = assign(assigns, affected_stations: affected_stations)

    ~H"""
    <div data-test={"alert_id:#{@alert.id}"}>
      <%= if Kernel.length(@affected_stations) == 1 do %>
        {@affected_stations |> List.first() |> Map.get(:name, "")}
      <% end %>
      {AlertView.effect_name(@alert)}
    </div>
    """
  end
end
