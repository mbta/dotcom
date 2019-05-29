defmodule Site.Components.Tabs.ModeTabList do
  @moduledoc """
  Renders a list of tabs for transport modes, as well as The Ride and accessibility.

  By default the tab is shown with each button using the same width.
  Use class=tab-select-btn-group-table-layout-auto to make the button widths adjust to the text inside them.
  """
  alias SiteWeb.ViewHelpers
  alias SiteWeb.PartialView.SvgIconWithCircle

  defstruct id: "modes",
            class: "",
            links:
              (for mode <- [:bus, :commuter_rail, :subway, :ferry] do
                 {mode, "/schedules/#{mode}"}
               end),
            selected_mode: :bus,
            stacked_label: "Explore by mode:"

  @type t :: %__MODULE__{
          id: String.t(),
          class: String.t(),
          links: [{mode_atom :: atom, href :: String.t()}],
          selected_mode: atom
        }

  def mode_links(links) do
    Enum.map(links, &do_mode_link/1)
  end

  defp do_mode_link({"commuter-rail", href}), do: do_mode_link({:commuter_rail, href})
  defp do_mode_link({"the-ride", href}), do: do_mode_link({:the_ride, href})

  defp do_mode_link({mode_string, href}) when is_binary(mode_string),
    do: do_mode_link({String.to_existing_atom(mode_string), href})

  defp do_mode_link({mode_atom, href}) do
    mode_string = Atom.to_string(mode_atom)
    mode_name = ViewHelpers.mode_name(mode_atom)
    {mode_string, mode_name, href}
  end

  def build_mode_icon_map(links) do
    Map.new(modes(links), &do_build_mode_icon_map/1)
  end

  defp do_build_mode_icon_map("commuter-rail"), do: do_build_mode_icon_map(:commuter_rail)
  defp do_build_mode_icon_map("the-ride"), do: do_build_mode_icon_map(:the_ride)

  defp do_build_mode_icon_map(mode) when is_binary(mode),
    do: mode |> String.to_existing_atom() |> do_build_mode_icon_map()

  defp do_build_mode_icon_map(mode) when is_atom(mode) do
    icon =
      SvgIconWithCircle.svg_icon_with_circle(%SvgIconWithCircle{icon: mode, aria_hidden?: true})

    {ViewHelpers.mode_name(mode), icon}
  end

  defp modes(links) do
    Enum.map(links, fn {mode, _} -> mode end)
  end
end
