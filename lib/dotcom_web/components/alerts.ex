defmodule DotcomWeb.Components.Alerts do
  @moduledoc """
  Function components for rendering different styles of alerts.
  """

  use DotcomWeb, :component

  alias Alerts.Alert
  alias DotcomWeb.AlertView

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

    ~H"""
    <div class="p-4 bg-gray-100">
      <%= if @alert.image do %>
        <img
          class="w-full mb-4"
          src={@alert.image}
          alt={if @alert.image_alternative_text, do: @alert.image_alternative_text, else: ""}
        />
      <% end %>
      <%= if @header do %>
        <p class="my-0">{AlertView.format_alert_description(@header)}</p>
      <% end %>
      <%= if @description do %>
        <hr class="h-px my-4 bg-gray-200 border-0" />
        <p class="my-0">{AlertView.format_alert_description(@description)}</p>
      <% end %>
      <%= if @url do %>
        <hr class="h-px my-4 bg-gray-200 border-0" />
        <p class="my-0">
          For more information: <a href={@url}>{@url}</a>
        </p>
      <% end %>
    </div>
    """
  end
end
