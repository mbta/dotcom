defmodule SiteWeb.FareController.Filter do
  @type t :: %__MODULE__{
          id: String.t(),
          name: String.t() | iolist,
          fares: [Fares.Fare.t()]
        }

  defstruct id: "",
            name: "",
            fares: []
end
