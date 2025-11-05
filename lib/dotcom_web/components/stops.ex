defmodule DotcomWeb.Components.Stops do
  @moduledoc """

  """

  use DotcomWeb, :component

  # alias Alerts.Alert
  alias Dotcom.StopAmenity
  alias DotcomWeb.StopView
  alias Stops.Stop

  embed_templates "stops/*"

  attr :amenity, StopAmenity
  attr :alerts, :list, doc: "One or more alerts", default: []
  attr :stop, Stop, required: true
  attr :title, :string, required: true
  attr :type, :atom, required: true, doc: "Amenity type"
  attr :open, :boolean, default: false
  attr :fares, :list, default: []
  slot :inner_block

  def amenity_card(assigns) do
    assigns =
      assign(assigns, :modal_id, "modal-#{assigns.stop.id}-#{assigns.title}")
      |> assign(:now, Dotcom.Utils.DateTime.now())
      |> assign(:disabled, is_nil(assigns.amenity))

    ~H"""
    <.descriptive_link data-dialog-modal={@modal_id} disabled={@disabled}>
      <:title>
        <div class="flex items-center gap-sm">
          <.card_icon type={@type} />
          {@title}
          <.amenity_badge :if={@disabled}>
            {if(@type == :accessibility, do: ~t"Not accessible", else: ~t"Not available")}
          </.amenity_badge>
          <.card_badge :if={!@disabled} type={@type} stop={@stop} />
        </div>
      </:title>
      <div class="hidden-sm-down mt-sm">{card_description(@type, @stop)}</div>
    </.descriptive_link>
    <.dialog_modal modal_id={@modal_id} open={@open}>
      <:modal_heading>
        {gettext("%{amenity} at %{name}", amenity: @title, name: @stop.name)}
      </:modal_heading>
      {DotcomWeb.AlertView.render("group.html", alerts: @alerts, date_time: @now)}

      <.modal_content type={@type} amenity={@amenity} stop={@stop} fares={@fares} />
    </.dialog_modal>
    """
  end

  attr :bg_class, :string, default: "bg-gray-lighter"
  slot :inner_block, required: true

  defp amenity_badge(assigns) do
    ~H"""
    <.badge variant="pill" class={"#{@bg_class} c-descriptive-link__badge text-sm font-bold"}>
      {render_slot(@inner_block)}
    </.badge>
    """
  end

  attr :stop, Stop, required: true
  attr :type, :atom, required: true

  defp card_badge(%{type: :fare} = assigns) do
    ~H""
  end

  defp card_badge(assigns) do
    ~H"""
    <.amenity_badge bg_class="bg-gray-light">
      Not
    </.amenity_badge>
    """
  end

  defp card_description(:accessibility, stop) do
    if length(stop.accessibility) || DotcomWeb.StopController.accessible?(stop) do
      gettext("Learn more about the accessibility features at this %{place}.",
        place: StopView.station_or_stop(stop)
      )
    else
      gettext("This %{place} is not accessible.", place: StopView.station_or_stop(stop))
    end
  end

  defp card_description(:parking, stop) do
    if stop.parking_lots === [] do
      ~t"This station does not have parking."
    else
      # TODO account for if parking lots are closed (via alerts)
      ~t"View daily rates and facility information."
    end
  end

  defp card_description(:bike, stop) do
    if stop.bike_storage === [] do
      ~t"This station does not have bike storage."
    else
      # TODO account for if bike lots are closed (via alerts)
      # TODO adjust message based on pedal vs covered vs outdoor
      ~t"Secured parking is available but requires Charlie Card registration in advance."
    end
  end

  defp card_description(type, stop) do
    type
    |> Atom.to_string()
    |> then(&"View available #{&1}.")
  end

  defp card_icon(%{type: :parking} = assigns) do
    ~H"""
    <.icon aria-hidden="true" name="square-parking" class="size-6 fill-current" />
    """
  end

  defp card_icon(%{type: type} = assigns) do
    assigns =
      assign_new(assigns, :icon_name, fn ->
        case type do
          :accessibility -> "icon-accessible-default"
          :bike -> "icon-bike"
          :elevator -> "icon-elevator"
          :escalator -> "icon-escalator"
          :fare -> "icon-fares-default"
        end
      end)

    ~H"""
    <.icon aria-hidden="true" type="icon-svg" name={@icon_name} class="size-6 fill-current" />
    """
  end

  attr :fares, :list, required: true
  attr :label, :string
  attr :id, :string

  def fare_table(assigns) do
    ~H"""
    <.table id={@id} rows={@fares}>
      <:col :let={{name, _}} label={@label}>{name}</:col>
      <:col :let={{_, price}} label="Cost">{price}</:col>
    </.table>
    """
  end

  attr :facilities, :list, required: true
  attr :label, :string
  attr :id, :string
  attr :alert_fn, :fun

  def facility_table(assigns) do
    ~H"""
    <.table id={@id} rows={@facilities}>
      <:col :let={facility} label={@label}>{facility.long_name}</:col>
      <:col :let={facility} label="Status">
        <%= if @alert_fn.(facility) do %>
          <div class="flex gap-sm items-center whitespace-nowrap">
            <.icon name="ban" class="size-3 fill-brand-danger" aria-hidden />{~t"Out of Order"}
          </div>
          <p :if={alternative(facility.properties)}>
            {alternative(facility.properties)}
          </p>
        <% else %>
          <div class="flex gap-sm items-center whitespace-nowrap">
            <.icon name="circle" class="size-3 fill-brand-success" aria-hidden />
            {~t"Working"}
          </div>
        <% end %>
      </:col>
    </.table>
    """
  end

  defp alternative(properties) do
    with %{"value" => alternative_text} <-
           Enum.find(properties, &(Map.get(&1, "name") == "alternative-service-text")) do
      alternative_text
    end
  end

  attr :amenity, StopAmenity
  attr :stop, Stop
  attr :type, :atom
  attr :fares, :list

  defp modal_content(%{amenity: nil} = assigns) do
    ~H"""
    <span>{@type} Content</span>
    <p>There is no thing</p>
    """
  end

  defp modal_content(assigns) do
    ~H"""
    <span>{@amenity.type} Content</span>
    <p>Some extra content just for this</p>
    """
  end

  attr :is_ios?, :boolean
  attr :stop, Stop, required: true

  @doc """
  Link will open Google Maps or Apple Maps on phones.
  """
  def external_map_link(%{stop: %Stop{}} = assigns) do
    ~H"""
    <a
      href={StopView.google_maps_url(@stop, @is_ios?)}
      target="_blank"
      rel="noreferrer"
      class="c-call-to-action notranslate"
    >
      {StopView.stop_address(@stop)}
      <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
    </a>
    """
  end

  attr :href, :string, required: true
  attr :text, :string, required: true

  defp amenity_link(assigns) do
    ~H"""
    <p>
      <a class="c-call-to-action" href={@href}>
        {@text}
      </a>
    </p>
    """
  end

  attr :amenity, Stops.StopAmenity
  attr :always_enabled?, :boolean, default: false
  attr :id, :string, required: true
  attr :open, :boolean, default: false
  slot :card_title
  slot :card_content
  slot :modal_content
  slot :modal_heading

  defp base_amenity(assigns) do
    disabled = if(assigns.always_enabled?, do: false, else: is_nil(assigns.amenity))
    assigns = assign(assigns, :disabled, disabled)

    ~H"""
    <.descriptive_link data-dialog-modal={@id} disabled={@disabled}>
      <:title>
        {render_slot(@card_title)}
      </:title>
      <div class="hidden-sm-down mt-sm">
        {render_slot(@card_content)}
      </div>
    </.descriptive_link>
    <.dialog_modal :if={!@disabled} modal_id={@id} open={@open}>
      <:modal_heading>
        {render_slot(@modal_heading)}
      </:modal_heading>
      {render_slot(@modal_content)}
    </.dialog_modal>
    """
  end
end
