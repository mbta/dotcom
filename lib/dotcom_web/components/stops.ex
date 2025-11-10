defmodule DotcomWeb.Components.Stops do
  @moduledoc """
  Functions for rendering information about a stop or station.
  """

  use DotcomWeb, :component

  alias DotcomWeb.StopView

  embed_templates "stops/*"

  attr :health, :float
  slot :inner_block, required: true

  defp amenity_badge(assigns) do
    assigns = assign(assigns, :bg_class, amenity_badge_bg(assigns))

    ~H"""
    <.badge
      variant="pill"
      class={"#{@bg_class} c-descriptive-link__badge text-sm text-black font-bold"}
    >
      {render_slot(@inner_block)}
    </.badge>
    """
  end

  defp amenity_badge_bg(%{health: health}) when health == 0, do: "bad"
  defp amenity_badge_bg(%{health: health}) when health == 1, do: "good"
  defp amenity_badge_bg(_), do: ""

  defp amenity_image(assigns) do
    ~H"""
    <img
      class="img-fluid my-md"
      src={@src}
      alt={@alt}
      style="max-height: 250px;"
    />
    """
  end

  defp amenity_icon(%{type: :parking} = assigns) do
    ~H"""
    <.icon aria-hidden name="square-parking" class="size-6 fill-current shrink-0" />
    """
  end

  defp amenity_icon(%{type: type} = assigns) do
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
    <.icon aria-hidden type="icon-svg" name={@icon_name} class="size-6 fill-current shrink-0" />
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
      <:col :let={facility} label={~t"Status"}>
        <div class="flex gap-sm items-center whitespace-nowrap">
          <%= if @alert_fn.(facility) do %>
            <.icon name="ban" class="size-3 fill-brand-danger" aria-hidden />{~t"Out of Order"}
          <% else %>
            <.icon name="circle" class="size-3 fill-brand-success" aria-hidden />
            {~t"Working"}
          <% end %>
        </div>
      </:col>
    </.table>
    """
  end

  attr :is_ios?, :boolean
  attr :stop, Stops.Stop, required: true

  @doc """
  Link will open Google Maps or Apple Maps on phones.
  """
  def external_map_link(assigns) do
    ~H"""
    <a
      href={StopView.google_maps_url(@stop, @is_ios?)}
      target="_blank"
      rel="noreferrer"
      class="c-call-to-action notranslate"
    >
      {StopView.address(@stop)}
      <.icon
        name="arrow-up-right-from-square"
        class="size-4 fill-current ml-[2px] -mb-[2px]"
        aria-hidden
      />
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

  # A thin wrapper on the `<descriptive_link>` component describing a stop
  # amenity. Some amenities we always want to show information for, regardless
  # of whether the amenity exists at the given place. In this case `@amenity`
  # might be `nil` while `@always_enabled?` is set to `true`, and the amenity
  # will retain default styling and the ability to show additional information
  # in a modal. Without `@always_enabled?`, an absent `@amenity` will produce a
  # "disabled" state, with no modal component.
  defp base_amenity(assigns) do
    disabled = if(assigns.always_enabled?, do: false, else: is_nil(assigns.amenity))
    assigns = assign(assigns, :disabled, disabled)

    ~H"""
    <.descriptive_link data-dialog-modal={@id} disabled={@disabled}>
      <:title>
        <div class="flex items-center gap-sm flex-wrap">
          {render_slot(@card_title)}
        </div>
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
