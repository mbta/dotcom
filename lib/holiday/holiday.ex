defmodule Holiday do
  @moduledoc false
  defstruct date: nil,
            name: ""

  @type t :: %__MODULE__{
          date: Date.t(),
          name: String.t()
        }
end
