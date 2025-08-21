defmodule Dotcom.Components.Tabs.TabSelector do
  @moduledoc """
  Component for tab selection.

  By default the component is shown full width, with the buttons the same size,
  and the buttons do not stack on the smallest breakpoint.

  Use the following classes to modify how it's shown:
  * tab-select-btn-group-table-layout-auto - have the button widths adjust to accomodate the text inside them
  * tab-select-btn-group-stacked - the buttons stack on the smallest breakpoint
  * tab-select-btn-group-partial - the buttons do not use the entire width
  """

  @enforce_keys [:links, :selected]
  defstruct id: "tab-select",
            class: "",
            links: [
              {"info", "Info", "/schedules/bus"}
            ],
            selected: "info",
            stacked_label: "",
            icon_map: %{}

  @type t :: %__MODULE__{
          id: String.t(),
          class: String.t(),
          links: [{tab_item_name :: String.t(), title :: String.t(), href :: String.t()}],
          selected: String.t(),
          stacked_label: String.t(),
          icon_map: %{optional(title :: String.t()) => Phoenix.HTML.safe()}
        }

  def selected?(tab_item_name, tab_item_name), do: true
  def selected?(_, _), do: false

  def slug(title) do
    String.replace(String.downcase(title), " ", "-") <> "-tab"
  end
end
