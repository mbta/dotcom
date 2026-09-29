defmodule Holiday do
  @derive Jason.Encoder
  defstruct date: nil,
            name: ""

  @type t :: %__MODULE__{
          date: Date.t(),
          name: String.t()
        }
end
