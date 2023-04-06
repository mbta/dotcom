defmodule Routes.Shape do
  @moduledoc """
  Data model corresponding to the V3 API Shape resource.
  """
  defstruct id: "",
            name: "",
            direction_id: 0,
            polyline: "",
            priority: 0

  @type id_t :: String.t()
  @type t :: %__MODULE__{
          id: id_t,
          name: String.t(),
          direction_id: 0 | 1,
          polyline: String.t(),
          priority: integer
        }
end
