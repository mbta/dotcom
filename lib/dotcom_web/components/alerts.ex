defmodule DotcomWeb.Components.Alerts do
  @moduledoc """
  Function components for rendering different styles of alerts.
  """

  use DotcomWeb, :component

  alias DotcomWeb.Components.SystemStatus.StatusRowHeading
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
            {~t"For more information"}: {Alerts.URLParsingHelpers.replace_urls_with_links(@url)}
          </p>
        <% end %>
        <div class="c-alert-item__updated">
          {AlertView.alert_updated(@alert, @now)}
        </div>
      </div>
    </div>
    """
  end

  @doc """
  Shows alerts, with each alert condensed into a status and embedded alert.
  """
  attr :alerts, :list, required: true

  def alert_status_group(assigns) do
    ~H"""
    <section class="c-alert-group">
      <.unstyled_accordion
        :for={alert <- @alerts}
        summary_class={"flex items-center hover:bg-brand-primary-lightest cursor-pointer group/row c-alert-item c-alert-item--#{alert.priority} [&>div]:grid-cols-[.75rem_auto]"}
        chevron_class="border-t-[1px] border-gray-lightest fill-gray-dark px-2 py-3 self-stretch flex items-center"
      >
        <:heading>
          <StatusRowHeading.status_row_heading
            hide_route_pill
            future={false}
            plural={false}
            alerts={[alert]}
            route_ids={MapSet.to_list(alert.informed_entity.route)}
            status={alert.effect}
          />
        </:heading>
        <:content>
          <.embedded_alert alert={alert} />
        </:content>
      </.unstyled_accordion>
    </section>
    """
  end
end
