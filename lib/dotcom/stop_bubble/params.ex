defmodule Dotcom.StopBubble.Params do
  @moduledoc false
  alias Dotcom.StopBubble

  defstruct render_type: :stop,
            class: "stop",
            direction_id: 0,
            merge_indent: nil,
            route_id: nil,
            route_type: nil,
            show_line?: true,
            vehicle_tooltip: nil,
            content: "",
            bubble_branch: nil,
            show_checkmark?: false

  @type t :: %__MODULE__{
          render_type: StopBubble.renderable_bubble(),
          class: String.t(),
          direction_id: 0 | 1,
          merge_indent: :above | :below | nil,
          route_id: Routes.Route.id_t() | nil,
          route_type: Routes.Route.type_int() | nil,
          show_line?: boolean,
          vehicle_tooltip: VehicleTooltip.t() | nil,
          content: String.t(),
          bubble_branch: String.t() | nil,
          show_checkmark?: boolean
        }
end
