defmodule DotcomWeb.Components.VariantPicker do
  @moduledoc """
  Menu for choosing a route variant: a branch for the Green Line, or a route
  pattern (destination) for a bus route.
  """

  use DotcomWeb, :component

  import DotcomWeb.Components.MenuButton, only: [menu_button: 1]
  import MbtaMetro.Components.SystemIcons, only: [route_icon: 1]
  import Routes.Route, only: [line_name: 1]

  def variant_picker?(route), do: green_line?(route) or bus?(route)

  defp green_line?(%{id: "Green" <> _}), do: true
  defp green_line?(_), do: false

  defp bus?(route), do: Routes.Route.type_atom(route) == :bus

  defp variant_label(route, nil) do
    if green_line?(route), do: ~t"All branches", else: ~t"All variants"
  end

  defp variant_label(_route, %{headsign: headsign}), do: headsign

  attr :route, :map, required: true
  attr :route_patterns, :list, required: true
  attr :selected_variant, :string, default: nil

  def variant_picker(%{route: %{id: "Green" <> _}} = assigns) do
    ~H"""
    <.menu_button id="variant-menu">
      <:label>
        <.variant_trigger
          route={@route}
          pattern={selected_pattern(@route_patterns, @selected_variant)}
        />
      </:label>
      <:item event="set_variant" value={nil} active={is_nil(@selected_variant)}>
        <.variant_picker_item active={is_nil(@selected_variant)}>
          <.route_icon line="green-line" size="small" /> {~t"All branches"}
        </.variant_picker_item>
      </:item>
      <:item
        :for={p <- Enum.sort_by(@route_patterns, & &1.sort_order)}
        event="set_variant"
        value={p.id}
        active={p.id == @selected_variant}
      >
        <.variant_picker_item active={p.id == @selected_variant}>
          <span class="inline-flex items-center gap-sm">
            <.route_icon line={Routes.Route.line_name(p.route_id)} size="small" />
            {p.headsign}
          </span>
        </.variant_picker_item>
      </:item>
    </.menu_button>
    """
  end

  def variant_picker(assigns) do
    {common_patterns, uncommon_patterns} =
      assigns.route_patterns
      |> Enum.sort_by(& &1.sort_order)
      |> Enum.split_with(&(&1.typicality < 3))

    assigns =
      assigns
      |> assign(:common_patterns, common_patterns)
      |> assign(:uncommon_patterns, uncommon_patterns)
      |> assign(:first_uncommon_id, uncommon_patterns |> List.first() |> then(&(&1 && &1.id)))

    ~H"""
    <.menu_button id="variant-menu">
      <:label>
        <.variant_trigger
          route={@route}
          pattern={selected_pattern(@route_patterns, @selected_variant)}
        />
      </:label>
      <:separator>
        <div class="font-medium px-md py-sm bg-charcoal-80 flex gap-sm text-md">
          <span class="basis-4 shrink-0"></span>
          {~t"Uncommon destinations"}
        </div>
      </:separator>
      <:item event="set_variant" value={nil} active={is_nil(@selected_variant)}>
        <.variant_picker_item active={is_nil(@selected_variant)}>
          {~t"All variants"}
        </.variant_picker_item>
      </:item>
      <:item
        :for={p <- @common_patterns}
        event="set_variant"
        value={p.id}
        active={p.id == @selected_variant}
      >
        <.variant_picker_item active={p.id == @selected_variant}>
          {p.headsign}
          <.variant_description pattern={p} />
        </.variant_picker_item>
      </:item>
      <:item
        :for={p <- @uncommon_patterns}
        separator_before={p.id == @first_uncommon_id}
        event="set_variant"
        value={p.id}
        active={p.id == @selected_variant}
      >
        <.variant_picker_item active={p.id == @selected_variant}>
          {p.headsign}
          <.variant_description pattern={p} />
        </.variant_picker_item>
      </:item>
    </.menu_button>
    """
  end

  defp selected_pattern(route_patterns, selected_variant),
    do: Enum.find(route_patterns, &(&1.id == selected_variant))

  attr :route, :map, required: true
  attr :pattern, :map, default: nil

  defp variant_trigger(%{pattern: pattern} = assigns) do
    line =
      cond do
        is_map(pattern) -> line_name(pattern.route_id)
        green_line?(assigns.route) -> line_name("Green")
        true -> nil
      end

    assigns = assign(assigns, :line, line)

    ~H"""
    <div class="font-heading text-[1.25rem] font-bold flex items-center gap-sm text-left leading-snug">
      <.route_icon
        :if={green_line?(@route)}
        line={@line}
        size="small"
      />
      {variant_label(@route, @pattern)}
    </div>
    """
  end

  attr :pattern, :map, required: true

  defp variant_description(assigns) do
    ~H"""
    <div class="text-charcoal-40 text-sm font-normal">
      {variant_description_text(@pattern)}
    </div>
    """
  end

  defp variant_description_text(%{typicality: 1}), do: ~t"typical route"

  defp variant_description_text(%{time_desc: nil} = pattern) do
    gettext("from %{origin}, less common route", origin: pattern_origin(pattern))
  end

  defp variant_description_text(%{time_desc: time_desc} = pattern) do
    gettext("%{time_desc} from %{origin}", time_desc: time_desc, origin: pattern_origin(pattern))
  end

  defp pattern_origin(%{name: name}), do: name |> String.split("-", trim: true) |> List.first()

  attr :active, :boolean, required: true
  slot :inner_block, required: true

  defp variant_picker_item(assigns) do
    ~H"""
    <div class={[
      if(@active,
        do: "hover:bg-cobalt-30 text-white [&_*]:text-white",
        else: "hover:bg-cobalt-90"
      ),
      "flex gap-sm items-baseline px-md py-sm font-medium text-md group-focus:bg-cobalt-90 group-aria-checked:bg-cobalt-20"
    ]}>
      <span class="basis-4 shrink-0">
        <.icon
          :if={@active}
          name="check"
          class="size-4 fill-white"
          aria-hidden
        />
      </span>
      <span>
        {render_slot(@inner_block)}
      </span>
    </div>
    """
  end
end
