defmodule HubStop do
  @moduledoc """
  Represents a HubStop, which contains an image path and and a detailedStop
  """

  defstruct detailed_stop: %DetailedStop{},
            image: "",
            alt_text: ""

  @type t :: %__MODULE__{
          detailed_stop: DetailedStop.t(),
          image: String.t(),
          alt_text: String.t()
        }
end
