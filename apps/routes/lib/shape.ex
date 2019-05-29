defmodule Routes.Shape do
  defstruct id: "",
            name: "",
            stop_ids: [],
            direction_id: 0,
            polyline: "",
            priority: 0

  @type id_t :: String.t()
  @type t :: %__MODULE__{
          id: id_t,
          name: String.t(),
          stop_ids: [],
          direction_id: 0 | 1,
          polyline: String.t(),
          priority: integer
        }
end
